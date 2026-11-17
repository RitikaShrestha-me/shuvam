
/*
 * photo-access.js
 * Public photo gallery — no approval or authentication required.
 * Photos are loaded directly from the assets folder.
 */

// Photo collection
const PHOTOS = [
  {
    src: "assets/Cultural dress.jpeg",
    caption: "Cultural Dress"
  },
  {
    src: "assets/IOT class.jpg",
    caption: "IOT Class"
  },
  {
    src: "assets/paris.jpg",
    caption: "In Paris"
  },
  {
    src: "assets/Internationa dinner.jpeg",
    caption: "International Dinner"
  },
  {
    src: "assets/VR.jpeg",
    caption: "VR Experience"
  },
  {
    src: "assets/Fair.jpeg",
    caption: "Fair"
  },
];

/**
 * Initialise the public photo gallery.
 */
function initPhotoAccess() {
  const list = PHOTOS
    .map((photo) =>
      typeof photo === "string" ? { src: photo } : photo
    )
    .filter(
      (photo) =>
        photo &&
        photo.src &&
        String(photo.src).trim()
    );

  const tab = $("tPh");
  const gallery = $("gal");

  // Hide Photos tab if no photos are available
  if (!list.length) {
    if (tab) tab.hidden = true;
    return;
  }

  // Display gallery
  gallery.innerHTML = list
    .map(
      (photo, index) => `
        <button
          type="button"
          data-i="${index}"
          aria-label="View photo ${index + 1}"
        >
          <img
            src="${esc(photo.src)}"
            alt="${esc(photo.caption || "Photo of Shuvam")}"
            loading="lazy"
          />
        </button>
      `
    )
    .join("");

  // Open Photos tab automatically
  if (tab) {
    tab.hidden = false;
    tab.click();
  }

  // Handle photo selection and open existing lightbox
  gallery.onclick = (event) => {
    const button = event.target.closest("button[data-i]");

    if (!button) return;

    const index = Number(button.dataset.i);

    openLightbox(
      list.map((photo) => ({
        src: photo.src,
        caption: photo.caption || ""
      })),
      index,
      button
    );
  };
}

// Initialise gallery
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initPhotoAccess
  );
} else {
  initPhotoAccess();
}
