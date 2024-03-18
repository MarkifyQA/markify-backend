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

  async getEmployeesByCompanyId(id) {
    if (id) {
      const employees = await Employee.find({ companyId: id }).lean();
      return employees;
    }
    return null;
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

  async updateEmployee(employeeId, updatedEmployee) {
    const employeeDoc = await Employee.findOne({ _id: employeeId });
    if (!employeeDoc) {
      throw new Error("Employee not found");
    }
    employeeDoc.firstName = updatedEmployee.firstName;
    employeeDoc.lastName = updatedEmployee.lastName;
    employeeDoc.email = updatedEmployee.email;
    employeeDoc.supervisor = updatedEmployee.supervisor;
    await employeeDoc.save();
  },
};
