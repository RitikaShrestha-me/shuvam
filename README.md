# Shuvam's AI Portfolio

A one-page portfolio with a single flow for every visitor: a hero whose text appears as you scroll (CV download last), a robot greeter, a floating voice and text assistant, projects on watch with demo videos, a research-style page for every project, a filterable archive of past work, a 3D journey globe, a Job Application Agent, a social-links dock on the right edge and a light/dark theme switch. Plain HTML, CSS and JavaScript. No build step.

## Run it

- **Quickest:** double-click `index.html`.
- **Recommended:** `./serve.sh` (Mac/Linux), `serve.bat` (Windows) or `python3 -m http.server 8080`, then open http://localhost:8080. The microphone and YouTube embeds work reliably only this way.

Works offline except Google Fonts and the demo videos.

## Where to change things

| I want to change... | Edit |
| --- | --- |
| Email, social links, CV, photo, n8n and Sheet links | `js/config.js` |
| **Projects on watch**, their detail pages, demo videos, optional links | `data/projects.js` |
| **Past work** (company, freelance, academic, personal) and its detail pages | `data/works.js` |
| Hero text and buttons | `index.html` (`<header class="hero">`); scroll timing in `js/hero-reveal.js` |
| Colours (dark and light) | `css/base.css` (top of the file) |
| Assistant answers and the questions it understands | `js/voice-agent.js` (`KB` list) |

### Add a demo video, report or photos
In `data/projects.js`, on the project:
```js
video: "https://youtu.be/...",                       // YouTube, Google Drive or .mp4 path
report: "assets/projects/glof/report.pdf",          // or { label, url, note } or a list
photos: ["assets/projects/glof/1.jpg", { src: "assets/projects/glof/2.jpg", caption: "Sensor node" }],
```
Video sits on the left, report and photos on the right, on the project card and its page. Anything left out is not shown. Put files in `assets/projects/<id>/`.

### Add links to a project page (optional)
In `data/projects.js` or `data/works.js`, inside `detail`:
```js
links: [{ label: "Source code", url: "https://github.com/...", note: "Repository" }]
```
A "Further reading and resources" section appears only when there is at least one link.

### Add a freelance or company project
Copy the commented example at the bottom of `data/works.js`. Use `kind: "freelance"` and a **Freelance projects** filter appears on its own.

### Share a project page
Every page has an address like `index.html#/project/job-agent` or `#/work/iot-ranger` (use the **Copy link** button).

## Folder map

```
index.html            page markup
css/                  base, hero, assistant, projects, detail, work, intro, about, experience,
                      journey, dashboard, pack, contact, robot  (one file per feature)
data/                 projects.js, works.js  (your content)
js/                   one file per feature; main.js starts them in order
vendor/three.min.js   Three.js, bundled for offline use
assets/               CV, photo, earth texture
```

Script order in `index.html` matters: utils and config first, data next, `main.js` last.

## Notes

- The floating assistant (bottom-right) is available everywhere after the intro. Escape closes it.
- The recruiter entry details go to the Google Sheet configured as `scriptUrl`.
- The front-end checks are conveniences, not security. Return private photo URLs from n8n only after you approve.
