import React,{useState,useRef,useEffect} from 'react';
const h=React.createElement;
import { ST, RK, RV, TR, SYS, ROUTES, STYLE_MOVES } from './data.js';
import { clamp, lv, score, ld, sv_, snd, jingle, audio } from './utils.js';
import TitleScreen from './screens/Title.jsx';
import BetweenScreen from './screens/Between.jsx';
import ResultScreen from './screens/Result.jsx';
import FightScreen from './screens/Fight.jsx';

const loadSave=()=>{
 const saved=ld('sh_save',null);
 if(!saved||typeof saved!=='object'||Array.isArray(saved))return null;
 const count=v=>Number.isFinite(v)&&v>=0?Math.floor(v):0;
 return {...saved,
  name:typeof saved.name==='string'?saved.name:'',
  style:Object.prototype.hasOwnProperty.call(ST,saved.style)?saved.style:'Fuego',
  tech:typeof saved.tech==='string'?saved.tech:'',
  xp:count(saved.xp),wins:count(saved.wins),arc:Math.min(RV.length,count(saved.arc)),
  upgrades:{power:count(saved.upgrades?.power),vitality:count(saved.upgrades?.vitality),focus:count(saved.upgrades?.focus)},
  carryHp:count(saved.carryHp),carryKi:count(saved.carryKi),
  route:ROUTES.some(r=>r.id===saved.route)?saved.route:null,
  pendingUpgrade:saved.pendingUpgrade===true
 };
};
const loadRank=()=>{
 const saved=ld('sh_rank',[]);
 return Array.isArray(saved)?saved.filter(r=>r&&typeof r.n==='string'&&Number.isFinite(r.s)).slice(0,5):[];
};

