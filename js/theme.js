/* Light / dark theme switch. The choice is saved in the browser; until the visitor chooses,
   the system preference is used (the inline script in <head> applies it before first paint). */
function initTheme() {
  const root = document.documentElement,
    btn = $("themeBtn");
  const saved = () => {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  };
  function apply(t, save) {
    root.setAttribute("data-theme", t);
    btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    btn.title = t === "dark" ? "Light theme" : "Dark theme";
    if (save) {
      try {
        localStorage.setItem("theme", t);
      } catch (e) {}
    }
    Bus.emit("theme", t);
  }
  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark", false);
  btn.onclick = () => apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  // follow the system setting until the visitor picks one
  const mq = matchMedia("(prefers-color-scheme: light)");
  const follow = (e) => {
    const s = saved();
    if (s !== "light" && s !== "dark") apply(e.matches ? "light" : "dark", false);
  };
  mq.addEventListener ? mq.addEventListener("change", follow) : mq.addListener && mq.addListener(follow);
}
