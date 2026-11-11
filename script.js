"use strict";

const IMAGE_FOLDER = "images/";

const SHOW_PLACEHOLDERS = false;

const IMAGES = {
  hero: "hero.jpg",
  story1: "story1.jpg", 
  story2: "story2.jpg", 
  rug1: "rug1.jpg", 
  rug2: "rug2.jpg", 
  rug3: "rug3.jpg",
  col1: "col1.jpg", 
  col2: "col2.jpg", 
  col3: "col3.jpg", 
  craft: "craft.jpg", 
  bgQuote: "bg-quote.jpg", 
};



/* The three collection pieces */
const PIECES = [
  {
    id: "ruby-heritage",
    title: "Ruby Heritage",
    tag: "Hand-knotted · Afghanistan",
    imageKey: "col1",
    palette: 0,
    months: 5,
    story:
      "Knotted over several months by women weavers working on one family loom, this piece carries the red of madder root, a dye Afghan weavers have used for generations. The borders and medallion were set from memory, not from a paper pattern.",
    details: {
      Origin: "Northern Afghanistan",
      Technique: "Hand-knotted wool pile",
      Material: "Hand-spun sheep wool",
      Dyes: "Madder root, indigo, walnut husk",
      Size: "2.0 × 3.0 m",
      "Woven by": "Women weavers, one family loom",
      "Weaving time": "About 5 months",
    },
  },
  {
    id: "old-soul",
    title: "Old Soul",
    tag: "Vintage · one of a kind",
    imageKey: "col2",
    palette: 3,
    months: 4,
    story:
      "Softened by decades of use, Old Soul shows how wool and natural dye age with grace. Its worn spots and small asymmetries are the marks of a home that lived with it, and of the weaver who made it.",
    details: {
      Origin: "Afghan village tradition",
      Technique: "Hand-knotted, vintage",
      Material: "Wool pile, wool foundation",
      Dyes: "Natural plant dyes",
      Size: "1.4 × 2.2 m",
      "Woven by": "A village weaver",
      Age: "Several decades",
    },
  },
  {
    id: "golden-motif",
    title: "Golden Motif",
    tag: "Artisanal · natural tones",
    imageKey: "col3",
    palette: 2,
    months: 3,
    story:
      "A study in warm, earthy tones: the gold of pomegranate rind and the browns of walnut husk. Its repeating motifs are the visual language of Afghan women weavers, small shapes that speak of home, water and protection.",
    details: {
      Origin: "Afghanistan",
      Technique: "Hand-knotted wool pile",
      Material: "Hand-spun wool",
      Dyes: "Pomegranate rind, walnut husk",
      Size: "1.8 × 2.6 m",
      "Woven by": "Women weavers",
      "Weaving time": "About 3 months",
    },
  },
];

/* Crafts of Afghan women (chips in "Our story") */
const CRAFTS = [
  {
    id: "carpet",
    name: "Hand-knotted carpets",
    text: "Afghan women tie every knot by hand on a loom, often at home beside their family. The patterns are carried in memory and passed from mother to daughter.",
  },
  {
    id: "kilim",
    name: "Kilim",
    text: "Flat-woven without a pile. Women weave bold geometric bands with a lighter, quicker technique, used for rugs, bags and cushions.",
  },
  {
    id: "khamak",
    name: "Khamak embroidery",
    text: "A fine embroidery style from the Kandahar region, stitched in silk thread in tiny, dense patterns on dresses, caps and cloths.",
  },
  {
    id: "namad",
    name: "Namad felt",
    text: "Wool pressed and rolled into felt, a nomadic craft. It is decorated with simple natural motifs and traditionally used as a warm floor covering.",
  },
];

