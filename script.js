// ========= PSA frontend enhancements (refactored) =========
(function () {
  // ---------- Utilities ----------
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const setStyles = (el, styles) => { for (const k in styles) el.style[k] = styles[k]; };
  const storage = window.localStorage;
  const LITE_KEY = 'lite-mode-enabled';
  function isLiteEnabled() {
    try { return storage.getItem(LITE_KEY) === '1'; }
    catch { return document.documentElement.getAttribute('data-lite') === '1'; }
  }
  function setLiteEnabled(v) {
    try { if (v) storage.setItem(LITE_KEY, '1'); else storage.removeItem(LITE_KEY); } catch {}
    document.documentElement.setAttribute('data-lite', v ? '1' : '0');
    const btn = qs('#lite-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', v ? 'true' : 'false');
      btn.textContent = v ? 'Disable Lite Mode' : 'Enable Lite Mode';
    }
    const liteLink = qs('#liteStylesheet');
    // Enable when on; otherwise disable to defer to base+mobile CSS
    if (liteLink) liteLink.media = v ? 'all' : 'not all';
  }

  // ---------- Mobile navigation ----------
  const navToggle = qs('.nav-toggle');
  const navLinks = qs('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const next = !(navToggle.getAttribute('aria-expanded') === 'true');
      navToggle.classList.toggle('active', next);
      navLinks.classList.toggle('active', next);
      navToggle.setAttribute('aria-expanded', String(next));
    });

    // Close on link click (event delegation)
    navLinks.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link) return;
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // ---------- Active nav + TOC highlighting ----------
  const sectionNodes = qsa('section, header');
  const navItems = qsa('.nav-link');
  const tocItems = qsa('.toc-link');

  function setActiveNav() {
    let current = '';
    const offset = 100;
    for (const sec of sectionNodes) {
      const top = sec.offsetTop;
      if (window.pageYOffset >= top - offset) current = sec.getAttribute('id') || '';
    }
    const matchHref = `#${current}`;
    [...navItems, ...tocItems].forEach((el) => {
      const isActive = el.getAttribute('href') === matchHref;
      el.classList.toggle('active', isActive);
      if (isActive) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  window.addEventListener('load', setActiveNav);

  // ---------- Scroll animations ----------
  if ('IntersectionObserver' in window && !isLiteEnabled()) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStyles(entry.target, { opacity: '1', transform: 'translateY(0)' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    qsa('.glass-card').forEach((card) => {
      setStyles(card, { opacity: '0', transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' });
      observer.observe(card);
    });
  }

  // ---------- Loading animation ----------
  window.addEventListener('load', () => document.body.classList.add('loaded'));

  // ---------- Smooth scroll with dynamic offset ----------
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    const target = href ? qs(href) : null;
    if (!target) return;
    e.preventDefault();
    const fixedNav = qs('.nav-menu');
    const headerOffset = fixedNav ? fixedNav.offsetHeight : 0;
    const rect = target.getBoundingClientRect();
    const extraGap = 20; // keep some space above the target for visibility
    const offsetPosition = window.pageYOffset + rect.top - headerOffset - extraGap;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  });

  // ---------- Floating brand animation ----------
  const navBrand = qs('.nav-brand');
  if (navBrand) {
    let t = 0;
    (function animate() {
      t += 0.015;
      const y = Math.sin(t) * 1.5;
      const x = Math.cos(t * 0.5) * 0.5;
      setStyles(navBrand, { transform: `translate(${x}px, ${y}px)` });
      requestAnimationFrame(animate);
    })();
  }

  // ---------- Background particles (respect motion preferences) ----------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function createParticleEffect() {
    const particleCount = 50;
    const style = document.createElement('style');
    style.textContent = `@keyframes particleFloat { 0%,100%{transform:translateY(0) rotate(0);opacity:.1} 50%{transform:translateY(-20px) rotate(180deg);opacity:.3} }`;
    document.head.appendChild(style);
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `position:fixed;width:4px;height:4px;background:rgba(255,255,255,.1);border-radius:50%;pointer-events:none;z-index:-1;left:${Math.random()*100}vw;top:${Math.random()*100}vh;animation:particleFloat ${Math.random()*10+5}s ease-in-out infinite;animation-delay:${Math.random()*5}s;`;
      document.body.appendChild(p);
    }
  }
  if (!prefersReduced && window.innerWidth > 768 && !isLiteEnabled()) createParticleEffect();

  // ---------- Scroll progress bar ----------
 

  // ---------- Hover effects (idempotent) ----------
  if (!isLiteEnabled()) {
    qsa('.nav-link, .glass-card, .support-badge, .contributor-category').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (el.dataset.scaled === '1') return;
        el.style.transform = (el.style.transform || '') + ' scale(1.02)';
        el.dataset.scaled = '1';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = (el.style.transform || '').replace(' scale(1.02)', '');
        el.dataset.scaled = '0';
      });
    });
  }

  // ---------- Contributors carousel controls ----------
  qsa('.contributor-category').forEach((cat) => {
    const container = cat.querySelector('.carousel-container');
    if (!container) return;
    const prev = cat.querySelector('.carousel-prev-btn');
    const next = cat.querySelector('.carousel-next-btn');
    const getStep = () => {
      const first = container.querySelector('li');
      return first ? Math.max(first.clientWidth, 240) + 12 : 260;
    };
    if (prev) prev.addEventListener('click', () => container.scrollBy({ left: -getStep(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => container.scrollBy({ left: getStep(), behavior: 'smooth' }));

    // Auto-scroll every few seconds (respect reduced motion, pause on hover/focus)
    let autoTimer = null;
    const autoIntervalMs = 6000;
    function stepForward() {
      const atEnd = container.scrollLeft + container.clientWidth >= (container.scrollWidth - 4);
      if (atEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: getStep(), behavior: 'smooth' });
      }
    }
    function startAuto() {
      if (autoTimer || prefersReduced) return;
      autoTimer = setInterval(stepForward, autoIntervalMs);
    }
    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    // Pause on user interaction
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);
    container.addEventListener('focusin', stopAuto);
    container.addEventListener('focusout', startAuto);
    if (prev) prev.addEventListener('click', () => { stopAuto(); setTimeout(startAuto, autoIntervalMs); });
    if (next) next.addEventListener('click', () => { stopAuto(); setTimeout(startAuto, autoIntervalMs); });

    // Start if allowed
    startAuto();
  });

  // (Using existing .last-update logic for consistent footer-style updates)

  // ---------- Lite mode bootstrap ----------
  window.addEventListener('load', () => {
    const autoLite = (window.innerWidth < 480) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
    let hasPref = false;
    try { hasPref = storage.getItem(LITE_KEY) !== null; } catch {}
    if (autoLite && !hasPref) {
      setLiteEnabled(true);
    } else {
      setLiteEnabled(isLiteEnabled());
    }
    const btn = qs('#lite-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', isLiteEnabled() ? 'true' : 'false');
      btn.addEventListener('click', () => setLiteEnabled(!isLiteEnabled()));
    }
  });
})();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Enhanced hover effects for interactive elements
document.querySelectorAll('.nav-link, .glass-card, .support-badge, .contributor-category').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = element.style.transform + ' scale(1.02)';
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = element.style.transform.replace(' scale(1.02)', '');
  });
});

