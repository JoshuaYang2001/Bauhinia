import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import { chromeExtension } from "./build/chromeExtension";

// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://47.108.249.78:8080',
        secure: false,   // https请求则使用true
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/'),
      }
    }
  },
  plugins: [
    vue(),
    // 按需加载 ant-design-vue
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    process.env.BUILD_CRX && chromeExtension(),
  ].filter(Boolean),
});
