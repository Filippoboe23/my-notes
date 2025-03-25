let petalsActive = true;

function createPetal() {
  if (!petalsActive) return;

  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.innerHTML = "❀";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.animationDuration = `${8 + Math.random() * 5}s`;
  petal.style.fontSize = `${Math.random() * 20 + 12}px`;

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 13000);
}

function petalLoop() {
  setInterval(() => {
    if (petalsActive) createPetal();
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  petalLoop();

  // Ascolta eventi custom da React
  window.addEventListener("petals-off", () => {
    petalsActive = false;
  });

  window.addEventListener("petals-on", () => {
    petalsActive = true;
  });
});
