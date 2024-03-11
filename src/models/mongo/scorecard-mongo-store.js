import { Scorecard } from "./scorecard.js";
import { Employee } from "./employee.js";

export const scorecardMongoStore = {
  async getAllScorecards() {
    const scorecards = await Scorecard.find().lean();
    return scorecards;
  },

  async addScorecard(teamId, scorecard) {
    scorecard.teamid = teamId;
    const newScorecard = new Scorecard(scorecard);
    const scorecardObj = await newScorecard.save();
    return this.getScorecardById(scorecardObj._id);
  },

  async getScorecardById(id) {
    if (id) {
      const scorecard = await Scorecard.findOne({ _id: id }).lean();
      return scorecard;
    }
    return null;
  },

  async deleteScorecard(id) {
    try {
      await Scorecard.deleteOne({ _id: id });
    } catch (error) {
      console.error(error, error.stack);
    }
  },
};
