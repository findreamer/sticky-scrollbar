# Sticky Scrollbar

[中文文档](README_CN.md) | [English Document](README.md)

A lightweight, high-performance sticky horizontal scrollbar plugin for web applications. Perfect for tables, charts, and any horizontally scrollable content that needs a persistent scrollbar for better user experience.

## Features

- 🎯 **Sticky positioning** - Always visible at the top or bottom of the viewport
- 📱 **Responsive design** - Works on all screen sizes
- ⚡ **High performance** - Optimized with requestAnimationFrame and debouncing
- 🎨 **Customizable** - Fully customizable appearance
- 🔧 **Framework agnostic** - Works with any framework or vanilla JS
- 📦 **Multiple formats** - UMD, ESM, and CJS support

## Installation

Install via npm or yarn:

```bash
# Using npm
npm install sticky-scrollbar

# Using yarn
pnpm add sticky-scrollbar
```

## Quick Start

### CDN

```html
<script src="https://unpkg.com/sticky-scrollbar@latest/dist/sticky-scrollbar.min.js"></script>
<script>
  new StickyScrollbar({
    container: document.getElementById("my-container")
  });
</script>
```

### ES Module

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

## Usage

### Basic Usage

```javascript
// Basic usage
const scrollbar = new StickyScrollbar({
  container: document.querySelector(".scroll-container")
});
```

### Advanced Usage with Options

```javascript
// With options
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
    console.log("Scrolled to:", scrollLeft);
  } // 滚动回调函数
});
```

## API

### Constructor

```javascript
new StickyScrollbar(options)
```
- **options**: `object` - Configuration options

### Methods

- `destroy()` - 清理并移除滚动条，断开所有事件监听和观察者
- `update()` - 手动更新滚动条位置和尺寸，当内容宽度发生变化时调用

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | `HTMLElement` | 必填 | 滚动条容器元素
| `scrollElement` | `HTMLElement` | `container` | 具有溢出内容的可滚动元素
| `stickyConfig` | `boolean` \| `object` | `{position: "bottom", offsetBottom: 0}` | 粘性定位配置，设置为false可禁用粘性
| `alwaysVisible` | `boolean` | `true` | 是否始终显示滚动条
| `scrollbarClass` | `string` | `"universal-horizontal-scrollbar"` | 滚动条自定义类名
| `onScroll` | `Function` | `null` | 滚动时的回调函数

### Callbacks

滚动事件可以通过构造函数中的`onScroll`选项设置：

```javascript
const scrollbar = new StickyScrollbar({
  container: document.querySelector(".scroll-container"),
  onScroll: (scrollLeft) => {
    console.log("Current scroll position:", scrollLeft);
  }
});
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Start Storybook
npm run storybook
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- IE 11 (需要额外的 polyfills 支持)

## License

This project is licensed under the MIT License.
