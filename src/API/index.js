import axios from "axios";
import store from "../store";

// '/' is included at end of base URL, so write API calls accordingly!
const token = store.state.token;
const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function register(data) {
  return api.post("register", data);
}

function login(data) {
  return api.post("login", data);
}

function postSchedule(scheduleObj) {
  return api.post("schedules", scheduleObj);
}

function getScheduleById(scheduleID) {
  return api.get(`schedules/${scheduleID}`);
}

// Other API calls go here

export { api, register, login, postSchedule, getScheduleById };
