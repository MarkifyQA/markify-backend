import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("jdoe@email.com").required(),
    password: Joi.string()
      .example("Password123")
      .regex(/^[a-zA-Z0-9'@£$%^&*()?/. ]{8,}$/)
      .required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string()
    .example("John")
    .regex(/^[a-zA-Z' ]{2,}$/)
    .required(),
  lastName: Joi.string()
    .example("Doe")
    .regex(/^[a-zA-Z' ]{2,}$/)
    .required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec.example("65ff2e4b630802d7b89229d5"),
  companyId: IdSpec.example("0802d65ff2e48922b637b9d5"),
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const EmployeeSpec = Joi.object()
  .keys({
    firstName: Joi.string()
      .required()
      .regex(/^[a-zA-Z' ]{2,}$/)
      .example("Jane"),
    lastName: Joi.string()
      .required()
      .regex(/^[a-zA-Z' ]{2,}$/)
      .example("Doe"),
    email: Joi.string().email().required().example("jane@doe.com"),
    supervisor: Joi.string()
      .required()
      .regex(/^[a-zA-Z' ]{2,}$/)
      .example("James McEvoy"),
  })
  .label("Employee");

export const EmployeeSpecPlus = EmployeeSpec.keys({
  _id: IdSpec.example("f7b082e48b6d65f3922029d5"),
  __v: Joi.number(),
  companyId: IdSpec.example("0802d65ff2e48922b637b9d5"),
  teamid: IdSpec.example("22b6370802d65ff2e489b9d5"),
}).label("EmployeePlus");

export const EmployeeArraySpec = Joi.array().items(EmployeeSpecPlus).label("EmployeeArray");

export const TeamSpec = Joi.object()
  .keys({
    teamName: Joi.string()
      .example("Customer Service")
      .required()
      .regex(/^[a-zA-Z0-9'@£$%^&*()? ]{2,}$/),
    companyId: IdSpec.example("0802d65ff2e48922b637b9d5"),
    userid: IdSpec.example("08ff2e652b637b489202d9d5"),
    employees: EmployeeArraySpec,
  })
  .label("Team");

export const TeamSpecPlus = TeamSpec.keys({
  _id: IdSpec.example("0802d65ff2e48922b637b9d5"),
  __v: Joi.number(),
}).label("TeamSpecPlus");

export const TeamArraySpec = Joi.array().items(TeamSpecPlus).label("TeamArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const QuestionSpec = Joi.object({
  text: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9'@£$%^&*()? ]{2,}$/)
    .example("Has the agent used the right script?"),
  answers: Joi.array().items(Joi.string().valid("Yes", "No")),
  score: Joi.number().integer().required().example(10),
}).label("Question");

export const QuestionSpecPlus = QuestionSpec.keys({
  _id: IdSpec.example("080e48922b632d65ff27b9d5"),
  __v: Joi.number(),
});

export const QuestionArraySpec = Joi.array().items(QuestionSpecPlus).label("QuestionArray");

export const ScorecardSpec = Joi.object({
  title: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9'@£$%^&*()? ]{2,}$/),
  teamId: IdSpec.example("0802d65ff2e48922b637b9d5"),
  questions: QuestionArraySpec,
}).label("Scorecard");

export const ScorecardSpecPlus = ScorecardSpec.keys({
  _id: IdSpec.example("5f02d62b63f2e4892087b9d5"),
  __v: Joi.number(),
}).label("ScorecardSpecPlus");

export const ScorecardArraySpec = Joi.array().items(ScorecardSpecPlus).label("ScorecardArray");

export const AnswerSpec = Joi.object({
  text: Joi.string().required().example("Yes"),
}).label("Answers");

export const AnswerSpecPlus = AnswerSpec.keys({
  _id: IdSpec.example("22b630802d65ff2e4897b9d5"),
  __v: Joi.number(),
});

export const AnswerArraySpec = Joi.array().items(AnswerSpecPlus).label("AnswerArray");

export const ResultSpec = Joi.object({
  employeeId: IdSpec.example("0802d65ff2e48922b637b9d5"),
  teamId: IdSpec.example("2d65ff29080e48922b637bd5"),
  scorecardId: IdSpec.example("5ff29080e42d68922b637bd5"),
  evaluatorId: IdSpec.example("0e482d65ff2908922b637bd5"),
  companyId: IdSpec.example("bd52d65ff29080e48922b637"),
  answers: AnswerArraySpec,
  totalScore: Joi.number().example(100),
  sumScore: Joi.number().example(60),
  percentScore: Joi.number().example(60),
  reference: Joi.string().example("123456"),
}).label("Result");

export const ResultSpecPlus = ResultSpec.keys({
  _id: IdSpec.example("ff2892d6529080e42b637bd5"),
  __v: Joi.number(),
}).label("ResultSpecPlus");

export const ResultArraySpec = Joi.array().items(ResultSpecPlus).label("ResultArray");
