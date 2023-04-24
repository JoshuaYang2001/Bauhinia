import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import home from "../../src/home.vue";
const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  {
    path: "/home",
    component: home,
  },
];

export default routes;
