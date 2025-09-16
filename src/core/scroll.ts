import type { StickyScrollbarOptions, StickyConfig } from "../types";
import { convertToPx } from "../utils";
// @ts-ignore
import GeminiScrollbar from "gemini-scrollbar";
import { throttle } from "throttle-debounce";
import "gemini-scrollbar/gemini-scrollbar.css";
import "../style/index.less";
const THROTTLE_TIME = 1000 / 60;

const DEFAULT_SCROLLBAR_CLASS = "universal-horizontal-scrollbar";
/**
 * @class StickyScrollbar
 * @classdesc 通用滚动条
 * @param {Object} options 配置选项
 
 */
export class StickyScrollbar {
  /**
   * 需要浮动滚动条的容器元素
   */
  container: HTMLElement;

  containerClass: string = "sticky-scrollbar-container";
  /**
   * 具有溢出内容的元素（默认为容器）
   */
  scrollElement: HTMLElement;
  scrollWrapperClass: string = "scroll-wrapper";

  stickyConfig: boolean | StickyConfig;
  /**
   * 是否始终显示滚动条
   */
  alwaysVisible: boolean;
  /**
   * 滚动条的自定义类名
   */
  scrollbarClass: string;
  /**
   * 滚动时的回调函数
   */
  onScroll: Function | null;

  scrollbar!: HTMLElement;
  scrollContent!: HTMLElement;

  scroller!: GeminiScrollbar;

  observer!: MutationObserver;
  resizeObserver!: ResizeObserver;

  constructor(options: StickyScrollbarOptions) {
    const {
      container,
      scrollElement = container,
      stickyConfig = {
        position: "bottom",
        offsetBottom: 0,
      },
      alwaysVisible = true,
      scrollbarClass = DEFAULT_SCROLLBAR_CLASS,
      onScroll = null,
    } = options;

    if (!container) {
      throw new Error("Container element is required");
    }

    this.container = container;
    this.scrollElement = scrollElement;
    this.stickyConfig = stickyConfig;
    this.alwaysVisible = alwaysVisible;
    this.scrollbarClass = scrollbarClass;
    this.onScroll = onScroll;

    this._createrScroller();
  }

  /**
   * 初始化滚动条
   */
  _createrScroller() {
    const {
      container,
      containerClass,
      scrollElement,
      scrollWrapperClass,
      scrollbarClass,
      stickyConfig,
      alwaysVisible,
    } = this;
    container.classList.toggle(containerClass, true);
    container.setAttribute("data-sticky-scroll", "1");

    scrollElement.classList.toggle(scrollWrapperClass, true);
    scrollElement.setAttribute("data-scrollwrapper", "1");

    const scrollbar =
      (container.querySelector(`.${DEFAULT_SCROLLBAR_CLASS}`) as HTMLElement) ||
      document.createElement("div");
    scrollbar.classList.toggle(DEFAULT_SCROLLBAR_CLASS, true);
    scrollbar.classList.toggle(scrollbarClass, true);

    let scrollbarCssText = ``;
    if (stickyConfig) {
      scrollbarCssText += "position: sticky;";
      if (
        typeof stickyConfig === "object" &&
        stickyConfig.position === "bottom"
      ) {
        scrollbarCssText += `bottom: ${convertToPx(
          stickyConfig.offsetBottom || 0
        )};`;
      } else if (
        typeof stickyConfig === "object" &&
        stickyConfig.position === "top"
      ) {
        scrollbarCssText += `top: ${convertToPx(stickyConfig.offsetTop || 0)};`;
      } else {
        scrollbarCssText += "bottom: 0;";
      }
    }

    scrollbar.style.cssText = scrollbarCssText;
    // 创建一个与可滚动内容宽度相匹配的内容元素
    const scrollContent = document.createElement("div");
    scrollContent.style.width = `${scrollElement.scrollWidth}px`;
    scrollContent.style.height = "1px";
    scrollbar.appendChild(scrollContent);

    // 如果是顶部滚动条，则将scrollbar插入到 container 顶部
    if (typeof stickyConfig === "object" && stickyConfig.position == "top") {
      container.insertBefore(scrollbar, container.firstChild);
    } else {
      container.appendChild(scrollbar);
    }

    this.scrollbar = scrollbar;
    this.scrollContent = scrollContent;

    this.initScrollBar();
    this.initListenerAndObserver();
    // this.update();
  }

  initScrollBar() {
    const { scrollbar, alwaysVisible } = this;
    this.scroller = new GeminiScrollbar({
      element: scrollbar,
      forceGemini: true,
      autoshow: alwaysVisible,
    }).create();
  }

  initListenerAndObserver() {
    const { scrollElement } = this;
    const scrollViewEl = this.scroller.getViewElement()!;

    const bar = this.scroller.element!.querySelector(
      ".gm-scrollbar.-horizontal"
    ) as HTMLElement;
    const thumb = bar.querySelector(".thumb") as HTMLElement;

    // 同步 scrollElement 的水平滚动到 scrollView
    scrollElement.addEventListener(
      "scroll",
      throttle(THROTTLE_TIME, () => {
        // 1. 计算表格滚动的百分比
        // 2. 根据百分比计算滚动条的位置
        const scrollPercent =
          scrollElement.scrollLeft /
          (scrollElement.scrollWidth - scrollElement.offsetWidth);
        thumb.style.transform = `translate3d(${
          scrollPercent * (bar.offsetWidth - thumb.offsetWidth)
        }px, 0px, 0px)`;
        this.onScroll?.();
      })
    );

    // 同步 scrollViewEl 的水平滚动到 scrollElement
    scrollViewEl.addEventListener(
      "scroll",
      throttle(THROTTLE_TIME, () => {
        scrollElement.scrollLeft = scrollViewEl.scrollLeft;
        this.onScroll?.();
      })
    );

    // observe scrollElement width change
    const observer = new MutationObserver(() => this.update());
    observer.observe(scrollElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const resizeObserver = new ResizeObserver(() => this.update());
    resizeObserver.observe(scrollElement);
    this.resizeObserver = resizeObserver;
    this.observer = observer;
  }

  /**
   * 重新计算视图框和滚动条尺寸
   */
  update() {
    this.scrollContent.style.width = `${this.scrollElement.scrollWidth}px`;

    // 如果没有水平溢出则隐藏滚动条
    if (this.scrollElement.scrollWidth <= this.scrollElement.clientWidth) {
      this.scrollbar.style.display = "none";
    } else {
      this.scrollbar.style.display = "";
    }

    this.scroller.update();
  }

  destroy() {
    // Remove event listeners
    this.scrollElement.removeEventListener(
      "scroll",
      this.scrollElement.onscroll! as EventListener
    );
    this.scroller.element!.removeEventListener(
      "scroll",
      this.scrollbar.onscroll! as EventListener
    );

    // Disconnect observers
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
