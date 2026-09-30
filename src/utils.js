export const clamp=(v,a,b)=>Math.max(a,Math.min(b,Math.round(Number(v))||0));
export const lv=s=>1+Math.floor(s.xp/100);export const score=s=>s.wins*100+lv(s)*10;
export const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
export const sv_=(k,v)=>{try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let AC;export const audio={mute:false};
export const snd=(f,d,t='square',v=.05)=>{if(audio.mute)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.value=v;g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}};
export const jingle=a=>a.forEach((f,i)=>setTimeout(()=>snd(f,.18,'triangle',.07),i*130));
