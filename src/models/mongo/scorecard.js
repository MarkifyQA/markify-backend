import Mongoose from "mongoose";
import { Team } from "./team.js";

const { Schema } = Mongoose;

const questionSchema = new Schema({
  text: String,
  answers: [String],
  score: Number,
});

const scorecardSchema = new Schema({
  title: String,
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  questions: [questionSchema],
});

export const Scorecard = Mongoose.model("Scorecard", scorecardSchema);
