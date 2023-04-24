<template>
  <div class="flex flex-col h-screen dark:bg-slate-800">
    <div
      class="dark:bg-slate-700 flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bg-gray-100"
    >
      <div class="text-2xl font-bold dark text-gray-500">Bauhinia</div>
      <div class="ml-4 text-sm text-gray-500 dark">
        基于 OpenAI 的 gpt3.5-turbo的对话机器人
      </div>
      <div
        class="ml-auto px-3 py-2 text-sm cursor-pointer hover:bg-white rounded-md"
      >
        <el-icon size="20px"><Setting /></el-icon>
      </div>
    </div>

    <div class="sticky bottom-0 w-full p-6 pb-8 bg-gray-100">
      <div class="-mt-2 mb-2 text-sm text-gray-500" v-if="isConfig">
        请输入 API Key：
      </div>
      <div class="flex">
        <input
          class="input"
          :type="isConfig ? 'password' : 'text'"
          :placeholder="isConfig ? 'sk-xxxxxxxxxx' : '请输入'"
          v-model="messageContent"
          @keydown.enter="isTalking || sendOrSave()"
        />
        <button class="btn" :disabled="isTalking" @click="sendOrSave()">
          <el-icon><Promotion /></el-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, nextTick, onMounted } from "vue";
import { chat } from "@/libs/gpt";
import cryptoJS from "crypto-js";
import Loding from "@/components/Loding.vue";
import Copy from "@/components/Copy.vue";
import { md } from "@/libs/markdown";
let isConfig = ref(true);
let isTalking = ref(false);
let messageContent = ref("");
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "Bauhinia", system: "System" };
const messageList = ref<ChatMessage[]>([
  {
    role: "system",
    content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
  },
  {
    role: "assistant",
    content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
  },
]);
// 点击按钮发送消息
// const sendChatMessage = async (content: string = messageContent.value) => {
//   try {
//     isTalking.value = true;
//     if (messageList.value.length === 2) {
//       messageList.value.pop();
//     }
//     messageList.value.push({ role: "user", content });
//     clearMessageContent();
//     messageList.value.push({ role: "assistant", content: "" });

//     const { body, status } = await chat(messageList.value, getAPIKey());
//     if (body) {
//       const reader = body.getReader();
//       await readStream(reader, status);
//     }
//   } catch (error: any) {
//     appendLastMessageContent(error);
//   } finally {
//     isTalking.value = false;
//   }
// };
</script>
