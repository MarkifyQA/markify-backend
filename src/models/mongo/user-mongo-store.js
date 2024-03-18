import { User } from "./user.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async getUsersByCompanyId(id) {
    if (id) {
      const users = await User.find({ companyId: id }).lean();
      return users;
    }
    return null;
  },

  async addUser(user) {
    user.password = await bcrypt.hash(user.password, saltRounds);
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.error(error, error.stack);
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
