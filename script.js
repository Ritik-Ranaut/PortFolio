/* =============================================
   RITIK RANAUT - PORTFOLIO JAVASCRIPT
   ============================================= */

'use strict';

// ─── LOADER ───
(function initLoader() {
  const loader   = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  let width = 0;
  const iv = setInterval(() => {
    width += Math.random() * 18;
    if (width >= 100) {
      width = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    progress.style.width = width + '%';
  }, 60);
})();

// ─── CURSOR ───
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();
})();

// ─── NAVBAR ───
(function initNavbar() {
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

// ─── BACK TO TOP ───
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── TYPED EFFECT ───
(function initTyped() {
  const el    = document.getElementById('typedRole');
  const words = [
    'MERN Stack Developer',
    'Full Stack Engineer',
    'React Developer',
    'Node.js Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ];
  let wi = 0, ci = 0, deleting = false;
  const speed = { type: 80, delete: 40, pause: 1800 };

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
  setTimeout(tick, 600);
})();

// ─── PARTICLE CANVAS ───
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.size  = Math.random() * 2 + .5;
      this.speedX = (Math.random() - .5) * .4;
      this.speedY = -(Math.random() * .6 + .2);
      this.alpha  = Math.random() * .6 + .1;
      this.color  = Math.random() > .5 ? '124,58,237' : '6,182,212';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
})();

// ─── SCROLL ANIMATIONS (IntersectionObserver) ───
(function initScrollAnimations() {
  // Add fade-in class to elements
  const targets = [
    '.about-grid',
    '.skill-category',
    '.project-card',
    '.timeline-item',
    '.cert-card',
    '.achieve-card',
    '.contact-info-card',
    '.stat-card',
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
})();

// ─── SKILL BAR ANIMATION ───
(function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillItems.forEach(el => io.observe(el));
})();

// ─── PROJECT CARD TILT ───
(function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotX = (y - cy) / cy * -6;
      const rotY = (x - cx) / cx * 6;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s var(--ease)';
      setTimeout(() => card.style.transition = '', 400);
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .15s';
    });
  });
})();

// ─── CERT CARD TILT ───
(function initCertTilt() {
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotX = (y - cy) / cy * -8;
      const rotY = (x - cx) / cx * 8;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ─── SMOOTH SECTION REVEAL ───
(function initSectionReveal() {
  const sectionHeaders = document.querySelectorAll('.section-header');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sectionHeaders.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(el);
  });
})();

// ─── STAT COUNTER ───
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const txt = el.textContent;
      const num = parseFloat(txt);
      const suffix = txt.replace(/[\d.]/g, '');
      if (isNaN(num)) return;

      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * num) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => io.observe(el));
})();

// ─── TIMELINE ANIMATE ───
(function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.timeline-dot').classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  items.forEach(item => io.observe(item));
})();

// ─── HERO PARALLAX ───
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - .5);
    const y = (e.clientY / window.innerHeight - .5);
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 20;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(${i === 0 ? 1 : 1.05})`;
    });
  }, { passive: true });
})();

// ─── ACTIVE NAV STYLE ───
(function addActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: #fff !important; }
.nav-link.active::after { width: 100% !important; }`;
  document.head.appendChild(style);
})();

// ─── DYNAMIC YEAR IN FOOTER ───
(function updateYear() {
  const footerText = document.querySelector('.footer-sub');
  if (footerText) {
    footerText.textContent = `© ${new Date().getFullYear()} Ritik Ranaut. All rights reserved.`;
  }
})();

// ─── RIPPLE ON BUTTONS ───
(function initRipple() {
  document.querySelectorAll('.btn, .nav-cta, .back-to-top').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:rgba(255,255,255,.2);
        border-radius:50%;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple .5s ease-out forwards;
        left:${e.clientX - rect.left}px;
        top:${e.clientY - rect.top}px;
        pointer-events:none;
      `;
      if (!this.style.position || this.style.position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: translate(-50%,-50%) scale(2.5); opacity: 0; } }`;
  document.head.appendChild(style);
})();

// ─── SMOOTH GLOW ON CONTACT CARDS ───
(function initContactGlow() {
  document.querySelectorAll('.contact-info-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124,58,237,.1), rgba(255,255,255,.04) 70%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

console.log('%c Ritik Ranaut Portfolio ', 'background: linear-gradient(135deg,#7c3aed,#06b6d4); color:#fff; font-size:16px; padding:8px 16px; border-radius:8px; font-weight:bold;');
console.log('%c Built with ❤️ and lots of ☕', 'color:#94a3b8; font-size:12px;');
