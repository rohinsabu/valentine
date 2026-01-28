const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsBox = document.querySelector(".buttons");

let dodgeCount = 0;
const MAX_DODGES = 10;
// Initial position (for reset)
const initialX = 0;
const initialY = 0;

noBtn.addEventListener("mouseenter", () => {
  dodgeCount++;

  const boxRect = buttonsBox.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = boxRect.width - btnRect.width;
  const maxY = boxRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // 🔥 smooth movement using transform
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  // 🔁 reset after 10 tries
  if (dodgeCount >= MAX_DODGES) {
    setTimeout(() => {
      noBtn.style.transform = `translate(${initialX}px, ${initialY}px)`;
      dodgeCount = 0;
    }, 300);
  }
});

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});
