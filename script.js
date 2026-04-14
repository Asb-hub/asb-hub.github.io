/* ============================================
   ADJARATOU SAFIÉTOU BADIO — PORTFOLIO JS
   ============================================ */

/* ---- CUSTOM CURSOR ---- */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + 'px';
  cursor.style.top  = my - 5 + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx - 16 + 'px';
  follower.style.top  = fy - 16 + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .project-card, .skill-cat, .formation-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'scale(2.5)';
    follower.style.transform = 'scale(1.6)';
    follower.style.borderColor = 'var(--violet-light)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'scale(1)';
    follower.style.transform = 'scale(1)';
    follower.style.borderColor = 'var(--violet)';
  });
});

/* ---- PARTICLES CANVAS ---- */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = ['rgba(139,92,246,', 'rgba(58,123,213,', 'rgba(229,62,62,', 'rgba(91,156,246,'];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.6 + 0.1
  };
}

for (let i = 0; i < 90; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  // Draw lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = 'rgba(139,92,246,' + (0.08 * (1 - dist / 100)) + ')';
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- MOBILE NAV TOGGLE ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- SKILL BARS ANIMATION ---- */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sb-fill').forEach(bar => {
        const w = bar.dataset.w;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-cat').forEach(el => skillObserver.observe(el));

/* ---- COUNT-UP ANIMATION ---- */
function countUp(el) {
  const target = parseInt(el.dataset.count);
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + '+';
    if (count >= target) clearInterval(timer);
  }, 35);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(countUp);
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

/* ---- TYPING EFFECT ---- */
const titles = [
  'Étudiante en Systèmes & Réseaux',
  'Future Ingénieure en Cybersécurité',
  'Spécialiste VoIP & WebRTC',
  'Passionnée par la Tech Africaine'
];
let ti = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedTitle');

function typeEffect() {
  const current = titles[ti];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 70);
}
typeEffect();

/* ---- CONTACT FORM (Formspree) ---- */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const span = submitBtn.querySelector('span');

    // Afficher "Envoi en cours..."
    span.textContent   = 'Envoi en cours...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Succès
        span.textContent = '✓ Message envoyé avec succès !';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        submitBtn.style.opacity = '1';
        contactForm.reset();

        setTimeout(() => {
          span.textContent       = 'Envoyer le message';
          submitBtn.style.background = '';
          submitBtn.disabled     = false;
        }, 4000);

      } else {
        // Erreur serveur
        span.textContent = '❌ Erreur, réessayez.';
        submitBtn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;

        setTimeout(() => {
          span.textContent       = 'Envoyer le message';
          submitBtn.style.background = '';
        }, 3000);
      }

    } catch (err) {
      // Erreur réseau
      span.textContent = '❌ Connexion impossible.';
      submitBtn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;

      setTimeout(() => {
        span.textContent       = 'Envoyer le message';
        submitBtn.style.background = '';
      }, 3000);
    }
  });
}

/* ---- SMOOTH SCROLL (backup for older browsers) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
