# Sticky Scrollbar

A lightweight, high-performance sticky horizontal scrollbar plugin for web applications.

## Features

- 🎯 **Sticky positioning** - Always visible at the bottom of the viewport
- 📱 **Responsive design** - Works on all screen sizes
- ⚡ **High performance** - Optimized with requestAnimationFrame and debouncing
- 🎨 **Customizable** - Fully customizable appearance
- 🔧 **Framework agnostic** - Works with any framework or vanilla JS
- 📦 **Multiple formats** - UMD, ESM, and CJS support

## Installation

```bash
npm install sticky-scrollbar
```

## Quick Start

### CDN
```html
<script src="https://unpkg.com/sticky-scrollbar@latest/dist/sticky-scrollbar.min.js"></script>
<script>
  new StickyScrollbar('#my-container');
</script>
```

### ES Module
```javascript
import { StickyScrollbar } from 'sticky-scrollbar';

const scrollbar = new StickyScrollbar(document.getElementById('my-container'));
```

### CommonJS
```javascript
const { StickyScrollbar } = require('sticky-scrollbar');

const scrollbar = new StickyScrollbar('#my-container');
```

## Usage

```javascript
// Basic usage
new StickyScrollbar('.scroll-container');

// With options
new StickyScrollbar('.scroll-container', {
  showMode: 'auto',        // 'always' | 'hover' | 'auto'
  autoHideDelay: 1000,     // Hide delay in ms
  height: 8,               // Scrollbar height in px
  color: '#1890ff',        // Thumb color
  backgroundColor: '#f0f0f0', // Track color
  radius: 4,               // Border radius
  zIndex: 9999             // z-index value
});
```

## API

### Methods
- `destroy()` - Clean up and remove the scrollbar
- `update()` - Manually update scrollbar position
- `show()` - Show the scrollbar
- `hide()` - Hide the scrollbar
- `getPosition()` - Get current scroll position
- `setPosition(position)` - Set scroll position

### Events
```javascript
scrollbar.on('scroll', (position) => {
  console.log('Scrolled to:', position);
});

scrollbar.on('show', () => {
  console.log('Scrollbar shown');
});

scrollbar.on('hide', () => {
  console.log('Scrollbar hidden');
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
- IE 11 (with polyfills)

## License

MIT