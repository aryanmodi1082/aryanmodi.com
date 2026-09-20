const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const progress=document.querySelector('.progress span');
const revealItems=document.querySelectorAll('.reveal');
const navLinks=document.querySelectorAll('.desktop-nav a');
const sections=[...document.querySelectorAll('main section[id]')];

function closeMenu(){
  if(!mobileMenu)return;
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden','true');
  menuButton?.setAttribute('aria-expanded','false');
}

menuButton?.addEventListener('click',()=>{
  const open=!mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open',open);
  mobileMenu.setAttribute('aria-hidden',String(!open));
  menuButton.setAttribute('aria-expanded',String(open));
});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=a.getAttribute('href');
  const el=document.querySelector(target);
  if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
}));

const updateProgress=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
};
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.12});
  revealItems.forEach(el=>observer.observe(el));
}else revealItems.forEach(el=>el.classList.add('visible'));

if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
    }
  }),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));
}
