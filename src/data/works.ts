import type { WorkItem } from "./types";

export const works: WorkItem[] = [
  {
    title: "XU 绪 · 智能待办工具",
    description:
      "从 0 到 1 主导轻量化智能待办工具全流程落地。输出 PRD 与 Figma 高保真原型 10+，引入 NLP 实现自然语言转待办，借助 Cursor、Claude Code 独立完成前后端开发。",
    tags: ["0→1", "NLP", "AI 产品"],
    result: "任务创建效率 +50%，近 500 人次使用",
  },
  {
    title: "电信客户流失预测分析",
    description:
      "独立主导 7043 条客户数据在 21 维度的完整数据分析流程。搭建决策树与神经网络对比实验，引入 SHAP 值量化特征贡献度，识别关键流失特征并输出精准挽留策略。",
    tags: ["机器学习", "SHAP", "数据策略"],
    result: "AUC 0.86，输出 5 条策略建议",
  },
  {
    title: "商圈消费焕新调研",
    description:
      "深入商圈一线开展消费者问卷调研，回收有效样本 500+，提炼消费者行为特征与核心诉求。将数据分析结论转化为可执行的商圈数字化焕新方案。",
    tags: ["用户调研", "数据分析", "策略"],
    result: "校级三等奖，10+ 策略建议",
  },
];
