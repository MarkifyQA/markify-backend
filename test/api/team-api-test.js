import { assert } from "chai";
import { markifyService } from "./markify-service.js";
import { assertSubset } from "../test-utils.js";

import { testUser, testTeam, testTeams } from "../fixtures.js";

suite("Team API tests", () => {
  let user = null;

  setup(async () => {
    await markifyService.deleteAllTeams();
    await markifyService.deleteAllUsers();
    user = await markifyService.createUser(testUser);
    testTeam.userid = user._id;
  });

  teardown(async () => {});

  test("create team", async () => {
    const returnedTeam = await markifyService.createTeam(testTeam);
    assert.isNotNull(returnedTeam);
    assertSubset(testTeam, returnedTeam);
  });

  test("delete a team", async () => {
    const team = await markifyService.createTeam(testTeam);
    const response = await markifyService.deleteTeam(team._id);
    assert.equal(response.status, 204);
    try {
      const returnedTeam = await markifyService.getTeam(team.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Team with this id", "Incorrect Response Message");
    }
  });

  test("create multiple teams", async () => {
    for (let i = 0; i < testTeams.length; i += 1) {
      testTeams[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await markifyService.createTeam(testTeams[i]);
    }
    let returnedLists = await markifyService.getAllTeams();
    assert.equal(returnedLists.length, testTeams.length);
    await markifyService.deleteAllTeams();
    returnedLists = await markifyService.getAllTeams();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant team", async () => {
    try {
      const response = await markifyService.deleteTeam("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Team with this id", "Incorrect Response Message");
    }
  });
});
