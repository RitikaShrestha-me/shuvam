/* Starts every module in order. Data files (../data) load before the modules. */
function initContactLinks() {
  $("mail").href = "mailto:" + CONFIG.email;
  $("mail").textContent = CONFIG.email;
  $("li").href = CONFIG.linkedin;
  $("gh").href = CONFIG.github;
}
/** Portrait in "My story": config.js can override it; falls back to an illustration if the photo is missing. */
function initPortrait() {
  const im = $("portraitImg");
  if (!im) return;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#a3b1c8'/><stop offset='1' stop-color='#2a3550'/></linearGradient></defs><path d='M20 500c0-110 70-150 180-150s180 40 180 150z' fill='url(#g)'/><rect x='165' y='290' width='70' height='80' rx='30' fill='#8393ad'/><ellipse cx='200' cy='210' rx='88' ry='105' fill='url(#g)'/><path d='M112 200c-6-90 50-130 100-125 55 5 92 45 78 125-20-45-60-62-100-60-35 2-60 20-78 60z' fill='#1b2438'/></svg>`;
  if (CONFIG.photo) im.src = CONFIG.photo;
  im.onerror = () => {
    im.onerror = null;
    im.src = "data:image/svg+xml," + encodeURIComponent(svg);
    im.alt = "Portrait placeholder";
  };
}
initTheme();           // light / dark switch
initContactLinks();
initVoiceAgent();      // assistant console: speech, answers, navigation
initAssistantDock();   // floating launcher, bottom-right
initHero();            // robot greeter and quick questions
initHeroReveal();      // hero text appears as you scroll; CV download last
initSocialDock();      // social icons on the right edge
initDashboard();       // "your visit at a glance"
initCvPack();
initPhotoAccess();
initJourneyGlobe();
initBackground();
initPortrait();
initProjects();        // projects on watch
initWorkExplorer();    // explore past work
initAboutBook();
initRopeExperience();
initDetailPage();      // project and past-work pages (#/project/<id>)
// hide links that have no address yet
if (!CONFIG.github || CONFIG.github === "#") $("gh").hidden = true;
