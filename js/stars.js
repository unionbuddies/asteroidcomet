/* Animated starfield canvas background — shared across all pages */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, stars, shootingStars;
  const STAR_COUNT_DENSITY = 0.00012; // stars per pixel

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.floor(width * height * STAR_COUNT_DENSITY);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * width * 0.7 + width * 0.15,
      y: -20,
      len: Math.random() * 80 + 60,
      speed: Math.random() * 8 + 10,
      angle: Math.PI / 3.2,
      life: 1,
    });
  }

  shootingStars = [];
  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // twinkling stars
    for (const s of stars) {
      s.phase += s.twinkleSpeed;
      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    // occasional shooting star
    frame++;
    if (frame % 140 === 0 && Math.random() > 0.4) spawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const sh = shootingStars[i];
      const dx = Math.cos(sh.angle) * sh.speed;
      const dy = Math.sin(sh.angle) * sh.speed;
      const tailX = sh.x - Math.cos(sh.angle) * sh.len;
      const tailY = sh.y - Math.sin(sh.angle) * sh.len;

      const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255,255,255,${sh.life})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      sh.x += dx;
      sh.y += dy;
      sh.life -= 0.012;
      if (sh.life <= 0 || sh.y > height + 50 || sh.x > width + 50) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();
