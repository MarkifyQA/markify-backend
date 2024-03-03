import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("jdoe@email.com").required(),
    password: Joi.string().example("Password123").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("John").required(),
  lastName: Joi.string().example("Doe").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  companyId: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const EmployeeSpec = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    supervisor: Joi.string().required(),
  })
  .label("Employee");

export const EmployeeSpecPlus = EmployeeSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  companyId: IdSpec,
  teamid: IdSpec,
}).label("EmployeePlus");

export const EmployeeArraySpec = Joi.array().items(EmployeeSpecPlus).label("EmployeeArray");

export const TeamSpec = Joi.object()
  .keys({
    teamName: Joi.string().example("Customer Service").required(),
    companyId: IdSpec,
    userid: IdSpec,
    employees: EmployeeArraySpec,
  })
  .label("Team");

export const TeamSpecPlus = TeamSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TeamSpecPlus");

export const TeamArraySpec = Joi.array().items(TeamSpecPlus).label("TeamArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
