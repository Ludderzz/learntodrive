import * as THREE from 'three'

export function createWorld(canvas,hooks={}){

const V=THREE.Vector3,M=c=>new THREE.MeshLambertMaterial({color:c}),mob=()=>innerWidth<700;
const R=hooks.renderer||new THREE.WebGLRenderer({canvas,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.75));
const W=new THREE.Scene();W.fog=new THREE.Fog(0xcde6f4,90,420);
const skyT=(()=>{const c=document.createElement('canvas');c.width=2;c.height=256;const x=c.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#6fb2e6');gr.addColorStop(.6,'#bfe0f3');gr.addColorStop(1,'#cde6f4');x.fillStyle=gr;x.fillRect(0,0,2,256);return new THREE.CanvasTexture(c)})();W.background=skyT;
const noise=b=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle=b;x.fillRect(0,0,128,128);for(let i=0;i<500;i++){x.fillStyle=i%2?'rgba(255,255,255,.07)':'rgba(0,0,0,.09)';x.fillRect(Math.random()*128,Math.random()*128,2+Math.random()*3,2)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t};
const AT=noise('#3d4149'),GT=noise('#7f9a62');
const asp=(w,l)=>{const t=AT.clone();t.needsUpdate=true;t.repeat.set(Math.max(1,w/6),Math.max(1,l/6));return new THREE.MeshLambertMaterial({map:t,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2})};
const C=new THREE.PerspectiveCamera(55,1,.5,700);
W.add(new THREE.HemisphereLight(0xffffff,0x7a8a70,.95));const sun=new THREE.DirectionalLight(0xfff2d6,.7);sun.position.set(30,60,20);W.add(sun,sun.target);
if(R.shadowMap){R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;sun.castShadow=true;sun.shadow.mapSize.set(mob()?1024:2048,mob()?1024:2048);const sc=sun.shadow.camera;sc.left=sc.bottom=-70;sc.right=sc.top=70;sc.near=1;sc.far=260;sun.shadow.bias=-.0004}
{const gt=GT.clone();gt.needsUpdate=true;gt.repeat.set(500,500);const gm=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({map:gt}));gm.position.y=-.06;W.add(gm)}

const LM=new THREE.MeshLambertMaterial({color:0xffffff,polygonOffset:true,polygonOffsetFactor:-8,polygonOffsetUnits:-8});
function bx(g,w,h,d,c,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),c===0xffffff&&h<.05?LM:M(c));m.position.set(x,y,z);g.add(m);return m}
const wt=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,64,64);x.fillStyle='#6f8aa0';for(let i=0;i<4;i++)for(let j=0;j<4;j++)x.fillRect(i*16+3,j*16+4,10,9);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t})();
const PAL=[0xd9c6b0,0xb8c4cf,0xc9a89a,0xcfd6b4,0x9fb0bf,0xe0d2c0];
const blds=[],RC=new THREE.Raycaster();function bld(g,x,z,w,h,d,i){const t=wt.clone();t.needsUpdate=true;t.repeat.set(Math.round(w/4),Math.round(h/4));const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color:PAL[i%6],map:t}));m.position.set(x,h/2,z);g.add(m);blds.push(m);bx(g,w+.4,.5,d+.4,0x777777,x,h+.25,z)}
function car(c){const g=new THREE.Group();g.rotation.order='YXZ';g.userData.w=[];g.userData.h=0;
 bx(g,1.9,.55,4.2,c,0,.62,0);bx(g,1.8,.3,1.3,c,0,.95,-1.4);bx(g,1.6,.5,2,0x2b4a60,0,1.2,.35);bx(g,1.5,.07,1.8,c,0,1.47,.35);bx(g,1.92,.2,.3,0x222222,0,.4,-2.1);bx(g,1.92,.2,.3,0x222222,0,.4,2.1);
 [-.65,.65].forEach(x=>bx(g,.32,.16,.06,0xfff4c0,x,.78,-2.12));
 const wg=new THREE.CylinderGeometry(.38,.38,.3,12).rotateZ(Math.PI/2);[[-.95,-1.3],[.95,-1.3],[-.95,1.3],[.95,1.3]].forEach(p=>{const w=new THREE.Mesh(wg,M(0x111111));w.position.set(p[0],.38,p[1]);g.add(w);g.userData.w.push(w)});
 const tl=new THREE.MeshLambertMaterial({color:0x661111});[-.7,.7].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.4,.2,.06),tl);b.position.set(x,.72,2.13);g.add(b)});g.userData.tl=tl;return g}
function person(c){const g=new THREE.Group();bx(g,.5,.8,.3,c,0,1.15,0);const h=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),M(0xf2c9a0));h.position.y=1.75;g.add(h);
 g.userData.l=[-.12,.12].map(x=>{const p=new THREE.Group();p.position.set(x,.75,0);bx(p,.18,.75,.2,0x333344,0,-.37,0);g.add(p);return p});return g}
