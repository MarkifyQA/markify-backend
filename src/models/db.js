import { userMemStore } from "./mem/user-mem-store.js";
import { teamMemStore } from "./mem/team-mem-store.js";
import { employeeMemStore } from "./mem/employee-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { teamJsonStore } from "./json/team-json-store.js";
import { employeeJsonStore } from "./json/employee-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { teamMongoStore } from "./mongo/team-mongo-store.js";
import { employeeMongoStore } from "./mongo/employee-mongo-store.js";
import { scorecardMongoStore } from "./mongo/scorecard-mongo-store.js";
import { resultMongoStore } from "./mongo/result-mongo-store.js";

export const db = {
  userStore: null,
  teamStore: null,
  employeeStore: null,
  scorecardStore: null,
  resultStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.teamStore = teamJsonStore;
        this.employeeStore = employeeJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.teamStore = teamMongoStore;
        this.employeeStore = employeeMongoStore;
        this.scorecardStore = scorecardMongoStore;
        this.resultStore = resultMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.teamStore = teamMemStore;
        this.employeeStore = employeeMemStore;
    }
  },
};
