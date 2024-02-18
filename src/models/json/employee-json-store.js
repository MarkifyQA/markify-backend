// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/employees.json"), { employees: [] });

export const employeeJsonStore = {
  async getAllEmployees() {
    await db.read();
    return db.data.employees;
  },

  async addEmployee(teamId, employee) {
    await db.read();
    employee._id = v4();
    employee.teamid = teamId;
    db.data.employees.push(employee);
    await db.write();
    return employee;
  },

  async getEmployeesByTeamId(id) {
    await db.read();
    return db.data.employees.filter((employee) => employee.teamid === id);
  },

  async getEmployeeById(id) {
    await db.read();
    return db.data.employees.find((employee) => employee._id === id);
  },

  async deleteEmployee(id) {
    await db.read();
    const index = db.data.employees.findIndex((employee) => employee._id === id);
    db.data.employees.splice(index, 1);
    await db.write();
  },

  async deleteAllEmployees() {
    db.data.employees = [];
    await db.write();
  },

  async updateEmployee(employee, updatedEmployee) {
    employee.title = updatedEmployee.title;
    employee.artist = updatedEmployee.artist;
    employee.duration = updatedEmployee.duration;
    await db.write();
  },
};
