/* ===========================
   OGALOADER — MAIN JS
   =========================== */

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile nav ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileNav.classList.remove('open'))
);

// ── Reveal on scroll ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Waitlist form ──
const ctaForm = document.getElementById('ctaForm');
const ctaInput = document.getElementById('ctaInput');
const ctaBtn = document.getElementById('ctaBtn');

ctaForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = ctaInput.value.trim();
  if (!email || !email.includes('@')) {
    ctaInput.style.borderColor = 'rgba(248,113,113,0.6)';
    ctaInput.focus();
    setTimeout(() => ctaInput.style.borderColor = '', 1600);
    return;
  }
  ctaBtn.textContent = 'You\'re in! ✓';
  ctaBtn.style.background = '#22c55e';
  ctaBtn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.35)';
  ctaBtn.disabled = true;
  ctaInput.value = '';
  ctaInput.placeholder = 'We\'ll be in touch soon!';
  ctaInput.disabled = true;
});

// ── Smooth active link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'white'
          : 'rgba(255,255,255,0.65)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Number counter animation (for any future data-target elements) ──
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = (Number.isInteger(target)
      ? Math.floor(current)
      : current.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterTargets = document.querySelectorAll('[data-target]');
if (counterTargets.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterTargets.forEach(el => counterObserver.observe(el));
}
