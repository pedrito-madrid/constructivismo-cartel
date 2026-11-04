import { RULES } from "./rules.js";

// Generador pseudoaleatorio con semilla (mulberry32). Misma semilla, mismo cartel.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Parte el texto en líneas de como máximo maxChars caracteres, sin partir palabras.
// Una palabra más larga que maxChars ocupa su propia línea.
export function wrapText(text, maxChars) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const pt = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

// Devuelve el cartel como cadena SVG.
export function buildPoster({ slogan, angle = RULES.angle.default, seed = 1 } = {}) {
  const text = String(slogan ?? "").trim().toUpperCase();
  if (!text) throw new Error("Escribe un eslogan.");
  if (text.length > 80) throw new Error("El eslogan no puede pasar de 80 caracteres.");
  if (angle < RULES.angle.min || angle > RULES.angle.max) {
    throw new Error(`El ángulo debe estar entre ${RULES.angle.min} y ${RULES.angle.max}.`);
  }

  const W = RULES.width;
  const H = W * RULES.ratio;
  const rand = mulberry32(seed);
  const rad = (angle * Math.PI) / 180;

  // Diagonal: vector unitario que sube hacia la derecha (en SVG, y crece hacia abajo).
  const u = { x: Math.cos(rad), y: -Math.sin(rad) };
  // Perpendicular a la diagonal.
  const n = { x: -u.y, y: u.x };

  // Círculo blanco, con una pequeña variación según la semilla.
  const R = W * RULES.circle.radius;
  const cx = W * RULES.circle.cx + (rand() * 2 - 1) * W * RULES.jitter;
  const cy = H * RULES.circle.cyRatio + (rand() * 2 - 1) * W * RULES.jitter;

  // Cuña roja: la punta entra en el círculo desde abajo-izquierda
  // y la base queda fuera del lienzo.
  const depth = R * RULES.wedge.tipDepth;
  const tip = { x: cx - u.x * depth, y: cy - u.y * depth };
  const L = W * RULES.wedge.length;
  const hw = W * RULES.wedge.baseHalfWidth;
  const base = { x: tip.x - u.x * L, y: tip.y - u.y * L };
  const wedgeA = { x: base.x + n.x * hw, y: base.y + n.y * hw };
  const wedgeB = { x: base.x - n.x * hw, y: base.y - n.y * hw };

  // Banda negra con el texto, anclada abajo y ajustada a su contenido.
  const pad = W * RULES.band.pad;
  const lines = wrapText(text, RULES.type.maxLineChars);
  const longest = Math.max(...lines.map((line) => line.length));
  const size = Math.min(
    W * RULES.type.maxSize,
    (W - 2 * pad) / (longest * RULES.type.charWidth)
  );
  const lineH = size * 1.08;
  const blockH = lines.length * lineH;
  const bandTop = H - blockH - 2 * pad;
  const firstBaseline = bandTop + pad + size * 0.85;

  const { paper, white, red, black } = RULES.palette;
  const parts = [
    `<rect width="${W}" height="${H.toFixed(1)}" fill="${paper}"/>`,
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="${white}"/>`,
    `<polygon points="${pt(tip)} ${pt(wedgeA)} ${pt(wedgeB)}" fill="${red}"/>`,
    `<rect x="0" y="${bandTop.toFixed(1)}" width="${W}" height="${(H - bandTop).toFixed(1)}" fill="${black}"/>`,
    ...lines.map(
      (line, i) =>
        `<text x="${pad.toFixed(1)}" y="${(firstBaseline + i * lineH).toFixed(1)}" ` +
        `font-family="${escapeXml(RULES.type.family)}" font-weight="900" ` +
        `font-size="${size.toFixed(1)}" fill="${white}">${escapeXml(line)}</text>`
    ),
  ];

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H.toFixed(1)}" ` +
    `width="${W}" height="${H.toFixed(0)}">\n  ${parts.join("\n  ")}\n</svg>\n`
  );
}
