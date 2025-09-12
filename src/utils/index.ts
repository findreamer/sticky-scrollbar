export function convertToPx(value: number | string) {
  if (
    typeof value === "number" &&
    !Number.isNaN(value) &&
    Number.isFinite(value)
  ) {
    return `${value}px`;
  }
  return String(value);
}

export function getScrollbarWidth() {
  var e = document.createElement("div") as HTMLElement,
    sw;
  e.style.position = "absolute";
  e.style.top = "-9999px";
  e.style.width = "100px";
  e.style.height = "100px";
  e.style.overflow = "scroll";
  (e.style as any).msOverflowStyle = "scrollbar";
  document.body.appendChild(e);
  sw = e.offsetWidth - e.clientWidth;
  document.body.removeChild(e);
  return sw;
}