/* Steps of making a carpet (tabs in "The craft") */
const PROCESS = [
  {
    title: "Wool",
    text: "Wool is washed, carded and spun by hand, often with a drop spindle. The quality of the yarn decides how a rug will feel for decades.",
  },
  {
    title: "Dye",
    text: "Colour comes from roots, rinds and husks: madder for red, indigo for blue, pomegranate rind for gold. No two batches are exactly alike.",
  },
  {
    title: "Weave",
    text: "Knot by knot, row by row. Many weavers work without a drawn pattern, holding the design in memory. The small irregularities are the signature of a human hand.",
  },
  {
    title: "Finish",
    text: "The rug is cut from the loom, trimmed, washed and dried in the sun. Only then is it ready to travel to a home.",
  },
];

/* =====================================================
   PART 3 — MAIN LOGIC
   Sections: 1 helpers · 2 images · 3 building the page ·
             4 scroll effects · 5 events · 6 form validation · 7 start
   ===================================================== */

/* ---------- 1. HELPERS (functions) ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// While testing on your own computer, skip the browser cache so a
// replaced photo shows up immediately.
const IS_LOCAL = ["", "localhost", "127.0.0.1"].includes(location.hostname);
const withBust = (url) =>
  IS_LOCAL && !/^https?:/i.test(url) ? `${url}?v=${Date.now()}` : url;

/* ---------- 2. IMAGES ---------- */
// Placeholder rug patterns: [background, medallion, accent]
const PALETTES = [
  ["#8e2b2a", "#f1d9a0", "#1a2150"],
  ["#1a2150", "#e2b45e", "#8e2b2a"],
  ["#6e3a1e", "#e8c27a", "#8e2b2a"],
  ["#4f1517", "#e2b45e", "#f1d9a0"],
];

