# LULC change reproducibility validation

## Scope
The portable `04_LULC_change_analysis.ipynb` was executed from the repository structure without Google Drive paths. The analysis was validated against the archived outputs originally generated for the study.

## Canonical full-reservoir rasters
The canonical full-reservoir rasters supplied for 2013, 2015, and 2017 use EPSG:32613, 30 m pixel size, and dimensions of 1625 × 1277 pixels.

- `derived_data/lulc/LULC_2013.tif`
- `derived_data/lulc/LULC_2015.tif`
- `derived_data/lulc/LULC_2017.tif`

## Validation results
The two full-reservoir analyses and all twelve zonal analyses reproduce the archived Excel outputs exactly.

| Period | Spatial unit | Status | Maximum numerical difference |
|---|---|---|---:|
| 2013–2015 | Full reservoir | PASS | 0 |
| 2015–2017 | Full reservoir | PASS | 0 |
| 2013–2015 | Zone 1 | PASS | 0 |
| 2013–2015 | Zone 2 | PASS | 0 |
| 2013–2015 | Zone 3 | PASS | 0 |
| 2013–2015 | Zone 4 | PASS | 0 |
| 2013–2015 | Zone 5 | PASS | 0 |
| 2013–2015 | Zone 6 | PASS | 0 |
| 2015–2017 | Zone 1 | PASS | 0 |
| 2015–2017 | Zone 2 | PASS | 0 |
| 2015–2017 | Zone 3 | PASS | 0 |
| 2015–2017 | Zone 4 | PASS | 0 |
| 2015–2017 | Zone 5 | PASS | 0 |
| 2015–2017 | Zone 6 | PASS | 0 |

## Conclusion
**LULC change validation: 14/14 PASS.**

The verified full-reservoir rasters and the retained zonal rasters reproduce the archived scientific outputs exactly. No numerical values were altered to force agreement.
