/* Media shown on a project: demo video, report(s) and photos, side by side.
   Fields (all optional, in data/projects.js or data/works.js):
     video    "https://youtu.be/..."  |  Google Drive link  |  "assets/projects/x/demo.mp4"
     report   "assets/projects/x/report.pdf"  |  { label, url }  |  [ { label, url, note }, ... ]
     photos   [ "assets/projects/x/1.jpg", { src: "...", caption: "..." }, ... ]
   Whatever is missing is simply not drawn: no empty boxes, no "coming soon". */

/** Turns a YouTube or Google Drive link into an embeddable address. */
function embedUrl(u) {
  u = String(u).trim();
  let m;
  if ((m = u.match(/youtu\.be\/([\w-]{6,})/)) || (m = u.match(/[?&]v=([\w-]{6,})/)) || (m = u.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/)))
    return "https://www.youtube-nocookie.com/embed/" + m[1];
  if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return "https://drive.google.com/file/d/" + m[1] + "/preview";
  return u;
}
const isVideoFile = (u) => /\.(mp4|webm|ogg)(\?|$)/i.test(u);

function fileKind(u) {
  const m = String(u).split(/[?#]/)[0].match(/\.(\w{2,5})$/);
  const e = m ? m[1].toLowerCase() : "";
  return { pdf: "PDF", doc: "DOC", docx: "DOC", ppt: "PPT", pptx: "PPT", xls: "XLS", xlsx: "XLS" }[e] || (/^https?:/i.test(u) ? "LINK" : "FILE");
}
function fileLabel(u) {
  const seg = decodeURIComponent(String(u).split(/[?#]/)[0].split("/").filter(Boolean).pop() || "");
  const name = seg.replace(/\.\w{2,5}$/, "").replace(/[-_]+/g, " ").trim();
  return name && !/^(view|preview|edit)$/i.test(name) ? name.charAt(0).toUpperCase() + name.slice(1) : "Project report";
}
function mediaReports(v) {
  return (v == null ? [] : Array.isArray(v) ? v : [v])
    .map((x) => (typeof x === "string" ? { url: x } : x))
    .filter((x) => x && x.url && String(x.url).trim())
    .map((x) => ({ url: String(x.url).trim(), label: x.label || fileLabel(x.url), note: x.note || "" }));
}
function mediaPhotos(v) {
  return (v == null ? [] : Array.isArray(v) ? v : [v])
    .map((x) => (typeof x === "string" ? { src: x } : x))
    .filter((x) => x && x.src && String(x.src).trim())
    .map((x) => ({ src: String(x.src).trim(), caption: x.caption || "" }));
}

/** The media block of an item; an empty string when it has nothing to show. */
function mediaHTML(it) {
  const video = it.video ? String(it.video).trim() : "",
    reps = mediaReports(it.report),
    photos = mediaPhotos(it.photos);
  if (!video && !reps.length && !photos.length) return "";
  const vid = video
    ? `<div class='mvid'><h4>Demo video</h4><div class='vframe' data-vframe><button class='vplay' type='button' data-play><span aria-hidden='true'>▶</span> Watch the demo video</button></div></div>`
    : "";
  const repHtml = reps.length
    ? `<div><h4>${reps.length > 1 ? "Reports" : "Report"}</h4><div class='mreps'>${reps
        .map(
          (r) =>
            `<a class='rep' href='${esc(r.url)}' target='_blank' rel='noopener'><span class='ic'>${fileKind(r.url)}</span><span><b>${esc(r.label)}</b>${r.note ? `<small>${esc(r.note)}</small>` : ""}</span><span class='go'>Open ↗</span></a>`,
        )
        .join("")}</div></div>`
    : "";
  const phHtml = photos.length
    ? `<div><h4>Photos</h4><div class='mgal'>${photos
        .map((p, i) => `<button type='button' data-ph='${i}' aria-label='View photo ${i + 1}${p.caption ? ": " + esc(p.caption) : ""}'><img src='${esc(p.src)}' alt='${esc(p.caption || "Project photo " + (i + 1))}' loading='lazy' /></button>`)
        .join("")}</div></div>`
    : "";
  const side = repHtml + phHtml;
  return `<div class='pjmedia${vid && side ? " two" : ""}'>${vid}${side ? `<div class='mside'>${side}</div>` : ""}</div>`;
}

/** Makes the play button and photo thumbnails inside `root` work. onPlay runs when a video starts. */
function wireMedia(root, it, onPlay) {
  const play = root.querySelector("[data-play]");
  if (play)
    play.onclick = () => {
      const box = play.closest("[data-vframe]"),
        u = String(it.video).trim();
      box.innerHTML = isVideoFile(u)
        ? `<video controls autoplay playsinline src='${esc(u)}'></video>`
        : `<iframe src='${esc(embedUrl(u))}' title='${esc(it.title)} demo video' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen loading='lazy'></iframe><p class='mut'><a href='${esc(u)}' target='_blank' rel='noopener'>Open the video in a new tab</a> if it does not load.</p>`;
      if (onPlay) onPlay();
    };
  const photos = mediaPhotos(it.photos);
  root.querySelectorAll("[data-ph]").forEach((b) => (b.onclick = () => openLightbox(photos, +b.dataset.ph, b)));
}

// ---- photo lightbox ----
const LB = { el: null, list: [], i: 0, from: null };
function openLightbox(list, i, from) {
  if (!LB.el) {
    LB.el = document.createElement("div");
    LB.el.className = "lb";
    LB.el.hidden = true;
    LB.el.setAttribute("role", "dialog");
    LB.el.setAttribute("aria-modal", "true");
    LB.el.setAttribute("aria-label", "Photo viewer");
    LB.el.innerHTML = `<img alt='' /><p></p><button type='button' class='lb-x' aria-label='Close'>×</button><button type='button' class='lb-p' aria-label='Previous photo'>‹</button><button type='button' class='lb-n' aria-label='Next photo'>›</button>`;
    document.body.appendChild(LB.el);
    LB.el.querySelector(".lb-x").onclick = closeLightbox;
    LB.el.querySelector(".lb-p").onclick = () => lbGo(-1);
    LB.el.querySelector(".lb-n").onclick = () => lbGo(1);
    LB.el.addEventListener("click", (e) => {
      if (e.target === LB.el) closeLightbox();
    });
    // capture phase: Escape closes the viewer first, not the project page behind it
    addEventListener(
      "keydown",
      (e) => {
        if (LB.el.hidden) return;
        if (e.key === "Escape") (e.stopImmediatePropagation(), e.preventDefault(), closeLightbox());
        else if (e.key === "ArrowLeft") lbGo(-1);
        else if (e.key === "ArrowRight") lbGo(1);
      },
      true,
    );
  }
  LB.list = list;
  LB.i = i;
  LB.from = from;
  LB.el.hidden = false;
  lbShow();
  LB.el.querySelector(".lb-x").focus({ preventScroll: true });
}
function lbShow() {
  const p = LB.list[LB.i];
  LB.el.querySelector("img").src = p.src;
  LB.el.querySelector("img").alt = p.caption || "Project photo";
  LB.el.querySelector("p").textContent = p.caption || "";
  const many = LB.list.length > 1;
  LB.el.querySelector(".lb-p").hidden = LB.el.querySelector(".lb-n").hidden = !many;
}
function lbGo(d) {
  LB.i = (LB.i + d + LB.list.length) % LB.list.length;
  lbShow();
}
function closeLightbox() {
  LB.el.hidden = true;
  if (LB.from && LB.from.focus) LB.from.focus({ preventScroll: true });
}