function rugPattern(index) {
  const [a, b, c] = PALETTES[index] || PALETTES[0];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice"><rect width="300" height="400" fill="${a}"/><g fill="none" stroke="${b}" stroke-width="2"><rect x="14" y="14" width="272" height="372"/><rect x="26" y="26" width="248" height="348" stroke="${c}" stroke-width="6"/></g><path d="M150 70l70 130-70 130-70-130z" fill="${c}"/><path d="M150 100l48 100-48 100-48-100z" fill="${a}" stroke="${b}" stroke-width="3"/><path d="M150 135l26 65-26 65-26-65z" fill="${b}"/><circle cx="150" cy="200" r="9" fill="${c}"/><g fill="${b}"><path d="M60 60l12 12-12 12-12-12zM240 60l12 12-12 12-12-12zM60 316l12 12-12 12-12-12zM240 316l12 12-12 12-12-12z"/><circle cx="62" cy="200" r="7"/><circle cx="238" cy="200" r="7"/></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// All file names we will try for one picture (any extension works)
function imageCandidates(name) {
  if (/^https?:\/\//i.test(name)) return [name];
  const base = name.replace(/\.[a-z0-9]+$/i, "");
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
  const list = [
    IMAGE_FOLDER + name,
    ...extensions.map((e) => IMAGE_FOLDER + base + e),
    ...extensions.map((e) => IMAGE_FOLDER + base + e + e), // e.g. rug1.jpg.jpg (hidden extension on Windows)
  ];
  return list.filter((url, i) => list.indexOf(url) === i).map(withBust);
}

// Try the files one after the other until one loads
function tryLoad(urls, done) {
  if (urls.length === 0) return done(null);
  const img = new Image();
  img.onload = () => done(urls[0]);
  img.onerror = () => tryLoad(urls.slice(1), done);
  img.src = urls[0];
}

// Put a picture into an element (the placeholder disappears when found)
function setSlot(el, key, paletteIndex = 0) {
  const name = IMAGES[key];
  const token = (el._token = (el._token || 0) + 1); // ignore old, slower loads
  el.style.backgroundImage = SHOW_PLACEHOLDERS
    ? rugPattern(paletteIndex)
    : "none";
  el.classList.remove("is-empty");
  el.dataset.file = name ? IMAGE_FOLDER + name : `missing: ${key}`;
  if (!name) return;

  tryLoad(imageCandidates(name), (url) => {
    if (token !== el._token) return;
    if (url) {
      el.style.backgroundImage = `url("${url}")`;
      el.classList.remove("is-empty");
    } else {
      el.classList.add("is-empty"); // shows a small label with the file name we looked for
      console.info(`Aqcha: picture not found -> ${IMAGE_FOLDER}${name}`);
    }
  });
}

function loadAllImages() {
  $$("[data-img]").forEach((el) =>
    setSlot(el, el.dataset.img, Number(el.dataset.pal) || 0),
  );
}

/* ---------- 3. BUILDING THE PAGE (DOM + loops + array methods) ---------- */
function renderCollection() {
  const grid = $("#collectionGrid");

  // map() turns every object in PIECES into a card
  grid.innerHTML = PIECES.map(
    (piece, i) => `
    <article class="collection-card reveal" data-id="${piece.id}">
      <span class="collection-number">0${i + 1}</span>
      <div class="slot" data-img="${piece.imageKey}" data-pal="${piece.palette}"></div>
      <div class="collection-overlay">
        <div>
          <small>${piece.tag}</small>
          <strong>${piece.title}</strong>
          <i>Press the arrow to read its story</i>
        </div>
        <button class="card-arrow" type="button" data-id="${piece.id}" aria-label="Open details of ${piece.title}">↗</button>
      </div>
    </article>`,
  ).join("");

  // reduce() adds up the weaving months of all pieces
  const totalMonths = PIECES.reduce((sum, piece) => sum + piece.months, 0);
  $("#collectionTotal").textContent =
    `${PIECES.length} pieces, about ${totalMonths} months of handwork. Each Aqcha piece is unique.`;
}

function renderInterestOptions() {
  const select = $("#fInterest");
  const options = [
    ...PIECES.map((p) => ({ value: p.id, label: p.title })),
    { value: "custom", label: "A custom piece" },
    { value: "general", label: "General question" },
  ];
  options.forEach((o) => select.add(new Option(o.label, o.value)));
}

/* "Crafts of Afghan women" chips */
function showCraft(craft) {
  const panel = $("#craftPanel");
  panel.classList.remove("show");
  panel.innerHTML = `<strong>${craft.name}</strong><p>${craft.text}</p>`;
  requestAnimationFrame(() => panel.classList.add("show"));
}

function renderCrafts() {
  const wrap = $("#craftChips");
  wrap.innerHTML = CRAFTS.map(
    (c, i) =>
      `<button type="button" class="chip${i === 0 ? " active" : ""}" data-craft="${c.id}">${c.name}</button>`,
  ).join("");
  showCraft(CRAFTS[0]);

  wrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", wrap).forEach((c) => c.classList.toggle("active", c === chip));
    showCraft(CRAFTS.find((c) => c.id === chip.dataset.craft)); // find() picks one object
  });
}

/* "The craft" process tabs */
function showStep(index) {
  const step = PROCESS[index];
  $$(".ptab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    tab.setAttribute("aria-selected", i === index);
  });
  $("#processBar").style.width = `${((index + 1) / PROCESS.length) * 100}%`;
  const panel = $("#processPanel");
  panel.classList.remove("show");
  panel.innerHTML = `<b>0${index + 1}</b><strong>${step.title}</strong><p>${step.text}</p>`;
  requestAnimationFrame(() => panel.classList.add("show"));
}

function renderProcess() {
  const tabs = $("#processTabs");
  tabs.innerHTML = PROCESS.map(
    (s, i) =>
      `<button type="button" role="tab" class="ptab" data-step="${i}">${s.title}</button>`,
  ).join("");
  showStep(0);

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".ptab");
    if (tab) showStep(Number(tab.dataset.step));
  });

  // Keyboard: left / right arrows move between steps
  tabs.addEventListener("keydown", (e) => {
    const current = $$(".ptab").findIndex((t) =>
      t.classList.contains("active"),
    );
    let next = current;
    if (e.key === "ArrowRight") next = (current + 1) % PROCESS.length;
    else if (e.key === "ArrowLeft")
      next = (current - 1 + PROCESS.length) % PROCESS.length;
    else return;
    showStep(next);
    $$(".ptab")[next].focus();
  });
}

