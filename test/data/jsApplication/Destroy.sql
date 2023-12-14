--setuser 'amministrazione'


IF EXISTS(select * from sysobjects where id = object_id(N'[fin]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [fin]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[upb]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [upb]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customuser]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [flowchartuser]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[customgroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customgroup]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[web_listredir]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table web_listredir
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customusergroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customusergroup]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customusergroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customgroupoperation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table flowchartuser
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customgroupoperation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customgroupoperation]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[menu]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [menu]
END

GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchart]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [flowchart]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_environment]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [compute_environment]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_allowform]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [compute_allowform]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_notable]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [compute_notable]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customer]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customer]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[seller]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [seller]
END
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP2]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [testSP2]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP1]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [testSP1]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP3]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [testSP3]
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[customerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [customerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[sellerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [sellerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[userenvironment]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [userenvironment]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartrestrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [flowchartrestrictedfunction]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[restrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [restrictedfunction]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_roles]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [compute_roles]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[audit]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [audit]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[auditparameter]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [auditparameter]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[auditcheck]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [auditcheck]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[auditcheckview]') and OBJECTPROPERTY(id, N'IsView') = 1)
BEGIN
 drop view [auditcheckview]
END
GO


if exists (select * from dbo.sysobjects where id = object_id(N'[check_customuser_u_post]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
BEGIN
 drop procedure [check_customuser_u_post]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[virtualuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [virtualuser]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registry]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registry]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[registryreference]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registryreference]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[attach]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [attach]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[accmotive]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [accmotive]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[category]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [category]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[costoorario]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [costoorario]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[geo_city]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [geo_city]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[geo_nation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [geo_nation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[maritalstatus]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [maritalstatus]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registryclass]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registryclass]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registryaddress]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registryaddress]
END
GO



IF EXISTS(select * from sysobjects where id = object_id(N'[registrykind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registrykind]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registrypaymethod]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [registrypaymethod]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[residence]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [residence]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[timbratura]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [timbratura]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[title]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [title]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[menuweb]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [menuweb]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[mandateview]') and OBJECTPROPERTY(id, N'IsView') = 1)
DROP VIEW [mandateview]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[mandate]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [mandate]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[mandatekind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [mandatekind]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[mandatedetail]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [mandatedetail]
END
GO

