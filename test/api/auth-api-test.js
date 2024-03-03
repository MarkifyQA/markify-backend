import { assert } from "chai";
import { markifyService } from "./markify-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testUser, testUserCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    markifyService.clearAuth();
    await markifyService.createUser(testUser);
    await markifyService.authenticate(testUserCredentials);
    await markifyService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await markifyService.createUser(testUser);
    const response = await markifyService.authenticate(testUserCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await markifyService.createUser(testUser);
    const response = await markifyService.authenticate(testUserCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
