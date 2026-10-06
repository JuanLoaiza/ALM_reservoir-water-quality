// ============================================================================
// PALM Land Use/Land Cover Classification - 2015
// ============================================================================
//
// Author: Juan Gabriel Loaiza
// Affiliation: Universidad Autónoma de Sinaloa (UAS), Mexico
// Project: Land-use/land-cover and water-quality analysis of the
//          Adolfo Lopez Mateos Reservoir (PALM), Sinaloa, Mexico
// Repository: PALM-LULC-Water-Quality
// Repository version: v1.0.0
// Software environment: Google Earth Engine
//
// Description:
// Landsat 8 Collection 2 Level 2 surface-reflectance classification using
// spectral bands, spectral indices, topographic variables, and a Random
// Forest classifier. This script is part of the reproducibility materials
// associated with the corresponding scientific publication.
//
// Required user assets (upload the corresponding repository GeoJSON files
// to Google Earth Engine and replace the asset IDs below):
//   data/geospatial/PALM_Study_Area.geojson
//   data/training/PALM_Training_2015.geojson
//   data/validation/PALM_Validation_2015.geojson
//
// LULC raster exports are standardized to 30 m in EPSG:32613.
// License: See LICENSE in the repository root.
//
// ============================================================================

var studyArea = ee.FeatureCollection('projects/your-project/assets/PALM_Study_Area');
var training   = ee.FeatureCollection('projects/your-project/assets/PALM_Training_2015');
var validation = ee.FeatureCollection('projects/your-project/assets/PALM_Validation_2015');

var START_DATE = '2015-01-01';
var END_DATE   = '2015-12-31';
var EXPORT_SCALE = 30;
var EXPORT_CRS = 'EPSG:32613';

// ---------------- Landsat 8 Collection 2 Level 2 ----------------
function maskAndScaleL8(image) {
  var qa = image.select('QA_PIXEL');
  // Mask cloud (bit 3) and cloud shadow (bit 4), as in the original workflow.
  var qaMask = qa.bitwiseAnd(1 << 3).eq(0)
                 .and(qa.bitwiseAnd(1 << 4).eq(0));

  var optical = image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
    .multiply(0.0000275)
    .add(-0.2);

  // Reflectance validity mask retained from the original workflow.
  var reflectanceMask = optical.reduce(ee.Reducer.min()).gt(0)
    .and(optical.reduce(ee.Reducer.max()).lt(1));

  return optical.updateMask(qaMask).updateMask(reflectanceMask)
    .copyProperties(image, image.propertyNames());
}

var composite = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(studyArea)
  .filterDate(START_DATE, END_DATE)
  .map(maskAndScaleL8)
  .median()
  .clip(studyArea);

// ---------------- Spectral indices ----------------
var ndvi  = composite.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');
var gndvi = composite.normalizedDifference(['SR_B5','SR_B3']).rename('GNDVI');
var evi = composite.expression(
  '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
    NIR: composite.select('SR_B5'), RED: composite.select('SR_B4'),
    BLUE: composite.select('SR_B2')
  }).rename('EVI');
var ndmi = composite.normalizedDifference(['SR_B5','SR_B6']).rename('NDMI');
var savi = composite.expression(
  '1.5 * ((NIR - RED) / (NIR + RED + 0.5))', {
    NIR: composite.select('SR_B5'), RED: composite.select('SR_B4')
  }).rename('SAVI');
var msi = composite.select('SR_B6').divide(composite.select('SR_B5')).rename('MSI');
var bsi = composite.expression(
  '((SWIR1 + RED) - (NIR + BLUE)) / ((SWIR1 + RED) + (NIR + BLUE))', {
    SWIR1: composite.select('SR_B6'), RED: composite.select('SR_B4'),
    NIR: composite.select('SR_B5'), BLUE: composite.select('SR_B2')
  }).rename('BSI');
