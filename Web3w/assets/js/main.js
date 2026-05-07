// Countdown target: Wednesday, September 9, 2026 at 09:00 Warsaw time (CEST, UTC+02:00)
  const countdownEl = document.querySelector('.hero-countdown');
  const countdownTarget = new Date((countdownEl && countdownEl.dataset.eventDate) || '2026-09-09T09:00:00+02:00').getTime();
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMinutes = document.getElementById('count-minutes');
  const countSeconds = document.getElementById('count-seconds');

  function updateCountdown() {
    const now = Date.now();
    const diff = Math.max(0, countdownTarget - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countDays.textContent = days;
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const rotatingWords = window.WEB3_WARSAW_ROTATING_WORDS || ['Tech', 'NFT', 'Gaming', 'AI', 'Blockchain', 'Web3'];
  const rotatingWordEl = document.getElementById('rotating-word');
  let rotatingIndex = 0;

  setInterval(() => {
    rotatingWordEl.classList.add('is-changing');
    setTimeout(() => {
      rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
      rotatingWordEl.textContent = rotatingWords[rotatingIndex];
      rotatingWordEl.classList.remove('is-changing');
    }, 350);
  }, 1800);



  // Interactive Web3 network / sticks animation in hero background
  const hero = document.getElementById('hero');
  const canvas = document.querySelector('.hero-network-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0;
  let height = 0;
  const mouse = { x: -9999, y: -9999, active: false };

  function resizeNetworkCanvas() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particleCount = Math.max(38, Math.min(72, Math.floor(width / 28)));
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 1.7 + 1.1,
      gold: Math.random() > 0.68
    }));

    particles.forEach(p => { p.baseX = p.x; p.baseY = p.y; });
  }

  function drawNetwork() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.baseX += p.vx;
      p.baseY += p.vy;

      if (p.baseX < -30 || p.baseX > width + 30) p.vx *= -1;
      if (p.baseY < -30 || p.baseY > height + 30) p.vy *= -1;

      let targetX = p.baseX;
      let targetY = p.baseY;

      if (mouse.active && window.innerWidth > 768) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 155;

        if (dist < radius && dist > 0.01) {
          const force = (1 - dist / radius) * 58;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }
      }

      p.x += (targetX - p.x) * 0.055;
      p.y += (targetY - p.y) * 0.055;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 145;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(251, 202, 22, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? 'rgba(251, 202, 22, 0.85)' : 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
    }

    requestAnimationFrame(drawNetwork);
  }

  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.active = true;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', resizeNetworkCanvas);
  resizeNetworkCanvas();
  drawNetwork();

  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));
