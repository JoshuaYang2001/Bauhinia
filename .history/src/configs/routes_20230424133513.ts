import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import Home from "../views/home.vue";
const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  {
    path: "/",
    name: "home",
    component: Home,
  },
];

export default routes;
