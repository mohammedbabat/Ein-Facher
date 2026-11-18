
const T={
 de:{wel:['Willkommen bei','Scrollen – wir nehmen Sie mit.'],more:' ansehen →',end:['Und das ist Mohammed','Ihr persönlicher Ansprechpartner.','Termin buchen →'],mo:['Mohammed Babat','Ihr Ansprechpartner bei Ein-Facher','MB'],skip:'Überspringen ↓'},
 ar:{wel:['مرحباً بكم في','مرّر للأسفل – سنأخذكم في جولة.'],more:' ← اعرف المزيد',end:['وهذا هو محمد','شريككم الشخصي للتواصل.','حجز موعد ←'],mo:['محمد بابات','مسؤول التواصل لديكم في Ein-Facher','MB'],skip:'تخطي ↓'}};
const Z=[
 {n:{de:'Cloud Support',ar:'دعم السحابة'},d:{de:'Microsoft 365, SharePoint, Entra ID, Intune und Exchange.',ar:'مايكروسوفت 365 وشيربوينت وإنترا وإنتيون وإكستشينج.'},l:'cloud-support.html',bg:'radial-gradient(ellipse at 50% 40%,#6b3fd0,#25104f 75%)'},
 {n:{de:'Local Support',ar:'الدعم المحلي'},d:{de:'PCs, Server, Netzwerk und Active Directory – vor Ort.',ar:'أجهزة وخوادم وشبكات وActive Directory في موقعكم.'},l:'local-support.html',bg:'radial-gradient(ellipse at 50% 40%,#3a1a6e,#0d0620 75%)'},
 {n:{de:'Automatisierung',ar:'الأتمتة'},d:{de:'Power Automate und Power Apps nehmen Routine ab.',ar:'Power Automate وPower Apps تُنهيان العمل الروتيني.'},l:'automatisierung.html',bg:'radial-gradient(ellipse at 50% 40%,#7a3a10,#1d0b2e 75%)'},
 {n:{de:'Termin buchen',ar:'حجز موعد'},d:{de:'Wählen Sie Tag und Uhrzeit – wir sind da.',ar:'اختاروا اليوم والوقت – نحن بانتظاركم.'},l:'termin.html',bg:'radial-gradient(ellipse at 50% 40%,#2a5fc0,#14103a 75%)'},
 {n:{de:'Team',ar:'الفريق'},d:{de:'Persönlich, direkt, auf Deutsch und Arabisch.',ar:'شخصي ومباشر، بالألمانية والعربية.'},l:'team.html',bg:'radial-gradient(ellipse at 50% 40%,#9a3fa8,#1a0b2e 75%)'}];
