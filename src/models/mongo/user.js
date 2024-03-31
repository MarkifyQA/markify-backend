import Mongoose from "mongoose";
import { v4 } from "uuid";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  companyId: {
    type: String,
    default: () => v4(),
  },
});

export const User = Mongoose.model("User", userSchema);
