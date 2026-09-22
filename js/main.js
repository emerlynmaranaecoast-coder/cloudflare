// Mobile nav
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> navLinks.classList.remove('open')));

// Sticky nav shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 10) nav.style.boxShadow = '0 6px 24px rgba(10,22,40,.06)';
  else nav.style.boxShadow = 'none';
});

// Program filter
const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.prog-card');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    const f = pill.dataset.filter;
    cards.forEach(c=>{
      const cat = c.dataset.cat;
      const show = f==='all' || cat===f;
      c.style.display = show ? '' : 'none';
      if(show){
        c.style.animation = 'none';
        c.offsetHeight;
        c.style.animation = 'fadeIn .35s ease';
      }
    });
  });
});

// Form handling
const form = document.getElementById('applyForm');
const toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 4200);
}
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  // simple validation
  const inputs = form.querySelectorAll('input[required], select[required]');
  let valid = true;
  inputs.forEach(i=>{
    if(!i.value.trim() || (i.type==='checkbox' && !i.checked)){
      valid = false;
      i.style.borderColor = '#FF3B30';
      setTimeout(()=> i.style.borderColor='', 2000);
    }
  });
  if(!valid){
    showToast('⚠️ Pakikumpleto ang lahat ng required fields.');
    return;
  }
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sinusumite...';
  btn.disabled = true;
  setTimeout(()=>{
    btn.textContent = orig;
    btn.disabled = false;
    form.reset();
    showToast('✅ Natanggap na ang application mo! Tatawagan ka ng ECOAST admissions within 24 hours. Check your email!');
    // confetti effect simple
    document.body.insertAdjacentHTML('beforeend', `<div style="position:fixed;inset:0;pointer-events:none;display:grid;place-items:center;z-index:99" id="conf"><div style="font-size:64px;animation:pop .6s ease">🎉</div></div>`);
    setTimeout(()=> document.getElementById('conf')?.remove(), 1200);
  }, 1100);
});

// Smooth scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        const off = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - off;
        window.scrollTo({top, behavior:'smooth'});
      }
    }
  });
});

// Add fadeIn keyframes dynamically
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn{from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:none}} @keyframes pop{0%{transform:scale(.6)} 60%{transform:scale(1.15)} 100%{transform:scale(1)}}`;
document.head.appendChild(style);

// Virtual tour placeholder
document.getElementById('virtual-tour')?.addEventListener('click', (e)=>{
  e.preventDefault();
  showToast('🎥 Virtual Tour — Paparating! Sa ngayon, bisitahin ang BGC campus Mon–Sat 8AM–6PM para sa actual tour.');
});
