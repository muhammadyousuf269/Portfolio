/* ============================================================
   Muhammad Yousuf — Portfolio interactions
   ============================================================ */

/* ------------------------------------------------------------------
   GALLERY DATA
   ------------------------------------------------------------------
   To add your real thumbnails:
     1. Drop your image files into the /images folder
        (e.g. images/boss-fight.jpg — 1280x720 looks best)
     2. Edit the items below: set "img" to the file path and update
        the title / desc / cat.
   Items without an "img" show a styled placeholder so the layout
   still looks complete until you add the real artwork.
------------------------------------------------------------------- */
const GALLERY = [
  {
    title: "Burning Leads",
    cat: "business",
    img: "images/burning-leads.png",
    desc: "Burning-paper hook for a lead-generation video.",
  },
  {
    title: "ChatGPT Income",
    cat: "tech",
    img: "images/chat-gpt.png",
    desc: "Make-money-with-AI concept built around a bold earnings hook.",
  },
  {
    title: "AI For Humans",
    cat: "tech",
    img: "images/ai-for-humans.png",
    desc: "Clean explainer design for an AI-tools channel.",
  },
  {
    title: "TikTok Viral Niches",
    cat: "business",
    img: "images/tiktok-viral.png",
    desc: "TikTok ad-revenue breakdown with a money-focused visual hook.",
  },
  {
    title: "Top 10 Products — Feb",
    cat: "business",
    img: "images/top-10-product-feb.png",
    desc: "E-commerce listicle thumbnail engineered for clicks.",
  },
  {
    title: "Nitish Rajput — Latent",
    cat: "creators",
    img: "images/nitish-rajput-latent.png",
    desc: "Documentary-style episode art with crime-scene energy.",
  },
  {
    title: "Azad Chaiwala",
    cat: "creators",
    img: "images/azad-chaiwala.png",
    desc: "Thought-leader episode design for Azad Chaiwala's channel.",
  },
  {
    title: "Daniel Amegatcher",
    cat: "creators",
    img: "images/daniel-amegatcher.png",
    desc: "Finance commentary thumbnail for Daniel Amegatcher.",
  },
  {
    title: "Rise Above",
    cat: "creators",
    img: "images/rise-above.png",
    desc: "Cinematic superhero-movie design for the Rise Above series.",
  },
  {
    title: "TPC Podcast",
    cat: "creators",
    img: "images/tpc-podcast.png",
    desc: "Podcast episode design with a bold Yes/No hook.",
  },
];

/* Placeholder gradient + emoji pairs so unfinished items still look designed */
const PH = [
  { bg: "linear-gradient(135deg, #7c3aed, #db2777 60%, #f59e0b)", emoji: "🎮" },
  { bg: "linear-gradient(135deg, #0891b2, #2563eb 55%, #a855f7)", emoji: "📱" },
  { bg: "linear-gradient(135deg, #0f172a, #312e81 50%, #db2777)", emoji: "😱" },
  { bg: "linear-gradient(135deg, #065f46, #0ea5e9 60%, #a855f7)", emoji: "🏆" },
  { bg: "linear-gradient(135deg, #1e293b, #b91c1c 55%, #f97316)", emoji: "⚙️" },
  { bg: "linear-gradient(135deg, #581c87, #ec4899 55%, #fde047)", emoji: "🔥" },
  { bg: "linear-gradient(135deg, #0c4a6e, #22d3ee 50%, #f472b6)", emoji: "✈️" },
  { bg: "linear-gradient(135deg, #14532d, #22c55e 50%, #facc15)", emoji: "⛏️" },
];

const CAT_LABELS = { tech: "AI & Tech", business: "Business", creators: "Creators" };

/* ------------------------------------------------------------------
   Render gallery
   ------------------------------------------------------------------ */
const galleryEl = document.getElementById("gallery");

function renderGallery(items) {
  galleryEl.innerHTML = "";
  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "g-item";
    card.style.setProperty("--d", `${(i % 6) * 0.07}s`);
    card.dataset.cat = item.cat;
    card.dataset.index = GALLERY.indexOf(item);

    const ph = PH[i % PH.length];

    if (item.img) {
      const img = document.createElement("img");
      img.className = "g-ph";
      img.src = item.img;
      img.alt = item.title;
      img.loading = "lazy";
      img.onerror = () => {
        img.replaceWith(buildPlaceholder(item, ph));
      };
      card.appendChild(img);
    } else {
      card.appendChild(buildPlaceholder(item, ph));
    }

    card.appendChild(buildOverlay(item));
    card.addEventListener("click", () => openLightbox(GALLERY.indexOf(item)));
    galleryEl.appendChild(card);
  });
}

