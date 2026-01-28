const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsDiv = document.querySelector(".buttons");

let dodgeCount = 0;
const MAX_DODGES = 10;

noBtn.addEventListener("mouseover", () => {
  dodgeCount++;

  const containerRect = buttonsDiv.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // 🔁 Loop back after 10 tries
  if (dodgeCount >= MAX_DODGES) {
    noBtn.style.left = "120px";
    noBtn.style.top = "0";
    dodgeCount = 0;
  }
});

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});
