import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ResultArraySpec, ResultSpec, ResultSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const resultApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const results = await db.resultStore.getAllResults();
        return results;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ResultArraySpec, failAction: validationError },
    description: "Get all results",
    notes: "Returns all results",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const result = await db.resultStore.getResultById(request.params.id);
        if (!result) {
          return Boom.notFound("No result with this id");
        }
        return result;
      } catch (err) {
        return Boom.serverUnavailable("No result with this id");
      }
    },
    tags: ["api"],
    description: "Find a result",
    notes: "Returns a result",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ResultSpecPlus, failAction: validationError },
  },

  findByTeam: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const results = await db.resultStore.getResultsByTeamId(request.params.id);
        if (!results) {
          return Boom.notFound("No results with this team id");
        }
        return results;
      } catch (err) {
        return Boom.serverUnavailable("No results with this team id");
      }
    },
    tags: ["api"],
    description: "Find results for a team",
    notes: "Returns a teams results",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ResultArraySpec, failAction: validationError },
  },

  findByCompany: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const loggedInUser = request.auth.credentials;
        const companyId = loggedInUser.companyId;
        const results = await db.resultStore.getResultsByCompanyId(companyId);
        if (!results) {
          return Boom.notFound("No results with this company id");
        }
        return results;
      } catch (err) {
        return Boom.serverUnavailable("No results with this company id");
      }
    },
    tags: ["api"],
    description: "Find results for a company",
    notes: "Returns a companys scores",
    // validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ResultArraySpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const result = request.payload;
        result.evaluatorId = loggedInUser._id;
        result.companyId = loggedInUser.companyId;
        const newResult = await db.resultStore.addResult(result);
        if (newResult) {
          return h.response(newResult).code(201);
        }
        return Boom.badImplementation("error creating result");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a result",
    notes: "Returns the newly created result",
    validate: { payload: ResultSpec },
    response: { schema: ResultSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const result = await db.resultStore.getResultById(request.params.id);
        if (!result) {
          return Boom.notFound("No result with this id");
        }
        await db.resultStore.deleteResult(result._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No result with this id");
      }
    },
    tags: ["api"],
    description: "Delete a result",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