const walk=(p,t,s)=>{p.userData.l[0].rotation.x=Math.sin(t*s)*.6;p.userData.l[1].rotation.x=-Math.sin(t*s)*.6};
function tree(g,x,z,s){s=s||1;bx(g,.3*s,2*s,.3*s,0x6b4a2b,x,s,z);const k=new THREE.Mesh(new THREE.SphereGeometry(1.5*s,8,6),M(0x3f8a45));k.position.set(x,3*s,z);g.add(k)}
function lamp(g,x,z){bx(g,.12,5,.12,0x555555,x,2.5,z);bx(g,.9,.15,.3,0xfff1b0,x*.8,5,z)}
function strip(g,w,l,x,z,ry,ne){const s=new THREE.Group();const r=new THREE.Mesh(new THREE.PlaneGeometry(w,l).rotateX(-Math.PI/2),asp(w,l));r.position.y=.03;s.add(r);
 for(let i=-l/2+3;i<l/2;i+=6)bx(s,.15,.02,3,0xffffff,0,.05,i);if(w>=6&&!ne)[-1,1].forEach(q=>bx(s,.12,.02,l,0xffffff,q*(w/2-.3),.05,0));s.position.set(x,0,z);s.rotation.y=ry||0;g.add(s)}
function street(g,z0,z1){const l=z1-z0,cz=(z0+z1)/2;strip(g,8,l,0,cz,0);[-1,1].forEach(s=>bx(g,3,.16,l,0xa8a8a0,s*5.5,.08,cz));
 let i=0;for(let z=z0+6;z<z1;z+=22,i++){[-1,1].forEach((s,k)=>{bld(g,s*(12.5+(i+k)%2*2),z,10,9+((i*7+k*3)%5)*4,18,i+k);if(i%2==k)lamp(g,s*4.5,z+8);else tree(g,s*6.2,z+8,.9)})}}
function kerbBlocks(g,pts){pts.forEach((p,i)=>bld(g,p[0],p[1],p[2],p[3],p[4],i))}
const E={o:u=>1-(1-u)*(1-u),i:u=>u*u,s:u=>u*u*(3-2*u)};
function kf(t,a){if(t<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++)if(t<=a[i][0]){let u=(t-a[i-1][0])/(a[i][0]-a[i-1][0]);const e=E[a[i][2]];if(e)u=e(u);return a[i-1][1]+(a[i][1]-a[i-1][1])*u}return a[a.length-1][1]}
/* smooth vehicle driver: heading follows path, nose dips under braking, wheels spin, brake lights from decel */
function drive(o,fn,t,dt){const u=o.userData,p=fn(t),q=fn(t+.04),vx=(q[0]-p[0])/.04,vz=(q[1]-p[1])/.04,sp=Math.hypot(vx,vz);const jump=u.lp&&Math.hypot(p[0]-u.lp[0],p[1]-u.lp[1])>5;
 if(sp>.3){const h=Math.atan2(-vx,-vz);let d=h-u.h;d=Math.atan2(Math.sin(d),Math.cos(d));u.h=jump?h:u.h+d*Math.min(1,dt*5)}
 let a=(sp-(u.v||0))/Math.max(dt,.001);if(jump||Math.abs(a)>25)a=0;u.v=sp;u.a=(u.a||0)+(a-(u.a||0))*Math.min(1,dt*4);
 u.pit=(u.pit||0)+(Math.max(-.045,Math.min(.03,u.a*.005))-(u.pit||0))*Math.min(1,dt*5);u.lp=p;
 o.position.set(p[0],0,p[1]);o.rotation.set(u.pit,u.h,0);u.tl.emissive.setHex(u.a<-.6||sp<.15&&u.a<=0.01?0xff0000:0);if(!jump)u.w.forEach(w=>w.rotation.x-=sp*dt/(w.userData.r||.38))}
const S={};function mk(i){const g=new THREE.Group();g.position.x=({7:1000,8:1500,9:2000})[i]||i*100;W.add(g);return g}

/* 0 hero: city street */
{const g=mk(0);street(g,-120,70);const p=car(0xe63946),a=car(0x457b9d),b=car(0xf4a261),bus=car(0xd62828);bus.scale.set(1.2,1.6,1.9);g.add(p,a,b,bus);
 S.hero={ox:0,mk:0.2,street:1,cam:()=>[[-3,3.4,44],[-1.8,1.3,0]],u(t,dt){const T=t%16;drive(p,s=>[-1.8,70-10*s],T,dt);drive(a,s=>[1.8,-90+12*s],T,dt);drive(b,s=>[1.8,-130+12*s],T,dt);drive(bus,s=>[1.8,-170+12*s],T,dt)}}}

