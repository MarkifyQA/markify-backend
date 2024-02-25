import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const markifyService = {
  markifyURL: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.markifyURL}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.markifyURL}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.markifyURL}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.markifyURL}/api/users`);
    return res.data;
  },
};