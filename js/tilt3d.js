/**
 * WANDERPULSE BALI - REAL-TIME 3D CARD TILT & HOLOGRAPHIC GLARE ENGINE
 * Calculates 3D rotation matrices, depth popouts, and light reflections
 */

(function () {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const MAX_TILT = 10; // Maximum rotation in degrees
  const PERSPECTIVE = 1000; // Perspective depth in pixels
  const SCALE = 1.025; // Slight hover scale

  function attach3DTilt(element) {
    if (element._has3DTilt) return;
    element._has3DTilt = true;

    // Create dynamic glare overlay
    let glare = element.querySelector('.tilt-glare-layer');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare-layer';
      element.appendChild(glare);
    }

    let rect = null;
    let isHovering = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId = null;

    function onMouseEnter() {
      rect = element.getBoundingClientRect();
      isHovering = true;
      glare.style.opacity = '1';
      if (!animId) {
        animId = requestAnimationFrame(updateTilt);
      }
    }

    function onMouseMove(e) {
      if (!rect) rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize to -1 ... 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      targetX = -normY * MAX_TILT; // Inverted for natural pitch
      targetY = normX * MAX_TILT;  // Yaw

      // Update holographic specular glare reflection
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
    }

    function onMouseLeave() {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      glare.style.opacity = '0';
    }

    function updateTilt() {
      // Smooth lerp (damping)
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const scaleVal = isHovering ? SCALE : 1.0;
      element.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;

      // Continue animating until settled
      if (isHovering || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
        animId = requestAnimationFrame(updateTilt);
      } else {
        element.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        animId = null;
      }
    }

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);
  }

  // Initialize all elements with data-tilt-3d
  function initTiltElements() {
    const elements = document.querySelectorAll('[data-tilt-3d]');
    elements.forEach(attach3DTilt);
  }

  // Observe DOM changes (e.g. when filters or sort change cards dynamically)
  const observer = new MutationObserver(() => {
    initTiltElements();
  });

  document.addEventListener('DOMContentLoaded', () => {
    initTiltElements();
    observer.observe(document.body, { childList: true, subtree: true });
  });

  window.reinitTilt3D = initTiltElements;
})();
