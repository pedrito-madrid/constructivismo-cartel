import { buildPoster } from "./poster.js";
import { RULES } from "./rules.js";

const el = {
  slogan: document.getElementById("slogan"),
  angle: document.getElementById("angle"),
  angleOut: document.getElementById("angle-out"),
  seed: document.getElementById("seed"),
  shuffle: document.getElementById("shuffle"),
  download: document.getElementById("download"),
  error: document.getElementById("error"),
  preview: document.getElementById("preview"),
};

// Los límites del ángulo viven en rules.js, no en el HTML.
el.angle.min = RULES.angle.min;
el.angle.max = RULES.angle.max;
el.angle.value = RULES.angle.default;

let currentSvg = null;

function render() {
  el.angleOut.textContent = `${el.angle.value}°`;
  try {
    currentSvg = buildPoster({
      slogan: el.slogan.value,
      angle: Number(el.angle.value),
      seed: Number(el.seed.value) || 1,
    });
    el.preview.innerHTML = currentSvg;
    el.error.textContent = "";
    el.download.disabled = false;
  } catch (err) {
    currentSvg = null;
    el.error.textContent = err.message;
    el.download.disabled = true;
  }
}

el.slogan.addEventListener("input", render);
el.angle.addEventListener("input", render);
el.seed.addEventListener("input", render);

el.shuffle.addEventListener("click", () => {
  el.seed.value = Math.floor(Math.random() * 99999) + 1;
  render();
});

el.download.addEventListener("click", () => {
  if (!currentSvg) return;
  const url = URL.createObjectURL(new Blob([currentSvg], { type: "image/svg+xml" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `cartel-s${el.seed.value}-a${el.angle.value}.svg`;
  a.click();
  URL.revokeObjectURL(url);
});

render();
