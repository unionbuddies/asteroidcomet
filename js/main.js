/* Shared site behavior: mobile nav toggle, active link highlighting, scroll reveal */
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Highlight active nav link based on current page
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll-reveal fade-up animation
  const revealEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Space Bound partner badge — small clickable logo in the corner (all pages)
  if (!document.querySelector('.sb-badge')) {
    const a = document.createElement('a');
    a.className = 'sb-badge';
    a.href = 'https://www.space-bound.org/';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = 'Space Bound';
    a.setAttribute('aria-label', 'Visit Space Bound');
    const img = document.createElement('img');
    img.alt = 'Space Bound';
    img.width = 54;
    img.height = 54;
    img.loading = 'lazy';
    // If the logo file isn't present yet, remove the badge instead of showing a broken image.
    img.onerror = () => a.remove();
    img.src = 'assets/img/space-bound-logo.png';
    a.appendChild(img);
    document.body.appendChild(a);
  }
})();
