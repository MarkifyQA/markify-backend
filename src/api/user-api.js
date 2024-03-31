import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { db } from "../models/db.js";
import { IdSpec, JwtAuth, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        const isValid = await bcrypt.compare(request.payload.password, user.password);
        if (!isValid) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate  a User",
    notes: "If user has valid email/password, create and return a JWT token",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  findByCompany: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const companyId = loggedInUser.companyId;
        const users = await db.userStore.getUsersByCompanyId(companyId);
        if (!users) {
          return Boom.notFound("No Users with this company id");
        }
        return users;
      } catch (err) {
        return Boom.serverUnavailable("No Users with this company id");
      }
    },
    tags: ["api"],
    description: "Get all users for a company",
    notes: "Returns all user details for a company",
    response: { schema: UserArray, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  addUser: {
    auth: "jwt",
    handler: async function (request, h) {
      try {
        const newUserDetails = { ...request.payload };
        if (request.auth.isAuthenticated) {
          const loggedInUser = request.auth.credentials;
          newUserDetails.companyId = loggedInUser.companyId;
        }
        const user = await db.userStore.addUser(newUserDetails);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes all users",
    notes: "All users removed from Markify",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        await db.userStore.deleteUserById(user._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes a specific user",
    notes: "User deleted from Markify",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const userId = request.params.id;
        const updatedUser = request.payload;
        const user = await db.userStore.getUserById(userId);

        const loggedInUser = request.auth.credentials;
        if (user.companyId !== loggedInUser.companyId) {
          return Boom.forbidden("You do not have permission to update this user");
        }
        await db.userStore.updateUser(userId, updatedUser);
        return h.response({ success: true, message: "User updated successfully" }).code(200);
      } catch (err) {
        console.error(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a user",
    notes: "Updates user details",
    validate: {
      params: { id: IdSpec },
      payload: UserSpec,
      failAction: validationError,
    },
    response: { schema: UserSpecPlus, failAction: validationError },
  },
};
