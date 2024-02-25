import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const teamApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const teams = await db.teamStore.getAllTeams();
        return teams;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const team = await db.teamStore.getTeamById(request.params.id);
        if (!team) {
          return Boom.notFound("No Team with this id");
        }
        return team;
      } catch (err) {
        return Boom.serverUnavailable("No Team with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const team = request.payload;
        const newTeam = await db.teamStore.addTeam(team);
        if (newTeam) {
          return h.response(newTeam).code(201);
        }
        return Boom.badImplementation("error creating team");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const team = await db.teamStore.getTeamById(request.params.id);
        if (!team) {
          return Boom.notFound("No Team with this id");
        }
        await db.teamStore.deleteTeamById(team._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Team with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.teamStore.deleteAllTeams();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
