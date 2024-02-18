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
    list.employees = await employeeMemStore.getEmployeesByTeamId(list._id);
    console.log(list);
    return list;
  },

  async deleteTeamById(id) {
    const index = teams.findIndex((team) => team._id === id);
    teams.splice(index, 1);
  },

  async deleteAllTeams() {
    teams = [];
  },

  async getUserTeams(userid) {
    return teams.filter((team) => team.userid === userid);
  },
};
