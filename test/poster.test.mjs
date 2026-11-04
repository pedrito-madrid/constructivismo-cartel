import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPoster, wrapText, mulberry32 } from "../src/poster.js";
import { RULES } from "../src/rules.js";

test("rechaza un eslogan vacío", () => {
  assert.throws(() => buildPoster({ slogan: "   " }), /Escribe un eslogan/);
});

test("genera un SVG con la paleta de las reglas", () => {
  const svg = buildPoster({ slogan: "Construir el mundo nuevo", seed: 1 });
  assert.match(svg, /^<svg /);
  assert.ok(svg.includes(RULES.palette.red));
  assert.ok(svg.includes(RULES.palette.black));
});

test("la misma semilla produce el mismo cartel", () => {
  const a = buildPoster({ slogan: "Libros para todos", seed: 42 });
  const b = buildPoster({ slogan: "Libros para todos", seed: 42 });
  assert.equal(a, b);
});

test("semillas distintas cambian la composición", () => {
  const a = buildPoster({ slogan: "Libros para todos", seed: 1 });
  const b = buildPoster({ slogan: "Libros para todos", seed: 2 });
  assert.notEqual(a, b);
});

test("escapa caracteres especiales del eslogan", () => {
  const svg = buildPoster({ slogan: "A & B <C>" });
  assert.ok(svg.includes("A &amp; B &lt;C&gt;"));
  assert.ok(!svg.includes("<C>"));
});

test("rechaza ángulos fuera de rango", () => {
  assert.throws(() => buildPoster({ slogan: "X", angle: 80 }), /ángulo/);
});

test("wrapText no pierde palabras y respeta el máximo de caracteres", () => {
  const text = "cuña roja contra los blancos y el caos del mundo viejo";
  const lines = wrapText(text, 12);
  assert.equal(lines.join(" "), text);
  assert.ok(lines.every((line) => line.length <= 12));
});

test("mulberry32 es determinista y devuelve valores entre 0 y 1", () => {
  const r1 = mulberry32(7);
  const r2 = mulberry32(7);
  for (let i = 0; i < 100; i++) {
    const v = r1();
    assert.equal(v, r2());
    assert.ok(v >= 0 && v < 1);
  }
});
