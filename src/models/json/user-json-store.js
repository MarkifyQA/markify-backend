// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/users.json"), { users: [] });

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    user.companyId = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
