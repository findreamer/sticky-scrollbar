import { StickyScrollbarOptions, StickyScrollbarInstance } from "../types";
import { ScrollbarView } from "./scrollbar-view";
import { SyncEngine } from "./sync-engine";
import { EventManager } from "./event-manager";
import { ConfigManager } from "./config-manager";

export class StickyScrollbar implements StickyScrollbarInstance {
  private container: HTMLElement;
  private scrollbar: ScrollbarView;
  private syncEngine: SyncEngine;
  private eventManager: EventManager;
  private config: ConfigManager;

  constructor(
    target: string | HTMLElement,
    options: StickyScrollbarOptions = {}
  ) {
    this.container =
      typeof target === "string"
        ? (document.querySelector(target) as HTMLElement)
        : target;

    if (!this.container) {
      throw new Error("Target container not found");
    }

    // 判断 container 是不是htmlElement元素
    if (!(this.container instanceof HTMLElement)) {
      throw new Error("Target container must be an HTMLElement");
    }

    this.config = new ConfigManager(options, this.container);
    this.eventManager = new EventManager();
    this.scrollbar = new ScrollbarView(this.container, this.config);
    this.syncEngine = new SyncEngine(
      this.container,
      this.scrollbar,
      this.config
    );

    this.init();
  }

  private init(): void {
    this.scrollbar.render();
    this.syncEngine.start();
  }

  destroy(): void {
    this.syncEngine.stop();
    this.scrollbar.destroy();
    this.eventManager.destroy();
  }

  update(): void {
    this.syncEngine.update();
  }

  show(): void {
    this.scrollbar.show();
  }

  hide(): void {
    this.scrollbar.hide();
  }

  getPosition(): number {
    return this.container.scrollLeft;
  }

  setPosition(position: number): void {
    this.container.scrollLeft = position;
  }

  on(event: string, callback: Function): void {
    this.eventManager.on(event, callback);
  }

  off(event: string, callback: Function): void {
    this.eventManager.off(event, callback);
  }
}
