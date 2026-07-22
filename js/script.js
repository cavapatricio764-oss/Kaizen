/* ==========================================================================
   KAIZEN — interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing animation for hero title ---------- */
  const titleEl = document.getElementById('hero-title');
  if (titleEl){
    const full = titleEl.getAttribute('aria-label') || titleEl.textContent.trim();
    titleEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '&nbsp;';
    titleEl.appendChild(cursor);

    let i = 0;
    const speed = 42; // ms per character

    function typeNext(){
      if (i < full.length){
        const char = full[i];
        const textNode = document.createTextNode(char);
        // highlight the final period in the brand gold
        if (i === full.length - 1 && char === '.'){
          const span = document.createElement('span');
          span.style.color = 'var(--gold)';
          span.textContent = char;
          titleEl.insertBefore(span, cursor);
        } else {
          titleEl.insertBefore(textNode, cursor);
        }
        i++;
        setTimeout(typeNext, speed);
      } else {
        setTimeout(() => cursor.remove(), 1400);
      }
    }
    // start slightly after page paints so the reveal feels intentional
    setTimeout(typeNext, 350);
  }

  /* ---------- Scroll-triggered reveal / fade-in / zoom-in ---------- */
  const animated = document.querySelectorAll('.reveal, .fade-in, .zoom-in');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
      // threshold is a % of the root (viewport), not of each block — so tall
      // stacked sections on mobile still trigger as soon as they scroll into view,
      // instead of waiting for a fixed pixel margin that barely matters on small screens.
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

    animated.forEach(el => io.observe(el));

    // Safety net: if an element is already on-screen at load (e.g. the hero on a
    // short mobile viewport) but for any reason never fires, reveal it after 2.5s.
    setTimeout(() => {
      animated.forEach(el => el.classList.add('in-view'));
    }, 2500);
  } else {
    animated.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Stats counter (0 → target) ---------- */
  const counters = document.querySelectorAll('.counter');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters.length && prefersReducedMotion){
    counters.forEach(el => {
      el.textContent = `${el.dataset.prefix || ''}${el.dataset.target}${el.dataset.suffix || ''}`;
    });
  } else if (counters.length){
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1400; // ms
      const start = performance.now();

      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        // ease-out for a natural deceleration near the target
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1){
          requestAnimationFrame(tick);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window){
      const counterIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            animateCounter(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
      counters.forEach(el => counterIo.observe(el));
    } else {
      counters.forEach(el => {
        el.textContent = `${el.dataset.prefix || ''}${el.dataset.target}${el.dataset.suffix || ''}`;
      });
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  if (sections.length && 'IntersectionObserver' in window){
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(sec => navIo.observe(sec));
  }

  /* ---------- Contact form (front-end only placeholder) ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = '¡Gracias! Tu mensaje fue enviado, te contactaremos pronto.';
      form.reset();
    });
  }

  const newsForm = document.getElementById('news-form');
  if (newsForm){
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsForm.reset();
      newsForm.querySelector('input').placeholder = '¡Gracias por suscribirte!';
    });
  }

});
