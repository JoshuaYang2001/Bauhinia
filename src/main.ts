import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import routes from "./configs/routes";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入tailwindcss
import "./assets/tailwind.css";
import "@icon-park/vue-next/styles/index.css";
import "highlight.js/styles/dark.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
app.use(router);

// 路由拦截
import { getItem } from './utils/storage.js'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    const data = getItem("userID")
    if (data) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else if (to.path === '/') {
            next('/login')
        } else {
            next()
        }
    }
})

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);

app.mount("#app");
