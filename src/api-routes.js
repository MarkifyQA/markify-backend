import { userApi } from "./api/user-api.js";
import { teamApi } from "./api/team-api.js";
import { employeeApi } from "./api/employee-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },

  { method: "POST", path: "/api/teams", config: teamApi.create },
  { method: "DELETE", path: "/api/teams", config: teamApi.deleteAll },
  { method: "GET", path: "/api/teams", config: teamApi.find },
  { method: "GET", path: "/api/teams/{id}", config: teamApi.findOne },
  { method: "DELETE", path: "/api/teams/{id}", config: teamApi.deleteOne },

  { method: "GET", path: "/api/employees", config: employeeApi.find },
  { method: "GET", path: "/api/employees/{id}", config: employeeApi.findOne },
  { method: "POST", path: "/api/teams/{id}/employees", config: employeeApi.create },
  { method: "DELETE", path: "/api/employees", config: employeeApi.deleteAll },
  { method: "DELETE", path: "/api/employees/{id}", config: employeeApi.deleteOne },
];
