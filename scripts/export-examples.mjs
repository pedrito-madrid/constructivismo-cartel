// Genera los carteles de ejemplo en examples/ a partir de la misma semilla y ángulo.
// Uso: node scripts/export-examples.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPoster } from "../src/poster.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "examples");
mkdirSync(outDir, { recursive: true });

const examples = [
  { slogan: "Cuña roja contra el caos", seed: 1, angle: 25 },
  { slogan: "Construir el mundo nuevo", seed: 2, angle: 35 },
  { slogan: "Libros para todos", seed: 3, angle: 15 },
];

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

for (const example of examples) {
  const file = `${slugify(example.slogan)}-s${example.seed}-a${example.angle}.svg`;
  writeFileSync(join(outDir, file), buildPoster(example));
  console.log("escrito", join("examples", file));
}
