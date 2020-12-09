import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      disableIfAuth: true,
      title: "Omada Calendar | Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { disableIfAuth: true, title: "Omada Calendar | Register" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, title: "Omada Calendar | Dashboard" },
  },
  {
    path: "/viewschedule/:scheduleID",
    name: "ViewSchedule",
    component: () => import("../views/ViewSchedule.vue"),
    meta: { requiresAuth: true, title: "Omada Calendar | View Schedule" },
  },
  {
    path: "/createschedule",
    name: "CreateSchedule",
    component: () => import("../views/CreateSchedule.vue"),
    meta: { requiresAuth: true, title: "Omada Calendar | Create Schedule" },
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: () => import("../views/Bookmarks.vue"),
    meta: { requiresAuth: true, title: "Omada Calendar | My Bookmarks" },
  },
  {
    path: "/myschedules",
    name: "UserSchedules",
    component: () => import("../views/UserSchedules.vue"),
    meta: { requiresAuth: true, title: "Omada Calendar | My Schedules" },
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
 * Then redirect to /login if not authenticated, otherwise:
 *
 * Check if route should be disabled when logged in and redirect to /dashboard
 * A user shouldn't be able to access /login and /register when logged in!
 */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.disableIfAuth)) {
    if (store.state.isLoggedIn) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
