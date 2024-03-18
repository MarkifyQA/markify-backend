import { userApi } from "./api/user-api.js";
import { teamApi } from "./api/team-api.js";
import { employeeApi } from "./api/employee-api.js";
import { scorecardApi } from "./api/scorecard-api.js";
import { resultApi } from "./api/result-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/users", config: userApi.findByCompany },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "POST", path: "/api/users/user", config: userApi.addUser },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },

  { method: "POST", path: "/api/teams", config: teamApi.create },
  { method: "DELETE", path: "/api/teams", config: teamApi.deleteAll },
  { method: "GET", path: "/api/teams", config: teamApi.findByCompany },
  { method: "GET", path: "/api/teams/{id}", config: teamApi.findOne },
  { method: "DELETE", path: "/api/teams/{id}", config: teamApi.deleteOne },

  { method: "GET", path: "/api/employees", config: employeeApi.findByCompany },
  { method: "GET", path: "/api/employees/{id}", config: employeeApi.findOne },
  { method: "POST", path: "/api/teams/{id}/employees", config: employeeApi.create },
  { method: "PUT", path: "/api/employees/{id}", config: employeeApi.update },
  { method: "DELETE", path: "/api/employees", config: employeeApi.deleteAll },
  { method: "DELETE", path: "/api/employees/{id}", config: employeeApi.deleteOne },

  { method: "GET", path: "/api/scorecards", config: scorecardApi.find },
  { method: "GET", path: "/api/scorecards/{id}", config: scorecardApi.findOne },
  { method: "GET", path: "/api/scorecards/team/{id}", config: scorecardApi.findByTeam },
  { method: "POST", path: "/api/teams/{id}/scorecards", config: scorecardApi.create },
  { method: "DELETE", path: "/api/scorecards/{id}", config: scorecardApi.deleteOne },

  { method: "GET", path: "/api/results", config: resultApi.findByCompany },
  { method: "GET", path: "/api/results/{id}", config: resultApi.findOne },
  { method: "GET", path: "/api/results/team/{id}", config: resultApi.findByTeam },
  { method: "POST", path: "/api/results", config: resultApi.create },
  { method: "DELETE", path: "/api/results/{id}", config: resultApi.deleteOne },
];