/* 1 crossing */
{const g=mk(1);street(g,-120,70);for(let x=-3.5;x<=3.5;x++)bx(g,.55,.02,3,0xffffff,x,.06,0);
 [-4.8,4.8].forEach(x=>{bx(g,.15,3,.15,0x222222,x,1.5,2);const b=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),new THREE.MeshLambertMaterial({color:0xffa500,emissive:0xff8800}));b.position.set(x,3.2,2);g.add(b)});
 const p=car(0xe63946),pe=person(0x2a6fdb);g.add(p,pe);
 S.crossing={ox:100,mk:0.2,street:1,cam:()=>[[5,6,24],[0,1,5]],u(t,dt){t%=20;drive(p,s=>[-1.8,kf(s,[[0,60],[2.4,38],[9.1,7,'o'],[10.5,7],[14.5,-13,'i'],[19.2,-60]])],t,dt);
  const x=kf(t,[[0,-7],[2.4,-7],[12.4,7]]);pe.position.set(x,0,0);pe.rotation.y=-Math.PI/2;walk(pe,t,9)}}}

/* 2 roundabout */
{const g=mk(2);const ring=new THREE.Mesh(new THREE.RingGeometry(6,12,64).rotateX(-Math.PI/2),asp(24,24));ring.position.y=.03;g.add(ring);
 const kb=new THREE.Mesh(new THREE.CylinderGeometry(6.5,6.5,.3,40),M(0xcfcfc8));kb.position.y=.12;g.add(kb);const isl=new THREE.Mesh(new THREE.CylinderGeometry(6.1,6.1,.4,40),M(0x5aa050));isl.position.y=.14;g.add(isl);
 {const er=new THREE.Mesh(new THREE.RingGeometry(6.8,6.95,64).rotateX(-Math.PI/2),LM);er.position.y=.06;g.add(er)}tree(g,0,0,1.6);tree(g,-2.6,2.2,.9);tree(g,2.4,-2.6,.8);
 const arm=new THREE.Group();strip(arm,8,60,0,42,0);[-1,1].forEach(x=>bx(arm,3,.16,58,0xa8a8a0,x*5.5,.08,43));
 bx(arm,1.8,.18,8,0x9a9aa0,0,.09,19);for(let x=-3.8;x<0;x+=.9)bx(arm,.5,.02,.35,0xffffff,x,.06,14.5);for(let x=-3.5;x<=3.5;x++)bx(arm,.55,.02,3,0xffffff,x,.06,27);
 [[4.6,24],[-4.6,40],[4.6,56]].forEach(q=>lamp(arm,q[0],q[1]));bx(arm,.12,2.4,.12,0x777777,0,1.2,17);bx(arm,1.1,1.1,.1,0x1e5fb4,0,2.6,16.9);
 for(let k=0;k<4;k++){const c=arm.clone();c.rotation.y=k*Math.PI/2;g.add(c)}
 kerbBlocks(g,[[27,27,22,4,22],[-27,27,22,8,22],[27,-27,22,8,22],[-27,-27,22,14,22]]);
 const p=car(0xe63946),a=car(0x457b9d),b=car(0xf4a261);g.add(p,a,b);
 const B=new THREE.CatmullRomCurve3([[-2,17.5],[-1.9,13],[-1.56,8.86],[-5.16,7.37],[-7.79,4.5],[-8.91,1.25],[-13,1.9],[-22,1.9],[-60,1.9]].map(q=>new V(q[0],0,q[1])),false,'centripetal'),LB=B.getLength();
 const sd=u=>{if(u<=0)return 0;if(u<3.75)return .8*u*u;if(u<4.75)return 11.25+6*(u-3.75);if(u<6.625){const w=u-4.75;return 17.25+6*w+.8*w*w}return 31.3+9*(u-6.625)};
 const rp=t=>{if(t<8.5)return[-2,kf(t,[[0,60],[2.5,37.5],[7,17.5,'o']])];const q=B.getPointAt(Math.min(1,sd(t-8.5)/LB));return[q.x,q.z]};
 const cq=o=>t=>{const q=(20*t+o)*Math.PI/180;return[10.5*Math.sin(q),-10.5*Math.cos(q)]},ca=cq(80),cb=cq(180);
 S.roundabout={ox:200,mk:0.25,cam:()=>[[26,32,34],[-2,0,4]],u(t,dt){t%=18;drive(p,rp,t,dt);drive(a,ca,t,dt);drive(b,cb,t,dt)}}}

