const $ = (id) => document.getElementById(id);

// ===== Page controls =====
const startBtn = $("startBtn");
const content = $("content");
const scrollPhotosBtn = $("scrollPhotosBtn");

const quoteEl = $("quote");
const quoteBtn = $("quoteBtn");

const surprisesWrap = $("surprises");

const unlockBtn = $("unlockBtn");
const pw = $("pw");
const secretContent = $("secretContent");
const pwMsg = $("pwMsg");

// Lightbox (kept hidden)
const lightbox = $("lightbox");
const closeLb = $("closeLb");
const lbImg = $("lbImg");
const lbCap = $("lbCap");

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add("hidden");
  if (lbImg) lbImg.src = "";
  if (lbCap) lbCap.textContent = "";
}
closeLightbox();
if (closeLb) closeLb.addEventListener("click", closeLightbox);

// ===== Reveal content =====
function revealContent() {
  if (content) content.classList.remove("hidden");
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    revealContent();
    startBtn.disabled = true;
    startBtn.textContent = "Surprises unlocked ✅";
    if (content) window.scrollTo({ top: content.offsetTop - 10, behavior: "smooth" });
  });
}

if (scrollPhotosBtn) {
  scrollPhotosBtn.addEventListener("click", () => {
    revealContent();
    const photos = $("photos");
    if (photos) photos.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ===== Quote jar =====
const quotes = [
  "You’re my favorite person and my favorite place.",
  "In a world full of chaos, you’re my calm.",
  "I still get butterflies when I see you.",
  "If I had to choose again, I’d still choose you.",
  "With you, even ordinary moments feel magical.",
  "You are the best part of my day."
];

if (quoteBtn && quoteEl) {
  quoteBtn.addEventListener("click", () => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  });
}

// ===== Surprise tiles =====
const surpriseMessages = [
  "Surprise #1: One big hug coupon 🤍",
  "Surprise #2: A date night planned by me 🍽️",
  "Surprise #3: Your favorite snack/drink on me 🧁",
  "Surprise #4: A handwritten letter (I’ll give it to you soon) 💌",
  "Surprise #5: Movie + cuddles night 🎬",
  "Surprise #6: I love you, Papa ❤️"
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

// ===== Password unlock =====
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

// =====================================================
// ===== Swipe/Click Photo Slider (one-by-one) =====
// =====================================================
const slideImg = $("slideImg");
const slideCap = $("slideCap");
const slideCount = $("slideCount");
const prevPhoto = $("prevPhoto");
const nextPhoto = $("nextPhoto");
const slider = $("slider");

const toggleAuto = $("toggleAuto");
const replayCaps = $("replayCaps");

// Ensure these match your images folder names exactly:
const slides = [
  { src: "images/01.jpg", cap: "My favorite kind of day—because you were in it." },
  { src: "images/02.jpg", cap: "Your smile = my peace." },
  { src: "images/03.jpg", cap: "I love you more every day." },
  { src: "images/04.jpg", cap: "Always you." },
  { src: "images/05.jpg", cap: "Thank you for being you." },
  { src: "images/06.jpg", cap: "You make life feel lighter." },
  { src: "images/07.jpg", cap: "This moment is still living in my head rent-free." },
  { src: "images/08.jpg", cap: "More memories with you, please." },
  { src: "images/09.jpg", cap: "My safe place is next to you." },
  { src: "images/10.jpg", cap: "You’re my favorite person." },
  { src: "images/11.jpg", cap: "If love had a face, it would look like you." },
  { src: "images/12.jpg", cap: "I’d choose you again and again." },
  { src: "images/13.jpg", cap: "You’re my best decision." },
  { src: "images/14.jpg", cap: "I love doing life with you." },
  { src: "images/15.jpg", cap: "Your happiness is my favorite thing." },
  { src: "images/16.jpg", cap: "My heart feels full with you." },
  { src: "images/17.jpg", cap: "Cutest chapter of my life." },
  { src: "images/18.jpg", cap: "Forever looks good with you." },
  { src: "images/19.jpg", cap: "Even boring days become special with you." },
  { src: "images/20.jpg", cap: "Happy Birthday, my Papa ❤️" }
];

let idx = 0;
let autoOn = true;     // default ON
let autoTimer = null;

function setAutoUi() {
  if (!toggleAuto) return;
  toggleAuto.textContent = autoOn ? "Auto: ON ✨" : "Auto: OFF";
  toggleAuto.classList.toggle("off", !autoOn);
}

function showCaption(text) {
  if (!slideCap) return;
  slideCap.textContent = text;

  // Pop in
  slideCap.classList.add("show");
  slideCap.classList.remove("fade");

  // Then fade away
  window.clearTimeout(showCaption._t1);
  showCaption._t1 = window.setTimeout(() => {
    slideCap.classList.add("fade");
    slideCap.classList.remove("show");
  }, 2200);
}

function renderSlide(newIndex) {
  if (!slideImg || !slideCap || !slideCount) return;

  // Fade caption immediately when changing
  slideCap.classList.add("fade");
  slideCap.classList.remove("show");

  // Swap animation
  slideImg.classList.add("swap");

  window.setTimeout(() => {
    idx = (newIndex + slides.length) % slides.length;
    slideImg.src = slides[idx].src;
    slideCount.textContent = `${idx + 1} / ${slides.length}`;

    // Fade image back in and show caption
    window.setTimeout(() => {
      slideImg.classList.remove("swap");
      showCaption(slides[idx].cap);
    }, 40);
  }, 220);
}

function next() { renderSlide(idx + 1); }
function prev() { renderSlide(idx - 1); }

// Pause auto for a bit whenever user interacts
function stopAutoTemporarily() {
  stopAuto();
  if (autoOn) {
    window.clearTimeout(stopAutoTemporarily._t);
    stopAutoTemporarily._t = window.setTimeout(() => startAuto(), 5000);
  }
}

if (prevPhoto) prevPhoto.addEventListener("click", () => { stopAutoTemporarily(); prev(); });
if (nextPhoto) nextPhoto.addEventListener("click", () => { stopAutoTemporarily(); next(); });

document.addEventListener("keydown", (e) => {
  if (!slider) return;
  if (e.key === "ArrowRight") { stopAutoTemporarily(); next(); }
  if (e.key === "ArrowLeft") { stopAutoTemporarily(); prev(); }
});

// Swipe
let touchStartX = 0;
let touchStartY = 0;

if (slider) {
  slider.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    stopAutoTemporarily();
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    // horizontal swipe threshold
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  });
}

// Auto-play
function startAuto() {
  stopAuto();
  if (!autoOn) return;
  autoTimer = window.setInterval(() => next(), 4200);
}

function stopAuto() {
  if (autoTimer) window.clearInterval(autoTimer);
  autoTimer = null;
}

if (toggleAuto) {
  toggleAuto.addEventListener("click", () => {
    autoOn = !autoOn;
    setAutoUi();
    if (autoOn) startAuto();
    else stopAuto();
  });
}

if (replayCaps) {
  replayCaps.addEventListener("click", () => {
    stopAutoTemporarily();
    showCaption(slides[idx].cap);
  });
}

// Init
if (slideImg && slideCap && slideCount) {
  slideImg.src = slides[0].src;
  slideCount.textContent = `1 / ${slides.length}`;
  showCaption(slides[0].cap);

  setAutoUi();
  startAuto();
}
