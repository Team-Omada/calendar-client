import axios from "axios";
import store from "../store";

// '/' is included at end of base URL, so write API calls accordingly!
const api = function() {
  return axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};

function register(data) {
  return api().post("register", data);
}

function login(data) {
  return api().post("login", data);
}

// SCHEDULE API
function postSchedule(scheduleObj) {
  return api().post("schedules", scheduleObj);
}

function getScheduleById(scheduleID) {
  return api().get(`schedules/${scheduleID}`);
}

function deleteSchedule(scheduleID) {
  return api().get(`schedules/${scheduleID}`);
}

function putSchedule(scheduleID, data) {
  return api().put(`schedules/${scheduleID}`, data);
}

// Other API calls go here

export {
  api,
  register,
  login,
  postSchedule,
  getScheduleById,
  deleteSchedule,
  putSchedule,
};
