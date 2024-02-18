import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const team = await db.teamStore.getTeamById(request.params.id);
      const newEmployee = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        supervisor: request.payload.supervisor,
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
