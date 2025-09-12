// Jest setup file
import '@testing-library/jest-dom';

// 全局变量声明
declare global {
  interface Window {
    ResizeObserver: any;
    MutationObserver: any;
  }
}

// 模拟常用的DOM API
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 模拟document.createElement
const originalCreateElement = document.createElement;
document.createElement = jest.fn((tagName, options) => {
  const element = originalCreateElement.call(document, tagName, options);
  
  // 为所有创建的元素添加一些基本的mock方法
  element.scrollIntoView = jest.fn();
  element.getBoundingClientRect = jest.fn().mockReturnValue({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  
  return element;
});