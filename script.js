const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxPanel = document.querySelector("[data-lightbox-panel]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxLocation = document.querySelector("[data-lightbox-location]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const photoLinks = document.querySelectorAll(".photo-card a");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && nav && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("nav-active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-active");
    document.body.classList.remove("nav-open");
  });
}

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

const openLightbox = (link) => {
  const card = link.closest(".photo-card");
  const image = link.querySelector("img");
  if (!card || !image || !lightbox || !lightboxImage || !lightboxLocation || !lightboxTitle || !lightboxCaption) return;

  lightboxImage.src = link.href;
  lightboxImage.alt = image.alt;
  lightboxLocation.textContent = card.querySelector("span")?.textContent || "";
  lightboxTitle.textContent = card.querySelector("h3")?.textContent || "";
  lightboxCaption.textContent = card.querySelector("p")?.textContent || "";

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
};

photoLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLightbox(link);
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxPanel) {
  lightboxPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
