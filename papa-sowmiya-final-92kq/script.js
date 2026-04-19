const $ = (id) => document.getElementById(id);

// ===== Elements =====
const startBtn = $("startBtn");
const content = $("content");
const scrollPhotosBtn = $("scrollPhotosBtn");

const stepPages = Array.from(document.querySelectorAll(".step-page"));
const prevStepBtn = $("prevStepBtn");
const nextStepBtn = $("nextStepBtn");
const stepIndicator = $("stepIndicator");

const quoteEl = $("quote");
const quoteBtn = $("quoteBtn");

const surprisesWrap = $("surprises");

const unlockBtn = $("unlockBtn");
const pw = $("pw");
const secretContent = $("secretContent");
const pwMsg = $("pwMsg");

// Music
const bgMusic = $("bgMusic");
const musicBtn = $("musicBtn");

// Heart burst layer
const heartBurstLayer = $("heartBurstLayer");

// Slider elements
const slideImg = $("slideImg");
const slideCap = $("slideCap");
const slideCount = $("slideCount");
const prevPhoto = $("prevPhoto");
const nextPhoto = $("nextPhoto");
const slider = $("slider");
const toggleAuto = $("toggleAuto");
const replayCaps = $("replayCaps");

// ===== Heart burst (JS) =====
function burstHearts(x, y, intensity = 14) {
  if (!heartBurstLayer) return;
  const hearts = ["❤", "💖", "💗", "💞", "💘"];

  for (let i = 0; i < intensity; i++) {
    const el = document.createElement("div");
    el.className = "heart-pop";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const dx = (Math.random() * 240 - 120).toFixed(1) + "px";
    const dy = (Math.random() * 240 - 150).toFixed(1) + "px";
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--dy", dy);

    const size = 14 + Math.random() * 18;
    el.style.fontSize = size.toFixed(0) + "px";

    el.style.left = x + "px";
    el.style.top = y + "px";

    heartBurstLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function burstFromElement(el, intensity = 14) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top + r.height / 2, intensity);
}

// ===== Steps navigation =====
let currentStep = 1;
const totalSteps = stepPages.length || 4;

function showStep(step) {
  if (!stepPages.length) return;

  currentStep = Math.min(Math.max(step, 1), totalSteps);

  stepPages.forEach((page, index) => {
    const isActive = index === currentStep - 1;
    page.classList.toggle("hidden", !isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });

  if (stepIndicator) stepIndicator.textContent = `Page ${currentStep} of ${totalSteps}`;
  if (prevStepBtn) prevStepBtn.disabled = currentStep === 1;
  if (nextStepBtn) nextStepBtn.disabled = currentStep === totalSteps;

  if (content && !content.classList.contains("hidden")) {
    window.scrollTo({ top: content.offsetTop - 10, behavior: "smooth" });
  }
}

if (prevStepBtn) prevStepBtn.addEventListener("click", () => showStep(currentStep - 1));
if (nextStepBtn) nextStepBtn.addEventListener("click", () => showStep(currentStep + 1));

// ===== Reveal main content =====
function revealContent() {
  if (content) content.classList.remove("hidden");
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    revealContent();
    showStep(1);
    startBtn.disabled = true;
    startBtn.textContent = "Surprises unlocked ✅";
    burstFromElement(startBtn, 18);

    // Optional: start music if user already turned it ON later.
  });
}

if (scrollPhotosBtn) {
  scrollPhotosBtn.addEventListener("click", () => {
    revealContent();
    showStep(2);
    burstFromElement(scrollPhotosBtn, 12);
  });
}

// ===== Music control =====
async function setMusic(on) {
  if (!bgMusic || !musicBtn) return;

  if (on) {
    try {
      bgMusic.volume = 0.55;
      await bgMusic.play(); // works after user gesture
      musicBtn.textContent = "Music: ON 🎵";
      musicBtn.classList.remove("off");
    } catch (e) {
      musicBtn.textContent = "Tap again for music 🎵";
      musicBtn.classList.remove("off");
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "Music: OFF";
    musicBtn.classList.add("off");
  }
}

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    const isOn = bgMusic && !bgMusic.paused;
    burstFromElement(musicBtn, 12);
    setMusic(!isOn);
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
  quoteBtn.addEventListener("click", (e) => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    burstHearts(e.clientX, e.clientY, 10);
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

    box.addEventListener("click", (e) => {
      const revealed = box.classList.toggle("revealed");
      box.textContent = revealed ? msg : "❤️ Click to reveal";
      burstHearts(e.clientX, e.clientY, 10);
    });

    surprisesWrap.appendChild(box);
  });
}

