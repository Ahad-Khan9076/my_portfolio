// ===== Navbar scroll effect + hide on scroll down =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
  const currentY = window.scrollY;

  // Scrolled state (background blur)
  if (currentY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Hide on scroll down, show on scroll up
  if (currentY > lastScrollY && currentY > 120) {
    navbar.classList.add('header-hidden');
  } else {
    navbar.classList.remove('header-hidden');
  }
  lastScrollY = currentY;

  // Back to top
  if (currentY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1800;
  const start = performance.now();

  requestAnimationFrame(function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else {
      if (target >= 1000) el.textContent = target.toLocaleString() + '+';
      else if (target === 13) el.textContent = '13k+';
      else el.textContent = target;
    }
  });
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(c => animateCounter(c));
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

if (counters.length) {
  counterObserver.observe(counters[0].closest('section') || counters[0]);
}

// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== Contact form =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry – ${service}`);
    const body = encodeURIComponent(
      `Hi Ahad,\n\nName: ${name}\nEmail: ${email}\nInterest: ${service}\n\n${message || '(No additional message)'}\n\nSent from your portfolio site.`
    );

    window.location.href = `mailto:ahadalikhan1525@gmail.com?subject=${subject}&body=${body}`;

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Opening email...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 2500);
  });
}

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Hero headline animation (word by word) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const words = heroTitle.querySelectorAll('.word');
  words.forEach((word, i) => {
    word.style.animationDelay = `${0.15 + i * 0.12}s`;
    word.classList.add('word-animate');
  });
}