/* 3 junction */
{const g=mk(3);strip(g,8,200,0,0,Math.PI/2,1);strip(g,6,60,0,34,0);bx(g,3,.02,.3,0xffffff,-1.5,.06,5);
 bx(g,.12,2.6,.12,0x999999,-4,1.3,7);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.08,3),M(0xd62828));tr.rotation.x=Math.PI/2;tr.rotation.z=Math.PI/2;tr.position.set(-4,2.8,7);g.add(tr);
 kerbBlocks(g,[[-25,-16,30,14,16],[25,-16,30,18,16],[-14,26,16,3,26],[14,26,16,3,26],[-40,26,16,5,26],[40,26,16,4,26]]);
 const p=car(0xe63946),o=car(0x457b9d);g.add(p,o);
 const pp=t=>[kf(t,[[0,-1.5],[7.5,-1.5],[9,-6],[13,-45,'i']]),kf(t,[[0,60],[1.5,40],[7,7,'o'],[7.5,7],[9,2.2]])+0];
 S.junction={ox:300,mk:0.25,cam:()=>[[16,16,28],[-6,0,4]],u(t,dt){t%=13;drive(p,pp,t,dt);drive(o,s=>[kf(s,[[0,50],[8,-55]]),2],t,dt)}}}

/* 4 traffic lights */
{const g=mk(4);street(g,-120,70);strip(g,8,140,0,-9,Math.PI/2);bx(g,4,.02,.3,0xffffff,-2,.06,-3.5);
 bx(g,.14,4,.14,0x333333,-5,2,-3);const hd=bx(g,.5,1.4,.4,0x222222,-5,4.3,-3);const L=[0xff2020,0xffb000,0x20e060].map((c,i)=>{const m=new THREE.MeshLambertMaterial({color:c,emissive:0});const s=new THREE.Mesh(new THREE.SphereGeometry(.17,8,6),m);s.position.set(-5,4.75-i*.45,-2.78);g.add(s);return m});
 const p=car(0xe63946),x=car(0x2a9d8f);g.add(p,x);
 S.lights={ox:400,mk:0.25,street:1,cam:()=>[[5,6,22],[-1.5,1.5,-4]],u(t,dt){t%=22;drive(p,s=>[-1.8,kf(s,[[0,60],[2,40],[10,0,'o'],[14,0],[18,-20,'i'],[22,-60]])],t,dt);drive(x,s=>[kf(s,[[0,70],[9,48],[19,-55]]),-6.5],t,dt);
  const st=t<3?2:t<5?1:t<14?0:2;L.forEach((m,i)=>m.emissive.setHex(i===st?[0xff0000,0xffa000,0x00ff50][i]:0))}}}

/* 5 cyclist */
{const g=mk(5);street(g,-120,70);const p=car(0xe63946),o=car(0x457b9d),cy=new THREE.Group(),r=person(0xf4a261);r.position.y=.35;r.scale.setScalar(.9);cy.add(r);
 const wg=new THREE.TorusGeometry(.36,.04,6,16).rotateY(Math.PI/2),ws=[0,-.9,.9].slice(1).map(z=>{const w=new THREE.Mesh(wg,M(0x111111));w.position.set(0,.4,z);cy.add(w);return w});bx(cy,.05,.05,1.3,0xe63946,0,.65,0);g.add(p,o,cy);
 S.cyclist={ox:500,mk:0.25,street:1,cam:()=>[[5,5,30],[-1,1,10]],u(t,dt){t%=16;const zc=40-5*t;cy.position.set(-3.2,0,zc);cy.rotation.y=Math.PI;ws.forEach(w=>w.rotation.x-=5*dt/.36);walk(r,t,6);
  drive(p,s=>{const z=40-5*s;return[kf(s,[[0,-1.8],[8.6,-1.8],[10.2,-.4,'s'],[12.5,-.4],[14.5,-1.8,'s']]),z+kf(s,[[0,20],[5,9,'s'],[9,9],[13,-10,'s'],[16,-40,'i']])]},t,dt);
  drive(o,s=>[1.8,-80+13*(s)],t,dt)}}}

