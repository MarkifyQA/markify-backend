import Mongoose from "mongoose";

const { Schema } = Mongoose;

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  teamid: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
});

export const Employee = Mongoose.model("Employee", employeeSchema);