const L=()=>(typeof currentLang!=='undefined'&&currentLang==='ar')?'ar':'de';
const MOB=innerWidth<700,KS=Math.min(1,Math.max(.62,innerWidth/1000));
const GAP=2800,START=1400; // Abstand der Zonen
const world=document.getElementById('fw'),objs=[];
let seed=7;const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
const S={
 cloud:c=>`<svg viewBox="0 0 120 80"><path d="M30 68a22 22 0 0 1 2-44 28 28 0 0 1 54-4 24 24 0 0 1 8 48z" fill="${c}" opacity=".92"/></svg>`,
 pc:()=>`<svg viewBox="0 0 120 100"><rect x="10" y="6" width="100" height="64" rx="7" fill="#1b0b3a" stroke="#C084FC" stroke-width="4"/><rect x="18" y="14" width="84" height="48" rx="3" fill="#7B2FBE"/><rect x="50" y="70" width="20" height="14" fill="#C084FC"/><rect x="34" y="84" width="52" height="8" rx="4" fill="#C084FC"/><circle cx="60" cy="38" r="6" fill="#FB923C"/></svg>`,
 srv:()=>`<svg viewBox="0 0 90 120">${[0,1,2].map(i=>`<rect x="6" y="${6+i*37}" width="78" height="31" rx="5" fill="#1b0b3a" stroke="#C084FC" stroke-width="3"/><circle cx="20" cy="${21.5+i*37}" r="4" fill="#FB923C"/><circle cx="34" cy="${21.5+i*37}" r="4" fill="#4ade80"/><rect x="50" y="${17+i*37}" width="28" height="9" rx="3" fill="#7B2FBE"/>`).join('')}</svg>`,
 cal:()=>`<svg viewBox="0 0 110 110"><rect x="6" y="14" width="98" height="90" rx="12" fill="#fff"/><rect x="6" y="14" width="98" height="26" rx="12" fill="#F97316"/><rect x="6" y="28" width="98" height="12" fill="#F97316"/>${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<rect x="${16+(i%4)*21}" y="${50+Math.floor(i/4)*17}" width="14" height="10" rx="3" fill="${i==6?'#7B2FBE':'#E8DCFF'}"/>`).join('')}</svg>`,
 gear:c=>`<svg viewBox="0 0 100 100"><g fill="${c}"><circle cx="50" cy="50" r="30"/>${[0,45,90,135].map(a=>`<rect x="42" y="4" width="16" height="92" rx="5" transform="rotate(${a} 50 50)"/>`).join('')}</g><circle cx="50" cy="50" r="13" fill="#1d0b2e"/></svg>`,
 per:c=>`<svg viewBox="0 0 80 100"><circle cx="40" cy="28" r="20" fill="${c}"/><path d="M6 98c0-26 14-40 34-40s34 14 34 40z" fill="${c}"/></svg>`
};
function add(el,x,y,z,w,h,extra){w*=KS;h*=KS;const d=document.createElement('div');d.className='o';d.style.width=w+'px';d.style.height=h+'px';d.style.marginLeft=-w/2+'px';d.style.marginTop=-h/2+'px';
 d.dataset.x=x;d.dataset.y=y;d.dataset.z=z;if(extra)d.dataset.r=extra;d.innerHTML=el;world.appendChild(d);objs.push(d);return d;}
function scatter(zi,n,fn){const z0=-START-zi*GAP;for(let i=0;i<n;i++){const side=R()<.5?-1:1,x=side*(200+R()*650),y=(R()-.5)*620,z=z0-GAP/2+R()*GAP;fn(x,y,z,i);}}

const B=(col,glyph,label)=>`<div style="text-align:center"><svg viewBox="0 0 100 100" style="width:100%;height:auto"><defs><linearGradient id="bg${label.replace(/\W/g,'')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${col[0]}"/><stop offset="1" stop-color="${col[1]}"/></linearGradient></defs><rect x="4" y="4" width="92" height="92" rx="22" fill="url(#bg${label.replace(/\W/g,'')})" stroke="rgba(255,255,255,.55)" stroke-width="2"/>${glyph}</svg><div style="font-weight:700;font-size:15px;margin-top:6px;text-shadow:0 2px 10px rgba(0,0,0,.6);white-space:nowrap">${label}</div></div>`;
const G={
 entra:'<path d="M50 18 80 50 50 82 20 50z" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="44" r="8" fill="#fff"/><path d="M36 64c2-9 8-12 14-12s12 3 14 12z" fill="#fff"/>',
 exch:'<rect x="20" y="30" width="60" height="42" rx="6" fill="#fff"/><path d="M22 34l28 22 28-22" fill="none" stroke="#0F6CBD" stroke-width="5" stroke-linejoin="round"/>',
 sp:'<circle cx="42" cy="38" r="20" fill="#fff" opacity=".95"/><circle cx="62" cy="52" r="16" fill="#fff" opacity=".7"/><circle cx="46" cy="68" r="13" fill="#fff" opacity=".5"/><text x="34" y="46" font-size="24" font-weight="800" fill="#0B6A6E" font-family="Arial">S</text>',
 pa:'<rect x="24" y="24" width="22" height="22" rx="5" fill="#fff"/><rect x="54" y="24" width="22" height="22" rx="5" fill="#fff" opacity=".75"/><rect x="24" y="54" width="22" height="22" rx="5" fill="#fff" opacity=".75"/><path d="M65 54v22M54 65h22" stroke="#fff" stroke-width="7" stroke-linecap="round"/>',
 pf:'<path d="M24 62c0-18 22-18 28-10s20 4 24-6" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M70 36l9 10-13 3z" fill="#fff"/><circle cx="26" cy="64" r="6" fill="#fff"/>',
 bi:'<rect x="24" y="52" width="14" height="26" rx="3" fill="#fff"/><rect x="43" y="36" width="14" height="42" rx="3" fill="#fff" opacity=".85"/><rect x="62" y="20" width="14" height="58" rx="3" fill="#fff" opacity=".7"/>',
 ps:'<path d="M26 28l30 22-30 22" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><rect x="50" y="68" width="26" height="8" rx="3" fill="#fff"/>',
 ad:'<circle cx="50" cy="26" r="9" fill="#fff"/><circle cx="26" cy="72" r="9" fill="#fff"/><circle cx="50" cy="72" r="9" fill="#fff"/><circle cx="74" cy="72" r="9" fill="#fff"/><path d="M50 35v14M26 63V49h48v14M50 49v14" stroke="#fff" stroke-width="5" fill="none"/>',
 dhcp:'<rect x="30" y="20" width="40" height="22" rx="5" fill="#fff"/><rect x="14" y="62" width="26" height="18" rx="4" fill="#fff" opacity=".85"/><rect x="60" y="62" width="26" height="18" rx="4" fill="#fff" opacity=".85"/><path d="M50 42v10M27 62V52h46v10" stroke="#fff" stroke-width="5" fill="none"/>',
 dns:'<circle cx="50" cy="50" r="28" fill="none" stroke="#fff" stroke-width="6"/><ellipse cx="50" cy="50" rx="12" ry="28" fill="none" stroke="#fff" stroke-width="5"/><path d="M22 50h56M28 34h44M28 66h44" stroke="#fff" stroke-width="4"/>'
};
const COL={entra:['#8B5CF6','#4C1D95'],exch:['#2B88D8','#0F4C8A'],sp:['#2DB1B6','#0B6A6E'],pa:['#C026D3','#6B21A8'],pf:['#2563EB','#1E3A8A'],bi:['#FACC15','#B45309'],ps:['#1E3A8A','#0F172A'],ad:['#0EA5E9','#075985'],dhcp:['#10B981','#065F46'],dns:['#F97316','#9A3412']};
const NAMES={entra:'Entra ID',exch:'Exchange',sp:'SharePoint',pa:'Power Apps',pf:'Power Automate',bi:'Power BI',ps:'PowerShell',ad:'Active Directory',dhcp:'DHCP',dns:'DNS'};
const bd=k=>B(COL[k],G[k],NAMES[k]);
S.rack=()=>`<svg viewBox="0 0 100 170"><rect x="6" y="4" width="88" height="162" rx="8" fill="#140a2c" stroke="#C084FC" stroke-width="4"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="14" y="${12+i*21}" width="72" height="16" rx="3" fill="#2a1260" stroke="#7B2FBE" stroke-width="2"/><circle cx="24" cy="${20+i*21}" r="3" fill="${i%3?'#4ade80':'#FB923C'}"/><rect x="50" y="${17+i*21}" width="28" height="6" rx="2" fill="#7B2FBE"/>`).join('')}</svg>`;

