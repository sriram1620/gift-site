const startBtn = document.getElementById("startBtn");
const content = document.getElementById("content");
const scrollPhotosBtn = document.getElementById("scrollPhotosBtn");

startBtn.addEventListener("click", () => {
  content.classList.remove("hidden");
  startBtn.disabled = true;
  startBtn.textContent = "Surprises unlocked ✅";
  window.scrollTo({ top: content.offsetTop - 10, behavior: "smooth" });
});

scrollPhotosBtn.addEventListener("click", () => {
  const photos = document.getElementById("photos");
  content.classList.remove("hidden");
  photos.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Quotes
const quotes = [
  "You’re my favorite person and my favorite place.",
  "In a world full of chaos, you’re my calm.",
  "I still get butterflies when I see you.",
  "If I had to choose again, I’d still choose you.",
  "With you, even ordinary moments feel magical.",
  "You are the best part of my day."
];
const quoteEl = document.getElementById("quote");
document.getElementById("quoteBtn").addEventListener("click", () => {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
document.getElementById("closeLb").addEventListener("click", () => lightbox.classList.add("hidden"));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.add("hidden"); });

document.getElementById("gallery").addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  lbImg.src = e.target.src;
  lbImg.alt = e.target.alt || "Photo";
  lbCap.textContent = e.target.dataset.caption || "";
  lightbox.classList.remove("hidden");
});

// Click-to-reveal surprises
const surpriseMessages = [
  "Surprise #1: One big hug coupon 🤍",
  "Surprise #2: A date night planned by me 🍽️",
  "Surprise #3: Your favorite snack/drink on me 🧁",
  "Surprise #4: A handwritten letter (I’ll give it to you soon) 💌",
  "Surprise #5: Movie + cuddles night 🎬",
  "Surprise #6: I love you, Papa ❤️"
];
const surprisesWrap = document.getElementById("surprises");
surpriseMessages.forEach((msg) => {
  const box = document.createElement("div");
  box.className = "surprise";
  box.innerHTML = `<div><div class="heart">❤️</div><div class="sub">Click to reveal</div></div>`;
  box.addEventListener("click", () => {
    box.classList.toggle("revealed");
    box.textContent = box.classList.contains("revealed") ? msg : "❤️ Click to reveal";
  });
  surprisesWrap.appendChild(box);
});

// Secret password: Papa
const unlockBtn = document.getElementById("unlockBtn");
const pw = document.getElementById("pw");
const secretContent = document.getElementById("secretContent");
const pwMsg = document.getElementById("pwMsg");
const PASSWORD = "papa";

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
