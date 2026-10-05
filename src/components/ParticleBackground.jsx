import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(80, Math.floor(width / 20));

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.15,
        opacity: Math.random() * 0.7 + 0.2,
        maxOpacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.3 ? '#D4AF37' : '#FFF5C0'
      });
    }

    // Light streaks
    const streaks = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 180 + 100,
      angle: -Math.PI / 4,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.15 + 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw subtle mouse ambient glow
      if (mouse.active) {
        const radGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          350
        );
        radGlow.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
        radGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
        radGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw light streaks
      streaks.forEach((streak) => {
        streak.y -= streak.speed;
        streak.x += streak.speed * 0.5;
        if (streak.y < -streak.length || streak.x > width + streak.length) {
          streak.y = height + streak.length;
          streak.x = Math.random() * width - 200;
        }

        const grad = ctx.createLinearGradient(
          streak.x,
          streak.y,
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        );
        grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
        grad.addColorStop(0.5, `rgba(245, 215, 127, ${streak.opacity})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        );
        ctx.stroke();
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle repulsion from cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        // Wrap around screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse opacity
        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
