# Cartel constructivista

Generador de carteles inspirados en el constructivismo ruso (El Lissitzky y Rodchenko, 1919–25). Escribes un eslogan y obtienes un SVG compuesto con reglas explícitas: diagonal, cuña roja, banda negra y tipografía sans en mayúsculas.

## Probarlo

Usa módulos ES, así que no funciona abriendo `index.html` con doble clic. Hay que servir la carpeta:

```bash
python3 -m http.server 8000
```

Después abre <http://localhost:8000>.

## Estructura

```
├── index.html          # interfaz: eslogan, ángulo, semilla, descarga
├── styles.css
├── src/
│   ├── rules.js        # reglas visuales: paleta, proporciones, tipografía
│   ├── poster.js       # genera el SVG a partir de parámetros
│   └── main.js         # conecta la interfaz con el generador
├── test/
│   └── poster.test.mjs # pruebas: entradas inválidas, semillas, escapado
├── scripts/
│   └── export-examples.mjs
├── examples/           # carteles de ejemplo generados por el propio código
└── docs/
    └── notas.md        # decisiones de diseño y referencias
```

## Reglas

Todas las decisiones de estilo están en `src/rules.js`. Cambiar un valor (el color rojo, el tamaño del círculo, la anchura de la cuña) cambia el estilo del cartel sin tocar la lógica de `poster.js`.

## Uso desde código

```js
import { buildPoster } from "./src/poster.js";

const svg = buildPoster({ slogan: "Libros para todos", angle: 25, seed: 3 });
```

Misma semilla y mismo ángulo siempre producen el mismo cartel.

## Pruebas y ejemplos

Requiere Node 18 o superior.

```bash
npm test              # ejecuta las pruebas
npm run examples      # regenera los carteles de examples/
```

## Hoja de ruta

- [ ] Exportar a PDF
- [ ] Texto rotado a lo largo de la diagonal
- [ ] Modo "Berlín, 1922" con formas más abstractas (ver `docs/notas.md`)
- [ ] Publicar en GitHub Pages para tener una demo con enlace

## Licencia

Pendiente de decidir.
