import { userMemStore } from "./mem/user-mem-store.js";
import { teamMemStore } from "./mem/team-mem-store.js";
import { employeeMemStore } from "./mem/employee-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { teamJsonStore } from "./json/team-json-store.js";
import { employeeJsonStore } from "./json/employee-json-store.js";

export const db = {
  userStore: null,
  teamStore: null,
  employeeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.teamStore = teamJsonStore;
        this.employeeStore = employeeJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.teamStore = teamMemStore;
        this.employeeStore = employeeMemStore;
    }
  },
};
