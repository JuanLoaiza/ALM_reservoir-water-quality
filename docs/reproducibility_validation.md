# Reproducibility validation — Water-quality models

The nine portable water-quality notebooks were executed from the repository structure without Google Drive paths. Regenerated model-performance workbooks and prediction workbooks were compared sheet-by-sheet against the original outputs used to assemble the reproducibility package.

| Parameter | Period | Execution | Workbook structure | Numerical comparison | Maximum absolute difference | Status |
|---|---|---|---|---|---:|---|
| TOC | 2013–2014 | PASS | PASS | PASS | 3.86e-10 | PASS |
| TOC | 2015–2016 | PASS | PASS | PASS | 7.26e-11 | PASS |
| TOC | 2017–2018 | PASS | PASS | PASS | 2.47e-10 | PASS |
| TDS | 2013–2014 | PASS | PASS | PASS | 1.01e-07 | PASS |
| TDS | 2015–2016 | PASS | PASS | PASS | 2.19e-07 | PASS |
| TDS | 2017–2018 | PASS | PASS | PASS | 5.31e-08 | PASS |
| Chl-a | 2013–2014 | PASS | PASS | PASS | 2.58e-09 | PASS |
| Chl-a | 2015–2016 | PASS | PASS | PASS | 2.61e-11 | PASS |
| Chl-a | 2017–2018 | PASS | PASS | PASS | 2.00e-11 | PASS |

## Validation criteria

For each model, the notebook was executed from a clean notebook state using repository-relative paths. The regenerated `Resultados_BoxCox_*.xlsx` and `Predictions_new_points_*.xlsx` files were compared with the archived original outputs. Sheet names, dimensions, column names, non-numeric values, and missing-value patterns were required to match. Numeric values were compared by absolute difference.

The observed differences (maximum 2.19e-07 across all nine models) are at floating-point numerical precision relative to the modeled quantities and do not indicate a change in the analytical workflow or scientific results.

## Scope

This validation covers the nine TOC, TDS, and Chl-a water-quality modeling notebooks and their model-performance and prediction workbooks. LULC-change and integrated correlation validation are documented separately in this release.