/* 6 braking */
const TB={20:[6,6],30:[9,14],40:[12,24],50:[15,38],60:[18,55],70:[21,75]};let mph=30;
{const g=mk(6);strip(g,8,320,0,50,0);[-1,1].forEach(s=>bx(g,3,.16,320,0xa8a8a0,s*5.5,.08,50));kerbBlocks(g,[...Array(9)].map((_,i)=>[-13,-40+i*24,10,10+(i*7%5)*4,18]));
 const p=car(0xe63946);g.add(p);const ch=person(0xffd166),ball=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M(0xff4040));ch.position.y=0;g.add(ch,ball);
 const PB=c=>new THREE.MeshBasicMaterial({color:c,polygonOffset:true,polygonOffsetFactor:-12,polygonOffsetUnits:-12}),am=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1).rotateX(-Math.PI/2),PB(0xffb703)),rd=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1).rotateX(-Math.PI/2),PB(0xe63946));g.add(am,rd);const zs=4;let th,br,v,t1,t2,t3,z0;
 const mkL=()=>{const c=document.createElement('canvas');c.width=256;c.height=64;const t=new THREE.CanvasTexture(c),sp=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));sp.renderOrder=5;g.add(sp);return{c,t,sp}};
 const dl=(L,txt,col,y,z,w)=>{const q=L.c.getContext('2d');q.clearRect(0,0,256,64);q.fillStyle='rgba(20,32,43,.85)';q.fillRect(0,0,256,64);q.fillStyle=col;q.fillRect(0,0,12,64);q.fillStyle='#fff';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText(txt,134,43);L.t.needsUpdate=true;L.sp.scale.set(w,w/4,1);L.sp.position.set(-1.8,y,z)};
 const L1=mkL(),L2=mkL(),L3=mkL(),pa=bx(g,.2,2.2,.2,0xffb703,-4.6,1.1,0),pr=bx(g,.2,2.2,.2,0xe63946,-4.6,1.1,0);
 const tk=new THREE.InstancedMesh(new THREE.BoxGeometry(.9,.02,.18),PB(0xffffff),30),od=new THREE.Object3D();tk.frustumCulled=false;g.add(tk);
 const upd=()=>{const w=Math.max(6,(th+br)*.3),h=w/4;dl(L1,'Thinking '+th+' m','#ffb703',2.5,zs+br+th/2,w);dl(L2,'Braking '+br+' m','#e63946',2.5+h*1.15,zs+br/2,w);dl(L3,'Total '+(th+br)+' m','#2a9d5c',2.5+h*2.3,zs+(th+br)/2,w);
  pa.position.z=zs+br+th;pr.position.z=zs+br;const n=Math.floor((th+br)/4);for(let i=0;i<30;i++){od.position.set(-.4,.1,zs+(i<=n?i*4:-999));od.updateMatrix();tk.setMatrixAt(i,od.matrix)}tk.instanceMatrix.needsUpdate=true};
 const set=()=>{[th,br]=TB[mph];v=mph*.44704;t1=20/v;t2=th/v;t3=2*br/v;z0=zs+br+th+20;am.scale.z=th;am.position.set(-1.8,.09,zs+br+th/2);rd.scale.z=br;rd.position.set(-1.8,.09,zs+br/2);
  upd();hooks.onBraking&&hooks.onBraking({mph,th,br})};
 S.braking={ox:600,mk:.4,set,cam:()=>{const T=th+br;return C.aspect<1?[[7,8+T*.5,zs+T*.5+34+T*.55],[-1.8,0,zs+T*.5]]:[[16+T*.5,10+T*.35,zs+T*.5+8],[-1.8,0,zs+T*.5+3]]},u(t,dt){t=(t*.55)%(t1+t2+t3+3);let s;
  if(t<t1)s=v*t;else if(t<t1+t2)s=20+v*(t-t1);else if(t<t1+t2+t3){const w=t-t1-t2;s=20+th+v*w-.5*(v*v/(2*br))*w*w}else s=20+th+br;
  const z=z0-s,pv=u0.pv||0;u0.pv=s;drive(p,q=>[-1.8,z-(q-t)*0],t,.016);p.position.z=z;p.userData.tl.emissive.setHex(t>=t1+t2&&s<20+th+br-.1?0xff0000:0);
  ch.visible=ball.visible=t>=t1;const cx=kf(t,[[t1,-5.5],[t1+.9,-2.4,'o']]);ch.position.set(cx,0,0);ch.rotation.y=Math.PI/2;walk(ch,t,10);ball.position.set(cx+.9,.3,0)}}}
const u0={};
S.braking.set();

/* motorway */
function truck(col){col=col||0xc0392b;const g=new THREE.Group();g.rotation.order='YXZ';g.userData.w=[];g.userData.big=1;g.userData.h=0;
 bx(g,2.1,.35,14.2,0x2b2b2b,0,.75,0);bx(g,2.5,2.9,2.5,col,0,2.15,-6.1);bx(g,2.2,1,.08,0x1c2b36,0,2.9,-7.38);bx(g,1.7,.7,.08,0x222222,0,1.4,-7.38);bx(g,2.6,.3,.35,0x333333,0,.75,-7.45);
 [-.95,.95].forEach(x=>bx(g,.4,.25,.08,0xfff4c0,x,1.5,-7.38));[-1.27,1.27].forEach(x=>bx(g,.05,.9,1.2,0x1c2b36,x,2.8,-6.4));bx(g,2.3,.9,1.1,col,0,3.9,-5.4);bx(g,.2,2.4,.2,0xaaaaaa,1.15,3.2,-4.95);
 bx(g,2.55,3.3,12,0xeceff1,0,2.55,1.45);bx(g,2.58,.55,12.02,col,0,1.9,1.45);bx(g,2.4,3,.06,0xd0d4d8,0,2.5,7.47);bx(g,2.4,.2,.15,0x333333,0,.9,7.45);[-1.3,1.3].forEach(x=>bx(g,.05,.5,8,0x999999,x,.9,2));
 const tl=new THREE.MeshLambertMaterial({color:0x661111});[-1,1].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.4,.25,.08),tl);b.position.set(x,1.3,7.5);g.add(b)});g.userData.tl=tl;
 const wg=new THREE.CylinderGeometry(.5,.5,.4,14).rotateZ(Math.PI/2);[-6.5,-5,4.3,5.6,6.9].forEach(z=>[-1.1,1.1].forEach(x=>{const w=new THREE.Mesh(wg,M(0x111111));w.position.set(x,.5,z);w.userData.r=.5;g.add(w);g.userData.w.push(w)}));return g}
