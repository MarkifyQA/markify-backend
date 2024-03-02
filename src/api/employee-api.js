import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { EmployeeArraySpec, EmployeeSpec, EmployeeSpecPlus, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";

export const employeeApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const employees = await db.employeeStore.getAllEmployees();
        return employees;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: EmployeeArraySpec, failAction: validationError },
    description: "Get all employees",
    notes: "Returns all employees",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const employee = await db.employeeStore.getEmployeeById(request.params.id);
        if (!employee) {
          return Boom.notFound("No Employee with this id");
        }
        return employee;
      } catch (err) {
        return Boom.serverUnavailable("No Employee with this id");
      }
    },
    tags: ["api"],
    description: "Find an employee",
    notes: "Returns an employee",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: EmployeeSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const employee = request.payload;
        const newEmployee = await db.employeeStore.addEmployee(request.params.id, employee);
        if (newEmployee) {
          return h.response(newEmployee).code(201);
        }
        return Boom.badImplementation("error creating employee");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an employee",
    notes: "Returns the newly created employee",
    validate: { payload: EmployeeSpec },
    response: { schema: EmployeeSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const employee = await db.employeeStore.getEmployeeById(request.params.id);
        if (!employee) {
          return Boom.notFound("No Employee with this id");
        }
        await db.employeeStore.deleteEmployee(employee._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Employee with this id");
      }
    },
    tags: ["api"],
    description: "Delete an employee",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.employeeStore.deleteAllEmployees();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all employees",
  },
};
