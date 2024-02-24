import { Team } from "./team.js";
import { employeeMongoStore } from "./employee-mongo-store.js";

export const teamMongoStore = {
  async getAllTeams() {
    const teams = await Team.find().lean();
    return teams;
  },

  async getTeamById(id) {
    if (id) {
      const team = await Team.findOne({ _id: id }).lean();
      if (team) {
        team.employees = await employeeMongoStore.getEmployeesByTeamId(team._id);
      }
      return team;
    }
    return null;
  },

  async addTeam(team) {
    const newTeam = new Team(team);
    const teamObj = await newTeam.save();
    return this.getTeamById(teamObj._id);
  },

  async getUserTeams(id) {
    const team = await Team.find({ userid: id }).lean();
    return team;
  },

  async deleteTeamById(id) {
    try {
      await Team.deleteOne({ _id: id });
    } catch (error) {
      console.error(error, error.stack);
    }
  },

  async deleteAllTeams() {
    await Team.deleteMany({});
  },
};
