import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { markifyService } from "./markify-service.js";
import { testUser, testTeam, testTeams, testEmployees, testEmployee, testUserCredentials, testScorecard } from "../fixtures.js";

suite("Scorecard API tests", () => {
  let user = null;
  let team = null;
  let scorecard = null;

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
    testScorecard.teamId = team._id;
    scorecard = await markifyService.createScorecard(team._id, testScorecard);
  });

  teardown(async () => {
    try {
      await markifyService.deleteScorecard(scorecard._id);
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        console.error("Error cleaning up scorecard:", error);
      }
    }
  });

  test("create scorecard", async () => {
    assertSubset(testScorecard, scorecard);
  });

  test("get scorecard", async () => {
    const returnedScorecard = await markifyService.getScorecard(scorecard._id);
    assert.deepEqual(scorecard, returnedScorecard);
  });

  test("get a scorecard - fail", async () => {
    try {
      const returnedScorecard = await markifyService.getScorecard("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No scorecard with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a scorecard - deleted scorecard", async () => {
    await markifyService.deleteScorecard(scorecard._id);
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    try {
      const returnedScore = await markifyService.getScorecard(scorecard._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No scorecard with this id");
    }
  });
});
