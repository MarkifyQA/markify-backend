import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { markifyService } from "./markify-service.js";
import { testUser, testTeam, testTeams, testEmployees, testEmployee, testUserCredentials } from "../fixtures.js";

suite("Employee API tests", () => {
  let user = null;
  let team = null;

  setup(async () => {
    await markifyService.clearAuth();
    user = await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    await markifyService.deleteAllTeams();
    await markifyService.deleteAllUsers();
    user = await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    testTeam.userid = user._id;
    team = await markifyService.createTeam(testTeam);
  });

  teardown(async () => {
    await markifyService.deleteAllEmployees();
  });

  test("create employee", async () => {
    const returnedEmployee = await markifyService.createEmployee(team._id, testEmployee);
    assertSubset(testEmployee, returnedEmployee);
  });

  test("create Multiple employees", async () => {
    for (let i = 0; i < testEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await markifyService.createEmployee(team._id, testEmployees[i]);
    }
    const returnedEmployees = await markifyService.getAllEmployees();
    assert.equal(returnedEmployees.length, testEmployees.length);
    for (let i = 0; i < returnedEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const employee = await markifyService.getEmployee(returnedEmployees[i]._id);
      assertSubset(employee, returnedEmployees[i]);
    }
  });

  test("Delete EmployeeApi", async () => {
    for (let i = 0; i < testEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await markifyService.createEmployee(team._id, testEmployees[i]);
    }
    let returnedEmployees = await markifyService.getAllEmployees();
    assert.equal(returnedEmployees.length, testEmployees.length);
    for (let i = 0; i < returnedEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const employee = await markifyService.deleteEmployee(returnedEmployees[i]._id);
    }
    returnedEmployees = await markifyService.getAllEmployees();
    assert.equal(returnedEmployees.length, 0);
  });

  test("denormalised team", async () => {
    for (let i = 0; i < testEmployees.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await markifyService.createEmployee(team._id, testEmployees[i]);
    }
    const returnedTeam = await markifyService.getTeam(team._id);
    assert.equal(returnedTeam.employees.length, testEmployees.length);
    for (let i = 0; i < testEmployees.length; i += 1) {
      assertSubset(testEmployees[i], returnedTeam.employees[i]);
    }
  });
});
