--setuser 'amministrazione'

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[fin]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[fin]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[upb]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[upb]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[customuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[customuser]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[flowchartuser]
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

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[customusergroup]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customgroupoperation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[flowchartuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].flowchartuser
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[customgroupoperation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customgroupoperation]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[menu]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[menu]
END

GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[flowchart]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[flowchart]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[compute_environment]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_environment]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[compute_allowform]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_allowform]
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[compute_notable]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_notable]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[customer]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customer]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[seller]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[seller]
END
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[testSP2]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP2]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[testSP1]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP1]
GO
if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[testSP3]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[testSP3]
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[customerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[customerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[sellerkind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[sellerkind]
END
GO
IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[userenvironment]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[userenvironment]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[flowchartrestrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[flowchartrestrictedfunction]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[restrictedfunction]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[restrictedfunction]
END
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[compute_roles]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [DBO].[compute_roles]
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[audit]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[audit]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[auditparameter]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[auditparameter]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[auditcheck]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[auditcheck]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[auditcheckview]') and OBJECTPROPERTY(id, N'IsView') = 1)
BEGIN
 drop view [DBO].[auditcheckview]
END
GO


if exists (select * from dbo.sysobjects where id = object_id(N'[DBO].[check_customuser_u_post]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
BEGIN
 drop procedure [DBO].[check_customuser_u_post]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[virtualuser]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[virtualuser]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registry]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registry]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registryreference]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryreference]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[attach]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[attach]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[accmotive]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[accmotive]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[category]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[category]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[costoorario]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[costoorario]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[centralizedcategory]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[centralizedcategory]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[geo_city]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[geo_city]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[geo_nation]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[geo_nation]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[maritalstatus]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[maritalstatus]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registryclass]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryclass]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registryaddress]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registryaddress]
END
GO



IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registrykind]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registrykind]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registrypaymethod]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[registrypaymethod]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[residence]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[residence]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[timbratura]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[timbratura]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[title]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [DBO].[title]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[menuweb]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[menuweb]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[mandateview]') and OBJECTPROPERTY(id, N'IsView') = 1)
DROP VIEW [mandateview]
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


IF EXISTS(select * from sysobjects where id = object_id(N'[dbo].[mandatedetail]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
 drop table [dbo].[mandatedetail]
END
GO


IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[[registrydefaultview]]') and OBJECTPROPERTY(id, N'IsView') = 1)
BEGIN
 drop view [DBO].[registrydefaultview]
END
GO

IF EXISTS(select * from sysobjects where id = object_id(N'[DBO].[registrymainview]') and OBJECTPROPERTY(id, N'IsView') = 1)
BEGIN
 drop view [DBO].[registrymainview]
END
GO
