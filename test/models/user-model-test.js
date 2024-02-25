import { assert } from "chai";
import { Types } from "mongoose";
import { db } from "../../src/models/db.js";
import { testUser, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

const { ObjectId } = Types;

suite("User API tests", () => {
  setup(async () => {
    db.init("mongo");
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  teardown(async () => {
    await db.userStore.deleteAll();
  });

  test("Create User", async () => {
    const newUser = await db.userStore.addUser(testUser);
    assertSubset(testUser, newUser);
  });

  test("Get user - success", async () => {
    const user = await db.userStore.addUser(testUser);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("Get user - fail", async () => {
    const noUserWithId = await db.userStore.getUserById(new ObjectId().toString());
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserByEmail("not@user.com");
    assert.isNull(noUserWithEmail);
  });

  test("Get user - bad parameters", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("Delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("Delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });

  test("Delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});
