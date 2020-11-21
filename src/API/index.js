import { api } from "./connection";

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
  return api().delete(`schedules/${scheduleID}`);
}

function putSchedule(scheduleID, data) {
  return api().put(`schedules/${scheduleID}`, data);
}

function getAllSchedules() {
  return api().get(`schedules`);
}

// BOOKMARKS
function getUserBookmarks() {
  return api().get(`bookmarks`);
}

function deleteBookmark(scheduleID) {
  return api().delete(`bookmarks/${scheduleID}`);
}

function postBookmark(scheduleID) {
  return api().post(`bookmarks/${scheduleID}`);
}

// Other API calls go here

export {
  register,
  login,
  postSchedule,
  getScheduleById,
  deleteSchedule,
  putSchedule,
  getAllSchedules,
  getUserBookmarks,
  deleteBookmark,
  postBookmark,
};
