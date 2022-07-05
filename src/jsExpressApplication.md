## Functions

<dl>
<dt><a href="#createExpressApplication">createExpressApplication()</a> ⇒ <code>Express</code></dt>
<dd></dd>
<dt><a href="#createServicesRoutes">createServicesRoutes(router, folder,, routePrefix,)</a></dt>
<dd><p>Adds all routes in a folder to a router. Convention is that every file must expose a router itself</p>
</dd>
</dl>

<a name="createExpressApplication"></a>

## createExpressApplication() ⇒ <code>Express</code>
**Kind**: global function  
<a name="createServicesRoutes"></a>

## createServicesRoutes(router, folder,, routePrefix,)
Adds all routes in a folder to a router. Convention is that every file must expose a router itself

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| router | <code>Router</code> |  |
| folder, | <code>string</code> | ex. "routes/data/" |
| routePrefix, | <code>string</code> | ex. "/data/" |

