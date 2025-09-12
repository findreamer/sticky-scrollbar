import { StickyScrollbar } from '../../src/core/scroll';

// Mock外部依赖 - 使用简单的对象mock
jest.mock('gemini-scrollbar', () => {
  return function() {
    // 创建一个模拟的DOM元素，具有addEventListener方法
    const mockViewElement = {
      scrollLeft: 0,
      addEventListener: function(event, callback) {
        this[`on${event}`] = callback;
      },
      removeEventListener: function(event) {
        this[`on${event}`] = null;
      }
    };
    
    // 创建element对象，也添加事件监听器方法
    const mockElement = {
      querySelector: function() {
        return {
          querySelector: function() {
            return { style: {} };
          }
        };
      },
      addEventListener: function(event, callback) {
        this[`on${event}`] = callback;
      },
      removeEventListener: function(event) {
        this[`on${event}`] = null;
      }
    };
    
    return {
      create: function() { return this; },
      update: function() {},
      getViewElement: function() { return mockViewElement; },
      element: mockElement
    };
  };
});

jest.mock('throttle-debounce', () => ({
  throttle: function(delay, func) {
    return func;
  }
}));

// Mock ResizeObserver
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    callback
  }))
});

// Mock MutationObserver
Object.defineProperty(window, 'MutationObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    callback
  }))
});

describe('StickyScrollbar', () => {
  let container: HTMLElement;
  let scrollElement: HTMLElement;
  let stickyScrollbar: StickyScrollbar;

  beforeEach(() => {
    // 创建测试元素
    container = document.createElement('div');
    scrollElement = document.createElement('div');
    container.appendChild(scrollElement);
    document.body.appendChild(container);

    // 重置mock
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 清理DOM
    document.body.removeChild(container);
    stickyScrollbar?.destroy();
  });

  describe('构造函数', () => {
    it('应该正确初始化StickyScrollbar实例', () => {
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement
      });

      expect(stickyScrollbar.container).toBe(container);
      expect(stickyScrollbar.scrollElement).toBe(scrollElement);
      expect(container.classList.contains('sticky-scrollbar-container')).toBe(true);
      expect(container.getAttribute('data-sticky-scroll')).toBe('1');
    });

    it('应该在没有提供scrollElement时使用container作为默认值', () => {
      stickyScrollbar = new StickyScrollbar({
        container
      });

      expect(stickyScrollbar.scrollElement).toBe(container);
    });

    it('应该抛出错误当没有提供container', () => {
      expect(() => {
        // @ts-ignore - 故意不提供container进行测试
        new StickyScrollbar({});
      }).toThrow('Container element is required');
    });

    it('应该正确应用stickyConfig配置', () => {
      const stickyConfig = {
        position: 'bottom' as const,
        offsetBottom: 10
      };
      
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement,
        stickyConfig
      });

      // 验证stickyConfig是否被正确设置
      expect(stickyScrollbar.stickyConfig).toEqual(stickyConfig);
    });

    it('应该正确设置alwaysVisible选项', () => {
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement,
        alwaysVisible: false
      });

      expect(stickyScrollbar.alwaysVisible).toBe(false);
    });

    it('应该正确设置自定义scrollbarClass', () => {
      const customClass = 'custom-scrollbar';
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement,
        scrollbarClass: customClass
      });

      expect(stickyScrollbar.scrollbarClass).toBe(customClass);
    });
  });

  describe('update方法', () => {
    beforeEach(() => {
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement
      });
      // 模拟scroller对象，包含update方法和element属性
      (stickyScrollbar as any).scroller = {
        update: jest.fn(),
        element: {
          removeEventListener: jest.fn()
        }
      };
      // 模拟scrollbar元素
      (stickyScrollbar as any).scrollbar = document.createElement('div');
      (stickyScrollbar as any).scrollbar.onscroll = jest.fn();
      // 模拟scrollContent元素
      (stickyScrollbar as any).scrollContent = document.createElement('div');
    });

    it('应该更新scrollContent的宽度为scrollElement的scrollWidth', () => {
      const mockScrollWidth = 1000;
      // 模拟scrollWidth
      Object.defineProperty(scrollElement, 'scrollWidth', {
        value: mockScrollWidth,
        writable: true
      });

      stickyScrollbar.update();

      expect((stickyScrollbar as any).scrollContent.style.width).toBe(`${mockScrollWidth}px`);
    });

    it('应该在scrollElement没有水平溢出时隐藏滚动条', () => {
      // 模拟没有水平溢出的情况
      Object.defineProperty(scrollElement, 'scrollWidth', { value: 500, writable: true });
      Object.defineProperty(scrollElement, 'clientWidth', { value: 600, writable: true });

      stickyScrollbar.update();

      expect((stickyScrollbar as any).scrollbar.style.display).toBe('none');
    });

    it('应该在scrollElement有水平溢出时显示滚动条', () => {
      // 模拟有水平溢出的情况
      Object.defineProperty(scrollElement, 'scrollWidth', { value: 1000, writable: true });
      Object.defineProperty(scrollElement, 'clientWidth', { value: 600, writable: true });

      stickyScrollbar.update();

      expect((stickyScrollbar as any).scrollbar.style.display).toBe('');
    });

    it('应该调用scroller的update方法', () => {
      stickyScrollbar.update();

      expect((stickyScrollbar as any).scroller.update).toHaveBeenCalled();
    });
  });

  describe('destroy方法', () => {
    beforeEach(() => {
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement
      });
      // 模拟必要的属性和方法
      (stickyScrollbar as any).resizeObserver = {
        disconnect: jest.fn()
      };
      (stickyScrollbar as any).observer = {
        disconnect: jest.fn()
      };
      (stickyScrollbar as any).scrollbar = document.createElement('div');
      (stickyScrollbar as any).scroller = {
        element: document.createElement('div')
      };
      // 模拟事件监听器
      scrollElement.onscroll = jest.fn();
      (stickyScrollbar as any).scrollbar.onscroll = jest.fn();
    });

    it('应该断开ResizeObserver连接', () => {
      stickyScrollbar.destroy();

      expect((stickyScrollbar as any).resizeObserver.disconnect).toHaveBeenCalled();
    });

    it('应该断开MutationObserver连接', () => {
      stickyScrollbar.destroy();

      expect((stickyScrollbar as any).observer.disconnect).toHaveBeenCalled();
    });
  });

  describe('滚动事件同步', () => {
    beforeEach(() => {
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement
      });
      // 模拟scroller的相关元素
      (stickyScrollbar as any).scroller = {
        getViewElement: jest.fn().mockReturnValue(document.createElement('div')),
        element: {
          querySelector: jest.fn().mockReturnValue({
            querySelector: jest.fn().mockReturnValue({ style: {} })
          })
        }
      };
    });

    it('应该正确设置滚动事件监听器', () => {
      // 验证滚动事件是否被设置
      const addEventListenerSpy = jest.spyOn(scrollElement, 'addEventListener');
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('应该正确设置自定义onScroll回调', () => {
      const onScrollCallback = jest.fn();
      stickyScrollbar = new StickyScrollbar({
        container,
        scrollElement,
        onScroll: onScrollCallback
      });

      expect(stickyScrollbar.onScroll).toBe(onScrollCallback);
    });
  });
});