const SL=[[230,-58],[170,-42],[120,-30],[70,-22],[28,-14.5],[5,-12.9],[-55,-12.9],[-105,-10.1],[-125,-9.17],[-500,-9.17]];
const slipX=z=>{for(let i=1;i<SL.length;i++)if(z>=SL[i][0]){const a=SL[i-1],b=SL[i];return a[1]+(b[1]-a[1])*(a[0]-z)/(a[0]-b[0])}return -9.17};
const tabz=(a,z0)=>{const n=1400,r=new Float32Array(n);let z=z0;for(let i=0;i<n;i++){r[i]=z;z-=kf(i*.02,a)*.02}return t=>{const x=Math.min(n-2,Math.max(0,t/.02)),i=Math.floor(x);return r[i]+(r[i+1]-r[i])*(x-i)}};
function seg(g,pts,w,h,y,c){for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],dx=b[0]-a[0],dz=b[1]-a[1],m=bx(g,w,h,Math.hypot(dx,dz)+.05,c,(a[0]+b[0])/2,y,(a[1]+b[1])/2);m.rotation.y=Math.atan2(dx,dz)}}
function inst(g,geo,mat,arr,y,cast){const im=new THREE.InstancedMesh(geo,mat,arr.length),o=new THREE.Object3D();arr.forEach((p,i)=>{o.position.set(p[0],y,p[1]);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.frustumCulled=false;im.castShadow=!!cast;g.add(im)}
function rail(g,pts){seg(g,pts,.12,.35,.65,0x9aa0a6);const arr=[];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],L=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=0;d<L;d+=4)arr.push([a[0]+(b[0]-a[0])*d/L,a[1]+(b[1]-a[1])*d/L])}inst(g,new THREE.BoxGeometry(.12,.8,.12),M(0x777777),arr,.4,1)}
function sgn(t){const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');x.fillStyle='#1e5fb4';x.fillRect(0,0,256,128);x.strokeStyle='#fff';x.lineWidth=5;x.strokeRect(5,5,246,118);x.fillStyle='#fff';x.font='bold 34px sans-serif';x.textAlign='center';x.fillText(t[0],128,52);x.fillText(t[1],128,98);return new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)})}
function mway(g,z0,z1,slip){const l=z1-z0,cz=(z0+z1)/2,pl=(w,x)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,l).rotateX(-Math.PI/2),asp(w,l));m.position.set(x,.03,cz);g.add(m)};
 pl(11,-5.5);pl(3.4,-12.7);pl(11,8.5);pl(3.4,15.7);const el=(x,a,b)=>bx(g,.15,.02,b-a,0xffffff,x,.05,(a+b)/2);[0,3,14].forEach(x=>el(x,z0,z1));
 const dash=[],ds=(x,a,b)=>{for(let z=a;z<b;z+=12)dash.push([x,z])};if(slip){el(-11,z0,-105);el(-11,5,z1);ds(-11,-105,5)}else el(-11,z0,z1);[-7.33,-3.67,6.67,10.33].forEach(x=>ds(x,z0,z1));
 inst(g,new THREE.BoxGeometry(.15,.02,3),LM,dash,.05,0);
 bx(g,.5,.9,l,0xb9b9b9,1.5,.45,cz);bx(g,.25,.2,l,0xd5d5d5,1.5,.98,cz);rail(g,[[17.9,z0],[17.9,z1]]);
 if(slip){const LF=[[-59.85,230],[-43.85,170],[-31.85,120],[-23.85,70],[-16.35,28],[-14.75,5],[-14.75,-55],[-11,-105]],RT=[[-56.15,230],[-40.15,170],[-28.15,120],[-20.15,70],[-12.65,28],[-11,5],[-11,-55],[-11,-105]];
  const sh=new THREE.Shape();LF.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1]));RT.slice().reverse().forEach(p=>sh.lineTo(p[0],-p[1]));
  const t=AT.clone();t.needsUpdate=true;t.repeat.set(.16,.16);const sm=new THREE.Mesh(new THREE.ShapeGeometry(sh).rotateX(-Math.PI/2),new THREE.MeshLambertMaterial({map:t,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));sm.position.y=.04;g.add(sm);
  seg(g,LF.map(p=>[p[0]+.2,p[1]]),.15,.02,.06,0xffffff);rail(g,[[-61.4,230],[-45.4,170],[-33.4,120],[-25.4,70],[-17.9,28],[-16.3,5],[-16.3,-55],[-14.9,-105],[-14.9,z0]])}else rail(g,[[-14.9,z0],[-14.9,z1]]);
 for(let z=z0,i=0;z<z1;z+=130,i++)[-1,1].forEach(q=>{const r=30+i%3*8,hh=10+(i*7%4)*4,h=new THREE.Mesh(new THREE.ConeGeometry(r,hh,7),M(q<0?0x6f9264:0x7aa06c));h.position.set(q<0?-((slip?95:60)+r+i%2*20):60+r+i%2*20,hh/2-.5,z);g.add(h)});
 for(let z=z0+20,i=0;z<z1;z+=36,i++){if(!slip)tree(g,-21,z,1.2+i%3*.2);tree(g,24,z+14,1.1+i%2*.3)}
 for(let z=z0+100;z<z1;z+=220){[-13.2,16.2].forEach(x=>bx(g,.4,6.4,.4,0x666666,x,3.2,z));bx(g,30,.6,.5,0x777777,1.5,6.4,z);
  [[-7.3,['M5','Bristol 12']],[-1.8,['Services','2 miles']]].forEach(q=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(3.6,1.8),sgn(q[1]));m.position.set(q[0],5.2,z+.3);g.add(m)})}}
