import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUser, testUsers, testTeam, testTeams, testEmployee, testEmployees } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Employee Model tests", () => {
  let testTeamList = null;

  setup(async () => {
    db.init("mongo");
    await db.teamStore.deleteAllTeams();
    await db.employeeStore.deleteAllEmployees();
    testTeamList = await db.teamStore.addTeam(testTeam);
    for (let i = 0; i < testEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testEmployees[i] = await db.employeeStore.addEmployee(testTeamList._id, testEmployees[i]);
    }
  });

  test("create single employee", async () => {
    const testTeamList = await db.teamStore.addTeam(testTeam);
    const employee = await db.employeeStore.addEmployee(testTeamList._id, testEmployee);
    assert.isNotNull(employee._id);
    assertSubset(testEmployee, employee);
  });

  test("get multiple employees", async () => {
    const employees = await db.employeeStore.getEmployeesByTeamId(testTeamList._id);
    assert.equal(employees.length, testEmployees.length);
  });

  test("delete all employees", async () => {
    const employees = await db.employeeStore.getAllEmployees();
    assert.equal(testEmployees.length, employees.length);
    await db.employeeStore.deleteAllEmployees();
    const newEmployees = await db.employeeStore.getAllEmployees();
    assert.equal(0, newEmployees.length);
  });

  test("get a employee - success", async () => {
    const testTeamList = await db.teamStore.addTeam(testTeam);
    const employee = await db.employeeStore.addEmployee(testTeamList._id, testEmployee);
    const newEmployee = await db.employeeStore.getEmployeeById(employee._id);
    assertSubset(testEmployee, newEmployee);
  });

  test("delete One Employee - success", async () => {
    await db.employeeStore.deleteEmployee(testEmployees[0]._id);
    const employees = await db.employeeStore.getAllEmployees();
    assert.equal(employees.length, testTeams.length - 1);
    const deletedEmployee = await db.employeeStore.getEmployeeById(testEmployees[0]._id);
    assert.isNull(deletedEmployee);
  });

  test("get a employee - bad params", async () => {
    assert.isNull(await db.employeeStore.getEmployeeById(""));
    assert.isNull(await db.employeeStore.getEmployeeById());
  });

  test("delete one employee - fail", async () => {
    await db.employeeStore.deleteEmployee("bad-id");
    const employees = await db.employeeStore.getAllEmployees();
    assert.equal(employees.length, testTeams.length);
  });
});
