<template>
  <div>
    Bauhinia是一个键入式的智能交互系统，通过一个可定制可扩展的内置命令集帮助你更好的搜索信息<br />此外我们集成了基于
    gpt3.5的对话机器人，帮助你学习和工作
  </div>

  <div>系统由锦江学院20级杨童语、肖鹏、陈少媛联合开发</div>
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
