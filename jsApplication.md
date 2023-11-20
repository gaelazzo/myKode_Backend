[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/jsApplication.it.md)

# jsApplication

`jsApplication` is the general prototype of the application at its highest level.

Let's examine some methods that can be used for customization.

## createConnectionPool

It is a class whose only method is `getDataAccess()`, which returns an instance of `jsConnectionPool`, a simple class that creates a `DataAccess` by invoking a method of [jsDbList](jsDbList.md) and adds it to a pool, which, in this case, is a simple list of connections.

When a connection (`jsPooledConnection`) is released (with the `release` method), it becomes available to be returned by subsequent calls to `getDataAccess()`.

If you wanted to implement a more sophisticated logic, such as always keeping a fixed number of connections open or permanently releasing unused connections after a certain period, you can create a class derived from `JsConnectionPool` and ensure that `createConnectionPool` returns an instance of it.

## getNoTokenFolders

Returns an object that has as many properties as there are folders to allow access to anonymous clients, not yet authenticated. It is used to add authentication middleware to all routes that require it.

## error

This is a route to which all errors are redirected. Any logging functionalities should be inserted here.

## releaseConnection

This route adds the close and finish events to the current request so that they can, when invoked, release the connection from the connection pool by invoking its `release` method.

## createEnvironment

Creates a `jsEnvironment` from an instance of `Identity`, a class declared in [jsToken](src/jsToken.md). It is the responsibility of the authentication process to create a valid `Identity`, a Token, and communicate it to the client so that it can make subsequent requests in the authenticated state.

An environment contains the session variables of a specific user and is cached when the session is created to speed up its subsequent interactions.

## createPostData

Creates a [PostData](PostData.md) class (or its derivative) to use for saving a DataSet. The created class must then be initialized with the `init` method.

This default method creates a `BusinessPostData` class, but it can be modified, for example, to not handle business logic and save data without any control because perhaps the data has already been checked elsewhere.

`createPostData` also sets the default class for optimistic locking, such as:

```js
new OptimisticLocking(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu'])
```

where the fields used for optimistic locking will be, respectively:

- for modification: lt, lu
- for creation: ct, cu, lt, lu

The stamp fields of the environment are ct and lt, and when the environment calculates them.

The `prepareForPosting` method of the `OptimisticLocking` class is used to calculate the locking fields whenever a DataRow needs to be saved to the database. The `prepareForPosting` method, in turn, invokes the `field(fieldName)` method of the [Environment](Environment.md) class for each field indicated in the configuration, respectively, for insertion or modification depending on the state of the row to be saved.

By default, the `Environment` class uses ct and lt as stamp fields, while the values of the cu and lu fields are set in the `createEnvironment` method of `jsApplication`, equal to the value `identity.name`. It is possible to customize this value.

## getDataSet

Creates a specific DataSet identified by `tableName` and `editType`. By default, it reads a JSON file from the ./client/dataset folder and deserializes it into a `jsDataSet`.

## getAnonymousEnvironment

Creates an anonymous environment based on an input `Identity`. By default, it simply creates a new environment through the constructor.

## getOrCreateContext

Creates a context based on the token, anonymous if the token is not present or is an anonymous token.

The context ([Context](Context.md)) is always created as anonymous, then during authentication, it recalculates the environment and marks the context as no longer anonymous. To do this, you can invoke the `_doLogin` method of the module routes/_authUtils.