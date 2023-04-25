import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import home from "../../src/home.vue";
import login from "../../src/pages/login.vue";
import effect from "../../src/components/effects.vue";
const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  {
    path: "/home",
    component: home,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/effect",
    component: effect,
  },
];

export default routes;
