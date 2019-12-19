import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/signin",
      name: "SignIn",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "signin" */ "./views/SignIn.vue")
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("./views/SignUp.vue")
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("./views/ForgotPassword.vue")
    },
    {
      path: "/verify",
      name: "Verify",
      component: () => import("./views/Verify.vue")
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: () => import("./views/ResetPassword.vue")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/profile-unverified",
      name: "UnverifiedProfile",
      component: () => import("./views/UnverifiedProfile.vue")
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/tables",
      name: "Tables",
      component: () => import("./views/Tables.vue")
    },
    {
      path: "/tickets",
      name: "Tickets",
      component: () => import("./views/Tickets.vue")
    },
    {
      path: "/ticket/:id",
      name: "Ticket",
      component: () => import("./views/Ticket.vue")
    }
  ]
});
