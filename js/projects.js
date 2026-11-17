/* Projects on watch: an auto-rotating showcase driven by data/projects.js.
   Each project shows its demo video, report and photos side by side (only what it has), see js/media.js. */

function flow(nodes) {
  const n = nodes.length,
    gap = 480 / (n - 1),
    y = 50;
  let s = `<svg viewBox='0 0 600 120' role='img' aria-label='Flow: ${nodes.map(esc).join(", ")}'>`;
  for (let i = 0; i < n - 1; i++)
    s += `<line class='ln' x1='${60 + i * gap}' y1='${y}' x2='${60 + (i + 1) * gap}' y2='${y}'/>`;
  nodes.forEach((t, i) => {
    const x = 60 + i * gap;
    s += `<circle class='nd' cx='${x}' cy='${y}' r='15' style='animation-delay:${((i / (n - 1)) * 3.2).toFixed(2)}s'/><text x='${x}' y='${y + 42}'>${esc(t)}</text>`;
  });
  return (
    s +
    `<circle r='5' fill='#f2b840'><animateMotion dur='4s' repeatCount='indefinite' path='M60 ${y} L540 ${y}'/></circle></svg>`
  );
}

const THEMES = {
  all: ["All", "Everything on watch."],
  ai: ["AI & intelligent systems", "Agents, automation and models that act."],
  data: ["Data & experimentation", "Dashboards, risk and sensing the world."],
  product: ["Personal Projects", "Turning an idea into something people use."],
  company: ["Client Projects", "Delivering value for a client or employer."],
};
let cur = 0,
  pinned = rm,
  theme = "all",
  LIST = PROJECTS.slice();
const pjq = $("pjq"),
  pjs = $("pjs");

function storyHTML(p) {
  const f = p.story;
  if (!f) return "";
  const rows = [
    ["Problem", f.prob],
    ["Approach", f.how],
    ["Status", f.status],
  ].filter((r) => r[1]);
  return rows.length
    ? `<dl class='pjstory'>${rows.map((r) => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>`
    : "";
}

function sched() {
  clearTimeout(timer);
  if (pinned || busy || LIST.length < 2) return;
  timer = setTimeout(() => {
    if (pjs.matches(":hover") || pjs.contains(document.activeElement)) sched();
    else show((cur + 1) % LIST.length);
  }, 9000);
}

function show(i) {
  if (!LIST.length) {
    pjs.innerHTML = "<p class='mut'>No projects match this interest yet.</p>";
    return;
  }
  cur = i;
  [...pjq.children].forEach((b, k) => b.setAttribute("aria-selected", k === i));
  const p = LIST[i];
  pjs.innerHTML = `<div class='pjbar ${pinned ? "" : "run"}'></div><button class='pjbadge' type='button' id='pjBadge'><i></i>${pinned ? "PINNED · click to resume" : "ON WATCH"}</button><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>${storyHTML(p)}<div class='pjflow'>${flow(p.nodes)}</div><div class='chips'>${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div><div class='pjactions'><button class='send go' type='button' data-open='${esc(p.id)}'>Read the project page →</button></div>${p.agent ? agentHTML : ""}${mediaHTML(p)}`;
  $("pjBadge").onclick = () => {
    pinned = !pinned;
    show(cur);
  };
  // playing a video pins the project so it does not switch away mid-video
  wireMedia(pjs, p, () => {
    pinned = true;
    clearTimeout(timer);
    const bd = $("pjBadge");
    if (bd) bd.lastChild.textContent = "PINNED · click to resume";
  });
  if (p.agent) wireAgent();
  sched();
}

/** Rebuilds the project list for the chosen interest. */
function renderList() {
  LIST =
    theme === "all"
      ? PROJECTS.slice()
      : PROJECTS.filter((p) => (p.themes || []).includes(theme));
  pjq.innerHTML = "";
  LIST.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.innerHTML = `<i></i><span><small>${esc(p.tag || "")}</small><b>${esc(p.title)}</b></span>`;
    b.onclick = () => {
      pinned = true;
      show(i);
    };
    pjq.appendChild(b);
  });
  $("pfNote").textContent =
    theme === "all"
      ? ""
      : `Showing ${LIST.length} for ${THEMES[theme][0]}: ${THEMES[theme][1]}`;
  show(0);
}

/** Opens a project in the showcase (used by the assistant and shared links). */
function focusProject(id) {
  const k = PROJECTS.findIndex((p) => p.id === id);
  if (k < 0) return;
  if (!LIST.includes(PROJECTS[k])) {
    theme = "all";
    syncFilter();
    renderList();
  }
  pinned = true;
  show(LIST.indexOf(PROJECTS[k]));
}

function syncFilter() {
  [...$("pjFilter").children].forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.t === theme),
  );
}

/** Registers the project list and shows the first project. */
function initProjects() {
  // interest chips: only offer an interest that at least one project has
  const keys = Object.keys(THEMES).filter(
    (k) => k === "all" || PROJECTS.some((p) => (p.themes || []).includes(k)),
  );
  $("pjFilter").innerHTML = keys
    .map(
      (k) =>
        `<button type='button' data-t='${k}' aria-pressed='${k === theme}' title='${esc(THEMES[k][1])}'>${esc(THEMES[k][0])}</button>`,
    )
    .join("");
  if (keys.length < 3) document.querySelector(".pf").hidden = true; // nothing to choose between
  $("pjFilter").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    theme = b.dataset.t;
    pinned = rm;
    syncFilter();
    renderList();
  };
  pjs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) {
      pinned = true;
      openDetail("project", b.dataset.open);
    }
  });
  renderList();
}
