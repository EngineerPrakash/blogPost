// Theme toggle and small UX helpers
(function(){
  const THEME_KEY = 'theme';
  function setTheme(t){ document.documentElement.setAttribute('data-theme', t); try{ localStorage.setItem(THEME_KEY, t);}catch(e){} }
  function getTheme(){ try{ return localStorage.getItem(THEME_KEY);}catch(e){ return null; } }

  // Add a toggle button to header
  function ensureToggle(){
    const nav = document.querySelector('.nav');
    if(!nav || nav.querySelector('.theme-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.textContent = 'Toggle Theme';
    btn.style.marginLeft = '14px';
    btn.style.padding = '4px 8px';
    btn.style.borderRadius = '8px';
    btn.style.border = '1px solid var(--border)';
    btn.style.background = '#0f131a';
    btn.style.color = 'var(--text)';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
    nav.appendChild(btn);
  }

  // Initialize
  const saved = getTheme();
  if(saved) setTheme(saved); else setTheme('dark');
  if(document.readyState !== 'loading') ensureToggle();
  else document.addEventListener('DOMContentLoaded', ensureToggle);
})();

