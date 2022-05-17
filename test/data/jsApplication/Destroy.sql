--setuser 'amministrazione'

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[customuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[customuser]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[customgroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[customgroup]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[web_listredir]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].web_listredir
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[customusergroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[customusergroup]
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
