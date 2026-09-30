import React,{useState,useRef,useEffect} from 'react';
const h=React.createElement;
import { ST, RK, RV, TR, SYS } from '../data.js';
import { clamp, lv, score, ld, sv_, snd, jingle, audio } from '../utils.js';

export default function ResultScreen({ g }) {
  const { sv, setSv, ph, setPh, rv, gain, applyUpgrade, between, quit, mb, rkl } = g;
  const needsUpgrade=Boolean(sv?.pendingUpgrade);
  return h('div',{className:'wrap'},mb,h('div',{className:'panel mid'},
  h('h2',{style:{color:ph==='lose'?'var(--red)':'var(--blu)'}},ph==='end'?'¡LEYENDA ETERNA!':ph==='win'?'¡VICTORIA!':'DERROTA...'),
  ph==='lose'?h('p',null,'Caes de rodillas, pero un héroe se levanta. Intenta otra estrategia o despierta tu poder.'):h('p',null,ph==='end'?sv.name+' derrotó al Emperador Zeroth. Puntaje final: '+score(sv)+' pts.':rv.t?'Buen entrenamiento.':'+'+gain.xp+' XP'+(gain.up?' · ¡SUBISTE DE NIVEL!':'')),
  needsUpgrade&&h('div',{className:'upgrade-panel'},h('h3',null,'Elige una mejora para tu héroe'),
   h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('vitality')},h('b',null,'❤️ Vitalidad'),h('span',null,'+15 HP máximo y recuperas esos 15 HP.')),
   h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('power')},h('b',null,'💥 Poder'),h('span',null,'Tus ataques hacen 5% más de daño por nivel de mejora.')),
   h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('focus')},h('b',null,'🔷 Enfoque'),h('span',null,'+15 Ki máximo y recuperas esos 15 Ki.'))),
  ph==='win'&&!rv.t&&h('button',{className:'btn big',disabled:needsUpgrade,onClick:()=>between(RV[sv.arc],sv)},needsUpgrade?'ELIGE UNA MEJORA PARA CONTINUAR':'SIGUIENTE RIVAL'),
  ph==='lose'&&h('button',{className:'btn big',onClick:()=>between(rv,sv)},'REINTENTAR'),
  ph==='lose'&&!rv.t&&h('button',{className:'btn big alt',onClick:quit},'Terminar campaña'),
  (ph==='end'||rv.t)&&h('button',{className:'btn big alt',onClick:()=>{if(ph==='end'){setSv(null);sv_('sh_save',null)}setPh('title')}},'Menú principal'),rkl));
}
