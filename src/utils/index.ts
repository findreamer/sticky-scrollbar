/**
 * 获取浏览器滚动条宽度 https://stackoverflow.com/a/13382873
 */

let scrollbarWidth: number;

export function getScrollbarWidth(target: HTMLElement) {
  // if (typeof scrollbarWidth !== "undefined") {
  //   return scrollbarWidth;
  // }
  // Creating invisible container
  const outer = target;
  let cacheVisiblity = outer.style.visibility;
  let cacheOverflow = outer.style.overflow;

  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  // @ts-ignore
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  // @ts-ignore
  outer.removeChild(inner);
  outer.style.visibility = cacheVisiblity;
  outer.style.overflow = cacheOverflow;

  return scrollbarWidth;
}
