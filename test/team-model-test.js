import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testTeams, testTeam } from "./fixtures.js";

suite("Team Model tests", () => {
  setup(async () => {
    db.init();
    for (let i = 0; i < testTeams.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTeams[i] = await db.teamStore.addTeam(testTeams[i]);
    }
  });

  teardown(async () => {
    await db.teamStore.deleteAllTeams();
  });

  test("Create a team", async () => {
    const team = await db.teamStore.addTeam(testTeam);
    assert.equal(testTeam, team);
    assert.isDefined(team._id);
  });

  test("delete all teams", async () => {
    let returnedTeams = await db.teamStore.getAllTeams();
    assert.equal(returnedTeams.length, 3);
    await db.teamStore.deleteAllTeams();
    returnedTeams = await db.teamStore.getAllTeams();
    assert.equal(returnedTeams.length, 0);
  });

  test("get a team - success", async () => {
    const team = await db.teamStore.addTeam(testTeam);
    const returnedTeam = await db.teamStore.getTeamById(team._id);
    assert.equal(testTeam, team);
  });

  test("delete One Team - success", async () => {
    const id = testTeams[0]._id;
    await db.teamStore.deleteTeamById(id);
    const returnedTeams = await db.teamStore.getAllTeams();
    assert.equal(returnedTeams.length, testTeams.length - 1);
    const deletedTeam = await db.teamStore.getTeamById(id);
    assert.isNull(deletedTeam);
  });

  test("get a team - bad params", async () => {
    assert.isNull(await db.teamStore.getTeamById(""));
    assert.isNull(await db.teamStore.getTeamById());
  });

  test("delete One Team - fail", async () => {
    await db.teamStore.deleteTeamById("bad-id");
    const allTeams = await db.teamStore.getAllTeams();
    assert.equal(testTeams.length, allTeams.length);
  });
});
