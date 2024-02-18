import { v4 } from "uuid";

let employees = [];

export const employeeMemStore = {
  async getAllEmployees() {
    return employees;
  },

  async addEmployee(teamId, employee) {
    employee._id = v4();
    employee.teamid = teamId;
    employees.push(employee);
    return employee;
  },

  async getEmployeesByTeamId(id) {
    return employees.filter((employee) => employee.teamid === id);
  },

  async getEmployeeById(id) {
    return employees.find((employee) => employee._id === id);
  },

  async getTeamEmployees(teamId) {
    return employees.filter((employee) => employee.teamid === teamId);
  },

  async deleteEmployee(id) {
    const index = employees.findIndex((employee) => employee._id === id);
    employees.splice(index, 1);
  },

  async deleteAllEmployees() {
    employees = [];
  },

  async updateEmployee(employee, updatedEmployee) {
    employee.firstName = updatedEmployee.firstName;
    employee.lastName = updatedEmployee.lastName;
    employee.email = updatedEmployee.email;
    employee.supervisor = updatedEmployee.supervisor;
  },
};
