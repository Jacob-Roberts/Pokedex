import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import Types from "../views/Types.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/types",
    name: "Types",
    component: Types
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active", // active class for *exact* links.
  routes
});

export default router;
