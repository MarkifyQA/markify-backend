import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { markifyService } from "./markify-service.js";
import { testUser, testTeam, testTeams, testEmployees, testEmployee, testUserCredentials, testScorecard, testResult } from "../fixtures.js";

suite("Result API tests", () => {
  let user = null;
  let team = null;
  let employee = null;
  let scorecard = null;
  let result = null;

  setup(async () => {
    await markifyService.clearAuth();
    user = await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    await markifyService.deleteAllTeams();
    await markifyService.deleteAllEmployees();
    await markifyService.deleteAllUsers();
    user = await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    testTeam.userid = user._id;
    team = await markifyService.createTeam(testTeam);
    testScorecard.teamId = team._id;
    scorecard = await markifyService.createScorecard(team._id, testScorecard);
    employee = await markifyService.createEmployee(team._id, testEmployee);
    testResult.employeeId = employee._id;
    testResult.teamId = team._id;
    testResult.evaluatorId = user._id;
    testResult.scorecardId = scorecard._id;
    result = await markifyService.createResult(testResult);
  });

  teardown(async () => {});

  test("create result", async () => {
    assertSubset(testResult, result);
  });

  test("get result", async () => {
    const returnedResult = await markifyService.getResult(result._id);
    assert.deepEqual(result, returnedResult);
  });

  test("get results by team", async () => {
    const returnedResults = await markifyService.getResultsByTeam(team._id);
    assert.isArray(returnedResults, "The response should be an array");
    assert.deepEqual(returnedResults[0], result);
  });

  test("delete a result", async () => {
    const response = await markifyService.deleteResult(result._id);
    assert.equal(response.status, 204);
    try {
      const returnedResult = await markifyService.getResult(result._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No result with this id", "Incorrect Response Message");
    }
  });
});
