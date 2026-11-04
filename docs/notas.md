# Notas de diseño

## Decisiones

- **Formato 1 : √2.** Es la proporción de la serie A, la que usaban habitualmente los impresos de la época.
- **Paleta cerrada.** Rojo, negro y blanco, más un papel crema. Limitar la paleta hace que cualquier variante se reconozca como del mismo sistema.
- **Un único eje diagonal.** Todo el cartel se organiza alrededor de un ángulo. Así el parámetro de ángulo basta para generar variantes muy distintas.
- **Semilla.** Introduce variaciones pequeñas y reproducibles (posición del círculo). Sirve para explorar sin perder control.
- **Sin dependencias.** El SVG se escribe como texto. No hay librerías de dibujo ni de build, lo que facilita leer el código.

## Referencias

Pendientes de verificar con fuente primaria antes de publicar el README:

- **El Lissitzky, "Bei den Weißen mit dem roten Keil schlagen" (1919).** Motivo central del generador: una cuña roja que penetra un círculo blanco.
- **Rodchenko, carteles y cubiertas, 1919–25.** Referencia para la tipografía sans en mayúsculas y la composición en diagonal. Consultar catálogos de museo o archivos públicos.
- **Novembergruppe, Berlín, desde 1918.** Lissitzky tuvo contacto con ese círculo durante su etapa en Alemania. Confirmar la relación en un catálogo antes de citarla en el README.

## Sobre derechos

El repositorio no reproduce carteles originales. Genera composiciones nuevas a partir de reglas. Lissitzky murió en 1941 y Rodchenko en 1956; las obras de Rodchenko pueden seguir protegidas en algunos países, así que conviene no incluir imágenes de los originales.
