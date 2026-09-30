export const ST={Fuego:['🔥','Golpes devastadores'],Rayo:['⚡','Velocidad extrema'],Viento:['🌪️','Técnica y evasión']};
export const STYLE_MOVES={
 Fuego:{name:'Llama explosiva',cost:25,description:'Aumenta mucho el daño de este turno.'},
 Rayo:{name:'Paso relámpago',cost:20,description:'Reduce mucho el daño recibido este turno.'},
 Viento:{name:'Guardia ciclónica',cost:18,description:'Aumenta el daño y reduce el daño recibido.'}
};
export const ROUTES=[
 {id:'dojo',name:'Dojo del Alba',icon:'🥋',description:'Entrena y recupera 30 HP antes del próximo combate.',advice:'El entrenamiento te fortalece. ¡Usa tu técnica con precisión!'},
 {id:'scout',name:'Ruta de exploración',icon:'🔎',description:'Descubre una debilidad: el rival empieza con menos HP y queda expuesto.',advice:'Encontré una abertura en su guardia. ¡Aprovéchala desde el inicio!'},
 {id:'ally',name:'Campamento con Mika',icon:'🏕️',description:'Recupera 30 Ki y recibe un escudo para el próximo combate.',advice:'No estás solo. Mi escudo te cubrirá al comienzo del combate.'}
];
export const RK=['Novato','Prodigio','Élite','Leyenda','Mítico'];
export const RV=[
{n:'Kuro',a:'Arco 1 · Entrenamiento',hp:80,em:'🥷',p:'rival arrogante pero honorable, ataques físicos rápidos',f2:'Kuro libera su sello de sombras',tip:'Kuro es rápido: no te quedes quieto.'},
{n:'Rin',a:'Arco 2 · Torneo',hp:100,em:'⚔️',p:'espadachina serena y precisa que castiga cada error',f2:'Rin desenvaina su segunda espada',tip:'Rin castiga los ataques obvios. Sorpréndela.'},
{n:'Gorak',a:'Arco 2 · Final del torneo',hp:130,em:'👹',p:'gigante brutal, muy resistente, humor ácido',f2:'Gorak entra en furia bestial',tip:'Gorak aguanta mucho. Cuida tu Ki.'},
{n:'Sombra Vex',a:'Arco 3 · El villano',hp:150,em:'🦇',p:'estratega cruel que manipula mente y sombras',f2:'Vex fusiona su cuerpo con la oscuridad',tip:'Vex juega con tu mente. Mantén la determinación.'},
{n:'Emperador Zeroth',a:'Arco final · Jefe supremo',hp:190,em:'👑',p:'emperador cósmico casi invencible, calmo y aterrador',f2:'Zeroth revela su forma verdadera',tip:'Es el final. Si caes, despierta tu poder.'}];
export const TR={n:'Maniquí Sensei',a:'Modo entrenamiento',hp:60,em:'🪵',p:'maniquí de entrenamiento que golpea suave y da pistas',f2:'El maniquí brilla',tip:'Practica sin riesgo.',t:1};
export const SYS=`Eres narrador y rival en un duelo estilo anime shonen (épico, gritos de ataques, rivalidad, crecimiento). Responde SIEMPRE en español y SOLO con JSON: "narracion" (2-3 frases vívidas), "rival" (frase corta y dramática del rival), "aliada" (frase muy corta de ánimo o consejo de Mika, la aliada, o ""), "onomatopeya" (efecto de sonido manga en mayúsculas, máx 10 letras, ej "¡BOOM!"), "dano_rival" (0-30), "dano_jugador" (0-30), "ki_gastado" (0-25), "opciones" (3 acciones cortas, máx 5 palabras). Premia la creatividad y la determinación, castiga lo imprudente. Con poco Ki las técnicas grandes fallan. Ajusta el poder del rival a su descripción. Si el héroe usa su técnica insignia, descríbela y hazla evolucionar según su nivel.`;
