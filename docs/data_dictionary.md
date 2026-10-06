# Data dictionary

## Geospatial inputs

- `PALM_Study_Area.geojson`: study-area geometry.
- `PALM_Dam.geojson`: reservoir geometry and source attributes.
- `PALM_Sampling_Points.geojson`: four monitoring/calibration locations.
- `PALM_Estimation_Points.geojson`: six additional estimation locations.
- `zones/PALM_Zone_1.geojson` … `PALM_Zone_6.geojson`: six analysis zones.

Local filesystem `path` attributes present in source GIS exports were removed for the public release; geometries and scientific attributes were retained.

## Random-Forest samples

`data/training/` and `data/validation/` contain independent year-specific GeoJSON samples. Core attributes are `CLASS_ID`, `CLASS_NAME`, and `CLASS_CLRS`. The classification scripts use eight original LULC classes.

## Landsat reflectance

Raw extraction CSV files contain Landsat bands `B2`–`B7`, date/search-window metadata, point identifiers and geometry. Local filesystem `path` fields were removed for release. `data/reflectance/processed/Reflectance_2013_2018_grouped.xlsx` provides the grouped analytical reflectance data by modeling period.

## Water-quality model inputs

`data/water_quality/Water_quality_and_reflectance_model_inputs.xlsx` contains nine parameter-period worksheets: TOC, TDS and Chl-a for 2013–2014, 2015–2016 and 2017–2018. Legacy worksheet labels containing `Cha-a` are preserved for compatibility with the validated notebooks.

## Canonical LULC derived data

- `derived_data/lulc/LULC_2013.tif`
- `derived_data/lulc/LULC_2015.tif`
- `derived_data/lulc/LULC_2017.tif`
- `derived_data/lulc/zones/`: 18 canonical zonal rasters (six zones × three years).

The canonical full rasters use EPSG:32613 at 30 m resolution. The zonal rasters are retained because they are the exact inputs validated against the archived zonal change analyses.

## LULC-change tables

`derived_data/lulc_change/` contains normalized English-named workbooks for global and zonal 2013–2015 and 2015–2017 analyses. These are the filenames consumed by the portable correlation notebook.

## Water-quality predictions

`derived_data/water_quality_predictions/` contains nine prediction workbooks (three parameters × three periods) for the additional estimation points.

## Results

- `results/model_performance/`: model diagnostics, figures and Box–Cox/model-result workbooks.
- `results/correlation/`: integrated correlation tables, matrices and figure-supporting outputs.
- `results/figures/`: selected final figures retained for convenient reference.

## Parameter terminology

- **TOC**: total organic carbon.
- **TDS**: total dissolved solids.
- **Chl-a**: chlorophyll-a.
- **LRC**: logarithmic change in water quality used in the integrated analysis.
