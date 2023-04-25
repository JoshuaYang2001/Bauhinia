<template>
  <div class="flex flex-col h-screen bg-slate-800">
    <div
      class="bg-slate-700 flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4"
    >
      <div class="text-2xl font-bold dark text-gray-100">Bauhinia</div>

      <div
        class="ml-auto px-3 py-2 text-sm cursor-pointer hover:bg-white rounded-md"
        @click="clickConfig()"
      >
        <el-icon size="20px"><Setting /></el-icon>
      </div>
    </div>

    <div class="flex-1 mx-2 mt-20 mb-2" ref="chatListDom">
      <div
        class="margin group flex flex-col px-4 py-3 hover:bg-slate-600 text-lime-300 rounded-lg"
        v-for="item of messageList.filter((v) => v.role !== 'system')"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="font-bold">{{ roleAlias[item.role] }}：</div>
          <Copy class="invisible group-hover:visible" :content="item.content" />
        </div>
        <div>
          <div
            class="prose text-sm text-slate-100 leading-relaxed"
            v-if="item.content"
            v-html="md.render(item.content)"
          ></div>
          <Loding v-else />
        </div>
      </div>
    </div>

    <div class="sticky bottom-0 w-full p-6 pb-8 bg-gray-600">
      <div class="-mt-2 mb-2 text-sm text-gray-500" v-if="isConfig">
        请输入 API Key：
      </div>
      <div class="flex">
        <input
          class="input bg-gray-200"
          :type="isConfig ? 'password' : 'text'"
          :placeholder="isConfig ? 'sk-xxxxxxxxxx' : '请输入'"
          v-model="messageContent"
          @keydown.enter="isTalking || sendOrSave()"
        />
        <button
          class="btn hover:bg-green-600"
          :disabled="isTalking"
          @click="sendOrSave()"
        >
          send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, nextTick, onMounted } from "vue";
import { chat } from "../src/libs/gpt";
import cryptoJS from "crypto-js";
import Loding from "../src/components/Loding.vue";
import Copy from "../src/components/Copy.vue";
import { md } from "../src/libs/markdown";

let apiKey = "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";
let isConfig = ref(true);
let isTalking = ref(false);
let messageContent = ref("");
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "Bauhinia", system: "System" };
// chatgpt提示语
const messageList = ref<ChatMessage[]>([
  {
    role: "system",
    content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
  },
  {
    role: "assistant",
    content: `你好，我是Bauhinia，一个AI语言机器人，我可以在任何领域与你展开对话，例如：

1. 充当顾问：我可以充当顾问，尽力帮你解决健康医疗、投资理财、人文艺术等诸多方面的问题。

2. 学术编辑：我可以帮助你进行学术论文、研究报告的编辑和校对工作，确保文本的正确性、一致性和完整性

3. 数据分析：我可以帮助你进行各种类型的数据分析、包括统计分析、文本分析，并提供告质量的数据报告

你想象力的边际决定了我回答问题的广度，请在思维的瀚海里畅游吧
`,
  },
]);

onMounted(() => {
  if (getAPIKey()) {
    switchConfigStatus();
  }
});

// 点击按钮发送消息
const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    isTalking.value = true;
    if (messageList.value.length === 2) {
      messageList.value.pop();
    }
    messageList.value.push({ role: "user", content });
    clearMessageContent();
    messageList.value.push({ role: "assistant", content: "" });

    const { body, status } = await chat(messageList.value, getAPIKey());
    if (body) {
      const reader = body.getReader();
      await readStream(reader, status);
    }
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {
    isTalking.value = false;
  }
};

// 读取流
const readStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  status: number
) => {
  let partialLine = "";

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });

    if (status !== 200) {
      const json = JSON.parse(decodedText); // start with "data: "
      const content = json.error.message ?? decodedText;
      appendLastMessageContent(content);
      return;
    }

    const chunk = partialLine + decodedText;
    const newLines = chunk.split(/\r?\n/);

    partialLine = newLines.pop() ?? "";

    for (const line of newLines) {
      if (line.length === 0) continue; // ignore empty message
      if (line.startsWith(":")) continue; // ignore sse comment message
      if (line === "data: [DONE]") return; //

      const json = JSON.parse(line.substring(6)); // start with "data: "
      const content =
        status === 200
          ? json.choices[0].delta.content ?? ""
          : json.error.message;
      appendLastMessageContent(content);
    }
  }
};

const appendLastMessageContent = (content: string) =>
  (messageList.value[messageList.value.length - 1].content += content);

// 发送或者保存按钮的逻辑
const sendOrSave = () => {
  if (!messageContent.value.length) return;
  if (isConfig.value) {
    if (saveAPIKey(messageContent.value.trim())) {
      switchConfigStatus();
    }
    clearMessageContent();
  } else {
    sendChatMessage();
  }
};
// 点击配置保存
// 设置的对话框
let dialogVisible = ref(false);
// let dialogVisible = ref(false);
// 点击设置
const clickConfig = () => {
  dialogVisible.value = true;
  console.log(dialogVisible.value);

  // if (!isConfig.value) {
  //   messageContent.value = getAPIKey();
  // } else {
  //   clearMessageContent();
  // }
  // switchConfigStatus();
};

const getSecretKey = () => "lianginx";

const saveAPIKey = (apiKey: string) => {
  if (apiKey.slice(0, 3) !== "sk-" || apiKey.length !== 51) {
    alert("API Key 错误，请检查后重新输入！");
    return false;
  }
  const aesAPIKey = cryptoJS.AES.encrypt(apiKey, getSecretKey()).toString();
  localStorage.setItem("apiKey", aesAPIKey);
  return true;
};

// 获取APIkeys
const getAPIKey = () => {
  if (apiKey) return apiKey;
  const aesAPIKey = localStorage.getItem("apiKey") ?? "";
  apiKey = cryptoJS.AES.decrypt(aesAPIKey, getSecretKey()).toString(
    cryptoJS.enc.Utf8
  );
  return apiKey;
};

// 切换配置状态
const switchConfigStatus = () => (isConfig.value = !isConfig.value);

// 清楚消息内容
const clearMessageContent = () => (messageContent.value = "");

// scroll到页面底端
const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};

watch(messageList.value, () => nextTick(() => scrollToBottom()));
</script>

<style scoped>
pre {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
.margin {
  margin-bottom: 15px;
}
</style>
