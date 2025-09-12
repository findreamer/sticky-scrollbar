export type StickyConfig =
  | {
      position: "top";
      /**
       * 滚动条距顶部的偏移量
       */
      offsetTop?: number | string;
    }
  | {
      position: "bottom";
      /**
       * 滚动条距底部的偏移量
       */
      offsetBottom?: number | string;
    };

export interface StickyScrollbarOptions {
  /**
   * 需要浮动滚动条的容器元素
   */
  container: HTMLElement;
  /**
   * 具有溢出内容的元素（默认为容器）
   */
  scrollElement?: HTMLElement;

  stickyConfig?: boolean | StickyConfig;

  /**
   * 是否始终显示滚动条
   */
  alwaysVisible?: boolean;
  /**
   * 滚动条的自定义类名
   */
  scrollbarClass?: string;
  /**
   * 滚动时的回调函数
   */
  onScroll?: Function | null;
}
