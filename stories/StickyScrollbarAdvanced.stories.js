import { StickyScrollbar } from "../src/core/scroll";

export default {
  title: "Components/StickyScrollbar/高级用法",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["bottom", "top"],
      description: "滚动条位置",
      defaultValue: "bottom",
    },
    offset: {
      control: { type: "number" },
      description: "距离边缘的偏移量(px)",
      defaultValue: 0,
    },
    alwaysVisible: {
      control: { type: "boolean" },
      description: "是否始终显示滚动条",
      defaultValue: true,
    },
    customClass: {
      control: { type: "boolean" },
      description: "是否使用自定义样式类",
      defaultValue: false,
    },
  },
};

// 基础示例模板
const BaseTemplate = (args) => {
  // 创建容器元素
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 500px;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  `;

  // 创建内容区域
  const scrollElement = document.createElement("div");
  scrollElement.style.cssText = `
    height: 100%;
    overflow: auto;
  `;
  container.appendChild(scrollElement);

  // 创建很长的内容
  const content = document.createElement("div");
  content.style.cssText = `
    width: 2500px;
    padding: 20px;
  `;
  scrollElement.appendChild(content);

  // 添加一些内容元素
  Array(30)
    .fill(0)
    .forEach((_, index) => {
      const item = document.createElement("div");
      item.style.cssText = `
        width: 2400px;
        height: 60px;
        margin-bottom: 15px;
        padding: 10px;
        background: ${index % 2 === 0 ? "#f0f9ff" : "#fff"};
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
      `;
      item.textContent = `内容项 ${
        index + 1
      } - 这是一个很长的内容行，展示水平滚动效果。向右滚动可以查看更多内容。`;
      content.appendChild(item);
    });

  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar({
      container,
      scrollElement,
      alwaysVisible: args.alwaysVisible,
      stickyConfig: {
        position: args.position,
        [args.position === "bottom" ? "offsetBottom" : "offsetTop"]:
          args.offset,
      },
      scrollbarClass: args.customClass ? "custom-scrollbar" : undefined,
    });
  }, 0);

  // 如果使用自定义类，添加样式
  if (args.customClass) {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar .gm-scrollbar.-horizontal {
        background: #f5f5f5 !important;
        border-radius: 6px !important;
      }
      .custom-scrollbar .gm-scrollbar.-horizontal .thumb {
        background: #40a9ff !important;
        border-radius: 6px !important;
      }
    `;
    document.head.appendChild(style);
  }

  return container;
};

// 不同位置的滚动条示例
export const 底部滚动条 = BaseTemplate.bind({});
底部滚动条.args = {
  position: "bottom",
  offset: 10,
  alwaysVisible: true,
  customClass: false,
};

export const 顶部滚动条 = BaseTemplate.bind({});
顶部滚动条.args = {
  position: "top",
  offset: 10,
  alwaysVisible: true,
  customClass: false,
};

export const 偏移滚动条 = BaseTemplate.bind({});
偏移滚动条.args = {
  position: "bottom",
  offset: 20,
  alwaysVisible: true,
  customClass: false,
};

export const 自定义样式 = BaseTemplate.bind({});
自定义样式.args = {
  position: "bottom",
  offset: 20,
  alwaysVisible: true,
  customClass: true,
};

// 表格示例 - 展示实际业务场景
const TableTemplate = () => {
  // 创建容器
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 500px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  `;

  // 创建表格容器
  const tableContainer = document.createElement("div");
  tableContainer.style.cssText = `
    height: 100%;
    overflow: auto;
  `;
  container.appendChild(tableContainer);

  // 创建表格
  const table = document.createElement("table");
  table.style.cssText = `
    border-collapse: collapse;
    min-width: 2000px;
    width: 100%;
    font-size: 14px;
  `;
  tableContainer.appendChild(table);

  // 创建表头
  const thead = document.createElement("thead");
  thead.style.cssText =
    "background: #fafafa; position: sticky; top: 0; z-index: 10;";
  const headerRow = document.createElement("tr");

  // 生成多个表头列
  for (let i = 1; i <= 20; i++) {
    const th = document.createElement("th");
    th.style.cssText = `
      padding: 12px 16px;
      border: 1px solid #e8e8e8;
      text-align: left;
      font-weight: 500;
      color: #262626;
      min-width: 120px;
    `;
    th.textContent = `列 ${i}`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 创建表格内容
  const tbody = document.createElement("tbody");

  // 生成多行数据
  for (let i = 1; i <= 100; i++) {
    const row = document.createElement("tr");
    row.style.cssText = `
      &:hover {
        background: #f5f5f5;
      }
    `;

    // 为每行创建单元格
    for (let j = 1; j <= 20; j++) {
      const td = document.createElement("td");
      td.style.cssText = `
        padding: 12px 16px;
        border: 1px solid #e8e8e8;
        color: #595959;
      `;
      td.textContent = `单元格 ${i}-${j}`;
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar({
      container,
      scrollElement: tableContainer,
      alwaysVisible: true,
      stickyConfig: {
        position: "bottom",
        offsetBottom: 5,
      },
    });
  }, 0);

  return container;
};

export const 表格滚动示例 = TableTemplate.bind({});
表格滚动示例.parameters = {
  docs: {
    description: {
      story:
        "演示在宽表格中使用StickyScrollbar，方便用户在不滚动到表格底部的情况下快速滚动表格内容。",
    },
  },
};

// 带有滚动事件回调的示例
const ScrollCallbackTemplate = () => {
  // 创建容器
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  `;

  // 创建内容区域
  const scrollElement = document.createElement("div");
  scrollElement.style.cssText = `
    height: 100%;
    overflow: auto;
  `;
  container.appendChild(scrollElement);

  // 创建很长的内容
  const content = document.createElement("div");
  content.style.cssText = `
    width: 2000px;
    height: 100%;
    background: linear-gradient(90deg, #f6ffed, #e6f7ff, #fff2e8);
    padding: 20px;
  `;
  scrollElement.appendChild(content);

  // 添加滚动位置显示
  const scrollInfo = document.createElement("div");
  scrollInfo.style.cssText = `
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    z-index: 100;
  `;
  scrollInfo.innerHTML =
    "<strong>滚动信息</strong><br/>位置: 0px<br/>百分比: 0%";
  container.appendChild(scrollInfo);

  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar({
      container,
      scrollElement,
      alwaysVisible: true,
      stickyConfig: {
        position: "bottom",
      },
      onScroll: () => {
        const scrollLeft = scrollElement.scrollLeft;
        const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
        const scrollPercent =
          maxScroll > 0 ? Math.round((scrollLeft / maxScroll) * 100) : 0;

        scrollInfo.innerHTML = `
          <strong>滚动信息</strong><br/>
          位置: ${scrollLeft}px<br/>
          百分比: ${scrollPercent}%
        `;
      },
    });
  }, 0);

  return container;
};

export const 滚动事件回调 = ScrollCallbackTemplate.bind({});
滚动事件回调.parameters = {
  docs: {
    description: {
      story:
        "演示如何使用onScroll回调函数来监听和响应滚动事件，显示当前滚动位置和百分比。",
    },
  },
};