function buildPlaceholder(item, ph) {
  const div = document.createElement("div");
  div.className = "g-placeholder";
  div.style.background = ph.bg;
  div.innerHTML = `
    <span class="g-emoji">${ph.emoji}</span>
    <span class="g-ptitle">${item.title.toUpperCase()}</span>
  `;
  return div;
}

function buildOverlay(item) {
  const div = document.createElement("div");
  div.className = "g-overlay";
  div.innerHTML = `
    <span class="g-tag">${CAT_LABELS[item.cat] || item.cat}</span>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  `;
  return div;
}

/* ------------------------------------------------------------------
   Filters
   ------------------------------------------------------------------ */
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".g-item").forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("hide", !show);
    });
  });
});

/* ------------------------------------------------------------------
   Lightbox
   ------------------------------------------------------------------ */
const lightbox = document.getElementById("lightbox");
const lbStage = document.getElementById("lbStage");
let current = 0;

function openLightbox(index) {
  current = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function updateLightbox() {
  const item = GALLERY[current];
  const ph = PH[current % PH.length];
  const media = item.img
    ? `<img class="g-ph" src="${item.img}" alt="${item.title}" />`
    : `<div class="lb-placeholder" style="background:${ph.bg}">
         <span class="g-emoji">${ph.emoji}</span>
         <span class="g-ptitle">${item.title.toUpperCase()}</span>
       </div>`;
  lbStage.innerHTML = `
    <div class="lb-media">${media}</div>
    <figcaption class="lb-caption">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </figcaption>
  `;
}

function stepLightbox(dir) {
  current = (current + dir + GALLERY.length) % GALLERY.length;
  updateLightbox();
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

/* ------------------------------------------------------------------
   Nav: scroll state + mobile menu
   ------------------------------------------------------------------ */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ------------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------------ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ------------------------------------------------------------------
   Skill bars animate in
   ------------------------------------------------------------------ */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar i").forEach((bar) => {
          bar.classList.add("animated");
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
const skillsBox = document.querySelector(".skills");
if (skillsBox) skillObserver.observe(skillsBox);

/* ------------------------------------------------------------------
   Contact form — opens the visitor's email app pre-filled
   ------------------------------------------------------------------ */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const CONTACT_EMAIL = "muhammadyousuf7465@gmail.com";

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const channel = document.getElementById("channel").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    contactForm.querySelectorAll("[required]").forEach((el) => {
      if (!el.value.trim()) {
        el.style.borderColor = "#f87171";
        el.addEventListener("input", () => (el.style.borderColor = ""), { once: true });
      }
    });
    return;
  }

  const subject = encodeURIComponent(`Thumbnail inquiry from ${name}`);
  const body = encodeURIComponent(
    `Hi Muhammad,\n\nName: ${name}\nEmail: ${email}\nChannel/Niche: ${channel || "—"}\n\n${message}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formSuccess.hidden = false;
});

/* ------------------------------------------------------------------
   Footer year
   ------------------------------------------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();

/* Initial render */
renderGallery(GALLERY);

/* ------------------------------------------------------------------
   Hero background — full-bleed moving wall of real thumbnails
   (four rows of tiles drifting in alternating directions)
   ------------------------------------------------------------------ */
(function buildHeroBackground() {
  const wrap = document.querySelector(".hero-bg");
  if (!wrap) return;
  const tiles = GALLERY.map((g) => g.img);
  if (!tiles.length) return;

  const rows = [
    { dir: "normal", dur: 70 },
    { dir: "reverse", dur: 52 },
    { dir: "normal", dur: 84 },
    { dir: "reverse", dur: 60 },
  ];

  wrap.innerHTML = "";
  rows.forEach((row, r) => {
    const rowEl = document.createElement("div");
    rowEl.className = "bgrow";

    const scroll = document.createElement("div");
    scroll.className = "bgscroll";
    scroll.style.animationDuration = row.dur + "s";
    scroll.style.animationDirection = row.dir;

    // two identical sets => seamless -50% loop
    for (let s = 0; s < 2; s++) {
      const set = document.createElement("div");
      set.className = "bgset";
      for (let i = 0; i < 7; i++) {
        const img = document.createElement("img");
        img.src = tiles[(i * 3 + r * 2 + s * 5) % tiles.length];
        img.alt = "";
        img.decoding = "async";
        set.appendChild(img);
      }
      scroll.appendChild(set);
    }
    rowEl.appendChild(scroll);
    wrap.appendChild(rowEl);
  });
})();

/* ------------------------------------------------------------------
   FAQ accordion
   ------------------------------------------------------------------ */
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-q");
  btn.addEventListener("click", () => {
    const open = item.classList.contains("open");
    faqItems.forEach((o) => {
      o.classList.remove("open");
      o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });
    if (!open) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});
