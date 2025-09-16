# Sticky Scrollbar

一个轻量级、高性能的粘性水平滚动条插件，适用于Web应用程序。非常适合表格、图表和任何需要持久滚动条以提升用户体验的水平可滚动内容。

## 特性

- 🎯 **粘性定位** - 始终在视口顶部或底部可见
- 📱 **响应式设计** - 适用于所有屏幕尺寸
- ⚡ **高性能** - 使用requestAnimationFrame和防抖优化
- 🎨 **可定制** - 外观完全可定制
- 🔧 **框架无关** - 可与任何框架或原生JavaScript配合使用
- 📦 **多种格式支持** - 支持UMD、ESM和CJS格式

## 应用场景

Sticky Scrollbar 特别适合以下应用场景：

- **大型表格**：当页面包含宽表格且需要横向滚动时，提供始终可见的滚动条
- **数据可视化**：为图表、地图等宽内容提供便捷的滚动控制
- **长列表**：水平方向的长列表内容，如缩略图墙、产品展示等
- **移动设备优化**：在触摸屏设备上提供更清晰的滚动指示
- **固定头部表格**：与固定表头结合使用，提升数据表格的用户体验
- **复杂布局**：在不影响原有页面结构的情况下增强水平滚动体验

## 安装

通过npm、yarn或pnpm安装：

```bash
# 使用npm
npm install sticky-scrollbar

# 使用yarn
yarn add sticky-scrollbar

# 使用pnpm
pnpm add sticky-scrollbar
```

## 快速开始

### CDN

```html
<script src="https://unpkg.com/sticky-scrollbar@latest/dist/sticky-scrollbar.min.js"></script>
<script>
  new StickyScrollbar({
    container: document.getElementById("my-container")
  });
</script>
```

### ES模块

```javascript
import { StickyScrollbar } from "sticky-scrollbar";

const scrollbar = new StickyScrollbar({
  container: document.getElementById("my-container")
});
```

### CommonJS

```javascript
const { StickyScrollbar } = require("sticky-scrollbar");

const scrollbar = new StickyScrollbar({
  container: document.getElementById("my-container")
});
```

## 使用方式

### 基本用法

```javascript
// 基本用法
const scrollbar = new StickyScrollbar({
  container: document.querySelector(".scroll-container")
});
```

### 高级用法（带选项）

```javascript
// 带选项的用法
const scrollbar = new StickyScrollbar({
  container: document.querySelector(".scroll-container"),
  scrollElement: document.querySelector(".content-wrapper"), // 具有溢出内容的元素（默认为container）
  stickyConfig: {
    position: "bottom", // 'top' | 'bottom'
    offsetBottom: 0,     // 底部偏移量
    offsetTop: 0         // 顶部偏移量（当position为top时使用）
  },
  alwaysVisible: true,   // 是否始终显示滚动条
  scrollbarClass: "custom-scrollbar", // 自定义滚动条类名
  onScroll: (scrollLeft) => {
    console.log("滚动到位置:", scrollLeft);
  } // 滚动回调函数
});
```

## API

### 构造函数

```javascript
new StickyScrollbar(options)
```
- **options**: `object` - 配置选项

### 方法

- `destroy()` - 清理并移除滚动条，断开所有事件监听和观察者
- `update()` - 手动更新滚动条位置和尺寸，当内容宽度发生变化时调用

### 选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | `HTMLElement` | 必填 | 滚动条容器元素 |
| `scrollElement` | `HTMLElement` | `container` | 具有溢出内容的可滚动元素 |
| `stickyConfig` | `boolean` \| `object` | `{position: "bottom", offsetBottom: 0}` | 粘性定位配置，设置为false可禁用粘性 |
| `alwaysVisible` | `boolean` | `true` | 是否始终显示滚动条 |
| `scrollbarClass` | `string` | `"universal-horizontal-scrollbar"` | 滚动条自定义类名 |
| `onScroll` | `Function` | `null` | 滚动时的回调函数 |

### 回调函数

滚动事件可以通过构造函数中的`onScroll`选项设置：

```javascript
const scrollbar = new StickyScrollbar({
  container: document.querySelector(".scroll-container"),
  onScroll: (scrollLeft) => {
    console.log("当前滚动位置:", scrollLeft);
  }
});
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 启动Storybook
npm run storybook
```

## 浏览器支持

- Chrome 80+ 版本
- Firefox 75+ 版本
- Safari 13+ 版本
- Edge 80+ 版本
- IE 11（需要额外的polyfills支持）

## 许可证

本项目使用MIT许可证。