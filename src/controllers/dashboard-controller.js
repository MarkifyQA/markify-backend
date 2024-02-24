import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const teams = await db.teamStore.getUserTeams(loggedInUser._id);
      const viewData = {
        title: "Markify Dashboard",
        user: loggedInUser,
        teams: teams,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addTeam: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newTeam = {
        userid: loggedInUser._id,
        companyId: loggedInUser.companyId,
        teamName: request.payload.teamName,
      };
      await db.teamStore.addTeam(newTeam);
      return h.redirect("/dashboard");
    },
  },

  deleteTeam: {
    handler: async function (request, h) {
      const team = await db.teamStore.getTeamById(request.params.id);
      await db.teamStore.deleteTeamById(team._id);
      return h.redirect("/dashboard");
    },
  },
};