/* 7 motorway: joining from a slip road */
{const g=mk(7);mway(g,-320,260,true);const p=car(0xe63946),b=car(0x457b9d),k=truck(0xc0392b),o=car(0xf4a261),oc=car(0x2a9d8f),ot=truck(0x2a6fdb);g.add(p,b,k,o,oc,ot);let zp=150,xp=-36;
 const pz=tabz([[0,14],[9,26],[18,26]],150),pf=t=>{const z=pz(t);return[slipX(z),z]};
 S.merge={ox:1000,mk:0.35,T:18,k:8,cam:()=>[[xp-14,8,zp+28],[xp+7,1,zp-18]],u(t,dt){t%=18;drive(p,pf,t,dt);const q=pf(t);zp=q[1];xp=q[0];drive(b,s=>[-9.17,100-24*s],t,dt);drive(k,s=>[-9.17,250-24*s],t,dt);drive(o,s=>[-1.83,330-34*s],t,dt);drive(oc,s=>[8.5,-300+30*s],t,dt);drive(ot,s=>[12.17,-420+26*s],t,dt)}}}
/* 8 motorway: overtaking a lorry */
{const g=mk(8);mway(g,-660,200);const lo=truck(0x2a6fdb),p=car(0xe63946),f=car(0x2a9d8f),oc=car(0xf4a261),ot=truck(0xc0392b);g.add(lo,p,f,oc,ot);let zp=130;
 const gap=t=>kf(t,[[0,95],[3,55,'s'],[7,55],[22,-30,'s'],[27,-60,'s']]),lx=t=>kf(t,[[0,-9.17],[7.6,-9.17],[9.5,-5.5,'s'],[20,-5.5],[22.5,-9.17,'s']]);
 S.overtake={ox:1500,mk:0.35,T:27,k:8,cam:()=>[[-26,9,zp+26],[-6,1,zp-14]],u(t,dt){t%=27;zp=50-22*t+gap(t);drive(lo,q=>[-9.17,50-22*q],t,dt);drive(p,q=>[lx(q),50-22*q+gap(q)],t,dt);drive(f,q=>[-1.83,-5-35*(q-5)],t,dt);drive(oc,q=>[8.5,-300+30*q],t,dt);drive(ot,q=>[12.17,-520+26*q],t,dt)}}}
