'use client';

import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ loading, darkMode }) => {
  const [progress, setProgress] = useState(0);
  const title = 'Francis.';
  const letters = title.split('');

  useEffect(() => {
    if (!loading) return;

    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        const remaining = 100 - prev;
        return prev + Math.max(0.5, remaining * 0.04);
      });
    }, 30);


    return () => {
      clearInterval(progressInterval);
    };
  }, [loading]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600&display=swap');

        .nk-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background:
            radial-gradient(circle at 50% 35%, rgba(255,255,255,0.06), transparent 42%),
            #090909;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      visibility 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nk-loader.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .nk-loader-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 8vw, 100px);
          color: #fff;
          letter-spacing: 0.14em;
          line-height: 1;
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.02em;
          text-transform: uppercase;
          text-shadow: 0 0 24px rgba(255,255,255,0.08);
          position: relative;
        }

        .nk-loader-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) scaleY(1.15);
          animation:
            letterIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            letterFloat 2.8s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.05s), calc(0.8s + var(--i) * 0.04s);
        }

        .nk-loader-letter.space {
          width: 0.36em;
        }

        .nk-loader-pct-wrap {
          overflow: hidden;
        }

        .nk-loader-pct {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.42);
          transform: translateY(100%);
          opacity: 0;
          animation: pctIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
        }

        @keyframes letterIn {
          0% { opacity: 0; transform: translateY(24px) scaleY(1.15); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        @keyframes letterFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pctIn {
          0% { opacity: 0; transform: translateY(100%); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .nk-loader-name,
          .nk-loader-letter,
          .nk-loader-pct {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className={`nk-loader${!loading ? ' hidden' : ''}`}>
        <div style={{ textAlign: 'center' }}>
          <div className="nk-loader-name" aria-label={title}>
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`nk-loader-letter${letter === ' ' ? ' space' : ''}`}
                style={{ '--i': index }}
                aria-hidden="true"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className="nk-loader-pct-wrap">
            <div className="nk-loader-pct">{Math.round(progress)}%</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
