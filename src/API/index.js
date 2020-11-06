import axios from "axios";
import store from "../store";

// '/' is included at end of base URL, so write API calls accordingly!
const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});

function register(data) {
  return api.post("register", data);
}

function login(data) {
  return api.post("login", data);
}

// Other API calls go here

export { api, register, login };