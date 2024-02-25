import Mongoose from "mongoose";

const { Schema } = Mongoose;

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  supervisor: String,
  teamid: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  companyId: {
    type: String,
    ref: "Team",
  },
});

export const Employee = Mongoose.model("Employee", employeeSchema);
