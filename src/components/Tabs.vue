<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="全局设置" name="first">
      <div class="flex margin">
        <span>语言</span>
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex margin">
        <span>主题</span>
        <div class="flex flex-wrap items-center gap-4">
          <el-button @click="lightMode">
            <el-icon><Sunny /></el-icon>
          </el-button>
          <el-button @click="darkMode">
            <el-icon><Moon /></el-icon>
          </el-button>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="用户信息" name="second">角色信息 </el-tab-pane>
    <el-tab-pane label="系统信息" name="third">系统信息 </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { Moon } from "@icon-park/vue-next";

// 使用storeToRefs才会变成

// 点击按钮变化主题
const darkMode = () => {
  //这个条件用于判断当前系统应用模式是否开启了“暗”模式（win10在   个性化-颜色-选择默认应用模式  中修改）
  // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  if (localStorage.theme === "dark" || !("theme" in localStorage)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.theme = "light";

  localStorage.theme = "dark";

  localStorage.removeItem("theme");
  console.log(1);
};

const lightMode = () => {
  document.documentElement.classList.remove("dark");
  console.log(1);
};

const value = ref("");
// 语言选项
const languageOptions = [
  {
    value: "Chinese",
    label: "简体中文",
  },
  {
    value: "English",
    label: "English",
  },
];
// 主题选项
const themeOptions = [
  {
    label: "Light",
    key: "light",
    icon: "light",
  },
  {
    label: "Dark",
    key: "dark",
    icon: "dark",
  },
];
const activeName = ref("first");
</script>
<style lang="less" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.flex {
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    margin-right: 20px;
  }
}
.margin {
  margin: 10px 20px 20px 0;
}
</style>