export default function App(){
 const [sv,setSv]=useState(loadSave);
 const [d,setD]=useState(()=>{const s=loadSave();return s?{name:s.name,style:s.style,tech:s.tech}:{name:'',style:'Fuego',tech:''}});
 const [ph,setPh]=useState('title'),[rv,setRv]=useState(RV[0]),[adv,setAdv]=useState(null),[rank,setRank]=useState(loadRank);
 const [hp,setHp]=useState(100),[ki,setKi]=useState(100),[rhp,setRhp]=useState(100),[ph2,setPh2]=useState(false),[aw,setAw]=useState(0),[used,setUsed]=useState(false),[exposed,setExposed]=useState(false),[shield,setShield]=useState(false),[path,setPath]=useState(null);
 const [log,setLog]=useState([]),[opts,setOpts]=useState([]),[text,setText]=useState(''),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[fx,setFx]=useState(null),[gain,setGain]=useState({}),[mute,setMute]=useState(false);
 const [resetConfirm,setResetConfirm]=useState(false);
 const lr=useRef(null);
 useEffect(()=>{if(sv)sv_('sh_save',sv)},[sv]);
 useEffect(()=>{if(lr.current)lr.current.scrollTop=lr.current.scrollHeight},[log]);
 const lvl=sv?lv(sv):1,mx=100+(lvl-1)*10+(sv?.upgrades?.vitality||0)*15,maxKi=100+(sv?.upgrades?.focus||0)*15,rank_=RK[Math.min(4,Math.floor((lvl-1)/2))];
 const [db,setDb]=useState(null);
 useEffect(()=>{let un=null,dead=false;(async()=>{try{const D=await window.claude.use('db');if(!D||dead)return;un=D.collection('ranking').orderBy('s','desc').limit(5).onSnapshot(sn=>setRank(sn.docs.map(x=>x.data())),()=>{});setDb(D)}catch(e){}})();return()=>{dead=true;if(un)un()}},[]);
 const addRank=s=>{const e={n:s.name,s:score(s),t:Date.now()};
  const loc=()=>{const r=[...loadRank(),e].sort((a,b)=>b.s-a.s).slice(0,5);setRank(r);sv_('sh_rank',r)};
  if(db)db.collection('ranking').add(e).catch(loc);else loc()};

 const between=async(r,hero)=>{
  setRv(r);setPh('between');setPath(hero.route||null);setAdv({s:r.tip,m:'¡Tú puedes, '+hero.name+'!'});snd(440,.15);
  try{const S=await window.claude.use('sample');if(S){const j=await S.json('Responde SOLO JSON en español: {"sensei":"consejo de estrategia del maestro Ryu, máx 25 palabras","mika":"comentario animado de Mika, tu aliada, máx 15 palabras"}. Héroe '+hero.name+' (estilo '+hero.style+'), próximo rival: '+r.n+', '+r.p+'.',{cache:false});if(j&&j.sensei)setAdv(a=>({s:j.sensei,m:a?.m||j.mika||''}))}}catch(e){}
 };
 const chooseRoute=id=>{const selected=ROUTES.find(r=>r.id===id);if(!selected)return;setPath(id);setSv(s=>({...s,route:id}));setAdv(a=>({...a,s:selected.advice,m:'¡Tú puedes, '+sv.name+'!'}))};
 const newGame=()=>{if(!d.name.trim())return setErr('Ponle nombre a tu héroe.');const s={...d,tech:d.tech.trim()||'Golpe Supremo',xp:0,wins:0,arc:0,upgrades:{power:0,vitality:0,focus:0},carryHp:0,carryKi:0};setSv(s);setErr('');between(RV[0],s)};
 const cont=()=>between(RV[Math.min(sv.arc,RV.length-1)],sv);
 const train=()=>{if(!d.name.trim())return setErr('Ponle nombre a tu héroe.');const s={xp:0,wins:0,arc:0,...(sv||{}),...d,tech:d.tech.trim()||'Golpe Supremo'};setSv(s);setErr('');between(TR,s)};
 const start=()=>{
  if(!path){setErr('Elige una ruta antes de continuar.');return}
  const carryHp=sv.carryHp>0?sv.carryHp:mx,carryKi=sv.carryKi>0?sv.carryKi:maxKi;
  const hpStart=path==='dojo'?Math.min(mx,carryHp+30):Math.min(mx,carryHp);
  const kiStart=path==='ally'?Math.min(maxKi,carryKi+30):Math.min(maxKi,carryKi);
  setPh('fight');setHp(hpStart);setKi(kiStart);setRhp(path==='scout'?Math.max(1,Math.round(rv.hp*.85)):rv.hp);setPh2(false);setAw(0);setUsed(false);setExposed(path==='scout');setShield(path==='ally');setErr('');
  setSv(s=>({...s,route:null}));
  setLog([{w:'rival',n:rv.n,t:'Así que tú eres '+sv.name+'... Muéstrame tu estilo '+sv.style+'.'},{w:'ally',n:'Mika',t:adv&&adv.m||'¡Vamos!'}]);
  setOpts([{label:'Ataque directo',mode:'attack'},{label:'Analizar al rival',mode:'analyze'},{label:'Defender y recuperar Ki',mode:'defend'},{label:'Usar '+sv.tech,mode:'tech'}])};

 const act=async(a,aw0=false,mode='attack')=>{
  if(!a.trim()||busy)return;
  const move=STYLE_MOVES[sv.style];
  const cost=mode==='style'?move.cost:mode==='tech'?20:0;
  if(ki<cost){setErr('No tienes suficiente Ki para esa acción.');return}
  setBusy(true);setErr('');setText('');
  const H=[...log,{w:'me',n:sv.name,t:a}];setLog(H);
  const awNow=aw0||aw>0;let r=null;
  try{const S=await window.claude.use('sample');if(S)r=await S.json(SYS+`\nRival: ${rv.n} (${rv.p})${ph2?' — FASE 2: '+rv.f2:''}. Héroe: ${sv.name}, estilo ${sv.style}, técnica insignia "${sv.tech}" nivel ${sv.wins+1}, nivel ${lvl}${awNow?', DESPERTADO (poder oculto activo)':''}. Acción táctica: ${mode}. HP héroe ${hp}/${mx}, Ki ${ki}/${maxKi}, HP rival ${rhp}/${rv.hp}.\nHistorial:\n`+H.slice(-8).map(m=>m.n+': '+m.t).join('\n')+'\nAcción del héroe: '+a,{cache:false})}catch(e){setErr('La IA no respondió; el rival improvisa.')}
  if(!r||typeof r!=='object'){const l=Math.random()>.4;r={narracion:l?'Tu técnica '+sv.style+' impacta de lleno y el suelo se agrieta.':rv.n+' esquiva y contraataca.',rival:l?'¡Nada mal!':'¡Demasiado lento!',dano_rival:l?18:4,dano_jugador:l?6:16,ki_gastado:12,opciones:['Ataque directo','Analizar al rival','Defender y recuperar Ki']}}
  let dr=clamp(r.dano_rival,0,30),dj=clamp(r.dano_jugador,0,30),kg=mode==='analyze'||mode==='defend'?0:clamp(r.ki_gastado,0,25);
  const ix=RV.indexOf(rv),exploit=exposed&&mode!=='analyze';
  dj=Math.min(dj,rv.t?5:14+ix*4);
  if(mode==='analyze'){dr=Math.round(dr*.2);dj=Math.round(dj*.65)}
  if(mode==='defend'){dj=Math.round(dj*.3);dr=Math.round(dr*.55)}
  if(mode==='tech'){dr+=14+Math.min(10,Math.floor(lvl/2));kg=Math.max(kg,20)}
  if(mode==='style'){
   if(sv.style==='Fuego')dr+=22;
   if(sv.style==='Rayo')dj=Math.round(dj*.3);
   if(sv.style==='Viento'){dr+=10;dj=Math.round(dj*.5)}
   kg=Math.max(kg,cost);
  }
  if(exploit)dr+=12;
  dr=Math.round(dr*(1+(sv.upgrades?.power||0)*.05));
  if(awNow){dr=Math.round(dr*1.6);dj=Math.round(dj*.6)}
  if(shield){dj=0;setShield(false)}
  const nr=Math.max(0,rhp-dr),nh=rv.t?Math.max(1,hp-dj):Math.max(0,hp-dj);
  const kiBonus=mode==='defend'?8:mode==='style'&&sv.style==='Viento'?5:0;
  const nextKi=Math.min(maxKi,Math.max(0,ki-kg)+6+kiBonus);
  setRhp(nr);setHp(nh);setKi(nextKi);setAw(Math.max(0,(aw0?3:aw)-1));
  setExposed(mode==='analyze');
  const o=String(r.onomatopeya||'').slice(0,10)||(dr>=22?'¡BOOM!':dr>0?'¡PAM!':'¡SWISH!');
  setFx({o,k:Date.now(),c:dr>=22,hit:dj>0||dr>0});setTimeout(()=>setFx(null),900);
  if(dr>0)snd(dr>=22?90:180,.15,'sawtooth',.09);else snd(600,.1);
  const add=[{w:'narr',n:'Narrador',t:String(r.narracion||'')},{w:'rival',n:rv.n,t:String(r.rival||'')}];
  if(mode==='analyze')add.push({w:'ally',n:'Mika',t:'¡Ya vi su punto débil! Tu próximo ataque será más fuerte.'});
  if(mode==='defend')add.push({w:'ally',n:'Mika',t:'Buena defensa. Recuperaste 14 Ki.'});
  if(mode==='style')add.push({w:'ally',n:'Mika',t:move.name+' activada: '+move.description});
  if(!ph2&&nr>0&&nr<=rv.hp/2){setPh2(true);add.push({w:'narr',n:'⚠️ FASE 2',t:rv.f2+'. ¡Su poder aumenta!'});jingle([300,250,200])}
  const nextOpts=(Array.isArray(r.opciones)?r.opciones.slice(0,2).map(label=>({label:String(label),mode:'attack'})):[]).concat([{label:'Analizar al rival',mode:'analyze'},{label:'Defender y recuperar Ki',mode:'defend'},{label:'Usar '+sv.tech,mode:'tech'}]);
  setLog([...H,...add]);setOpts(nextOpts.filter((o,i)=>nextOpts.findIndex(a=>a.label===o.label)===i));setBusy(false);
  if(nr<=0){
   if(rv.t){jingle([523,659,784]);return setPh('win')}
   const xp=60+sv.arc*25,ns={...sv,xp:sv.xp+xp,wins:sv.wins+1,arc:sv.arc+1,carryHp:nh,carryKi:nextKi};
   const up=lv(ns)>lvl;ns.pendingUpgrade=up;
   setGain({xp,up,ns});setSv(ns);jingle([523,659,784,1047]);
   if(ns.arc>=RV.length){addRank(ns);setPh('end')}else setPh('win');
  }else if(nh<=0){jingle([200,150,100]);setPh('lose')}
 };
 const awaken=()=>{setUsed(true);setAw(3);jingle([400,600,900,1200]);act('¡Despierto mi poder oculto con toda mi determinación!',true)};
 const quit=()=>{if(sv&&sv.wins>0)addRank(sv);setSv(null);sv_('sh_save',null);setPh('title')};
 const applyUpgrade=kind=>{
  const base=gain.ns||sv;if(!base?.pendingUpgrade)return;
  const upgrades={power:0,vitality:0,focus:0,...base.upgrades};
  if(!Object.prototype.hasOwnProperty.call(upgrades,kind))return;
  upgrades[kind]+=1;
  const ns={...base,upgrades,pendingUpgrade:false};
  if(kind==='vitality')ns.carryHp=(ns.carryHp||0)+15;
  if(kind==='focus')ns.carryKi=(ns.carryKi||0)+15;
  setSv(ns);setGain(v=>({...v,ns}));setErr('');
 };
 const resetSave=()=>{setSv(null);setD({name:'',style:'Fuego',tech:''});sv_('sh_save',null);setResetConfirm(false);setErr('')};

 const bar=(l,v,m,c)=>h('div',null,h('div',{className:'bang',style:{fontSize:15}},l+' '+v+'/'+m),h('div',{className:'bar '+c},h('i',{style:{width:Math.min(100,v/m*100)+'%'}})));
 const mb=h('button',{className:'btn alt mute',onClick:()=>{audio.mute=!audio.mute;setMute(audio.mute)}},mute?'🔇':'🔊');
 const rkl=rank.length?h('div',{className:'panel'},h('h2',{style:{fontSize:26}},(db?'🏆 RANKING GLOBAL':'🏆 RANKING')),rank.map((r,i)=>h('div',{key:i,className:'rk'},h('span',null,(i+1)+'. '+r.n),h('b',null,r.s+' pts')))):null;

 const g={sv,setSv,d,setD,ph,setPh,rv,adv,rank,hp,ki,rhp,ph2,aw,used,exposed,shield,log,opts,text,setText,busy,err,setErr,fx,gain,mute,lr,lvl,mx,maxKi,rank_,db,newGame,cont,train,start,between,chooseRoute,path,act,awaken,quit,mb,rkl,bar,resetConfirm,setResetConfirm,resetSave,applyUpgrade};
if(ph==='title')return h(TitleScreen,{g});
if(ph==='between')return h(BetweenScreen,{g});
if(ph==='win'||ph==='lose'||ph==='end')return h(ResultScreen,{g});
return h(FightScreen,{g});
}
