import { ScrollbarView } from "./scrollbar-view";
import { ConfigManager } from "./config-manager";

export class SyncEngine {
  private container: HTMLElement;
  private scrollbar: ScrollbarView;
  private config: ConfigManager;
  private rafId: number | null = null;
  private isDragging = false;
  private lastScrollLeft = 0;

  constructor(
    container: HTMLElement,
    scrollbar: ScrollbarView,
    config: ConfigManager
  ) {
    this.container = container;
    this.scrollbar = scrollbar;
    this.config = config;
  }

  start(): void {
    this.bindEvents();
    this.updateScrollbar();
  }

  stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.unbindEvents();
  }

  private bindEvents(): void {
    this.container.addEventListener("scroll", this.handleScroll.bind(this), {
      passive: true,
    });

    // thumb 事件
    const thumb = this.scrollbar.getThumb();
    thumb.addEventListener("click", this.handleThumbClick.bind(this));
    thumb.addEventListener("mousedown", this.handleDragStart.bind(this));
    document.addEventListener("mousemove", this.handleDragMove.bind(this));
    document.addEventListener("mouseup", this.handleDragEnd.bind(this));

    // track 事件 点击 track 滚动到对应位置
    const track = this.scrollbar.getTrack();
    track.addEventListener("click", this.handleTrackClick.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  private unbindEvents(): void {
    // 清理事件监听器
    this.container.removeEventListener("scroll", this.handleScroll);
    const thumb = this.scrollbar.getThumb();
    thumb.removeEventListener("mousedown", this.handleDragStart);
    document.removeEventListener("mousemove", this.handleDragMove);
    document.removeEventListener("mouseup", this.handleDragEnd);

    // track 事件
    const track = this.scrollbar.getTrack();
    track.removeEventListener("click", this.handleTrackClick);
    window.removeEventListener("resize", this.handleResize);
  }

  private handleScroll = (): void => {
    if (!this.isDragging) {
      this.updateScrollbar();
    }
  };

  private handleThumbClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  private handleDragStart = (e: MouseEvent): void => {
    this.isDragging = true;
    e.preventDefault();
  };

  private handleDragMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;

    const rect = this.scrollbar.getElement().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;

    const maxScroll = this.container.scrollWidth - this.container.clientWidth;
    this.container.scrollLeft = ratio * maxScroll;
    this.updateScrollbar();
  };

  private handleDragEnd = (): void => {
    this.isDragging = false;
  };

  private handleTrackClick = (e: MouseEvent): void => {
    const rect = this.scrollbar.getElement().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;

    const maxScroll = this.container.scrollWidth - this.container.clientWidth;
    this.container.scrollLeft = ratio * maxScroll;
    this.updateScrollbar();
  };

  private handleResize = (): void => {
    this.updateScrollbar();
  };

  private updateScrollbar = (): void => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const containerWidth = this.container.clientWidth;
      const contentWidth = this.container.scrollWidth;

      if (contentWidth <= containerWidth) {
        this.scrollbar.hide();
        return;
      }

      const scrollRatio =
        this.container.scrollLeft / (contentWidth - containerWidth);
      const thumbWidth = Math.max(
        20,
        (containerWidth / contentWidth) * containerWidth
      );
      console.log(scrollRatio, thumbWidth);
      // 计算滚动条 scrollLeft 比例
      const thumbPosition = scrollRatio * (containerWidth - thumbWidth);
      this.scrollbar.updateThumb(thumbWidth, thumbPosition);

      this.scrollbar.show();
      this.rafId = null;
    });
  };

  update(): void {
    this.updateScrollbar();
  }
}
