/* Hero: the stage stays pinned while the visitor scrolls, and the text appears step by step
   (headline words, intro, three facts, buttons). The CV download appears last, once the text has finished.
   On small screens there is no pinning: each line fades in as it scrolls into view.
   With reduced motion, or without JavaScript, everything is simply visible. */
function initHeroReveal() {
  const hero = $("hero"),
    copy = $("heroCopy"),
    cue = $("heroCue");
  if (!hero || !copy || rm) return;

  /** Splits an element's text into word spans (keeps nested tags such as <em>). */
  function split(el) {
    (function walk(node) {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(" "));
            else {
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = part;
              frag.appendChild(s);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    return [...el.querySelectorAll(".w")];
  }

  const eyebrow = copy.querySelector(".hero-eyebrow"),
    titleW = split(copy.querySelector(".hero-title")),
    leadW = split(copy.querySelector(".hero-lead")),
    facts = [...copy.querySelectorAll(".hero-facts li")],
    btns = [...copy.querySelectorAll(".hero-cta .btn")],
    cv = $("cvHero");

  // [element, start, length] on a 0..1 scroll timeline, in reading order
  const T = [];
  const spread = (els, a, b) => els.forEach((el, i) => T.push([el, a + ((b - a) * i) / els.length, 0.035]));
  T.push([eyebrow, -0.05, 0.04]); // already there when the page opens
  spread(titleW, 0.02, 0.22);
  spread(leadW, 0.24, 0.54);
  facts.forEach((el, i) => T.push([el, 0.58 + i * 0.085, 0.07]));
  T.push([btns[0], 0.84, 0.05], [btns[1], 0.88, 0.05]);
  T.push([cv, 0.94, 0.05]); // last: the CV download

  const clamp = (v) => Math.max(0, Math.min(1, v));
  const mq = matchMedia("(max-width: 900px)");
  const stick = hero.querySelector(".hero-stick");
  let popped = false;

  function paint(el, v) {
    el.style.opacity = v;
    el.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 16).toFixed(1)}px)`;
    el.toggleAttribute("inert", v < 0.6); // hidden controls cannot be tabbed to
  }

  function update() {
    if (mq.matches) {
      // small screens: reveal by position in the viewport
      const vh = innerHeight;
      const block = (el) => clamp((vh * 0.92 - el.getBoundingClientRect().top) / (vh * 0.14));
      const tb = block(copy.querySelector(".hero-title")),
        lb = block(copy.querySelector(".hero-lead"));
      T.forEach(([el]) => {
        if (el.classList.contains("w")) {
          const isTitle = titleW.includes(el),
            arr = isTitle ? titleW : leadW,
            b = isTitle ? tb : lb;
          paint(el, clamp(b * 1.6 - (arr.indexOf(el) / arr.length) * 0.6));
        } else paint(el, block(el));
      });
      if (!popped && cv && block(cv) >= 1) cv.classList.add("pop"), (popped = true);
      return;
    }
    const range = hero.offsetHeight - stick.offsetHeight,
      scrolled = parseFloat(getComputedStyle(stick).top) - hero.getBoundingClientRect().top,
      p = clamp((scrolled / Math.max(1, range)) * 1.03);
    T.forEach(([el, s, len]) => paint(el, clamp((p - s) / len)));
    if (cue) cue.style.opacity = p < 0.03 ? 1 : 0;
    if (cv && p >= 0.99 && !popped) cv.classList.add("pop"), (popped = true);
    if (cv && p < 0.9) popped = false, cv.classList.remove("pop");
  }

  let raf = 0;
  const tick = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  };
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  hero.classList.add("live");
  update();
}
