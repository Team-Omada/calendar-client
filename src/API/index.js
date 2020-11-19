import axios from "axios";
import store from "../store";
import router from "../router";

// '/' is included at end of base URL, so write API calls accordingly!
const api = function() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });

  // intercepts response and redirects if user is unauthorized
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response;
      if (status === 401) {
        store.dispatch("setToken", null);
        store.dispatch("setUser", null);
        router.push({ path: "/login" });
      }
      return Promise.reject(error);
    }
  );
  return instance;
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
  api,
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
