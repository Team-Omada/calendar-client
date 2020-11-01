import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    redirect: "/dashboard",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/**
 * Check if authentication is required for the route
 * Then redirect to /login if not authenticated, otherwise continue
 * In our case, all routes will be required, but maybe that could change in future!
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
