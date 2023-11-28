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

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[customuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[customuser]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [flowchartuser]
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
 drop table [DBO].[customgroupoperation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].flowchartuser
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customgroupoperation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customgroupoperation]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[menu]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[menu]
END

GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchart]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[flowchart]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_environment]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_environment]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_allowform]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_allowform]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_notable]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_notable]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[customer]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customer]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[seller]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[seller]
END
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP2]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP2]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP1]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP1]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[testSP3]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP3]
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[customerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[sellerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[sellerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[userenvironment]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[userenvironment]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[flowchartrestrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[flowchartrestrictedfunction]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[restrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[restrictedfunction]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[compute_roles]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_roles]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[audit]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[audit]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[auditparameter]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[auditparameter]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[auditcheck]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[auditcheck]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[auditcheckview]') and OBJECTPROPERTY(id, N'IsView') = 1)
BEGIN
 drop view [DBO].[auditcheckview]
END
GO


if exists (select * from dbo.sysobjects where id = object_id(N'[check_customuser_u_post]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
BEGIN
 drop procedure [DBO].[check_customuser_u_post]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[virtualuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[virtualuser]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registry]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registry]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[registryreference]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryreference]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[attach]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[attach]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[accmotive]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[accmotive]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[category]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[category]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[costoorario]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[costoorario]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[geo_city]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[geo_city]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[geo_nation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[geo_nation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[maritalstatus]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[maritalstatus]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registryclass]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryclass]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registryaddress]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryaddress]
END
GO



IF EXISTS(select * from sysobjects where id = object_id(N'[registrykind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registrykind]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[registrypaymethod]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registrypaymethod]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[residence]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[residence]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[timbratura]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[timbratura]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[title]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[title]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[menuweb]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[menuweb]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[mandate]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[mandate]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[mandatekind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[mandatekind]
END
GO
