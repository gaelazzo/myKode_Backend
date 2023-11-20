[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Context.it.md)


# Context
Context is a class exposed by the jsDbList module, containing all the information gathered during the analysis of a request that can be used during the processing of the response.

The information includes:

- dbCode (string): code of the used database
- dbDescriptor ([DbDescriptor](DbDescriptor.md)): database descriptor
- createPostData (function): method that creates a PostData class with the necessary environment
- formatter ([SqlFormatter](src/jsSqlServerFormatter.md)): SqlFormatter associated with the database
- sqlConn ([Connection](src/jsSqlServerDriver.md)): physical connection to the database
- environment ([Environment](Environment.md)): connected user's environment
- dataAccess ([DataAccess](DataAccess.md)): generic database connection
- externalUser (string): a shortcut for the environment variable usr["externalUser"]
- security ([Security](Security.md))
- getDataInvoke ([GetDataInvoke](client/components/metadata/GetDataInvoke.md)): a class that can be used to read data from the database with a consistent interface, whether executing instructions on the server or client side
- getDataSet ([GetDataSet](client/components/metadata/GetDataSet.md)): a class that exposes methods to create a dataset (to be used only on the server side)
- getMeta ([GetMeta](client/components/metadata/GetMeta.md)): a class through which you can instantiate metadata related to a specific table

In routes, you can access the Context as follows:

```js
let ctx = req.app.locals.context;
```

where `req` is the client request. This information is associated by jsApplication with each request before sending it to the subsequent routes. Deallocation is automatically done through a specific route added by jsApplication, so there is no need to worry about it.

