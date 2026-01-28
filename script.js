const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const box = document.querySelector(".buttons");

/* ---------- STATE VARIABLES ---------- */
let dodgeCount = 0;
let switchCount = 0;
let textStage = 0;

const MAX_DODGE = 10;
const MAX_SWITCH = 3;

const sadTexts = [
  "say yes",
  "say yes please",
  "say yes pleassseeeeeeee 🥺"
];

// Original positions
const pos = {
  no: { x: 0, y: 0 },
  yes: { x: 180, y: 0 }
};

// Apply initial positions
noBtn.style.transform = `translate(${pos.no.x}px, ${pos.no.y}px)`;
yesBtn.style.transform = `translate(${pos.yes.x}px, ${pos.yes.y}px)`;

/* ---------- PHASE 1: DODGING ---------- */
function dodge() {
  if (dodgeCount >= MAX_DODGE) return;

  dodgeCount++;

  const boxRect = box.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = boxRect.width - btnRect.width;
  const maxY = boxRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  // Reset after 10 dodges
  if (dodgeCount === MAX_DODGE) {
    setTimeout(() => {
      noBtn.style.transform = `translate(${pos.no.x}px, ${pos.no.y}px)`;
    }, 300);
  }
}

/* Desktop hover */
noBtn.addEventListener("mouseenter", dodge);

/* Mobile touch */
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodge();
});

/* ---------- PHASE 2 & 3: CLICK LOGIC ---------- */
noBtn.addEventListener("click", () => {

  /* PHASE 2 — SWITCH BUTTONS */
  if (dodgeCount >= MAX_DODGE && switchCount < MAX_SWITCH) {
    switchCount++;

    // Swap positions
    const temp = pos.no.x;
    pos.no.x = pos.yes.x;
    pos.yes.x = temp;

    noBtn.style.transform = `translate(${pos.no.x}px, ${pos.no.y}px)`;
    yesBtn.style.transform = `translate(${pos.yes.x}px, ${pos.yes.y}px)`;

    return;
  }

  /* PHASE 3 — TEXT MANIPULATION */
  if (switchCount >= MAX_SWITCH) {
    yesBtn.textContent = sadTexts[textStage];
    textStage++;

    if (textStage === sadTexts.length) {
      resetAll();
    }
  }
});

/* ---------- RESET EVERYTHING ---------- */
function resetAll() {
  dodgeCount = 0;
  switchCount = 0;
  textStage = 0;

  pos.no.x = 0;
  pos.yes.x = 180;

  noBtn.style.transform = `translate(${pos.no.x}px, 0)`;
  yesBtn.style.transform = `translate(${pos.yes.x}px, 0)`;

  yesBtn.textContent = "YES 💖";
}
