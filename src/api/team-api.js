import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, TeamArraySpec, TeamSpec, TeamSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const teamApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const teams = await db.teamStore.getAllTeams();
        return teams;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all teams",
    notes: "Returns details of all teams",
    response: { schema: TeamArraySpec, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const team = await db.teamStore.getTeamById(request.params.id);
        if (!team) {
          return Boom.notFound("No Team with this id");
        }
        return team;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get a specific team",
    notes: "Returns team details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TeamSpecPlus, failAction: validationError },
  },

  findByCompany: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const loggedInUser = request.auth.credentials;
        const companyId = loggedInUser.companyId;
        const teams = await db.teamStore.getTeamsByCompanyId(companyId);
        if (!teams) {
          return Boom.notFound("No teams with this company id");
        }
        return teams;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Find teams for a company",
    notes: "Returns a companys teams",
    response: { schema: TeamArraySpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const team = request.payload;
        team.companyId = loggedInUser.companyId;
        team.userid = loggedInUser._id;
        const newTeam = await db.teamStore.addTeam(team);
        if (newTeam) {
          return h.response(newTeam).code(201);
        }
        return Boom.badImplementation("error creating team");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Team",
    notes: "Returns the newly created team",
    validate: { payload: TeamSpec, failAction: validationError },
    response: { schema: TeamSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const team = await db.teamStore.getTeamById(request.params.id);
        if (!team) {
          return Boom.notFound("No Team with this id");
        }
        await db.teamStore.deleteTeamById(team._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete a team",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.teamStore.deleteAllTeams();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all teams",
  },
};
