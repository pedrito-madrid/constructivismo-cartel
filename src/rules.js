// Reglas compositivas del cartel constructivista.
// Aquí vive todo lo que define el "estilo". Cambiar un valor cambia el cartel
// sin tocar la lógica de poster.js.

export const RULES = {
  // Formato de proporción A (1 : √2).
  ratio: Math.SQRT2,

  // Ancho del lienzo en unidades SVG. La altura se calcula con ratio.
  width: 1000,

  palette: {
    paper: "#E9E4D8", // papel crema, no blanco puro
    white: "#FFFFFF",
    red: "#D52B1E",
    black: "#111111",
  },

  // Ángulo de la diagonal en grados (0 = horizontal, positivo = sube a la derecha).
  angle: { min: 5, max: 45, default: 25 },

  // Círculo blanco. radius y cx son fracciones del ancho; cyRatio es fracción de la altura.
  circle: { radius: 0.27, cx: 0.62, cyRatio: 0.36 },

  // Cuña roja.
  // tipDepth: cuánto se hunde la punta dentro del círculo (fracción del radio).
  // baseHalfWidth: semiancho de la base, fuera del lienzo (fracción del ancho).
  // length: distancia de la punta a la base (fracción del ancho).
  wedge: { tipDepth: 0.6, baseHalfWidth: 0.35, length: 1.2 },

  // Margen de la banda negra con el texto (fracción del ancho).
  band: { pad: 0.05 },

  type: {
    family: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
    maxLineChars: 12, // caracteres máximos por línea antes de partir
    maxSize: 0.13, // tamaño máximo de letra (fracción del ancho)
    charWidth: 0.62, // ancho medio aproximado de un carácter (fracción del tamaño)
  },

  // Variación máxima que la semilla aplica al círculo (fracción del ancho).
  jitter: 0.03,
};