/* 9 motorway: two-second gap */
{const g=mk(9);mway(g,-560,140);const vk=[[0,31],[5,31],[8,16],[11,16],[14,31]],wk=[[0,31],[5.7,31],[8.2,16],[11.5,16],[14.5,31]];
 const tab=(a,z0)=>{const n=1000,r=new Float32Array(n);let z=z0;for(let i=0;i<n;i++){r[i]=z;z-=kf(i*.02,a)*.02}return t=>{const x=Math.min(n-2,Math.max(0,t/.02)),i=Math.floor(x);return r[i]+(r[i+1]-r[i])*(x-i)}};
 const zl=tab(vk,0),zf=tab(wk,70),l=car(0x457b9d),p=car(0xe63946),oc=car(0xf4a261);g.add(l,p,oc);
 const bm=new THREE.MeshBasicMaterial({color:0x2a9d5c,transparent:true,opacity:.5}),bar=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1).rotateX(-Math.PI/2),bm);g.add(bar);let zm=30,lg=-1;
 S.gap={ox:2000,mk:.4,T:18,k:8,cam:()=>C.aspect<1?[[-14,26,zm+58],[-5.5,0,zm-4]]:[[-55,14,zm+14],[-5.5,0,zm]],u(t,dt){t%=18;drive(l,q=>[-5.5,zl(q)],t,dt);drive(p,q=>[-5.5,zf(q)],t,dt);drive(oc,q=>[8.5,-300+30*q],t,dt);
  const a=zl(t),b=zf(t),len=Math.max(.1,b-a-4.2),sec=len/kf(t,wk);zm=(a+b)/2;bar.scale.z=len;bar.position.set(-5.5,.08,zm);bm.color.setHex(sec>=2?0x2a9d5c:sec>=1?0xffb703:0xe63946);
  const r=Math.round(sec*10);if(r!==lg){lg=r;hooks.onGap&&hooks.onGap(sec)}}}}

W.traverse(o=>{if(o.isMesh){o.receiveShadow=true;if(!o.isInstancedMesh)o.castShadow=o.position.y>.25}});
/* clouds */
const cl=new THREE.Group();for(let i=0;i<(mob()?12:22);i++){const c=new THREE.Group();for(let j=0;j<4;j++)bx(c,8+Math.random()*8,3,6,0xffffff,j*5,Math.random()*2,Math.random()*3);c.position.set((Math.random()-.5)*700,50+Math.random()*25,(Math.random()-.5)*500);cl.add(c)}W.add(cl);


const clock=new THREE.Clock(),now=()=>hooks.now?hooks.now():clock.getElapsedTime();
let T0=0,cur='hero',mx=0,my=0,last=0,raf=0,dead=false;const cp=new V(0,5,40),cL=new V(0,1,0);
const rmo=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;const onMove=e=>{if(rmo)return;mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};
function rs(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.fov=mob()?54:55;if(mob())C.setViewOffset(w,h,0,h*.17,w,h);else C.clearViewOffset();C.updateProjectionMatrix()}
let d0=0,lph=0;
function frame(){if(dead)return;raf=requestAnimationFrame(frame);const t=now(),dt=Math.max(.001,Math.min(.05,t-last));last=t;
 const s=S[cur],lt=t-T0;s.u(lt,dt);const c=s.cam(),f=1+(Math.max(1,1.7/C.aspect)-1)*(s.mk||.3),fx=s.street?Math.min(f,1.25):f;
 const L=new V(c[1][0]+s.ox,c[1][1],c[1][2]),P=new V(c[0][0]+s.ox,c[0][1],c[0][2]);P.x=L.x+(P.x-L.x)*fx;P.y=L.y+(P.y-L.y)*Math.min(f,2);P.z=L.z+(P.z-L.z)*f;P.x+=mx*3;P.y-=my*1.8;
 const dist=cp.distanceTo(P);if(d0<0)d0=Math.max(1,dist);
 const ph=s.T?lt%s.T:0;if(s.T&&ph<lph){cp.copy(P);cL.copy(L)}lph=ph;
 const k=s.k?2.4+(s.k-2.4)*(1-Math.min(1,dist/60)):2.4,a=1-Math.exp(-dt*k);cp.lerp(P,a);cL.lerp(L,Math.min(1,a*1.2));
 const lift=Math.sin(Math.PI*Math.min(1,Math.max(0,1-dist/d0)))*Math.min(6,d0*.04);
 C.position.copy(cp);C.position.y+=lift;C.lookAt(cL);cl.position.set(cp.x*.7,0,cp.z*.7);sun.position.set(cL.x+45,cL.y+80,cL.z+35);sun.target.position.copy(cL);R.render(W,C)}
addEventListener('pointermove',onMove);addEventListener('resize',rs);rs();frame();
return{scene:W,camera:C,
 setScene(k,force){if(S[k]&&(k!==cur||force)){cur=k;T0=now();d0=-1}},
 setMph(m){mph=m;S.braking.set();if(cur==='braking')T0=now()},
 destroy(){dead=true;cancelAnimationFrame(raf);W.traverse(o=>{o.geometry&&o.geometry.dispose&&o.geometry.dispose();if(o.material)[].concat(o.material).forEach(m=>{m.map&&m.map.dispose();m.dispose()})});removeEventListener('pointermove',onMove);removeEventListener('resize',rs);R.dispose&&R.dispose()}}
}