/* ---------- 4. SCROLL EFFECTS ---------- */
function initScrollEffects() {
  const nav = $(".zaar-nav");
  const progress = $(".scroll-progress");
  const heroBg = $(".hero-bg");
  const unroll = $("#featured");
  const rugs = $$(".rug-feature");

  function update() {
    const y = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;

    nav.classList.toggle("scrolled", y > 45);
    progress.style.setProperty("--sp", maxScroll > 0 ? y / maxScroll : 0);

    if (y < innerHeight * 1.2)
      heroBg.style.transform = `translateY(${y * 0.25}px)`;

    // Three rugs unroll one after the other while you scroll
    const box = unroll.getBoundingClientRect();
    const p = clamp(-box.top / (box.height - innerHeight), 0, 1);
    unroll.style.setProperty("--p", p);
    rugs.forEach((rug, i) => {
      const q = clamp((p - i * 0.14) / 0.58, 0, 1);
      rug.style.setProperty("--q", 1 - Math.pow(1 - q, 3));
    });
  }

  window.addEventListener("scroll", () => requestAnimationFrame(update), {
    passive: true,
  });
  window.addEventListener("resize", update);
  update();
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
    observer.observe(el);
  });
}

/* Soft gold ring that follows the mouse (desktop only) */
function initCursor() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const ring = document.createElement("div");
  ring.className = "cursor";
  document.body.append(ring);

  let x = 0,
    y = 0,
    targetX = 0,
    targetY = 0;
  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    ring.classList.add("on");
  });
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle(
      "big",
      Boolean(
        e.target.closest(
          "a, button, .collection-card, input, select, textarea",
        ),
      ),
    );
  });
  (function follow() {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    ring.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(follow);
  })();
}

/* ---------- 5. EVENTS: collection cards and the details card ---------- */
let rugModal = null;

function fillModal(piece) {
  $("#modalTag").textContent = piece.tag;
  $("#rugModalTitle").textContent = piece.title;
  $("#modalDescription").textContent = piece.story;
  setSlot($("#modalImage"), piece.imageKey, piece.palette);

  // Object.entries() lets us loop over the details object
  $("#modalDetails").innerHTML = Object.entries(piece.details)
    .map(([label, value]) => `<span>${label}</span><strong>${value}</strong>`)
    .join("");

  // filter() keeps the other pieces for the "also in the collection" links
  $("#modalRelated").innerHTML = PIECES.filter((p) => p.id !== piece.id)
    .map(
      (p) =>
        `<button type="button" class="chip chip-light" data-id="${p.id}">${p.title} ↗</button>`,
    )
    .join("");

  $("#modalEnquire").dataset.id = piece.id;
}