var vari = composite.expression(
  '(GREEN - RED) / (GREEN + RED - BLUE)', {
    GREEN: composite.select('SR_B3'), RED: composite.select('SR_B4'),
    BLUE: composite.select('SR_B2')
  }).rename('VARI');
var ndwi = composite.normalizedDifference(['SR_B3','SR_B5']).rename('NDWI');
var mndwi = composite.normalizedDifference(['SR_B3','SR_B6']).rename('MNDWI');

// ---------------- Topography ----------------
var dem = ee.Image('USGS/SRTMGL1_003').select('elevation').rename('MDE').clip(studyArea);
var terrain = ee.Terrain.products(dem);
var slope = terrain.select('slope').rename('slope');
var aspect = terrain.select('aspect').rename('aspect');
var hillshade = terrain.select('hillshade').rename('hillshade');

// Predictor stack used for classification.
var predictors = composite
  .addBands([ndvi, gndvi, evi, ndmi, savi, msi, bsi, vari, ndwi, mndwi, dem, slope]);

var predictorNames = predictors.bandNames();
print('Predictor bands (2015)', predictorNames);

// ---------------- Training data ----------------
// CLASS_ID values: 1–8. The original workflow sampled up to 500
// features per class after adding a random column.
training = training.map(function(f) {
  return f.set('class', ee.Number.parse(ee.String(f.get('CLASS_ID'))));
});

var balancedTraining = ee.FeatureCollection(
  ee.List.sequence(1, 8).map(function(classId) {
    return training.filter(ee.Filter.eq('class', classId))
      .randomColumn('random')
      .sort('random')
      .limit(500);
  })
).flatten();

var trainingSamples = predictors.sampleRegions({
  collection: balancedTraining,
  properties: ['class'],
  scale: 30,
  geometries: true
});

var classifier = ee.Classifier.smileRandomForest(100).train({
  features: trainingSamples,
  classProperty: 'class',
  inputProperties: predictorNames
});

var classified = predictors.classify(classifier).clip(studyArea);

// Smoothed visualization retained from the original workflow.
// The exported scientific raster is the unsmoothed classification.
var classifiedSmoothed = classified.focal_mode({radius: 1, units: 'pixels'});

Map.centerObject(studyArea, 10);
Map.addLayer(classified, {min: 1, max: 8}, 'LULC 2015 - raw');
Map.addLayer(classifiedSmoothed, {min: 1, max: 8}, 'LULC 2015 - focal mode', false);

// ---------------- Independent validation ----------------
validation = validation.map(function(f) {
  return f.set('class', ee.Number.parse(ee.String(f.get('CLASS_ID'))));
});

var validationSamples = classified.sampleRegions({
  collection: validation,
  properties: ['class'],
  scale: 30,
  geometries: true
});

var errorMatrix = validationSamples.errorMatrix('class', 'classification');
print('Confusion matrix 2015', errorMatrix);
print('Overall accuracy 2015', errorMatrix.accuracy());
print('Kappa 2015', errorMatrix.kappa());
print('Producer accuracy 2015', errorMatrix.producersAccuracy());
print('User accuracy 2015', errorMatrix.consumersAccuracy());

// ---------------- Exports ----------------
Export.image.toDrive({
  image: classified.toByte(),
  description: 'PALM_LULC_2015',
  fileNamePrefix: 'PALM_LULC_2015',
  region: studyArea.geometry(),
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: hillshade,
  description: 'PALM_Hillshade_2015',
  fileNamePrefix: 'PALM_Hillshade_2015',
  region: studyArea.geometry(),
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e13
});

// Optional asset export. Replace the assetId with your own GEE project path.
Export.image.toAsset({
  image: classified.toByte(),
  description: 'PALM_LULC_2015_asset',
  assetId: 'projects/your-project/assets/PALM_LULC_2015',
  region: studyArea.geometry(),
  scale: EXPORT_SCALE,
  crs: EXPORT_CRS,
  maxPixels: 1e13
});
