import { StickyScrollbarOptions } from "../types";
import { getScrollbarWidth } from "../utils";

export class ConfigManager {
  private options: Required<StickyScrollbarOptions>;
  private container: HTMLElement;

  constructor(userOptions: StickyScrollbarOptions, container: HTMLElement) {
    this.container = container;
    this.options = this.merge(userOptions);
  }

  private merge(
    userOptions: StickyScrollbarOptions
  ): Required<StickyScrollbarOptions> {
    const defaults: Required<StickyScrollbarOptions> = {
      showMode: "auto",
      autoHideDelay: 1000,
      height: 8,
      color: "rgba(0, 0, 0, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      radius: 4,
      opacity: 0.7,
      zIndex: 9999,
      throttle: 16,
      debounce: 100,
      responsive: true,
      className: "",
      scrollbarWidth: getScrollbarWidth(this.container),
    };

    return { ...defaults, ...userOptions };
  }

  get(key?: keyof StickyScrollbarOptions) {
    return key ? this.options[key] : this.options;
  }

  update(
    key: keyof StickyScrollbarOptions,
    value: StickyScrollbarOptions[keyof StickyScrollbarOptions]
  ): void {
    Reflect.set(this.options, key, value);
  }
}
