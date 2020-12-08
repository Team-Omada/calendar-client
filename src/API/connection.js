import axios from "axios";
import store from "../store";
import router from "../router";

const isProduction = process.env.NODE_ENV === "production";

// '/' is included at end of base URL, so write API calls accordingly!
export const api = function() {
  const instance = axios.create({
    baseURL: isProduction ? process.env.API_URL : "http://localhost:3000/",
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
