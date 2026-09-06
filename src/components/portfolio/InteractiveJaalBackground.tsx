"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  origX: number;
  origY: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  row: number;
  col: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  decay: number;
}

export function InteractiveJaalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid config
    const SPACING = 48; // Space between mesh lines
    let cols = 0;
    let rows = 0;
    let grid: NodePoint[][] = [];

    // Interaction state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
      radius: 250, // Area of magnetic attraction
      pullStrength: 0.7, // How much the jaal stretches towards cursor
    };

    const ripples: Ripple[] = [];
    let isDarkMode = false;
    let time = 0;

    const checkDarkMode = () => {
      isDarkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initialize Grid
    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Overhang grid slightly past borders so edge nodes stretch seamlessly
      const margin = SPACING * 2;
      cols = Math.ceil((width + margin * 2) / SPACING) + 1;
      rows = Math.ceil((height + margin * 2) / SPACING) + 1;

      grid = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          const origX = c * SPACING - margin;
          const origY = r * SPACING - margin;
          grid[c][r] = {
            origX,
            origY,
            baseX: origX,
            baseY: origY,
            x: origX,
            y: origY,
            vx: 0,
            vy: 0,
            row: r,
            col: c,
          };
        }
      }
    };

    initGrid();

    // Mouse & Pointer listeners (tracked on window for smooth full-screen responsiveness)
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouse.targetX = currentX;
      mouse.targetY = currentY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rx = clientX - rect.left;
      const ry = clientY - rect.top;

      // Create an energetic ripple pulse across the jaal on click
      ripples.push({
        x: rx,
        y: ry,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.45,
        speed: 8,
        amplitude: 26,
        decay: 0.95,
      });

      if (ripples.length > 5) ripples.shift();
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", handleResize);

    // Animation & Physics Loop
    const render = () => {
      time += 0.016;

      // Smooth mouse interpolation & velocity calculation
      if (mouse.active) {
        if (mouse.x < -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
        } else {
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
          mouse.x += (mouse.targetX - mouse.x) * 0.25;
          mouse.y += (mouse.targetY - mouse.y) * 0.25;
          mouse.vx = mouse.x - mouse.prevX;
          mouse.vy = mouse.y - mouse.prevY;
        }
      } else {
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
        // Move mouse offscreen smoothly
        mouse.x += (-9999 - mouse.x) * 0.05;
        mouse.y += (-9999 - mouse.y) * 0.05;
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.amplitude *= rip.decay;
        if (rip.radius > rip.maxRadius || rip.amplitude < 0.2) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Ambient radial light following the cursor with a slow, smooth color-shifting animation
      if (mouse.active && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.35
        );
        // Slow, calm 30-second harmonic color animation wave with subtle position modulation
        const colorWave = Math.sin(time * 0.2);
        const mouseShift = (mouse.x / (width || 1) - 0.5) * 16;
        const hue1 = 196 + colorWave * 18 + mouseShift; // Cycles gently between 178 (soft cyan/teal) and 214 (sky/azure)
        const hue2 = 228 + colorWave * 20 + mouseShift; // Complementary soft violet/indigo

        if (isDarkMode) {
          glowGrad.addColorStop(0, `hsla(${hue1}, 85%, 65%, 0.12)`);
          glowGrad.addColorStop(0.5, `hsla(${hue2}, 75%, 68%, 0.05)`);
          glowGrad.addColorStop(1, "transparent");
        } else {
          glowGrad.addColorStop(0, `hsla(${hue1}, 80%, 48%, 0.08)`);
          glowGrad.addColorStop(0.5, `hsla(${hue2}, 70%, 52%, 0.03)`);
          glowGrad.addColorStop(1, "transparent");
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // 1. Update Physics for every node
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = grid[c][r];

          // Ambient multi-harmonic wave oscillation (breathing jaal)
          const wave1 = Math.sin(time * 0.8 + pt.origY * 0.005) * 8;
          const wave2 = Math.cos(time * 0.6 + pt.origX * 0.004) * 8;
          const wave3 = Math.sin(time * 1.1 + (pt.origX + pt.origY) * 0.003) * 5;

          pt.baseX = pt.origX + wave1 + wave3 * 0.5;
          pt.baseY = pt.origY + wave2 + wave3 * 0.5;

          let targetX = pt.baseX;
          let targetY = pt.baseY;

          // Magnetic attraction / elastic pull towards cursor ("khinchana")
          if (mouse.x > -500) {
            const dx = mouse.x - pt.x;
            const dy = mouse.y - pt.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0.01) {
              const force = Math.pow(1 - dist / mouse.radius, 1.6);
              // Node pulls directly toward mouse, with added momentum from mouse speed
              const pullAmount = force * mouse.pullStrength;
              targetX += dx * pullAmount + mouse.vx * force * 1.5;
              targetY += dy * pullAmount + mouse.vy * force * 1.5;
            }
          }

          // Click ripple impulse
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i];
            const rdx = pt.x - rip.x;
            const rdy = pt.y - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - rip.radius);

            if (diff < 60) {
              const waveFactor = Math.cos((diff / 60) * (Math.PI / 2));
              const shock = waveFactor * rip.amplitude * (1 - rip.radius / rip.maxRadius);
              const angle = Math.atan2(rdy, rdx);
              targetX += Math.cos(angle) * shock;
              targetY += Math.sin(angle) * shock;
            }
          }

          // Spring & Damper physics
          const stiffness = 0.09;
          const damping = 0.84;

          const ax = (targetX - pt.x) * stiffness;
          const ay = (targetY - pt.y) * stiffness;

          pt.vx = (pt.vx + ax) * damping;
          pt.vy = (pt.vy + ay) * damping;

          pt.x += pt.vx;
          pt.y += pt.vy;
        }
      }

      // 2. Draw Horizontal Jaal Lines
      ctx.lineWidth = 1;
      const baseLineColor = isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(100, 116, 139, 0.15)";
      ctx.strokeStyle = baseLineColor;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(grid[0][r].x, grid[0][r].y);

        for (let c = 1; c < cols; c++) {
          const prev = grid[c - 1][r];
          const curr = grid[c][r];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(grid[cols - 1][r].x, grid[cols - 1][r].y);
        ctx.stroke();
      }

      // 3. Draw Vertical Jaal Lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(grid[c][0].x, grid[c][0].y);

        for (let r = 1; r < rows; r++) {
          const prev = grid[c][r - 1];
          const curr = grid[c][r];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(grid[c][rows - 1].x, grid[c][rows - 1].y);
        ctx.stroke();
      }

      // 4. Highlight Pulled Lines Near Cursor (Luminous tension effect)
      if (mouse.active && mouse.x > 0 && mouse.x < width) {
        ctx.lineWidth = 1.35;

        for (let c = 0; c < cols - 1; c++) {
          for (let r = 0; r < rows - 1; r++) {
            const p1 = grid[c][r];
            const p2 = grid[c + 1][r];
            const p3 = grid[c][r + 1];

            // Check distance to mouse
            const d1 = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);

            if (d1 < mouse.radius) {
              const tension = Math.pow(1 - d1 / mouse.radius, 1.4);

              const lineHue = 196 + Math.sin(time * 0.2) * 18 + ((mouse.x / (width || 1)) - 0.5) * 16;
              ctx.strokeStyle = isDarkMode
                ? `hsla(${lineHue}, 85%, 62%, ${0.15 + tension * 0.55})`
                : `hsla(${lineHue}, 75%, 48%, ${0.12 + tension * 0.45})`;

              // Horizontal accent segment
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              // Vertical accent segment
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.stroke();

              // Glowing Intersection Nodes
              if (d1 < mouse.radius * 0.75) {
                const nodeSize = 1.5 + tension * 2.2;
                ctx.fillStyle = isDarkMode
                  ? `hsla(${lineHue}, 90%, 75%, ${0.4 + tension * 0.6})`
                  : `hsla(${lineHue}, 80%, 45%, ${0.35 + tension * 0.55})`;

                ctx.beginPath();
                ctx.arc(p1.x, p1.y, nodeSize, 0, Math.PI * 2);
                ctx.fill();

                // Soft outer aura on close nodes
                if (tension > 0.45) {
                  ctx.fillStyle = isDarkMode
                    ? `hsla(${lineHue}, 85%, 65%, ${tension * 0.25})`
                    : `hsla(${lineHue}, 75%, 48%, ${tension * 0.18})`;
                  ctx.beginPath();
                  ctx.arc(p1.x, p1.y, nodeSize * 2.5, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
