import { ConfigManager } from "./config-manager";

export class ScrollbarView {
  private element!: HTMLElement;
  private track!: HTMLElement;
  private thumb!: HTMLElement;
  private config: ConfigManager;
  private container: HTMLElement;
  private originalOverflowX: string;

  constructor(container: HTMLElement, config: ConfigManager) {
    this.container = container;
    this.config = config;
    // 保存原始的overflow-x样式，以便在销毁时恢复
    this.originalOverflowX = this.container.style.overflowX;
    this.createElements();
  }

  private createElements(): void {
    this.element = document.createElement("div");
    this.element.className = `sticky-horizontal-scrollbar ${this.config.get(
      "className"
    )}`;
    this.element.style.cssText = `
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: ${this.config.get("zIndex")};
      height: ${this.config.get("height")}px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;

    this.track = document.createElement("div");
    this.track.className = "scrollbar-track";
    this.track.style.cssText = `
      height: 100%;
      background: ${this.config.get("backgroundColor")};
      border-radius: ${this.config.get("radius")}px;
      position: relative;
      pointer-events: auto;
    `;

    this.thumb = document.createElement("div");
    this.thumb.className = "scrollbar-thumb";

    this.thumb.style.cssText = `
      height: 100%;
      background: ${this.config.get("color")};
      border-radius: ${this.config.get("radius")}px;
      cursor: pointer;
      pointer-events: auto;
      will-change: transform, width;
      transform: translateX(0);
    `;

    this.track.appendChild(this.thumb);
    this.element.appendChild(this.track);
  }

  render(): void {
    // 隐藏默认滚动条，但保持滚动功能
    // 检查父容器 container 的样式，确保它没有设置 overflow: hidden
    this.container.appendChild(this.element);
  }

  updateThumb(width: number, left: number): void {
    this.thumb.style.width = `${width}px`;
    this.thumb.style.transform = `translateX(${left}px)`;
  }

  show(): void {
    this.element.style.opacity = "1";
  }

  hide(): void {
    this.element.style.opacity = "0";
  }

  destroy(): void {
    // 恢复原始的overflow-x样式
    this.container.style.overflowX = this.originalOverflowX;

    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    // 移除添加的类名
    const scrollbarSelector = Array.from(this.container.classList).find(
      (className) => className.startsWith("scrollbar-container-")
    );

    if (scrollbarSelector) {
      this.container.classList.remove(scrollbarSelector);
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getThumb(): HTMLElement {
    return this.thumb;
  }

  getTrack(): HTMLElement {
    return this.track;
  }
}
