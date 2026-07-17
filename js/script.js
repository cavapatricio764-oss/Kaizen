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
        // highlight the final period in the brand red
        if (i === full.length - 1 && char === '.'){
          const span = document.createElement('span');
          span.style.color = 'var(--red)';
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
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animated.forEach(el => io.observe(el));
  } else {
    animated.forEach(el => el.classList.add('in-view'));
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
