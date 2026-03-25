"use client"

import { useEffect, useRef } from 'react';

export default function AnimatedBackground({ darkMode = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;
    let mouse = { x: W / 2, y: H / 2 };
    let targetMouse = { x: W / 2, y: H / 2 };

    // ── Theme ──
    const theme = {
      bg:          darkMode ? '#08090c' : '#f7f8fa',
      nodeFill:    darkMode ? 'rgba(160,175,210,0.55)' : 'rgba(80,100,150,0.45)',
      lineBase:    darkMode ? 'rgba(130,150,200,{a})' : 'rgba(70,90,150,{a})',
      glowColor:   darkMode ? 'rgba(100,140,255,{a})' : 'rgba(60,90,200,{a})',
      accentDot:   darkMode ? '#5b8cff' : '#3362e0',
      mouseHalo:   darkMode ? 'rgba(80,120,255,0.07)' : 'rgba(50,90,200,0.05)',
    };

    const rgba = (template, alpha) => template.replace('{a}', alpha);

    // ── Nodes ──
    const NODE_COUNT = Math.floor((W * H) / 22000);
    const CONNECT_DIST = 160;
    const MOUSE_ATTRACT = 200;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  1.2 + Math.random() * 1.4,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    }));

    // ── Soft orbs (background depth) ──
    const ORBS = [
      { x: W * 0.15, y: H * 0.2,  r: Math.min(W, H) * 0.38 },
      { x: W * 0.85, y: H * 0.75, r: Math.min(W, H) * 0.30 },
      { x: W * 0.5,  y: H * 0.55, r: Math.min(W, H) * 0.25 },
    ];

    const draw = () => {
      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      // Clear
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // ── Background orbs ──
      for (const orb of ORBS) {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        if (darkMode) {
          g.addColorStop(0,   'rgba(40,60,130,0.09)');
          g.addColorStop(0.5, 'rgba(30,45,110,0.04)');
          g.addColorStop(1,   'rgba(0,0,0,0)');
        } else {
          g.addColorStop(0,   'rgba(160,185,255,0.12)');
          g.addColorStop(0.5, 'rgba(140,165,240,0.05)');
          g.addColorStop(1,   'rgba(255,255,255,0)');
        }
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Update & draw nodes ──
      for (const n of nodes) {
        n.pulse += n.pulseSpeed;

        // Gentle drift
        n.x += n.vx;
        n.y += n.vy;

        // Soft boundary wrap
        if (n.x < -20)  n.x = W + 20;
        if (n.x > W+20) n.x = -20;
        if (n.y < -20)  n.y = H + 20;
        if (n.y > H+20) n.y = -20;

        // Mouse influence — subtle repulsion
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md  = Math.hypot(mdx, mdy);
        if (md < MOUSE_ATTRACT && md > 0) {
          const force = (1 - md / MOUSE_ATTRACT) * 0.012;
          n.x += (mdx / md) * force * 8;
          n.y += (mdy / md) * force * 8;
        }
      }

      // ── Draw edges ──
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;

            // Mouse proximity boosts edge brightness
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            const mouseDist = Math.hypot(mx - mouse.x, my - mouse.y);
            const mouseBoost = Math.max(0, 1 - mouseDist / 180) * 0.3;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = rgba(theme.lineBase, Math.min(alpha + mouseBoost, 0.5));
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── Draw nodes ──
      for (const n of nodes) {
        const pulse = 0.7 + Math.sin(n.pulse) * 0.3;
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const mouseNear = Math.max(0, 1 - md / 140);

        const radius = n.r * pulse + mouseNear * 1.5;

        // Glow for mouse-proximate nodes
        if (mouseNear > 0.15) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 5, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius + 5);
          g.addColorStop(0, rgba(theme.glowColor, mouseNear * 0.35));
          g.addColorStop(1, rgba(theme.glowColor, 0));
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = mouseNear > 0.15 ? theme.accentDot : theme.nodeFill;
        ctx.globalAlpha = 0.75 + mouseNear * 0.25;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Mouse halo ──
      const hR = 110;
      const hg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, hR);
      hg.addColorStop(0,   theme.mouseHalo);
      hg.addColorStop(0.6, theme.mouseHalo.replace('0.07', '0.02').replace('0.05', '0.015'));
      hg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, hR, 0, Math.PI * 2);
      ctx.fill();

      // ── Vignette ──
      const vR = Math.max(W, H) * 0.8;
      const vg = ctx.createRadialGradient(W/2, H/2, vR * 0.35, W/2, H/2, vR);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, darkMode ? 'rgba(0,0,0,0.55)' : 'rgba(220,225,235,0.6)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    const onMove  = (e) => { targetMouse = { x: e.clientX, y: e.clientY }; };
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}