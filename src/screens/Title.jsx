import React,{useState,useRef,useEffect} from 'react';
const h=React.createElement;
import { ST, RK, RV, TR, SYS, STYLE_MOVES } from '../data.js';
import { clamp, lv, score, ld, sv_, snd, jingle, audio } from '../utils.js';

export default function TitleScreen({ g }) {
  const { sv, d, setD, err, setErr, lvl, rank_, newGame, cont, train, mb, rkl, resetConfirm, setResetConfirm, resetSave, applyUpgrade } = g;
  return h('div',{className:'wrap'},mb,
  h('div',{className:'hero'},h('h1',{className:'title'},'DUELO SHONEN'),h('p',{className:'sub'},'Campaña de 5 rivales · La IA es tu narrador y tu enemigo')),
  h('div',{className:'panel'},
   h('label',{className:'bang',style:{fontSize:20}},'Nombre del héroe'),h('input',{value:d.name,maxLength:20,onChange:e=>setD({...d,name:e.target.value})}),
   h('div',{className:'g3'},Object.keys(ST).map(k=>h('button',{key:k,className:'btn'+(d.style===k?' sel':''),onClick:()=>setD({...d,style:k})},ST[k][0]+' '+k))),
   h('div',{className:'sub',style:{margin:0}},ST[d.style][1]),
   h('div',{className:'style-move'},h('b',null,STYLE_MOVES[d.style].name+' · '+STYLE_MOVES[d.style].cost+' Ki'),h('span',null,STYLE_MOVES[d.style].description)),
   h('label',{className:'bang',style:{fontSize:20}},'Tu técnica insignia'),h('input',{value:d.tech,maxLength:28,placeholder:'Ej: Dragón Carmesí',onChange:e=>setD({...d,tech:e.target.value})}),
   err&&h('div',{className:'warn'},err),
   sv?.pendingUpgrade&&h('div',{className:'upgrade-panel'},h('h3',null,'Tienes una mejora pendiente'),
    h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('vitality')},h('b',null,'❤️ Vitalidad'),h('span',null,'+15 HP máximo y recuperas esos 15 HP.')),
    h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('power')},h('b',null,'💥 Poder'),h('span',null,'Tus ataques hacen 5% más de daño por nivel de mejora.')),
    h('button',{className:'upgrade-choice',onClick:()=>applyUpgrade('focus')},h('b',null,'🔷 Enfoque'),h('span',null,'+15 Ki máximo y recuperas esos 15 Ki.'))),
   sv&&sv.arc>0&&sv.arc<RV.length&&!sv.pendingUpgrade&&h('button',{className:'btn big',style:{background:'var(--blu)'},onClick:cont},'CONTINUAR · '+sv.name+' Nv.'+lvl+' ('+RV[sv.arc].n+')'),
   h('button',{className:'btn big',onClick:newGame},'NUEVA CAMPAÑA'),
   h('button',{className:'btn big alt',onClick:train},'🪵 MODO ENTRENAMIENTO'),
   sv&&h('div',{className:'reset-box'},!resetConfirm?h('button',{className:'btn alt reset-btn',onClick:()=>setResetConfirm(true)},'Borrar partida guardada'):
    h('div',null,h('p',null,'¿Borrar el progreso de '+sv.name+'? Esta acción no se puede deshacer.'),h('button',{className:'btn reset-danger',onClick:resetSave},'Sí, borrar partida'),h('button',{className:'btn alt',onClick:()=>setResetConfirm(false)},'Cancelar')))),rkl);
}
