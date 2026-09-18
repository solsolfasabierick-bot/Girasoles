/* ======= POEMA / MENSAJE "RECIÉN CONOCIÉNDONOS" (BUENA ONDA) ======= */
document.getElementById("cardDate").textContent  = "21 DE SEPTIEMBRE";
document.getElementById("cardTitle").textContent = "¡Feliz 21 de Septiembre! 🌻";
document.getElementById("cardBody").innerHTML =
  "<p>Dicen que este 21 de septiembre</p>" +
  "<p>se regalan flores y buena energía,</p>" +
  "<p>y quise armar algo fuera de lo común</p>" +
  "<p>para sacarte una sonrisa en el día.</p>" +
  "<br>" +
  "<p>Nos estamos recién conociendo, es verdad,</p>" +
  "<p>compartiendo charlas y buena onda por ahí,</p>" +
  "<p>y me pareció un detalle bastante chévere</p>" +
  "<p>sorprenderte con algo creado para ti.</p>" +
  "<br>" +
  "<p>Por aquí dejé estas fotitos guardadas,</p>" +
  "<p>momentos tranquilos, sonrisas y más,</p>" +
  "<p>porque vale la pena tener un buen gesto</p>" +
  "<p>con alguien con quien da gusto conversar.</p>" +
  "<br>" +
  "<p>Que este campo de girasoles y este cielo</p>" +
  "<p>te recuerden que hay detalles con buena intención;</p>" +
  "<p>pásala increíble en este día especial</p>" +
  "<p>y que lo que venga sea con la mejor adición.</p>";
document.getElementById("cardSign").textContent = "— Un detalle con mucho cariño por parte de Eric 🌻";
/* ============================================ */

// ---------- DIBUJO DE GIRASOL MODERNO (SVG) CON TALLO Y HOJAS ----------
const NS = "http://www.w3.org/2000/svg";
let gradId = 0;

