import Vue from "vue";
import VueRouter from "vue-router";
import Raiz from "@/views/raiz.vue";

import dashGerencia from "./gerencia";
import dashAdmin from "./admin";
import dashRepresentante from "./representante";
import site from "./site";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/notfound")
  },
  {
    path: "/",
    name: "root",
    component: Raiz,
    redirect: "/dash/login"
  },
  site,
  dashRepresentante,
  {
    path: "/dash",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dash" */ "@/views/dash/index.vue"),
    redirect: "/dash/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/dash/Login.vue")
      },
      dashGerencia,
      dashAdmin
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
