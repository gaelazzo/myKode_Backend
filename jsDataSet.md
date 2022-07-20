#jsDataSet
.Net DataSet made available for javaScript (and much more)

# Summary 
A **DataSet** is a collection of DataTables and relations between tables (DataRelation).

## DataRelation
A **DataRelation** is an object that allow to navigate from a row in a table to other rows in same table or other tables matching the value of parent fields in the parent table with child fields in the child table.

## DataTable
A **DataTable** is a set of DataRow(s), and can have a primary key. Special functions are available in order to manage autoincrement columns, 
 default values to give when a new row is created.
Some methods of DataTable are:
- **acceptChanges**(): calls acceptChanges for every row of the table, so the changes are made permanent and the state of 
 the table becomes DataRowState.unchanged
- **rejectChanges**(): calls rejectChanges for every row of the table, so the changes are reverted and the state of
  the table becomes DataRowState.unchanged
- **hasChanges**(): returns true if any rows in the table is not in the unchanged state
- **newTable**({string}tableName) creates a table 
- **addTable**({DataTable}t ) adds a table to the DataSet
- **newRelation**() creates a new DataRelation in the DataSet (see details in the jsDoc)
- **select**({sqlFun}filter) searchs rows in the table that satisfy a condition. Deleted rows are skipped.
- **selectAll**({sqlFun}filter) searchs rows in the table that satisfy a condition. Deleted rows are included.
- **key**() gets/sets primary key of the table
- **clear**() removes completely all rows from the table, that becomes unchanged
- **detach**(obj) removes a row from the table 
- **add**(obj) adds an object to the table and set the state of the row as DataRowState.added
- **load**(obj) loads an object in the table and set the state of the row as DataRowState.unchanged
- **getChanges**(): returns all modified/deleted/added objects in the table

## DataRow
A **DataRow** is a plain object attached to a ghost-class that observes it. So given a plain object o, calling r = new DataRow(o) creates a
DataRow object that can be added to a table. 

The object becomes an "objectRow", that is linked to the DataRow. Invoking o.getRow() we obtain the linked DataRow

The original object o can be modified at pleasure, and the linked DataRow r has many
useful functions like:

- **del**()  to mark the row "deleted"
- **detach** ()  to discard the row losing all change
- **rejectChanges**() to revert any changes made to the object since the last acceptChanges() call. A deleted row 
 becomes again unchanged, and so any modified row. A new row (state=added) returns detached.
- **acceptChanges**() makes changes to the row permanent and the state of the row becomes unchanged. If the state of  
 the row was "deleted", it becomes "detached" and the row is removed from the table.
- **originalRow**() return the values of the original row
- **getParentRows**(relName), **getParentsInTable**(parentTableName), **getChildsInTable**(childTableName), 
  **getChildRows**(relName)  are useful to navigate from a row to others related in the same DataSet.


A DataRow has a **status** whose value can be one of DataRowState.**added**, DataRowState.**unchanged**, DataRowState.**modified**,
 DataRowState.**deleted**, DataRowState.**detached**.

It is possible to access old/new values of a DataRow when it has been modified, with the function **getValue**(fieldName, dataRowVersion)
 where dataRowVersion can be DataRowVersion.original, or the default DataRowVersion.current. 

If DataRowVersion.original is specified, it returns the original value of the field if it has been modified after the last
 acceptChanges or RejectChanges.

It's also possible to accept/reject changes on the entire DataTable or DataSet all at once, merging changes of a DataSet into another one
(see **importData**, **mergeAsPatch** , **mergeAsPost**, **mergeAsPut**). 

A DataSet can also be serialized/deserialized into a plain object 
(that includes also all original/modified values of all rows).  The serialized version can optionally contain also the structure of 
 the DataSet (key, relations, defaults, orderings, autoincrement columns and so on).

It's also possible to delete a row with all its children (with cascading effect) from a DataSet, with the function **cascadeDelete**(row).


## objectRow and Proxy
Object stored in a DataTable are "objectRow", that is, an object enveloped in a proxy, which keeps track of all
modification made, in order to be able to retrieve both current values and original values.

An objectRow is obtained by a plain object with the constructor of the class DataRow.
The DataRow adds a function getRow() to the plain object, which returns the linked DataRow itself.

So if we have a DataRow DR, DR.current is a proxy that envelopes the object o it is linked to,
while o.getRow() returns DR.


A full list of available function is available in the auto-generated yui doc.

Full details are available [here](docs/module-DataSet.html)

Let's see some DataSet examples:
    
    const dsSpace = require('../../client/components/metadata/jsDataSet'); 
    const q = require('../../client/components/metadata/jsDataQuery');
    let ds = new dsSpace.DataSet('temp');  
    t = ds.newTable('tab');
    const o1 = {a: 1, b: 2};
    t.add(o1); 
    expect(o1.getRow().state).toBe(dsSpace.dataRowState.added);

when a plain object is added to a DataTable it is enriched with  a DataRow object and a method getRow() that returns it.

It is possible to operate with the original objects and the state of the linked DataRow will stay automatically in sync.

Extensive unit test are available [here](test/client/jsDataSetSpec.js)

Example of rejectChanges:

    t = ds.newTable('tt'); 
    p = t.load({a: 1, b: 2, c: 'a'});  //load o in the table in the state of unchanged, p is the DataRow
    o = p.current; //o is the current value of the Row
    o.a = 2
    expect(o.a).toBe(2);
    expect(o.getRow().originalRow().a).toBe(1); //original value of the field is 1
    o.getRow().rejectChanges(); // also o.$rejectChanges;
    expect(o.a).toBe(1);

Select:

    expect(t.select(q.eq('a', 1)).length).toBe(1);  //select selects a set of rows given a filter



  


![](https://travis-ci.org/gaelazzo/jsDataSet.svg?branch=master)

