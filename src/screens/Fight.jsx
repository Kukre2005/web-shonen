import React,{useState,useRef,useEffect} from 'react';
const h=React.createElement;
import { ST, RK, RV, TR, SYS, STYLE_MOVES } from '../data.js';
import { clamp, lv, score, ld, sv_, snd, jingle, audio } from '../utils.js';

export default function FightScreen({ g }) {
  const { sv, rv, hp, ki, rhp, ph2, aw, used, exposed, shield, log, opts, text, setText, busy, err, fx, mute, lr, lvl, mx, maxKi, rank_, act, awaken, mb, bar } = g;
  const move=STYLE_MOVES[sv.style];
  return h('div',{className:'wrap'+(fx&&fx.c?' shake':'')},
  fx&&h('div',{key:fx.k,className:fx.hit?'fx':''},h('div',{className:'ono'},fx.o)),
  h('div',{className:'panel'},h('div',{className:'bars'},
   h('div',null,h('div',{className:'bang',style:{fontSize:22}},sv.name+' · '+sv.style+(aw>0?' ✨':'')),h('div',{className:'sub',style:{margin:0,textAlign:'left'}},rank_+' Nv.'+lvl),bar('HP',hp,mx,'hp'),bar('KI',ki,maxKi,'ki')),
   h('div',null,h('div',{className:'bang',style:{fontSize:22,textAlign:'right'}},rv.em+' '+rv.n+(ph2?' (FASE 2)':'')),bar('HP',rhp,rv.hp,'hp')))),
  h('div',{className:'status-row'},exposed&&h('span',{className:'tag status exposed'},'PUNTO DÉBIL REVELADO · +12 DAÑO'),shield&&h('span',{className:'tag status shield'},'ESCUDO DE MIKA · 1 GOLPE')),
  h('div',{className:'panel log',ref:lr},log.map((m,i)=>h('div',{key:i,className:'msg '+m.w},h('b',null,m.n),m.w==='rival'?h('span',{className:'q'},'“'+m.t+'”'):m.t)),busy&&h('div',{className:'msg'},'⚡ La energía se acumula...')),
  err&&h('div',{className:'warn'},err),
  h('div',{className:'move-card'},h('div',{className:'bang'},move.name+' · '+move.cost+' Ki'),h('div',{className:'sub',style:{margin:0}},move.description)),
  h('div',{className:'opts'},!used&&hp<=mx*.4&&ki>=10&&h('button',{className:'btn aw',disabled:busy,onClick:awaken},'✨ DESPERTAR'),opts.map((o,i)=>h('button',{key:i+'-'+o.mode+'-'+o.label,className:'btn alt',disabled:busy||(o.mode==='tech'&&ki<20),onClick:()=>act(o.label,false,o.mode)},o.label)),h('button',{className:'btn ability',disabled:busy||ki<move.cost,onClick:()=>act(move.name,false,'style')},'✨ '+move.name+' · '+move.cost+' Ki')),
  h('div',{className:'row'},h('input',{style:{margin:0},value:text,placeholder:'Describe tu ataque o grita algo épico...',disabled:busy,onChange:e=>setText(e.target.value),onKeyDown:e=>{if(e.key==='Enter')act(text)}}),h('button',{className:'btn',disabled:busy||!text.trim(),onClick:()=>act(text)},'¡YA!')));
}
