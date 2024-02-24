import { Employee } from "./employee.js";

export const employeeMongoStore = {
  async getAllEmployees() {
    const employees = await Employee.find().lean();
    return employees;
  },

  async addEmployee(teamId, employee) {
    employee.teamid = teamId;
    const newEmployee = new Employee(employee);
    const employeeObj = await newEmployee.save();
    return this.getEmployeeById(employeeObj._id);
  },

  async getEmployeesByTeamId(id) {
    const employees = await Employee.find({ teamid: id }).lean();
    return employees;
  },

  async getEmployeeById(id) {
    if (id) {
      const employee = await Employee.findOne({ _id: id }).lean();
      return employee;
    }
    return null;
  },

  async deleteEmployee(id) {
    try {
      await Employee.deleteOne({ _id: id });
    } catch (error) {
      console.error(error, error.stack);
    }
  },

  async deleteAllEmployees() {
    await Employee.deleteMany({});
  },

  async updateEmployee(employee, updatedEmployee) {
    const employeeDoc = await Employee.findOne({ _id: employee._id });
    employeeDoc.firstName = updatedEmployee.firstName;
    employeeDoc.lastName = updatedEmployee.lastName;
    employeeDoc.email = updatedEmployee.email;
    employeeDoc.password = updatedEmployee.password;
    employeeDoc.supervisor = updatedEmployee.supervisor;
    await employeeDoc.save();
  },
};
