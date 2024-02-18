import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";
import { employeeJsonStore } from "./employee-json-store.js";

const db = new Low(new JSONFile("./src/models/json/teams.json"), { teams: [] });

export const teamJsonStore = {
  async getAllTeams() {
    await db.read();
    return db.data.teams;
  },

  async addTeam(team) {
    await db.read();
    team._id = v4();
    db.data.teams.push(team);
    await db.write();
    return team;
  },

  async getTeamById(id) {
    await db.read();
    const list = db.data.teams.find((team) => team._id === id);
    list.employees = await employeeJsonStore.getEmployeesByTeamId(list._id);
    return list;
  },

  async getUserTeams(userid) {
    await db.read();
    return db.data.teams.filter((team) => team.userid === userid);
  },

  async deleteTeamById(id) {
    await db.read();
    const index = db.data.teams.findIndex((team) => team._id === id);
    db.data.teams.splice(index, 1);
    await db.write();
  },

  async deleteAllTeams() {
    db.data.teams = [];
    await db.write();
  },
};
