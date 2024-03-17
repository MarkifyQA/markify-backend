import Mongoose from "mongoose";
import { Team } from "./team.js";
import { Employee } from "./employee.js";
import { User } from "./user.js";
import { Scorecard } from "./scorecard.js";

const { Schema } = Mongoose;

const answerSchema = new Schema({
  text: String,
});

const resultSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  evaluatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  scorecardId: {
    type: Schema.Types.ObjectId,
    ref: "Scorecard",
  },
  companyId: {
    type: String,
    ref: "User",
  },
  answers: [answerSchema],
  totalScore: Number,
  sumScore: Number,
  percentScore: Number,
  reference: String,
});

export const Result = Mongoose.model("Result", resultSchema);
