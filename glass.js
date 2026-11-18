(function(){
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 ['o1','o2','o3'].forEach(c=>{const d=document.createElement('div');d.className='glass-orb '+c;document.body.prepend(d);});
 const orbs=[...document.querySelectorAll('.glass-orb')],speeds=[.18,-.12,.25];
 const sel='.service-card,.who-card,.how-card,.example-card,.service-detail-card,.what-card,.value-card,.team-card,.stat-card2,.process-step,.cta-box,.booking-box,.auto-item,.auto-flow-step,.info-item';
 const cards=[...document.querySelectorAll(sel)];
 cards.forEach(c=>{c.classList.add('glass-card');
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
   c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
   if(matchMedia('(hover:hover)').matches)c.style.transform='perspective(900px) rotateY('+((x/r.width-.5)*6)+'deg) rotateX('+(-(y/r.height-.5)*6)+'deg) translateY(-4px)';});
  c.addEventListener('mouseleave',()=>{c.style.transform='';});});
 const rev=document.querySelectorAll('.reveal');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}}),{threshold:.12});
 rev.forEach(r=>io.observe(r));
 let t=false;
 function upd(){const y=scrollY,vh=innerHeight;
  orbs.forEach((o,i)=>o.style.transform='translate3d(0,'+(y*speeds[i])+'px,0) scale('+(1+y/vh*.05)+')');
  cards.forEach(c=>{if(c.matches(':hover'))return;const r=c.getBoundingClientRect();
   const p=(r.top+r.height/2-vh/2)/vh;c.style.translate='0 '+(p*-14)+'px';});
  t=false;}
 addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(upd);}},{passive:true});upd();
})();
