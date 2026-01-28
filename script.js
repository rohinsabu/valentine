const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const box = document.querySelector(".buttons");

/* ---------- STATE ---------- */
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

/* ---------- FIXED POSITIONS ---------- */
// PERFECTLY ALIGNED START POSITIONS
const positions = {
  left: 0,
  right: 180
};

// Apply initial positions
noBtn.style.transform = `translate(${positions.left}px, 0)`;
yesBtn.style.transform = `translate(${positions.right}px, 0)`;

/* ---------- DODGE PHASE ---------- */
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

  if (dodgeCount === MAX_DODGE) {
    setTimeout(() => {
      noBtn.style.transform = `translate(${positions.left}px, 0)`;
    }, 300);
  }
}

/* Desktop + Mobile */
noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  dodge();
});

/* ---------- CLICK LOGIC ---------- */
noBtn.addEventListener("click", () => {

  /* SWITCH PHASE */
  if (dodgeCount >= MAX_DODGE && switchCount < MAX_SWITCH) {
    switchCount++;

    // Swap positions exactly
    const temp = positions.left;
    positions.left = positions.right;
    positions.right = temp;

    noBtn.style.transform = `translate(${positions.left}px, 0)`;
    yesBtn.style.transform = `translate(${positions.right}px, 0)`;

    return;
  }

  /* TEXT PHASE */
  if (switchCount >= MAX_SWITCH) {
    yesBtn.textContent = sadTexts[textStage];
    textStage++;

    if (textStage === sadTexts.length) {
      resetAll();
    }
  }
});

/* ---------- RESET ---------- */
function resetAll() {
  dodgeCount = 0;
  switchCount = 0;
  textStage = 0;

  positions.left = 0;
  positions.right = 180;

  noBtn.style.transform = `translate(${positions.left}px, 0)`;
  yesBtn.style.transform = `translate(${positions.right}px, 0)`;

  yesBtn.textContent = "YES 💖";
}
