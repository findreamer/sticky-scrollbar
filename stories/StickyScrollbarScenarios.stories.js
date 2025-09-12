import { StickyScrollbar } from "../src/core/scroll";

export default {
  title: "Components/StickyScrollbar/场景示例",
  parameters: {
    layout: "fullscreen",
  },
};

// 响应式布局示例
const ResponsiveLayoutTemplate = () => {
  // 创建容器
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 500px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background: #fff;
  `;

  // 创建头部信息
  const header = document.createElement("div");
  header.style.cssText = `
    padding: 20px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
  `;
  header.innerHTML = `
    <h3 style="margin: 0 0 10px 0; color: #262626;">响应式表格演示</h3>
    <p style="margin: 0; color: #595959; font-size: 14px;">调整浏览器窗口大小，观察滚动条的自适应行为</p>
  `;
  container.appendChild(header);

  // 创建表格容器
  const tableContainer = document.createElement("div");
  tableContainer.style.cssText = `
    height: calc(100% - 100px);
    overflow: auto;
  `;
  container.appendChild(tableContainer);

  // 创建表格
  const table = document.createElement("table");
  table.style.cssText = `
    border-collapse: collapse;
    min-width: 1800px;
    width: 100%;
    font-size: 14px;
  `;
  tableContainer.appendChild(table);

  // 创建表头
  const thead = document.createElement("thead");
  thead.style.cssText =
    "background: #fafafa; position: sticky; top: 0; z-index: 10;";
  const headerRow = document.createElement("tr");

  // 生成表头列
  const headers = [
    "产品名称",
    "类别",
    "品牌",
    "价格",
    "库存",
    "销量",
    "评分",
    "上架日期",
    "供应商",
    "状态",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.style.cssText = `
      padding: 12px 16px;
      border: 1px solid #e8e8e8;
      text-align: left;
      font-weight: 500;
      color: #262626;
      min-width: 150px;
    `;
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 创建表格内容
  const tbody = document.createElement("tbody");

  // 生成产品数据
  for (let i = 1; i <= 50; i++) {
    const row = document.createElement("tr");
    row.style.cssText = `
      &:hover {
        background: #f5f5f5;
      }
    `;

    // 产品名称
    const productCell = document.createElement("td");
    productCell.style.cssText = `
      padding: 12px 16px;
      border: 1px solid #e8e8e8;
      color: #595959;
      font-weight: 500;
    `;
    productCell.textContent = `智能产品 ${i}`;
    row.appendChild(productCell);

    // 其他单元格
    for (let j = 1; j < headers.length; j++) {
      const td = document.createElement("td");
      td.style.cssText = `
        padding: 12px 16px;
        border: 1px solid #e8e8e8;
        color: #595959;
      `;

      // 根据列类型设置不同内容
      if (j === 1) {
        // 类别
        td.textContent = [
          "电子产品",
          "家居用品",
          "办公用品",
          "运动器材",
          "厨房用具",
        ][i % 5];
      } else if (j === 3) {
        // 价格
        td.textContent = `¥${(Math.random() * 1000).toFixed(2)}`;
      } else if (j === 4) {
        // 库存
        td.textContent = Math.floor(Math.random() * 1000).toString();
      } else if (j === 6) {
        // 评分
        td.textContent = (4 + Math.random()).toFixed(1);
        td.style.color = "#faad14";
      } else if (j === 7) {
        // 上架日期
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
        td.textContent = date.toLocaleDateString();
      } else if (j === 9) {
        // 状态
        const status = i % 3 === 0 ? "下架" : i % 3 === 1 ? "上架" : "缺货";
        td.textContent = status;
        td.style.color =
          status === "上架"
            ? "#52c41a"
            : status === "缺货"
            ? "#faad14"
            : "#ff4d4f";
      } else {
        td.textContent = `数据 ${i}-${j}`;
      }

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
        offsetBottom: 0,
      },
    });
  }, 0);

  return container;
};

export const 响应式表格布局 = ResponsiveLayoutTemplate.bind({});
响应式表格布局.parameters = {
  docs: {
    description: {
      story:
        "演示在响应式布局中使用StickyScrollbar，表格内容会根据窗口大小自动调整，而滚动条始终保持在容器底部。",
    },
  },
};

// 多滚动区域示例
const MultipleScrollAreasTemplate = () => {
  // 创建主容器
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 600px;
    padding: 20px;
    display: flex;
    gap: 20px;
    background: #f5f5f5;
    box-sizing: border-box;
  `;

  // 创建左侧面板
  const leftPanel = document.createElement("div");
  leftPanel.style.cssText = `
    flex: 1;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    position: relative;
    overflow: hidden;
  `;
  container.appendChild(leftPanel);

  // 左侧面板标题
  const leftTitle = document.createElement("div");
  leftTitle.style.cssText = `
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 500;
    color: #262626;
  `;
  leftTitle.textContent = "产品列表";
  leftPanel.appendChild(leftTitle);

  // 左侧滚动区域
  const leftScroll = document.createElement("div");
  leftScroll.style.cssText = `
    height: calc(100% - 45px);
    overflow: auto;
  `;
  leftPanel.appendChild(leftScroll);

  // 左侧内容
  const leftContent = document.createElement("div");
  leftContent.style.cssText = "width: 1500px; padding: 16px;";
  leftScroll.appendChild(leftContent);

  // 填充左侧内容
  Array(30)
    .fill(0)
    .forEach((_, index) => {
      const item = document.createElement("div");
      item.style.cssText = `
        width: 1450px;
        height: 40px;
        margin-bottom: 8px;
        padding: 0 12px;
        background: ${index % 2 === 0 ? "#f0f9ff" : "#fff"};
        border: 1px solid #e6f7ff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
      `;
      item.textContent = `产品项目 ${
        index + 1
      } - 这是一个很长的产品名称，展示水平滚动效果`;
      leftContent.appendChild(item);
    });

  // 创建右侧面板
  const rightPanel = document.createElement("div");
  rightPanel.style.cssText = `
    flex: 1;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    position: relative;
    overflow: hidden;
  `;
  container.appendChild(rightPanel);

  // 右侧面板标题
  const rightTitle = document.createElement("div");
  rightTitle.style.cssText = `
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 500;
    color: #262626;
  `;
  rightTitle.textContent = "订单列表";
  rightPanel.appendChild(rightTitle);

  // 右侧滚动区域
  const rightScroll = document.createElement("div");
  rightScroll.style.cssText = `
    height: calc(100% - 45px);
    overflow: auto;
  `;
  rightPanel.appendChild(rightScroll);

  // 右侧内容
  const rightContent = document.createElement("div");
  rightContent.style.cssText = "width: 1800px; padding: 16px;";
  rightScroll.appendChild(rightContent);

  // 创建简单表格作为右侧内容
  const table = document.createElement("table");
  table.style.cssText =
    "border-collapse: collapse; width: 100%; font-size: 14px;";
  rightContent.appendChild(table);

  // 右侧表格表头
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  [
    "订单ID",
    "客户名称",
    "产品",
    "数量",
    "金额",
    "日期",
    "状态",
    "备注",
  ].forEach((headerText) => {
    const th = document.createElement("th");
    th.style.cssText = `
      padding: 8px 12px;
      border: 1px solid #e8e8e8;
      text-align: left;
      background: #fafafa;
      font-weight: 500;
      color: #262626;
      min-width: 150px;
    `;
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 右侧表格内容
  const tbody = document.createElement("tbody");
  for (let i = 1; i <= 20; i++) {
    const row = document.createElement("tr");
    row.style.cssText = `&:hover { background: #f5f5f5; }`;

    // 订单ID
    const idCell = document.createElement("td");
    idCell.style.cssText = `
      padding: 8px 12px;
      border: 1px solid #e8e8e8;
      color: #1890ff;
      font-weight: 500;
    `;
    idCell.textContent = `ORD-${10000 + i}`;
    row.appendChild(idCell);

    // 客户名称
    const nameCell = document.createElement("td");
    nameCell.style.cssText = `
      padding: 8px 12px;
      border: 1px solid #e8e8e8;
      color: #595959;
    `;
    nameCell.textContent = `客户 ${i}`;
    row.appendChild(nameCell);

    // 其他单元格
    for (let j = 2; j < 8; j++) {
      const td = document.createElement("td");
      td.style.cssText = `
        padding: 8px 12px;
        border: 1px solid #e8e8e8;
        color: #595959;
      `;

      if (j === 3) {
        // 数量
        td.textContent = Math.floor(Math.random() * 100).toString();
      } else if (j === 4) {
        // 金额
        td.textContent = `¥${(Math.random() * 10000).toFixed(2)}`;
        td.style.fontWeight = "500";
      } else if (j === 5) {
        // 日期
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        td.textContent = date.toLocaleDateString();
      } else if (j === 6) {
        // 状态
        const status = ["已完成", "处理中", "已取消", "待付款"][i % 4];
        td.textContent = status;
        const colors = {
          已完成: "#52c41a",
          处理中: "#1890ff",
          已取消: "#ff4d4f",
          待付款: "#faad14",
        };
        td.style.color = colors[status];
      } else {
        td.textContent = `数据 ${i}-${j}`;
      }

      row.appendChild(td);
    }

    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  // 初始化两个StickyScrollbar实例
  setTimeout(() => {
    // 左侧面板滚动条
    new StickyScrollbar({
      container: leftPanel,
      scrollElement: leftScroll,
      alwaysVisible: true,
      stickyConfig: {
        position: "bottom",
        offsetBottom: 0,
      },
    });

    // 右侧面板滚动条
    new StickyScrollbar({
      container: rightPanel,
      scrollElement: rightScroll,
      alwaysVisible: true,
      stickyConfig: {
        position: "bottom",
        offsetBottom: 0,
      },
    });
  }, 0);

  return container;
};

export const 多滚动区域布局 = MultipleScrollAreasTemplate.bind({});
多滚动区域布局.parameters = {
  docs: {
    description: {
      story:
        "演示在同一个页面中使用多个独立的StickyScrollbar实例，每个滚动区域都有自己的浮动滚动条。",
    },
  },
};

// 复杂业务场景示例 - 数据看板
const DashboardTemplate = () => {
  // 创建主容器
  const container = document.createElement("div");
  container.style.cssText = `
    width: 100%;
    height: 600px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  `;

  // 创建头部
  const header = document.createElement("div");
  header.style.cssText = `
    padding: 20px;
    background: #1890ff;
    color: white;
  `;
  header.innerHTML = `
    <h2 style="margin: 0;">销售数据分析看板</h2>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">实时监控销售数据趋势和关键指标</p>
  `;
  container.appendChild(header);

  // 创建内容区域
  const content = document.createElement("div");
  content.style.cssText = `
    height: calc(100% - 80px);
    overflow: auto;
  `;
  container.appendChild(content);

  // 创建宽内容包装
  const wideContent = document.createElement("div");
  wideContent.style.cssText = "width: 3000px; padding: 20px;";
  content.appendChild(wideContent);

  // 创建关键指标卡片
  const metricsContainer = document.createElement("div");
  metricsContainer.style.cssText = `
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  `;
  wideContent.appendChild(metricsContainer);

  // 添加四个指标卡片
  const metrics = [
    {
      title: "总销售额",
      value: "¥1,284,390",
      change: "+12.5%",
      color: "#1890ff",
    },
    { title: "订单数量", value: "8,492", change: "+8.3%", color: "#52c41a" },
    { title: "客户数量", value: "3,756", change: "+5.1%", color: "#faad14" },
    { title: "转化率", value: "4.8%", change: "-1.2%", color: "#ff4d4f" },
  ];

  metrics.forEach((metric) => {
    const card = document.createElement("div");
    card.style.cssText = `
      padding: 16px;
      background: #fff;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      min-width: 200px;
    `;

    card.innerHTML = `
      <div style="font-size: 14px; color: #8c8c8c; margin-bottom: 8px;">${
        metric.title
      }</div>
      <div style="font-size: 24px; font-weight: 500; color: ${
        metric.color
      }; margin-bottom: 4px;">${metric.value}</div>
      <div style="font-size: 12px; color: ${
        metric.change.startsWith("+") ? "#52c41a" : "#ff4d4f"
      };">${metric.change}</div>
    `;

    metricsContainer.appendChild(card);
  });

  // 创建图表区域
  const chartsContainer = document.createElement("div");
  chartsContainer.style.cssText = `
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
  `;
  wideContent.appendChild(chartsContainer);

  // 左侧图表
  const leftChart = document.createElement("div");
  leftChart.style.cssText = `
    padding: 16px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    width: 800px;
    height: 300px;
  `;
  leftChart.innerHTML = `
    <h4 style="margin: 0 0 16px 0; color: #262626;">销售趋势分析</h4>
    <div style="width: 100%; height: 250px; background: #f9f9f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #8c8c8c;">
      [图表占位区域 - 销售趋势图]
    </div>
  `;
  chartsContainer.appendChild(leftChart);

  // 右侧图表
  const rightChart = document.createElement("div");
  rightChart.style.cssText = `
    padding: 16px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    width: 800px;
    height: 300px;
  `;
  rightChart.innerHTML = `
    <h4 style="margin: 0 0 16px 0; color: #262626;">产品销售分布</h4>
    <div style="width: 100%; height: 250px; background: #f9f9f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #8c8c8c;">
      [图表占位区域 - 产品分布图]
    </div>
  `;
  chartsContainer.appendChild(rightChart);

  // 创建数据表格
  const tableSection = document.createElement("div");
  tableSection.style.cssText = `
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  `;
  wideContent.appendChild(tableSection);

  const tableTitle = document.createElement("div");
  tableTitle.style.cssText = `
    padding: 16px;
    font-weight: 500;
    color: #262626;
    border-bottom: 1px solid #e8e8e8;
  `;
  tableTitle.textContent = "最近订单列表";
  tableSection.appendChild(tableTitle);

  // 创建表格容器
  const orderTableContainer = document.createElement("div");
  orderTableContainer.style.cssText = "overflow: auto;";
  tableSection.appendChild(orderTableContainer);

  // 创建表格
  const orderTable = document.createElement("table");
  orderTable.style.cssText = `
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
  `;
  orderTableContainer.appendChild(orderTable);

  // 表格表头
  const orderThead = document.createElement("thead");
  const orderHeaderRow = document.createElement("tr");

  [
    "订单ID",
    "客户",
    "产品",
    "金额",
    "日期",
    "支付方式",
    "状态",
    "操作",
  ].forEach((headerText) => {
    const th = document.createElement("th");
    th.style.cssText = `
      padding: 12px 16px;
      border: 1px solid #e8e8e8;
      text-align: left;
      background: #fafafa;
      font-weight: 500;
      color: #262626;
      min-width: 120px;
    `;
    th.textContent = headerText;
    orderHeaderRow.appendChild(th);
  });
  orderThead.appendChild(orderHeaderRow);
  orderTable.appendChild(orderThead);

  // 表格内容
  const orderTbody = document.createElement("tbody");
  for (let i = 1; i <= 15; i++) {
    const row = document.createElement("tr");
    row.style.cssText = `&:hover { background: #f5f5f5; }`;

    // 订单ID
    const idCell = document.createElement("td");
    idCell.style.cssText = `
      padding: 12px 16px;
      border: 1px solid #e8e8e8;
      color: #1890ff;
    `;
    idCell.textContent = `ORD-${9800 + i}`;
    row.appendChild(idCell);

    // 其他单元格
    for (let j = 1; j < 8; j++) {
      const td = document.createElement("td");
      td.style.cssText = `
        padding: 12px 16px;
        border: 1px solid #e8e8e8;
        color: #595959;
      `;

      if (j === 1) {
        // 客户
        td.textContent = `客户 ${i}`;
      } else if (j === 3) {
        // 金额
        td.textContent = `¥${(Math.random() * 1000 + 100).toFixed(2)}`;
        td.style.fontWeight = "500";
      } else if (j === 4) {
        // 日期
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 14));
        td.textContent = date.toLocaleDateString();
      } else if (j === 5) {
        // 支付方式
        td.textContent = ["支付宝", "微信支付", "银行卡", "货到付款"][i % 4];
      } else if (j === 6) {
        // 状态
        const status = ["已完成", "处理中", "已发货", "待付款"][i % 4];
        td.textContent = status;
        const colors = {
          已完成: "#52c41a",
          处理中: "#1890ff",
          已发货: "#faad14",
          待付款: "#ff4d4f",
        };
        td.style.color = colors[status];
      } else if (j === 7) {
        // 操作
        const button = document.createElement("button");
        button.style.cssText = `
          padding: 4px 12px;
          background: #1890ff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        `;
        button.textContent = "查看详情";
        td.appendChild(button);
      } else {
        td.textContent = `产品 ${i}`;
      }

      row.appendChild(td);
    }

    orderTbody.appendChild(row);
  }
  orderTable.appendChild(orderTbody);

  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar({
      container,
      scrollElement: content,
      alwaysVisible: true,
      stickyConfig: {
        position: "bottom",
        offsetBottom: 0,
      },
    });
  }, 0);

  return container;
};

export const 数据看板布局 = DashboardTemplate.bind({});
数据看板布局.parameters = {
  docs: {
    description: {
      story:
        "演示在复杂数据看板中使用StickyScrollbar，提供更好的数据浏览体验，特别是在处理大量横向内容时。",
    },
  },
};
