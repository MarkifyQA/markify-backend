import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { teamController } from "./controllers/team-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addTeam", config: dashboardController.addTeam },

  { method: "GET", path: "/team/{id}", config: teamController.index },
  { method: "POST", path: "/team/{id}/addemployee", config: teamController.addEmployee },

  { method: "GET", path: "/dashboard/deleteteam/{id}", config: dashboardController.deleteTeam },
  { method: "GET", path: "/team/{id}/deleteemployee/{employeeid}", config: teamController.deleteEmployee },
];
