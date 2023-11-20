[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Security.it.md)

# Security

[Security](src/jsSecurity.md) is a class responsible for collecting and providing security conditions for possible operations on tables. For each combination of table/operation, multiple conditions are possible, which collectively determine whether the user has the right to perform an operation.

The [SecurityProvider](src/jsSecurity.md#securitysecurityprovider) class reads rows from the customgroupoperation table of the database and decodes its content into the Security class. In particular, the textual fields allow and deny are converted into an [sqlFun](jsDataQuery.md), which is a function that, given a row, calculates a value, which will be true or false depending on whether the requested operation is permissible or not.

The customgroupoperation table has 3 fields that describe a security condition:
- defaultIsDeny: can have the value 'S' or 'N'. If 'S', the default is "deny all"; otherwise, it is "allow all."
- allowcondition: the condition for enabling the operation
- denycondition: the condition for denying the operation
  The three fields of a row combine in the following way:
- If defaultIsDeny is "S" and there is only allowcondition, only the rows identified by allowcondition will be enabled. If denycondition is also specified, the rows identified by denycondition will still be denied.
- If defaultIsDeny is "N" and there is only denycondition, only the rows identified by denycondition will be denied. If allowcondition is also specified, the rows identified by allowcondition will also be allowed.

In summary, if defaultIsDeny = 'S', the meaning of the triplet is allow and not deny; otherwise, it is not deny or allow.

All rows referring to the same combination of table/operation are logically OR-ed together. Therefore, if any of them authorizes the operation, it is considered authorized in the overall evaluation.

Each denycondition and allowcondition is a pseudo-SQL expression in which you can use:
- field names of the authorization object
- numeric or string constants
- SQL operators like like, between, in, not in
- "list" to create a list with what follows in parentheses
- arithmetic and comparison operators
- boolean operators and, or, not
- bitwise operators ~ & |

The result of the expression must be a boolean value.

For details on the capabilities of sqlFun, please refer to [jsDataQuery](jsDataQuery.md).

The Security class exposes the `canPost` method, which determines whether the implicit modification identified by a row based on its state and the value of its fields is permissible or not.

This method is invoked by the [PostData](PostData.md) class for each row object to be written to the database, and it cancels the transaction if the method returns false.

