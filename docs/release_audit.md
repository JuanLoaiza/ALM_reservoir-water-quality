# v1.0.0 release audit

## Completed checks

- All portable Python notebooks use repository-relative paths; executable notebook code contains no Google Drive mounting or `/content/drive`/`MyDrive` paths.
- The three Google Earth Engine scripts use standardized 30 m exports in EPSG:32613 and clearly marked user-supplied Earth Engine asset variables.
- Local Windows/OneDrive path metadata were removed from public GeoJSON and reflectance CSV files without changing geometries or scientific values.
- Temporary zonal rasters generated during validation were removed; the 18 canonical validated zonal rasters were retained.
- Duplicate legacy-named LULC-change workbooks were removed; normalized workbooks used by the portable correlation notebook were retained.
- README, reproduction guide, data dictionary, requirements, licenses and citation metadata were reviewed for public release.
- SHA-256 checksums are provided in `SHA256SUMS.txt`.

## Reproducibility evidence

- Water-quality models: **9/9 PASS**.
- LULC-change analyses: **14/14 PASS**.
- Integrated correlation analysis: **PASS** within floating-point precision.

## Reproducibility scope

Numerical validation applies to the portable Python workflows using the supplied canonical analytical inputs and LULC rasters. The Google Earth Engine materials document and enable execution of the LULC classification workflow; the canonical LULC rasters used in the validated downstream analyses are included in the release.

## Licensing scope

Code is distributed under the MIT License (`LICENSE_CODE`). Original data and documentation in this package are distributed under CC BY 4.0 (`LICENSE_DATA`). Third-party datasets and services remain subject to their original providers' terms.
