# Duelo Shonen

```
npm install
npm run dev
```

## Cómo se juega

- Elige una ruta antes de cada combate: el dojo recupera HP, explorar reduce el HP rival y revela su punto débil, y acampar con Mika recupera Ki y concede un escudo.
- En combate puedes atacar, analizar para potenciar tu siguiente ataque, defender para reducir daño y recuperar Ki, usar tu técnica o activar la habilidad especial de tu estilo.
- Al subir de nivel, elige entre más HP, más daño o más Ki. La mejora pendiente se conserva si recargas la página.
- El progreso se guarda en el navegador. Desde el menú puedes borrar la partida guardada con confirmación.

La IA (`window.claude`) solo existe dentro de Claude. Fuera de ahi el juego usa turnos de respaldo y el ranking local.
Para IA real, reemplaza las llamadas a `sample.json` en `src/App.jsx` (`act` y `between`) por una llamada a tu backend.
