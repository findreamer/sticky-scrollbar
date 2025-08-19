export interface StickyScrollbarOptions {
  showMode?: "always" | "hover" | "auto";
  autoHideDelay?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  radius?: number;
  opacity?: number;
  zIndex?: number;
  throttle?: number;
  debounce?: number;
  responsive?: boolean;
  className?: string;
  scrollbarWidth?: number;
}

export interface StickyScrollbarInstance {
  destroy(): void;
  update(): void;
  show(): void;
  hide(): void;
  getPosition(): number;
  setPosition(position: number): void;
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}

export interface ScrollSyncMetrics {
  containerScrollLeft: number;
  containerScrollWidth: number;
  containerClientWidth: number;
  scrollRatio: number;
  thumbPosition: number;
}
