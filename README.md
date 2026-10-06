# PALM LULC–Water Quality Reproducibility Package

**Version:** 1.0.0

Reproducibility materials supporting the study of land-use/land-cover (LULC) change and water-quality dynamics in the Adolfo López Mateos Reservoir (PALM), Sinaloa, Mexico.

## Contents

This release contains the Google Earth Engine classification scripts, nine portable water-quality modeling notebooks (TOC, TDS and Chl-a), the LULC-change notebook, the integrated LULC–water-quality correlation notebook, analytical inputs, canonical derived rasters/tables, selected outputs, and validation records.

## Analytical workflow

1. **LULC classification:** Landsat 8 Collection 2 Level 2 surface reflectance, spectral indices and SRTM topography are used in Google Earth Engine to classify 2013, 2015 and 2017 imagery with Random Forest.
2. **Water-quality modeling:** TOC, TDS and Chl-a are modeled for 2013–2014, 2015–2016 and 2017–2018 using the supplied analytical inputs.
3. **LULC change:** global and six-zone changes are quantified for 2013–2015 and 2015–2017.
4. **Integrated analysis:** LULC changes are related to logarithmic water-quality changes (LRC) using Pearson, Spearman and partial correlations, including Benjamini–Hochberg adjustment and exact/one-year-lagged scenarios.

## Repository structure

```text
code/                 Executable GEE scripts and Jupyter notebooks
data/                 Geospatial, training/validation, reflectance and WQ inputs
derived_data/         Canonical LULC rasters, zonal rasters, LULC-change tables and WQ predictions
results/               Model diagnostics, correlation tables and selected figures
docs/                  Reproduction guide, data dictionary, inventory and validation reports
```

## Reproducibility status

The portable analytical workflows were tested against the archived outputs used during development:

- Water-quality models: **9/9 PASS**.
- LULC-change analyses: **14/14 PASS**, with exact numerical agreement.
- Integrated LULC–water-quality correlation workflow: **PASS**, with agreement within floating-point precision.

Details are in `docs/reproducibility_validation.md`, `docs/lulc_change_validation.md`, and `docs/correlation_validation.md`.

## Quick start

Create a Python 3 environment and install the validated package versions:

```bash
pip install -r requirements.txt
```

Then follow `docs/reproduction_guide.md`. The Python notebooks use repository-relative paths and do not require the author's Google Drive.

To run the LULC classification workflow, upload the supplied GeoJSON training/validation and study-area files to your own Google Earth Engine project and update the clearly marked asset placeholders in `code/gee/01_LULC_2013.js`, `02_LULC_2015.js`, and `03_LULC_2017.js`. Classification exports are standardized to 30 m in EPSG:32613. The canonical LULC rasters used by the validated downstream analyses are supplied in `derived_data/lulc/`.

## Terminology

The repository documentation uses **TOC**, **TDS**, and **Chl-a**. Some preserved source files or internal worksheet/variable names use legacy labels such as `Cha-a`; these are retained where changing them could affect compatibility with the validated notebooks.

## Author and affiliation

**Juan Gabriel Loaiza**  
Universidad Autónoma de Sinaloa (UAS), Mexico


## Citation

Citation metadata are provided in `CITATION.cff`. Please cite this reproducibility package together with the associated article when applicable.

## License

Code is released under the MIT License (`LICENSE_CODE`). Data and documentation are released under Creative Commons Attribution 4.0 International (`LICENSE_DATA`). Third-party source datasets remain subject to their original providers' terms.