// ===== Password unlock =====
const PASSWORD = "papa";
if (unlockBtn && pw && secretContent && pwMsg) {
  unlockBtn.addEventListener("click", (e) => {
    const val = (pw.value || "").trim().toLowerCase();
    if (!val) return;

    if (val === PASSWORD) {
      secretContent.classList.remove("hidden");
      pwMsg.textContent = "Unlocked ❤️";
      burstHearts(e.clientX, e.clientY, 20);
    } else {
      secretContent.classList.add("hidden");
      pwMsg.textContent = "Wrong password—hint: your nickname.";
      burstHearts(e.clientX, e.clientY, 8);
    }
  });
}

// ===== Slider data =====
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
let autoOn = true;
let autoTimer = null;

function setAutoUi() {
  if (!toggleAuto) return;
  toggleAuto.textContent = autoOn ? "Auto: ON ✨" : "Auto: OFF";
  toggleAuto.classList.toggle("off", !autoOn);
}

function showCaption(text) {
  if (!slideCap) return;
  slideCap.textContent = text;

  slideCap.classList.add("show");
  slideCap.classList.remove("fade");

  window.clearTimeout(showCaption._t1);
  showCaption._t1 = window.setTimeout(() => {
    slideCap.classList.add("fade");
    slideCap.classList.remove("show");
  }, 2200);
}

function renderSlide(newIndex) {
  if (!slideImg || !slideCap || !slideCount) return;

  slideCap.classList.add("fade");
  slideCap.classList.remove("show");

  slideImg.classList.add("swap");

  window.setTimeout(() => {
    idx = (newIndex + slides.length) % slides.length;
    slideImg.src = slides[idx].src;
    slideCount.textContent = `${idx + 1} / ${slides.length}`;

    window.setTimeout(() => {
      slideImg.classList.remove("swap");
      showCaption(slides[idx].cap);
    }, 40);
  }, 220);
}

function next() { renderSlide(idx + 1); }
function prev() { renderSlide(idx - 1); }

function stopAuto() {
  if (autoTimer) window.clearInterval(autoTimer);
  autoTimer = null;
}

function startAuto() {
  stopAuto();
  if (!autoOn) return;

  autoTimer = window.setInterval(() => {
    if (currentStep !== 2 || (content && content.classList.contains("hidden"))) return;
    if (slider) {
      const r = slider.getBoundingClientRect();
      burstHearts(r.left + r.width * 0.72, r.top + r.height * 0.70, 6);
    }
    next();
  }, 4200);
}

function stopAutoTemporarily() {
  stopAuto();
  if (autoOn) {
    window.clearTimeout(stopAutoTemporarily._t);
    stopAutoTemporarily._t = window.setTimeout(() => startAuto(), 5000);
  }
}

if (prevPhoto) prevPhoto.addEventListener("click", () => {
  stopAutoTemporarily();
  burstFromElement(prevPhoto, 10);
  prev();
});

if (nextPhoto) nextPhoto.addEventListener("click", () => {
  stopAutoTemporarily();
  burstFromElement(nextPhoto, 10);
  next();
});

document.addEventListener("keydown", (e) => {
  if (!slider) return;
  if (currentStep !== 2 || (content && content.classList.contains("hidden"))) return;
  if (e.key === "ArrowRight") { stopAutoTemporarily(); next(); }
  if (e.key === "ArrowLeft") { stopAutoTemporarily(); prev(); }
});

// Swipe support
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

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      burstHearts(t.clientX, t.clientY, 10);
      if (dx < 0) next();
      else prev();
    }
  });

  // Tap anywhere on slider
  slider.addEventListener("click", (e) => {
    if (e.target === prevPhoto || e.target === nextPhoto) return;
    burstHearts(e.clientX, e.clientY, 8);
  });
}

if (toggleAuto) {
  toggleAuto.addEventListener("click", () => {
    autoOn = !autoOn;
    setAutoUi();
    burstFromElement(toggleAuto, 14);
    if (autoOn) startAuto();
    else stopAuto();
  });
}

if (replayCaps) {
  replayCaps.addEventListener("click", (e) => {
    stopAutoTemporarily();
    burstHearts(e.clientX, e.clientY, 10);
    showCaption(slides[idx].cap);
  });
}

// Init
showStep(1);

if (slideImg && slideCap && slideCount) {
  slideImg.src = slides[0].src;
  slideCount.textContent = `1 / ${slides.length}`;
  showCaption(slides[0].cap);
  setAutoUi();
  startAuto();
}
