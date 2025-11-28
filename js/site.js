(function(){
  const btn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(!btn || !navLinks) return;
  btn.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
    btn.classList.toggle('open');
  });
  // close nav on link click for mobile
  navLinks.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A' && navLinks.classList.contains('open')){
      navLinks.classList.remove('open');
      btn.classList.remove('open');
    }
  });
  // close on Escape
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && navLinks.classList.contains('open')){
      navLinks.classList.remove('open');
      btn.classList.remove('open');
    }
  });
  // close clicking outside
  document.addEventListener('click', (e)=>{
    if(!navLinks.contains(e.target) && !btn.contains(e.target) && navLinks.classList.contains('open')){
      navLinks.classList.remove('open');
      btn.classList.remove('open');
    }
  });
})();
