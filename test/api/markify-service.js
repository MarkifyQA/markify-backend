import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const markifyService = {
  markifyURL: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.markifyURL}/api/users`, user);
    return res.data;
  },

  async addUser(user) {
    const res = await axios.post(`${this.markifyURL}/api/users/user`, user);
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

  async deleteUserById(id) {
    return await axios.delete(`${this.markifyURL}/api/users/${id}`);
  },

  async createTeam(team) {
    const res = await axios.post(`${this.markifyURL}/api/teams`, team);
    return res.data;
  },

  async deleteAllTeams() {
    const response = await axios.delete(`${this.markifyURL}/api/teams`);
    return response.data;
  },

  async deleteTeam(id) {
    return await axios.delete(`${this.markifyURL}/api/teams/${id}`);
  },

  async getAllTeams() {
    const res = await axios.get(`${this.markifyURL}/api/teams`);
    return res.data;
  },

  async getTeam(id) {
    const res = await axios.get(`${this.markifyURL}/api/teams/${id}`);
    return res.data;
  },

  async createEmployee(id, employee) {
    const res = await axios.post(`${this.markifyURL}/api/teams/${id}/employees`, employee);
    return res.data;
  },

  async deleteAllEmployees() {
    const response = await axios.delete(`${this.markifyURL}/api/employees`);
    return response.data;
  },

  async deleteEmployee(id) {
    return await axios.delete(`${this.markifyURL}/api/employees/${id}`);
  },

  async getAllEmployees() {
    const res = await axios.get(`${this.markifyURL}/api/employees`);
    return res.data;
  },

  async getEmployee(id) {
    const res = await axios.get(`${this.markifyURL}/api/employees/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.markifyURL}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async createScorecard(teamId, scorecard) {
    const response = await axios.post(`${this.markifyURL}/api/teams/${teamId}/scorecards`, scorecard);
    return response.data;
  },

  async deleteScorecard(id) {
    return await axios.delete(`${this.markifyURL}/api/scorecards/${id}`);
  },

  async getScorecard(id) {
    const res = await axios.get(`${this.markifyURL}/api/scorecards/${id}`);
    return res.data;
  },

  async getResults() {
    const res = await axios.get(`${this.markifyURL}/api/results`);
    return res.data;
  },

  async getResult(id) {
    const res = await axios.get(`${this.markifyURL}/api/results/${id}`);
    return res.data;
  },

  async getResultsByTeam(id) {
    const res = await axios.get(`${this.markifyURL}/api/results/team/${id}`);
    return res.data;
  },

  async createResult(result) {
    const res = await axios.post(`${this.markifyURL}/api/results`, result);
    return res.data;
  },

  async deleteResult(id) {
    const res = await axios.delete(`${this.markifyURL}/api/results/${id}`);
    return res;
  },
};