// Add dynamic theme switching capability (for future enhancement)
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Theme toggle functionality (can be activated later)
  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
}

initializeTheme();

// Hardcode timeline and footer dates
// Pulls the current time/date of the visitors system and updates "Still ongoing" accordingly
// "Resolved" function added see Index.html

(function setTimelineDates() {
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatDateTime(date) {
    return formatDate(date) + " " + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  const issueRaisedDate = 'August 7, 2025';
  const timelineEl = document.querySelector('.timeline');
  const footerEls = document.querySelectorAll('.last-update');

  // === Get GitHub commit timestamp ===
  async function getLastCommitDate() {
    try {
      const res = await fetch("https://api.github.com/repos/Delulu-Delilah/free-the-code/commits/beta-fixes");
      const data = await res.json();
      return new Date(data.commit.author.date);
    } catch (err) {
      console.error("Failed to fetch GitHub last commit:", err);
      return new Date(document.lastModified); // fallback
    }
  }

  async function updateUI() {
    const lastCommit = await getLastCommitDate();
    const commitDateTime = formatDateTime(lastCommit);

    // Visitor system time (for timeline ongoing state)
    const now = new Date();
    const visitorDate = formatDate(now);

    if (!timelineEl) return;

    const isResolved = timelineEl.dataset.resolved === "true";
    const resolvedDateAttr = timelineEl.dataset.resolvedDate;

    if (isResolved && resolvedDateAttr) {
      const resolvedDate = formatDate(new Date(resolvedDateAttr));
      const resolvedDateTime = formatDateTime(new Date(resolvedDateAttr));
      timelineEl.textContent = `🗓️ Issue raised: ${issueRaisedDate} | Resolved on ${resolvedDate}`;
      footerEls.forEach(p => {
        p.textContent = `Last updated: ${resolvedDateTime}`;
      });
    } else {
      timelineEl.textContent = `🗓️ Issue raised: ${issueRaisedDate} | Still ongoing as of ${visitorDate}`;
      footerEls.forEach(p => {
        p.textContent = `Last updated: ${commitDateTime}`;
      });
    }
  }

  updateUI();
})();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debounced scroll for better performance (keep other passive listener too)
const debouncedSetActiveNav = debounce(() => {
  const event = new Event('scroll');
  window.dispatchEvent(event);
}, 50);
window.addEventListener('scroll', debouncedSetActiveNav, { passive: true });

// Add accessibility improvements
document.querySelectorAll('.nav-link').forEach(link => {
  link.setAttribute('aria-label', `Navigate to ${link.textContent} section`);
});

if (document.querySelector('.nav-toggle')) {
  const nt = document.querySelector('.nav-toggle');
  nt.setAttribute('aria-label', 'Toggle navigation menu');
  if (!nt.hasAttribute('aria-expanded')) nt.setAttribute('aria-expanded', 'false');
}

// Research page: fetch GitHub activity for OpenCentauri/OpenCentauri
(function initResearchGitHubFeed() {
  const commitsEl = document.getElementById('gh-commits');
  const issuesEl = document.getElementById('gh-issues');
  const pullsEl = document.getElementById('gh-pulls');
  if (!commitsEl && !issuesEl && !pullsEl) return;

  const repo = 'OpenCentauri/OpenCentauri';

  // Helper to create list items safely
  function addItem(listEl, html) {
    if (!listEl) return;
    const li = document.createElement('li');
    li.innerHTML = html;
    listEl.appendChild(li);
  }

  // Fetch recent commits
  fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`)
    .then(r => r.ok ? r.json() : [])
    .then(data => {
      if (!Array.isArray(data)) return;
      data.forEach(c => {
        const msg = (c.commit && c.commit.message) ? c.commit.message.split('\n')[0] : 'Commit';
        const sha = (c.sha || '').substring(0,7);
        const url = c.html_url || `https://github.com/${repo}/commit/${c.sha}`;
        addItem(commitsEl, `<a href="${url}" target="_blank">${msg}</a> <code>#${sha}</code>`);
      });
    }).catch(() => {});

  // Fetch open issues
  fetch(`https://api.github.com/repos/${repo}/issues?state=open&per_page=5`)
    .then(r => r.ok ? r.json() : [])
    .then(data => {
      if (!Array.isArray(data)) return;
      data.filter(i => !i.pull_request).forEach(i => {
        addItem(issuesEl, `<a href="${i.html_url}" target="_blank">#${i.number} ${i.title}</a>`);
      });
    }).catch(() => {});

  // Fetch open pull requests
  fetch(`https://api.github.com/repos/${repo}/pulls?state=open&per_page=5`)
    .then(r => r.ok ? r.json() : [])
    .then(data => {
      if (!Array.isArray(data)) return;
      data.forEach(p => {
        addItem(pullsEl, `<a href="${p.html_url}" target="_blank">#${p.number} ${p.title}</a>`);
      });
    }).catch(() => {});
})();
