import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import Home from "../views/home.vue";
const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
  },
];

export default routes;
