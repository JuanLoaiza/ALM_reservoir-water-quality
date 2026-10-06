# Reproduction guide

## Route A — analysis reproduction (recommended)

This route starts from the supplied canonical derived data and reproduces the downstream statistical analyses without rerunning Google Earth Engine.

1. Create a Python environment and run `pip install -r requirements.txt`.
2. Run the nine notebooks under `code/water_quality/` if you wish to regenerate the water-quality model outputs and predictions.
3. Run `code/lulc_change/04_LULC_change_analysis.ipynb` to regenerate LULC-change tables. Canonical zonal rasters are supplied under `derived_data/lulc/zones/` because these are the rasters validated against the archived zonal analyses.
4. Run `code/correlation/05_LULC_WQ_correlation.ipynb` to regenerate the integrated exact and one-year-lagged analyses and correlation outputs.

All portable Python notebooks use repository-relative paths. They do not require the author's Google Drive.

## Route B — LULC classification workflow in Google Earth Engine

1. Upload the study-area, training and validation GeoJSON files from `data/geospatial/`, `data/training/`, and `data/validation/` to your own Earth Engine project.
2. Update the marked asset placeholders in each script under `code/gee/`.
3. Run the 2013, 2015 and 2017 scripts. They use Landsat 8 Collection 2 Level 2 surface reflectance and export classifications at 30 m in EPSG:32613.
4. Compare/reclassify the resulting classifications according to the study workflow. For exact reproduction of the validated downstream analyses, use the canonical LULC rasters supplied in `derived_data/lulc/`.

## Validation

The release contains validation reports for the nine water-quality models, fourteen LULC-change analyses and the integrated correlation workflow. These reports compare regenerated numerical outputs with the archived outputs used during development.

## Important reproducibility note

The repository preserves analytical formulas and model logic used for the study. Portability edits were restricted to paths, file organization, metadata and output handling; they were not used to redesign the scientific analyses. Numerical validation reported in this release applies to the Python-based water-quality, LULC-change and integrated correlation workflows using the supplied canonical inputs and derived rasters. The Earth Engine scripts and supplied geospatial samples document and enable execution of the LULC classification workflow.
