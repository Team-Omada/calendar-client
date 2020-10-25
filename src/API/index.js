import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

function register(data) {
  return instance.post("register", data);
}

// Future endpoint functions will go here

export { instance, register };