// Zone 0 Cloud
scatter(0,26,(x,y,z,i)=>{const s=150+R()*230;add(S.cloud(i%3?'#fff':'#E9D5FF'),x,y,z,s,s*.66);});
for(let i=0;i<14;i++){const k=['entra','exch','sp','pa','pf','bi'][i%6];const side=i%2?1:-1;add(bd(k),side*(170+R()*430),(R()-.5)*520,-START-GAP/2+ (i/14)*GAP*1.0 - 200,120,135);}
// Zone 1 Local
scatter(1,10,(x,y,z)=>add(S.pc(),x,y,z,130+R()*60,110+R()*50));
scatter(1,5,(x,y,z)=>add(S.srv(),x,y,z,90+R()*40,120+R()*40));
scatter(1,6,(x,y,z)=>add(S.rack(),x,y,z,90+R()*30,150+R()*50));
for(let i=0;i<6;i++){const k=['ad','dhcp','dns'][i%3];add(bd(k),(i%2?1:-1)*(180+R()*380),(R()-.5)*480,-START-GAP-GAP/2+(i/6)*GAP-100,110,125);}
for(let i=0;i<30;i++){const x=(R()-.5)*1100,y=(R()-.5)*700,len=900+R()*1800,z=-START-GAP-R()*GAP*.9;const d=add(`<div class="cab" style="--c:${R()<.5?'#A855F7':'#FB923C'};width:${len}px"></div>`,x,y,z,len,4);d.style.transform='rotateY(90deg)';d.dataset.cab=1;}
// Zone 2 Automatisierung
scatter(2,8,(x,y,z,i)=>{const s=80+R()*150;const d=add(S.gear(i%2?'#FB923C':'#C084FC'),x,y,z,s,s);d.dataset.spin=(R()<.5?-1:1)*(10+R()*30);});
for(let i=0;i<12;i++){const k=['ps','pf','pa','bi'][i%4];add(bd(k),(i%2?1:-1)*(170+R()*430),(R()-.5)*520,-START-2*GAP-GAP/2+(i/12)*GAP-100,120,135);}
// Zone 3 Termin
scatter(3,9,(x,y,z)=>add(S.cal(),x,y,z,110+R()*70,110+R()*70));
scatter(3,22,(x,y,z)=>{const t=['09:00','10:30','14:00','15','20','30','11:30','Mo','Di','Fr','12','17:00'][Math.floor(R()*12)];const s=34+R()*60;add(`<div class="num" style="font-size:${s}px;opacity:${.55+R()*.4};white-space:nowrap;text-align:center">${t}</div>`,x,y,z,s*3,s);});
// Zone 4 Team
const cols=['#C084FC','#FB923C','#A78BFA','#FDBA74','#E9D5FF'];
scatter(4,16,(x,y,z)=>{const s=90+R()*90;add(S.per(cols[Math.floor(R()*5)]),x*.9,y,z,s,s*1.25);});
// Mohammed am Ende
const ZEND=-START-4*GAP-GAP/2-300;
add(`<div class="mo"><div class="av">MB</div><h3 id="moN">Mohammed Babat</h3><p id="moP">Ihr Ansprechpartner bei Ein-Facher</p></div>`,0,-10,ZEND,420,300);
const END=-ZEND-330; // Kamera-Ende
const j=document.getElementById('fj'),bg=document.getElementById('fbg'),hud=document.getElementById('fhud'),ht=document.getElementById('fht'),hp=document.getElementById('fhp'),ha=document.getElementById('fha'),wel=document.getElementById('fwel'),dots=document.getElementById('fdots');
Z.forEach(()=>dots.appendChild(document.createElement('b')));
let mx=0,my=0,cz=0,zone=-1,tk=false;
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;rq();});
function rq(){if(!tk){tk=true;requestAnimationFrame(u);}}
const sc=()=>Math.min(1.3,Math.max(.45,innerWidth/1280));
function u(){tk=false;const r=j.getBoundingClientRect(),tot=r.height-innerHeight,p=Math.min(1,Math.max(0,-r.top/tot));
 cz=p*END;const k=sc(),t=performance.now()/1000;
 world.style.transform='translateZ('+cz+'px) rotateX('+(my*-4)+'deg) rotateY('+(mx*5)+'deg)';
 objs.forEach(o=>{const z=+o.dataset.z,d=z+cz;let a=1;if(d<-2500||d>260)a=0;else{if(d<-1500)a=(d+2500)/1000;if(d>-60)a=Math.max(0,1-(d+60)/320);}
  o.style.opacity=a;if(a>0||o._v){o._v=a>0;
   const x=+o.dataset.x*k,y=+o.dataset.y*k,sp=o.dataset.spin?'rotateZ('+(t*o.dataset.spin)+'deg)':'';
   o.style.transform='translate3d('+x+'px,'+y+'px,'+z+'px)'+(o.dataset.cab?' rotateY(90deg)':'')+sp;}});
 wel.style.opacity=Math.max(0,1-p*30);
 const zi=Math.min(Z.length-1,Math.max(-1,Math.floor((cz-START+GAP/2)/GAP)));
 const cur=p<.02?-1:zi; if(cur!==zone){zone=cur;if(zone>=0){const q=Z[zone];ht.textContent=q.n[L()];hp.textContent=q.d[L()];ha.href=q.l;ha.textContent=q.n[L()]+T[L()].more;bg.style.background=q.bg;hud.style.opacity=1}else{hud.style.opacity=0;bg.style.background='radial-gradient(ellipse at 50% 50%,#2a1050,#0f0620 75%)'}
  [...dots.children].forEach((b,i)=>b.classList.toggle('on',i===zone));}
 if(p>.985){const e=T[L()].end;ht.textContent=e[0];hp.textContent=e[1];ha.href='termin.html';ha.textContent=e[2];}
}
bg.style.background='radial-gradient(ellipse at 50% 50%,#2a1050,#0f0620 75%)';hud.style.opacity=0;
addEventListener('scroll',rq,{passive:true});addEventListener('resize',rq);u();

function applyLang(){const t=T[L()];const w=document.getElementById('fwel');w.querySelector('.w1').textContent=t.wel[0];w.querySelector('p').textContent=t.wel[1];
 const n=document.getElementById('moN'),p=document.getElementById('moP');if(n){n.textContent=t.mo[0];p.textContent=t.mo[1];}
 document.getElementById('fskip').textContent=t.skip;zone=-2;rq();}
if(typeof window.setLang==='function'){const o=window.setLang;window.setLang=function(l){o(l);applyLang();};}
applyLang();
