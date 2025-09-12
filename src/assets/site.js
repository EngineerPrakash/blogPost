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
    btn.textContent = 'Theme';
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

  // Mobile nav toggle
  function setupNavToggle(){
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = document.documentElement.getAttribute('data-nav-open') === 'true';
      document.documentElement.setAttribute('data-nav-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }
  if(document.readyState !== 'loading') setupNavToggle();
  else document.addEventListener('DOMContentLoaded', setupNavToggle);

  // Reading progress bar on posts
  function setupProgress(){
    const bar = document.getElementById('progress');
    if(!bar) return;
    function onScroll(){
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      bar.style.transform = `scaleX(${p/100})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if(document.readyState !== 'loading') setupProgress();
  else document.addEventListener('DOMContentLoaded', setupProgress);

  // Copy code buttons
  function setupCopyButtons(){
    document.querySelectorAll('pre > code').forEach(code => {
      const pre = code.parentElement;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          btn.textContent = 'Copied!';
          setTimeout(()=> btn.textContent = 'Copy', 1200);
        } catch(e){ btn.textContent = 'Error'; setTimeout(()=> btn.textContent = 'Copy', 1200); }
      });
      pre.appendChild(btn);
    });
  }
  if(document.readyState !== 'loading') setupCopyButtons();
  else document.addEventListener('DOMContentLoaded', setupCopyButtons);

  // Back to top
  function setupToTop(){
    const btn = document.createElement('a');
    btn.id = 'toTop';
    btn.href = '#top';
    btn.className = 'btn';
    btn.textContent = 'Top';
    document.body.appendChild(btn);
    function onScroll(){
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrolled > 600) btn.classList.add('show'); else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if(document.readyState !== 'loading') setupToTop();
  else document.addEventListener('DOMContentLoaded', setupToTop);
})();
