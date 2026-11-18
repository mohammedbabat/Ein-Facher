(function(){
 const J=document.getElementById('journey');if(!J)return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const sc=[...J.querySelectorAll('.j-scene')],dots=[...J.querySelectorAll('.j-dots b')],grid=J.querySelector('.j-grid'),
  oa=J.querySelector('.j-orb.a'),ob=J.querySelector('.j-orb.b'),hint=J.querySelector('.j-hint'),N=sc.length,DEPTH=1400;
 let mx=0,my=0,tk=false;
 addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(!tk){tk=true;requestAnimationFrame(upd);}});
 function upd(){tk=false;
  const r=J.getBoundingClientRect(),total=J.offsetHeight-innerHeight;
  const prog=Math.min(1,Math.max(0,-r.top/total)),p=prog*(N-1);
  sc.forEach((s,i)=>{const d=i-p;                 // >0 = noch vor uns, <0 = vorbeigeflogen
   const z=-d*DEPTH, a=Math.max(0,1-(d<0?-d*2.4:d*1.25));
   const x=(i%2?1:-1)*d*60+mx*-30, y=my*-20;
   s.style.opacity=a;
   s.style.transform='translate3d('+x+'px,'+y+'px,'+Math.min(z,450)+'px) rotateY('+(d*14+mx*6)+'deg) rotateX('+(my*-4)+'deg)';
   s.classList.toggle('on',a>.6);});
  dots.forEach((b,i)=>b.classList.toggle('on',Math.round(p)===i));
  grid.style.backgroundPosition='0 '+(p*DEPTH*.5)+'px';
  oa.style.transform='translate3d('+(p*-80+mx*40)+'px,'+(p*60)+'px,0)';
  ob.style.transform='translate3d('+(p*90+mx*-40)+'px,'+(p*-70)+'px,0)';
  hint.style.opacity=prog<.04?.75:0;}
 addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd);}},{passive:true});
 addEventListener('resize',upd);upd();
})();
