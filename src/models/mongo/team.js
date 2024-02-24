import Mongoose from "mongoose";

const { Schema } = Mongoose;

const teamSchema = new Schema({
  teamName: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Team = Mongoose.model("Team", teamSchema);
