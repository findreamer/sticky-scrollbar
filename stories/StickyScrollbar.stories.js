import StickyScrollbar from "../src/index";

export default {
  title: "Components/StickyScrollbar",
  argTypes: {
    showMode: {
      control: { type: "select" },
      options: ["always", "hover", "auto"],
      description: "滚动条显示模式",
      defaultValue: "auto",
    },
    autoHideDelay: {
      control: { type: "number" },
      description: "自动隐藏延迟(ms)",
      defaultValue: 1000,
    },
    height: {
      control: { type: "number" },
      description: "滚动条高度(px)",
      defaultValue: 8,
    },
    color: {
      control: { type: "color" },
      description: "滚动条颜色",
      defaultValue: "#1890ff",
    },
    backgroundColor: {
      control: { type: "color" },
      description: "滚动条背景色",
      defaultValue: "#f0f0f0",
    },
    radius: {
      control: { type: "number" },
      description: "圆角大小(px)",
      defaultValue: 4,
    },
    zIndex: {
      control: { type: "number" },
      description: "z-index值",
      defaultValue: 9999,
    },
  },
};

const Template = (args) => {
  // 创建容器元素
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  `;

  Array(10)
    .fill(0)
    .forEach((_, index) => {
      const item = document.createElement("div");
      item.style.cssText = `
      width: 100px;
      height: 100px;
      background: #fff;
      border: 1px solid #ccc;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
      item.textContent = `项目${index + 1}`;
      container.appendChild(item);
    });

  // 创建内容元素
  const scrollerWrap = document.createElement("div");
  scrollerWrap.style.cssText = `
    width: 100%;
  `;
  const content = document.createElement("div");
  content.style.cssText = `
    width: 2000px;
    height: 1000px;
    background: linear-gradient(90deg, #f0f0f0, #e0e0e0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #666;
  `;
  content.textContent = "横向滚动查看更多内容";
  // 组装DOM
  scrollerWrap.appendChild(content);
  container.appendChild(scrollerWrap);

  Array(10)
    .fill(0)
    .forEach((_, index) => {
      const item = document.createElement("div");
      item.style.cssText = `
      width: 100px;
      height: 100px;
      background: #fff;
      border: 1px solid #ccc;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
      item.textContent = `项目${index + 1}`;
      container.appendChild(item);
    });

  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar(scrollerWrap, args);
  }, 0);

  return container;
};

export const Default = Template.bind({});
Default.args = {
  showMode: "auto",
  autoHideDelay: 1000,
  height: 8,
  color: "#1890ff",
  backgroundColor: "#f0f0f0",
  radius: 4,
  zIndex: 9999,
};

export const AlwaysVisible = Template.bind({});
AlwaysVisible.args = {
  ...Default.args,
  showMode: "always",
};

export const HoverMode = Template.bind({});
HoverMode.args = {
  ...Default.args,
  showMode: "hover",
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  ...Default.args,
  height: 12,
  color: "#ff4d4f",
  backgroundColor: "#ffccc7",
  radius: 6,
};
