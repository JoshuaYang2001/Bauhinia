import { CommandType } from "../command";

/**
 * 跳转命令
 * @author yupi
 */
export default {
  func: "bauhinia",
  name: "bauhinia",
  params: [
    {
      key: "即将开启bauhinia",
      // desc: "目标链接",
      required: false,
    },
  ],
  options: [
    {
      key: "self",
      desc: "bauhinia",
      // alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal): void {
    const link = "http://localhost:3000/#/home";
    if (!self) {
      window.location.href = link;
    } else {
      window.open(link);
    }
  },
} as CommandType;
