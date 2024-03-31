// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from "uuid";
import { employeeMemStore } from "./employee-mem-store.js";

let teams = [];

export const teamMemStore = {
  async getAllTeams() {
    return teams;
  },

  async addTeam(team) {
    team._id = v4();
    teams.push(team);
    return team;
  },

  async getTeamById(id) {
    const list = teams.find((team) => team._id === id);
    if (list) {
      list.employees = await employeeMemStore.getEmployeesByTeamId(list._id);
      return list;
    }
    return null;
  },

  async deleteTeamById(id) {
    const index = teams.findIndex((team) => team._id === id);
    if (index !== -1) teams.splice(index, 1);
  },

  async deleteAllTeams() {
    teams = [];
  },

  async getUserTeams(userid) {
    return teams.filter((team) => team.userid === userid);
  },
};