function el(name, attrs){
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function sunflowerSVG(withStem){
  gradId++;
  const petalGradId = "petalG"+gradId;
  const centerGradId = "centerG"+gradId;
  const stemGradId = "stemG"+gradId;
  const leafGradId = "leafG"+gradId;

  const svg = el("svg", {viewBox: withStem ? "-72 -68 144 230" : "-72 -68 144 136"});
  const defs = el("defs", {});

  const pg = el("linearGradient", {id:petalGradId, x1:"0%", y1:"0%", x2:"0%", y2:"100%"});
  pg.appendChild(el("stop", {offset:"0%", "stop-color":"#fff1a8"}));
  pg.appendChild(el("stop", {offset:"55%", "stop-color":"#ffc93c"}));
  pg.appendChild(el("stop", {offset:"100%", "stop-color":"#f2971a"}));
  defs.appendChild(pg);

  const cg = el("radialGradient", {id:centerGradId, cx:"38%", cy:"32%", r:"75%"});
  cg.appendChild(el("stop", {offset:"0%", "stop-color":"#8a5322"}));
  cg.appendChild(el("stop", {offset:"55%", "stop-color":"#5c3417"}));
  cg.appendChild(el("stop", {offset:"100%", "stop-color":"#331b0c"}));
  defs.appendChild(cg);

  if (withStem){
    const sg = el("linearGradient", {id:stemGradId, x1:"0%", y1:"0%", x2:"0%", y2:"100%"});
    sg.appendChild(el("stop", {offset:"0%", "stop-color":"#8fbf46"}));
    sg.appendChild(el("stop", {offset:"100%", "stop-color":"#3c6a1a"}));
    defs.appendChild(sg);

    const lg = el("linearGradient", {id:leafGradId, x1:"0%", y1:"0%", x2:"100%", y2:"100%"});
    lg.appendChild(el("stop", {offset:"0%", "stop-color":"#9ed156"}));
    lg.appendChild(el("stop", {offset:"100%", "stop-color":"#3f7a1e"}));
    defs.appendChild(lg);
  }

  svg.appendChild(defs);

  const g = el("g", {});

  if (withStem){
    g.appendChild(el("path", {
      d:"M0,30 C 6,70 -6,110 3,150",
      fill:"none", stroke:`url(#${stemGradId})`, "stroke-width":7, "stroke-linecap":"round"
    }));
    g.appendChild(el("path", {
      d:"M2,78 C 26,72 40,84 46,100 C 26,100 10,94 2,78 Z",
      fill:`url(#${leafGradId})`
    }));
    g.appendChild(el("path", {
      d:"M0,112 C -24,108 -38,120 -44,136 C -22,136 -6,128 0,112 Z",
      fill:`url(#${leafGradId})`
    }));
  }

  const petalCount = 13;
  for(let i=0;i<petalCount;i++){
    const a = (360/petalCount)*i;
    const pg2 = el("g", {transform:`rotate(${a})`});
    pg2.appendChild(el("ellipse", {
      cx:0, cy:-33, rx:12.5, ry:26,
      fill:`url(#${petalGradId})`,
      stroke:"#e08a12", "stroke-width":1, "stroke-opacity":.35
    }));
    g.appendChild(pg2);
  }

  g.appendChild(el("circle", {r:25, fill:`url(#${centerGradId})`}));
  g.appendChild(el("circle", {r:25, fill:"none", stroke:"#2a1508", "stroke-width":1.5, "stroke-opacity":.5}));
  g.appendChild(el("circle", {r:16, fill:"none", stroke:"#7a4a1f", "stroke-width":1, "stroke-opacity":.5}));
  g.appendChild(el("ellipse", {cx:-7, cy:-9, rx:6, ry:4, fill:"#fff3cf", opacity:.45}));

  svg.appendChild(g);
  return svg; // <--- Aquí estaba la "z" extra que rompía todo
}

// ---------- CAMPO DE GIRASOLES CON SENDERO Y PERSPECTIVA ----------
function seededRandom(seed){
  let s = seed;
  return function(){ s = (s*9301+49297)%233280; return s/233280; };
}
const rand = seededRandom(42);
const field = document.getElementById("field");
const flowers = [];
const HEAD_H_RATIO = 136/144;  
const FULL_H_RATIO = 230/144;  

const ROWS = 8;
for(let r=0;r<ROWS;r++){
  const rowDepth = r/(ROWS-1);            
  const cols = 6 + Math.round(rowDepth*6); 
  const rowY = 56 + rowDepth * 40;         
  const size = 18 + rowDepth * 110;        
  const stagger = (r % 2) ? (50/cols) : 0; 

  for(let c=0;c<cols;c++){
    const xBase = ((c+0.5)/cols)*100 + stagger;
    
    const distFromCenter = Math.abs(xBase - 50);
    if(rowDepth > 0.35 && distFromCenter < 16 * rowDepth) {
      continue; 
    }

    const xJitter = (rand()-0.5) * (90/cols) * 0.4;
    const yJitter = (rand()-0.5) * 3;
    const xPct = clamp(xBase + xJitter, -4, 104);
    const yPct = rowY + yJitter;
    const depth = clamp(rowDepth + (rand()-0.5)*0.06, 0, 1);

    const wrap = document.createElement("div");
    wrap.className = "flower";
    wrap.style.left = xPct+"%";
    wrap.style.top  = yPct+"%";
    wrap.style.width = size+"px";
    wrap.style.height = (size*FULL_H_RATIO)+"px";
    wrap.style.zIndex = Math.round(depth*50);
    wrap.appendChild(sunflowerSVG(true));
    field.appendChild(wrap);
    flowers.push({el:wrap, depth, xPct, yPct, size});
  }
}

const hero = document.getElementById("hero");
const heroSize = 170;
hero.style.width = heroSize+"px";
hero.style.height = (heroSize*HEAD_H_RATIO)+"px";
hero.appendChild(sunflowerSVG(false));

// ---------- LUCIÉRNAGAS ----------
const fireBox = document.getElementById("fireflies");
for(let i=0;i<18;i++){
  const f = document.createElement("span");
  f.className = "firefly";
  f.style.left = (Math.random()*100)+"%";
  f.style.top  = (40+Math.random()*50)+"%";
  f.style.animationDelay = (Math.random()*5)+"s";
  f.style.animationDuration = (4+Math.random()*4)+"s";
  fireBox.appendChild(f);
}

// ---------- LLUVIA DE DESTELLOS DORADOS ----------
const rainBox = document.getElementById("rainContainer");
for(let i=0; i<35; i++){
  const drop = document.createElement("span");
  drop.className = "raindrop";
  drop.style.left = (Math.random() * 100) + "%";
  drop.style.top = (-10 + Math.random() * 20) + "vh";
  drop.style.animationDuration = (1.2 + Math.random() * 1.5) + "s";
  drop.style.animationDelay = (Math.random() * 3) + "s";
  rainBox.appendChild(drop);
} // <--- ¡Aquí debe cerrar bien esta llave!

// ---------- ESTRELLAS (GALAXIA LLENA) ----------
const starsBox = document.getElementById("starsContainer");
for(let j=0; j<180; j++){ // ¡Subido a 180 estrellas para un cielo hiper poblado!
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = (Math.random() * 100) + "%";
  star.style.top = (Math.random() * 50) + "%"; // Cubre la mitad superior del cielo
  
  const size = (0.8 + Math.random() * 2) + "px"; // Tamaños variados (unas súper finas y otras más notorias)
  star.style.width = size;
  star.style.height = size;
  
  star.style.setProperty("--duration", (1.2 + Math.random() * 3) + "s");
  star.style.animationDelay = (Math.random() * 5) + "s";
  
  starsBox.appendChild(star);
}
// ---------- LÓGICA DEL CARRUSEL DE FOTOS (4 FOTOS) ----------
let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.photo-frame img');
const dots = document.querySelectorAll('.photo-dot');

function showPhoto(index) {
  if (photos.length === 0) return;
  photos.forEach((img, i) => {
    img.classList.toggle('active', i === index);
    if(dots[i]) dots[i].classList.toggle('active', i === index);
  });
  currentPhotoIndex = index;
}

function currentPhoto(index) {
  showPhoto(index);
}

// Cambio automático cada 4 segundos
setInterval(() => {
  if (photos.length > 0) {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
  }
}, 4000);

// ---------- ANIMACIÓN CONTROLADA POR SCROLL ----------
const sun = document.getElementById("sun");
const flare = document.getElementById("flare");
const ring1 = document.getElementById("ring1");
const ring2 = document.getElementById("ring2");
const instruction = document.getElementById("instruction");
const card = document.getElementById("card");

function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function smooth(edge0, edge1, x){
  const t = clamp((x-edge0)/(edge1-edge0), 0, 1);
  return t*t*(3-2*t);
}

function render(){
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const p = maxScroll > 0 ? clamp(window.scrollY/maxScroll, 0, 1) : 0;

  instruction.style.opacity = 1 - smooth(0, 0.12, p);

  const sunScale = 1 + p*0.5;
  sun.style.transform = `translate(-50%,-50%) scale(${sunScale})`;
  sun.style.opacity = 0.85 + p*0.15;

  const nearCard = smooth(0.85, 1, p);
  const flareT = smooth(0.05, 0.9, p) * (1 - nearCard*0.85);
  flare.style.opacity = flareT * 0.9;
  flare.style.transform = `translate(-50%,-50%) scale(${0.4 + p*1.5})`;

  ring1.style.width = ring1.style.height = (140 + p*520) + "px";
  ring1.style.marginLeft = -(140 + p*520)/2 + "px";
  ring1.style.marginTop  = -(140 + p*520)/2 + "px";
  ring1.style.opacity = flareT * 0.55;

  ring2.style.width = ring2.style.height = (60 + p*260) + "px";
  ring2.style.marginLeft = -(60 + p*260)/2 + "px";
  ring2.style.marginTop  = -(60 + p*260)/2 + "px";
  ring2.style.opacity = flareT * 0.4;

  flowers.forEach(f=>{
    const speed = 0.4 + f.depth*1.6;
    const dx = (f.xPct - 50) * p * speed * 2.2;
    const dy = -(p*speed*260);
    const scale = 1 + p*f.depth*0.6;
    const fade = 1 - smooth(0.2, 0.65, p);
    f.el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    f.el.style.opacity = fade;
  });

  const heroScale = 1 + p*p*9;
  hero.style.transform = `translate(-50%,-50%) scale(${heroScale})`;
  hero.style.opacity = 1 - smooth(0.9, 1, p) * 0.4;
  hero.style.filter = `brightness(${1 + p*0.35})`;

  const cardT = smooth(0.72, 0.98, p);
  card.style.opacity = cardT;
  card.style.transform = `translate(-50%,-50%) translateY(${(1-cardT)*24}px)`;
}

let ticking = false;
function onScroll(){
  if(!ticking){
    requestAnimationFrame(()=>{ render(); ticking = false; });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll, {passive:true});
window.addEventListener("resize", render);
render();
// ---------- CONTROL DE LA INTRO Y MÚSICA AUTOMÁTICA ----------
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enterBtn");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const bgMusic = document.getElementById("bgMusic");

  if (enterBtn && welcomeScreen) {
    enterBtn.addEventListener("click", () => {
      // Oculta la pantalla de bienvenida suavemente
      welcomeScreen.classList.add("hidden");
      
      // Reproduce la música de Floricienta automáticamente de fondo
      if (bgMusic) {
        bgMusic.volume = 0.4; // Volumen agradable
        bgMusic.play().catch(error => {
          console.log("Reproducción automática prevenida por el navegador:", error);
        });
      }
    });
  }
});