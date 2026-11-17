'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [phase, setPhase] = useState('playing');
  const animationTimer = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return;
    }
    // Reveal the portfolio even if the image fails to finish loading.
    const fallback = window.setTimeout(() => setPhase(current => current === 'playing' ? 'exiting' : current), 6000);
    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(animationTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = window.setTimeout(() => setPhase('done'), 450);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;
  return (
    <>
      <style>{`
        .nk-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--paper);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 450ms ease;
        }

        .nk-loader.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .nk-loader-logo {
          width: min(80vw, 800px);
          max-height: 50vh;
          height: auto;
          object-fit: contain;
        }

        [data-theme="dark"] .nk-loader-logo {
          filter: invert(1);
          mix-blend-mode: screen;
        }

        @media (prefers-reduced-motion: reduce) {
          .nk-loader { display: none; }
        }
      `}</style>

      <div className={`nk-loader${phase === 'exiting' ? ' hidden' : ''}`} role="status" aria-label="Opening Francis Espiritu’s portfolio">
        <Image
          src="/fe-logo-split-fade.svg"
          alt=""
          width={1920}
          height={1080}
          priority
          unoptimized
          className="nk-loader-logo"
          onLoad={() => {
            window.clearTimeout(animationTimer.current);
            animationTimer.current = window.setTimeout(() => setPhase('exiting'), 2800);
          }}
          onError={() => setPhase('exiting')}
        />
      </div>
    </>
  );
};

export default LoadingScreen;
