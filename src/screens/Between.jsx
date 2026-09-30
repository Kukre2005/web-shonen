import React,{useState,useRef,useEffect} from 'react';
const h=React.createElement;
import { ST, RK, RV, TR, SYS, ROUTES } from '../data.js';
import { clamp, lv, score, ld, sv_, snd, jingle, audio } from '../utils.js';

export default function BetweenScreen({ g }) {
  const { sv, ph, setPh, rv, adv, err, lvl, rank_, start, chooseRoute, path, mb } = g;
  return h('div',{className:'wrap'},mb,
  h('div',{className:'panel mid'},h('span',{className:'tag'},rv.a),h('div',{style:{fontSize:64}},rv.em),h('h2',null,rv.n),h('div',{className:'sub'},rv.p+' · HP '+rv.hp),
   sv&&!rv.t&&h('div',null,h('div',{className:'bang'},rank_+' · Nv.'+lvl+' · XP '+(sv.xp%100)+'/100'),h('div',{className:'bar xp'},h('i',{style:{width:sv.xp%100+'%'}})))),
  h('div',{className:'panel log'},h('div',{className:'msg'},h('b',null,'Maestro Ryu'),adv&&adv.s),h('div',{className:'msg ally'},h('b',null,'Mika'),adv&&adv.m)),
  h('div',{className:'panel'},h('h2',{className:'section-title'},'ELIGE TU CAMINO'),
   ROUTES.map(r=>h('button',{key:r.id,className:'route-card'+(path===r.id?' selected':''),onClick:()=>chooseRoute(r.id)},
    h('span',{className:'route-icon'},r.icon),h('span',{className:'route-copy'},h('b',null,r.name),h('small',null,r.description)))),
   err&&h('div',{className:'warn'},err)),
  h('button',{className:'btn big',disabled:!path,onClick:start},'¡A PELEAR!'),h('button',{className:'btn big alt',onClick:()=>setPh('title')},'Volver'));
}
