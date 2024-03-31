import { db } from "../models/db.js";
import { EmployeeSpec } from "../models/joi-schemas.js";

export const teamController = {
  index: {
    handler: async function (request, h) {
      const team = await db.teamStore.getTeamById(request.params.id);
      const viewData = {
        title: "Team",
        team: team,
      };
      return h.view("team-view", viewData);
    },
  },

  addEmployee: {
    validate: {
      payload: EmployeeSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("team-view", { title: "Add employee error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const team = await db.teamStore.getTeamById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const newEmployee = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        supervisor: request.payload.supervisor,
        companyId: loggedInUser.companyId,
      };
      await db.employeeStore.addEmployee(team._id, newEmployee);
      return h.redirect(`/team/${team._id}`);
    },
  },

  deleteEmployee: {
    handler: async function (request, h) {
      const team = await db.teamStore.getTeamById(request.params.id);
      await db.employeeStore.deleteEmployee(request.params.employeeid);
      return h.redirect(`/team/${team._id}`);
    },
  },
};
