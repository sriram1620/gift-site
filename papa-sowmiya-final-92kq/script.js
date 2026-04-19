// --- helpers ---
const $ = (id) => document.getElementById(id);

// --- elements ---
const startBtn = $("startBtn");
const content = $("content");
const scrollPhotosBtn = $("scrollPhotosBtn");

const quoteEl = $("quote");
const quoteBtn = $("quoteBtn");

const gallery = $("gallery");

const lightbox = $("lightbox");
const closeLb = $("closeLb");
const lbImg = $("lbImg");
const lbCap = $("lbCap");

const surprisesWrap = $("surprises");

const unlockBtn = $("unlockBtn");
const pw = $("pw");
const secretContent = $("secretContent");
const pwMsg = $("pwMsg");

// --- 1) Start / reveal content ---
function revealContent() {
  if (!content) return;
  content.classList.remove("hidden");
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    revealContent();
    startBtn.disabled = true;
    startBtn.textContent = "Surprises unlocked ✅";
    window.scrollTo({ top: content.offsetTop - 10, behavior: "smooth" });
  });
}

if (scrollPhotosBtn) {
  scrollPhotosBtn.addEventListener("click", () => {
    revealContent();
    const photos = $("photos");
    if (photos) photos.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// --- 2) Quote jar ---
const quotes = [
  "You’re my favorite person and my favorite place.",
  "In a world full of chaos, you’re my calm.",
  "I still get butterflies when I see you.",
  "If I had to choose again, I’d still choose you.",
  "With you, even ordinary moments feel magical.",
  "You are the best part of my day.",
];

if (quoteBtn && quoteEl) {
  quoteBtn.addEventListener("click", () => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  });
}

// --- 3) Lightbox (FIXED: force closed on load, robust close handlers) ---
function openLightbox(src, caption = "") {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  if (lbCap) lbCap.textContent = caption;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add("hidden");
  // optional: clear src so it doesn't keep showing previous image
  if (lbImg) lbImg.src = "";
  if (lbCap) lbCap.textContent = "";
}

// Force lightbox closed on page load (prevents the stuck X overlay)
closeLightbox();

// Close button
if (closeLb) closeLb.addEventListener("click", closeLightbox);

// Click outside the inner box closes
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    // close only when clicking the dark overlay, not the inner content
    if (e.target === lightbox) closeLightbox();
  });
}

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Clicking a photo opens the lightbox
if (gallery) {
  gallery.addEventListener("click", (e) => {
    const img = e.target?.closest?.("img");
    if (!img) return;
    openLightbox(img.src, img.dataset.caption || "");
  });
}

// --- 4) Click-to-reveal surprises ---
const surpriseMessages = [
  "Surprise #1: One big hug coupon 🤍",
  "Surprise #2: A date night planned by me 🍽️",
  "Surprise #3: Your favorite snack/drink on me 🧁",
  "Surprise #4: A handwritten letter (I’ll give it to you soon) 💌",
  "Surprise #5: Movie + cuddles night 🎬",
  "Surprise #6: I love you, Papa ❤️",
];

if (surprisesWrap) {
  surprisesWrap.innerHTML = "";
  surpriseMessages.forEach((msg) => {
    const box = document.createElement("div");
    box.className = "surprise";
    box.innerHTML = `<div><div class="heart">❤️</div><div class="sub">Click to reveal</div></div>`;

    box.addEventListener("click", () => {
      const revealed = box.classList.toggle("revealed");
      box.textContent = revealed ? msg : "❤️ Click to reveal";
    });

    surprisesWrap.appendChild(box);
  });
}

// --- 5) Final surprise password ---
const PASSWORD = "papa";

if (unlockBtn && pw && secretContent && pwMsg) {
  unlockBtn.addEventListener("click", () => {
    const val = (pw.value || "").trim().toLowerCase();
    if (!val) return;

    if (val === PASSWORD) {
      secretContent.classList.remove("hidden");
      pwMsg.textContent = "Unlocked ❤️";
    } else {
      secretContent.classList.add("hidden");
      pwMsg.textContent = "Wrong password—hint: your nickname.";
    }
  });
}