function initCollection() {
  const modalEl = $("#rugModal");
  rugModal = window.bootstrap ? new bootstrap.Modal(modalEl) : null;

  // 3D tilt + moving light on each card
  $$(".collection-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const box = card.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;
      const y = (e.clientY - box.top) / box.height;
      card.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 12}deg) rotateX(${(0.5 - y) * 12}deg) translateZ(10px)`;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });

  // Arrow button opens the information card
  $("#collectionGrid").addEventListener("click", (e) => {
    const arrow = e.target.closest(".card-arrow");
    if (!arrow) return;
    const piece = PIECES.find((p) => p.id === arrow.dataset.id);
    if (piece) {
      fillModal(piece);
      rugModal?.show();
    }
  });

  // Links to the other pieces inside the card
  $("#modalRelated").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    const piece = btn && PIECES.find((p) => p.id === btn.dataset.id);
    if (piece) fillModal(piece);
  });

  // "Enquire" preselects the piece in the contact form
  $("#modalEnquire").addEventListener("click", (e) => {
    $("#fInterest").value = e.currentTarget.dataset.id;
  });
}

function initMisc() {
  // Close the mobile menu after choosing a link
  $$(".navbar-nav .nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      const menu = $("#mainNav");
      if (menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    }),
  );
  $("#year").textContent = new Date().getFullYear();
}

/* ---------- 6. FORM VALIDATION ---------- */
// One function per field. Each returns an error text, or "" when the value is fine.
const validators = {
  name(value) {
    const text = value.trim();
    if (text === "") return "Please enter your name.";
    if (text.length < 2) return "Your name needs at least 2 letters.";
    if (!/^[\p{L}\s'.-]+$/u.test(text)) return "Please use letters only.";
    return "";
  },
  email(value) {
    const text = value.trim();
    if (text === "") return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text))
      return "This email does not look right.";
    return "";
  },
  phone(value) {
    const text = value.trim();
    if (text === "") return ""; // optional field
    if (!/^\+?[0-9\s-]{7,15}$/.test(text))
      return "Use 7 to 15 digits, for example +49 170 1234567.";
    return "";
  },
  interest(value) {
    return value === "" ? "Please choose what you are interested in." : "";
  },
  message(value) {
    const length = value.trim().length;
    if (length < 20)
      return `Please write at least 20 characters (${length}/20).`;
    if (length > 600) return "Please keep your message under 600 characters.";
    return "";
  },
  consent(checked) {
    return checked ? "" : "Please agree so we can reply to you.";
  },
};

function checkField(field) {
  const value = field.type === "checkbox" ? field.checked : field.value;
  const error = validators[field.name](value);
  const wrap = field.closest(".field");
  $(".err", wrap).textContent = error;
  wrap.classList.toggle("invalid", error !== "");
  wrap.classList.toggle(
    "valid",
    error === "" && value !== "" && value !== false,
  );
  return error;
}

function initContactForm() {
  const form = $("#contactForm");
  const message = $("#fMessage");
  const counter = $("#msgCount");

  // Live feedback while typing / leaving a field
  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener("blur", () => checkField(field));
    field.addEventListener("input", () => {
      if (field.closest(".field").classList.contains("invalid"))
        checkField(field);
    });
  });
  message.addEventListener("input", () => {
    counter.textContent = `${message.value.length} / 600`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stay on the page

    // Check every field with a loop and collect the broken ones
    const broken = [];
    for (const name of Object.keys(validators)) {
      const field = form.elements[name];
      if (checkField(field) !== "") broken.push(field);
    }

    const status = $("#formStatus");
    if (broken.length > 0) {
      status.textContent = `Please fix ${broken.length} field${broken.length > 1 ? "s" : ""} and try again.`;
      broken[0].focus();
      return;
    }

    // Everything is valid: show a thank-you card
    status.textContent = "";
    const firstName = form.elements.name.value.trim().split(" ")[0];
    const chosen = form.elements.interest.selectedOptions[0].textContent;
    $("#successText").textContent =
      `Thank you, ${firstName}. We received your message about "${chosen}" and will write back to ${form.elements.email.value.trim()}.`;
    form.hidden = true;
    $("#formSuccess").hidden = false;
  });

  $("#sendAnother").addEventListener("click", () => {
    form.reset();
    counter.textContent = "0 / 600";
    $$(".field", form).forEach((f) => {
      f.classList.remove("valid", "invalid");
      $(".err", f).textContent = "";
    });
    $("#formSuccess").hidden = true;
    form.hidden = false;
  });
}

/* ---------- 7. START ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Build content first, then pictures and effects
  renderCollection();
  renderInterestOptions();
  renderCrafts();
  renderProcess();

  loadAllImages();
  initScrollEffects();
  initReveal();
  initCollection();
  initContactForm();
  initCursor();
  initMisc();

  const LOADER_MIN_MS = 6500;
  const closeLoader = () => $(".page-loader")?.classList.add("is-hidden");
  const closeAfterMinimum = () =>
    setTimeout(closeLoader, Math.max(0, LOADER_MIN_MS - performance.now()));
  if (document.readyState === "complete") closeAfterMinimum();
  else window.addEventListener("load", closeAfterMinimum);
  setTimeout(closeLoader, 12000); // safety: never block the site if something loads very slowly
});
