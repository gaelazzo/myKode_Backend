[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Environment.it.md)

# Environment

`Environment` is a class designed to contain user environment variables.

These variables are accessible through the functions `sys(fieldName, value)` and `usr(fieldName, value)`. If the second parameter is missing, it is assumed that you are reading the value; otherwise, you are setting it (jQuery-style).

There is also the method `field(fieldName)`, invoked in the saving process by the `OptimisticLocking` class. By default, for "stamp" fields (lt, ct), it returns the current date; otherwise, it returns the value set for that field (lu, cu), usually set in the application when the environment is created.

The `Environment` class is calculated when the user authenticates, using the `calcUserEnvironment` method. However, before invoking `calcUserEnvironment`, it is necessary to set the values for `sys("idcustomuser")` and optionally `sys("idflowchart")` and `sys("ndetail")`. This method essentially calls the stored procedure `compute_environment` and copies the values returned (two tables) from it to the `sys` and `usr` dictionaries.

The values returned by `calcUserEnvironment` are rows with three columns: `mustquote` (S/N), `variablename`, `value`. `mustquote` is 'S' if it is necessary to quote the value with single quotes in the `value` column, but this only applies to the `usr` table.

It is worth noting that in the calculation of the `Environment`, for strings returned by the stored procedure that contain substrings of the form `<%sys[fieldName]%>` or `<%usr[fieldName]%>`, these are replaced with the values of `sys(fieldName)` or `usr(fieldName)` available at the moment, recursively until there are no more such substrings.




