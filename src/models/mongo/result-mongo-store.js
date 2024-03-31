import { Result } from "./result.js";

export const resultMongoStore = {
  async getAllResults() {
    const results = await Result.find().lean();
    return results;
  },

  async addResult(result) {
    const newResult = new Result(result);
    const resultObj = await newResult.save();
    return this.getResultById(resultObj._id);
  },

  async getResultById(id) {
    if (id) {
      const result = await Result.findOne({ _id: id }).lean();
      return result;
    }
    return null;
  },

  async deleteResult(id) {
    try {
      await Result.deleteOne({ _id: id });
    } catch (error) {
      console.error(error, error.stack);
    }
  },

  async getResultsByTeamId(id) {
    const results = await Result.find({ teamId: id }).lean();
    return results;
  },

  async getResultsByCompanyId(id) {
    const results = await Result.find({ companyId: id }).lean();
    return results;
  },
};
