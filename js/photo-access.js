/* Private photo collection unlocked by Telegram approval via n8n. The visitor first says who they are (name, company, email). */
/** Wires the photo request flow. */
// function initPhotoAccess() {
//   const st = $("phSt");
//   // photo access via Telegram approval
//   function show(urls) {
//     $("phLock").hidden = true;
//     $("phDemo").hidden = true;
//     st.textContent = "Access approved.";
//     const g = $("gal");
//     g.innerHTML = "";
//     (urls && urls.length ? urls : Array(6).fill(null)).forEach((u) => {
//       let n;
//       if (u) {
//         n = document.createElement("img");
//         n.src = u;
//         n.alt = "Professional photo of Shuvam";
//         n.loading = "lazy";
//       } else n = document.createElement("div");
//       g.appendChild(n);
//     });
//   }
//   const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
//   $("phForm").onsubmit = async (e) => {
//     e.preventDefault();
//     const err = $("rErr"),
//       btn = $("phReq"),
//       name = $("rName").value.trim(),
//       company = $("rCo").value.trim(),
//       email = $("rMail").value.trim();
//     if (!name || !company) return void (err.textContent = "Enter your name and company.");
//     if (!EMAIL.test(email)) return void (err.textContent = "Enter a valid email address. Personal addresses such as Gmail are fine.");
//     err.textContent = "";
//     window.visitor = { name, company, email };
//     btn.disabled = true;
//     // note who asked, in the same Google Sheet the portfolio has always used
//     if (CONFIG.scriptUrl)
//       fetch(CONFIG.scriptUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(window.visitor) }).catch(() => {});
//     if (!CONFIG.photoRequestUrl) {
//       st.textContent =
//         "Demo mode: Telegram is not connected yet. Waiting for approval...";
//       $("phDemo").hidden = false;
//       return;
//     }
//     st.textContent = "Sending your request to Shuvam on Telegram...";
//     try {
//       const r = await fetch(CONFIG.photoRequestUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(window.visitor),
//       });
//       const j = await r.json();
//       if (!r.ok || !j.id) throw 0;
//       st.textContent = "Waiting for Shuvam to approve on Telegram...";
//       const poll = setInterval(async () => {
//         try {
//           const s = await (
//             await fetch(
//               CONFIG.photoStatusUrl + "?id=" + encodeURIComponent(j.id),
//             )
//           ).json();
//           if (s.status === "approved") {
//             clearInterval(poll);
//             show(s.photos);
//           } else if (s.status === "denied") {
//             clearInterval(poll);
//             st.textContent =
//               "Access was not granted this time. You can still reach Shuvam from the CV and links tab.";
//           }
//         } catch (e) {}
//       }, 3000);
//     } catch (e) {
//       st.textContent =
//         "Could not reach the approval service. Try again shortly.";
//       btn.disabled = false;
//     }
//   };
//   $("phDemo").onclick = () => show(CONFIG.photos);
// }

/* Photos tab: an open gallery driven by data/photos.js. No request or approval needed.
   With no photos listed, the tab is hidden. */
function initPhotoAccess() {
  const list = (typeof PHOTOS !== "undefined" ? PHOTOS : [])
    .map((x) => (typeof x === "string" ? { src: x } : x))
    .filter((x) => x && x.src && String(x.src).trim());
  const tab = $("tPh"),
    g = $("gal");
  if (!list.length) {
    tab.hidden = true; // nothing to show, so no tab
    return;
  }
  g.innerHTML = list
    .map(
      (p, i) =>
        `<button type='button' data-i='${i}' aria-label='View photo ${i + 1}${p.caption ? ": " + esc(p.caption) : ""}'><img src='${esc(p.src)}' alt='${esc(p.caption || "Photo of Shuvam")}' loading='lazy' /></button>`,
    )
    .join("");
  tab.click(); // photos are the first thing shown in this section
  g.onclick = (e) => {
    const b = e.target.closest("button[data-i]");
    if (b) openLightbox(list.map((p) => ({ src: p.src, caption: p.caption || "" })), +b.dataset.i, b);
  };
}