import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { EmployeeArraySpec, EmployeeSpec, EmployeeSpecPlus, IdSpec, ScorecardArraySpec, ScorecardSpec, ScorecardSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const scorecardApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const scorecards = await db.scorecardStore.getAllScorecards();
        return scorecards;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ScorecardArraySpec, failAction: validationError },
    description: "Get all Scorecards",
    notes: "Returns all scorecards",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const scorecard = await db.scorecardStore.getScorecardById(request.params.id);
        if (!scorecard) {
          return Boom.notFound("No scorecard with this id");
        }
        return scorecard;
      } catch (err) {
        return Boom.serverUnavailable("No scorecard with this id");
      }
    },
    tags: ["api"],
    description: "Find a scorecard",
    notes: "Returns a scorecard",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ScorecardSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const scorecard = request.payload;
        const newScorecard = await db.scorecardStore.addScorecard(request.params.id, scorecard);
        if (newScorecard) {
          return h.response(newScorecard).code(201);
        }
        return Boom.badImplementation("error creating scorecard");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a scorecard",
    notes: "Returns the newly created scorecard",
    validate: { payload: ScorecardSpec },
    response: { schema: ScorecardSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const scorecard = await db.scorecardStore.getScorecardById(request.params.id);
        if (!scorecard) {
          return Boom.notFound("No Scorecard with this id");
        }
        await db.scorecardStore.deleteScorecard(scorecard._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No scorecard with this id");
      }
    },
    tags: ["api"],
    description: "Delete a scorecard",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
