import { assert } from "chai";
import { markifyService } from "./markify-service.js";
import { testUser, testUserCredentials, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

const users = new Array(testUsers.length);
suite("User API tests", () => {
  setup(async () => {
    markifyService.clearAuth();
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    await markifyService.deleteAllUsers();
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await markifyService.addUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await markifyService.createUser(testUser);
    assertSubset(testUser, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await markifyService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await markifyService.deleteAllUsers();
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    returnedUsers = await markifyService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await markifyService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
      const returnedUser = await markifyService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await markifyService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await markifyService.deleteAllUsers();
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    try {
      const returnedUser = await markifyService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
