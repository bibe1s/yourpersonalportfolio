"use client";

import { PersonalInfo } from '@/lib/types';
import { Mail, Phone } from 'lucide-react';
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { BorderWrapper } from '@/components/borders/BorderWrapper';

interface HolographicProfileCardProps {
  personal: PersonalInfo & {
    enable3D?: boolean;
    enableGradient?: boolean;
    borderStyle?: 'gradient' | 'star' | 'electric' | 'pixel' | 'blur' | 'none';
  };
}

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export function HolographicProfileCard({ personal }: HolographicProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const enable3D = personal.enable3D ?? false;
  const enableGradient = personal.enableGradient ?? false;
  const borderStyle = personal.borderStyle || 'gradient';

  const animationHandlers = useMemo(() => {
    if (!enable3D) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enable3D]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(600, event.offsetX, event.offsetY, card, wrap);
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enable3D || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);

    const initialX = wrap.clientWidth - 70;
    const initialY = 60;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(1500, initialX, initialY, card, wrap);

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      animationHandlers.cancelAnimation();
    };
  }, [enable3D, animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  // Get the border class based on enabled state and style
  const getBorderClass = () => {
    if (!enableGradient) return 'static';
    return borderStyle;
  };

  return (
    <div className="flex flex-col items-center p-8 text-white">
      <style jsx>{`
        .holo-wrapper {
          perspective: 500px;
          transform: translate3d(0, 0, 0.1px);
          touch-action: none;
          position: relative;
        }

        .holo-wrapper::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: inherit;
          background-position: inherit;
          border-radius: inherit;
          transition: all 0.5s ease;
          filter: contrast(2) saturate(2) blur(36px);
          transform: scale(0.8) translate3d(0, 0, 0.1px);
          background-size: 100% 100%;
          background-image: radial-gradient(
            farthest-side circle at var(--pointer-x) var(--pointer-y),
            hsla(266, 100%, 90%, var(--card-opacity)) 4%,
            hsla(266, 50%, 80%, calc(var(--card-opacity) * 0.75)) 10%,
            hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%,
            hsla(266, 0%, 60%, 0) 100%
          );
        }

        .holo-wrapper:hover::before,
        .holo-wrapper.active::before {
          filter: contrast(1) saturate(2) blur(40px) opacity(1);
          transform: scale(0.9) translate3d(0, 0, 0.1px);
        }

        .holo-wrapper:hover,
        .holo-wrapper.active {
          --card-opacity: 1;
        }

        .holo-card {
          transition: transform 1s ease;
          transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);
          box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left, 0.5) * 10px) - 3px)
            calc((var(--pointer-from-top, 0.5) * 20px) - 6px) 20px -5px;
          position: relative;
          z-index: 2;
        }

        .holo-card:hover,
        .holo-card.active {
          transition: none;
          transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y, 0deg))
            rotateY(var(--rotate-x, 0deg));
        }

        /* Border Style Base */
        .gradient-glow-wrapper {
          position: relative;
        }

        /* Gradient Border - Rainbow STATIC (no animation) */
        .gradient-glow-wrapper.gradient::before {
          content: '';
          position: absolute;
          inset: -15px;
          border-radius: 40px;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 136, 0.8) 0%,
            rgba(0, 229, 255, 0.8) 25%,
            rgba(138, 43, 226, 0.8) 50%,
            rgba(255, 105, 180, 0.8) 75%,
            rgba(0, 255, 136, 0.8) 100%
          );
          filter: blur(30px);
          opacity: 0.7;
          z-index: 0;
        }

        /* Star Border - Light particles racing */
        .gradient-glow-wrapper.star::before,
        .gradient-glow-wrapper.star::after {
          content: '';
          position: absolute;
          width: 300%;
          height: 50%;
          opacity: 0.7;
          border-radius: 50%;
          z-index: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 10%);
        }

        .gradient-glow-wrapper.star::before {
          bottom: -11px;
          right: -250%;
          animation: star-movement-bottom 6s linear infinite alternate;
        }

        .gradient-glow-wrapper.star::after {
          top: -10px;
          left: -250%;
          animation: star-movement-top 6s linear infinite alternate;
        }

        /* Electric Border - Pulsing electric effect */
        .gradient-glow-wrapper.electric::before {
          content: '';
          position: absolute;
          inset: -15px;
          border-radius: 40px;
          background: linear-gradient(45deg, 
            rgba(82, 39, 255, 0.7), 
            rgba(255, 39, 163, 0.7), 
            rgba(82, 39, 255, 0.7)
          );
          filter: blur(25px);
          opacity: 0.8;
          z-index: 0;
          animation: electric-pulse 0.3s ease-in-out infinite;
        }

        /* Pixel Border - Glitchy pixel shift */
        .gradient-glow-wrapper.pixel::before {
          content: '';
          position: absolute;
          inset: -18px;
          border-radius: 40px;
          background: 
            radial-gradient(circle at 0% 0%, rgba(0, 255, 0, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 100% 0%, rgba(0, 255, 255, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(255, 0, 255, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 0% 100%, rgba(255, 255, 0, 0.6) 0%, transparent 40%);
          filter: blur(20px);
          opacity: 0.7;
          z-index: 0;
          animation: pixel-shift 0.5s steps(4) infinite;
        }

        /* Blur Border - Pulsing white glow */
        .gradient-glow-wrapper.blur::before {
          content: '';
          position: absolute;
          inset: -25px;
          border-radius: 40px;
          background: radial-gradient(
            circle at 50% 50%, 
            rgba(255, 255, 255, 0.7) 0%, 
            transparent 70%
          );
          filter: blur(45px);
          opacity: 0.6;
          z-index: 0;
          animation: blur-pulse 2s ease-in-out infinite;
        }

        /* None/Static - Subtle purple-blue glow */
        .gradient-glow-wrapper.static::before,
        .gradient-glow-wrapper.none::before {
          content: '';
          position: absolute;
          inset: -15px;
          border-radius: 40px;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4));
          filter: blur(25px);
          opacity: 0.3;
          z-index: 0;
        }

        /* Animations */
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }

        @keyframes star-movement-top {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }

        @keyframes electric-pulse {
          0%, 100% { opacity: 0.8; filter: blur(25px); }
          50% { opacity: 1; filter: blur(30px); }
        }

        @keyframes pixel-shift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(2px, 0); }
          50% { transform: translate(0, 2px); }
          75% { transform: translate(-2px, 0); }
          100% { transform: translate(0, -2px); }
        }

        @keyframes blur-pulse {
          0%, 100% { opacity: 0.6; filter: blur(45px); }
          50% { opacity: 0.8; filter: blur(50px); }
        }

        .holo-shine {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: radial-gradient(
            farthest-corner circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
            hsla(0, 0%, 100%, 0.15) 0%,
            hsla(0, 0%, 100%, 0.05) 30%,
            transparent 60%
          );
          mix-blend-mode: overlay;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .holo-card:hover .holo-shine,
        .holo-card.active .holo-shine {
          opacity: 1;
        }
      `}</style>

      {/* Gradient Glow Backdrop Wrapper */}
      <div className={`gradient-glow-wrapper ${getBorderClass()}`}>
        {/* Profile Image Card */}
        <div
          ref={wrapRef}
          className={`holo-wrapper relative mb-6 ${enable3D ? '' : 'cursor-default'}`}
          style={{
            "--pointer-x": "50%",
            "--pointer-y": "50%",
            "--pointer-from-center": "0",
            "--pointer-from-top": "0.5",
            "--pointer-from-left": "0.5",
            "--card-opacity": "0",
            "--rotate-x": "0deg",
            "--rotate-y": "0deg",
            "--background-x": "50%",
            "--background-y": "50%",
          } as React.CSSProperties}
        >
          <div
            ref={cardRef}
            className="holo-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900"
            style={{
              width: '320px',
              height: '480px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {personal.image ? (
              <img
                src={personal.image}
                alt={personal.name}
                className="w-full h-full object-cover rounded-3xl"
                style={{ position: 'relative', zIndex: 1 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl">
                <div className="text-9xl font-bold text-gray-600">
                  {personal.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            
            {enable3D && <div className="holo-shine" />}
          </div>
        </div>
      </div>

      {/* Text Content Below Card */}
      <div className="text-center space-y-4 mt-4">
        <p className="text-sm text-gray-400 uppercase tracking-wider">
          {personal.title}
        </p>
        <h1 className="text-3xl font-bold">{personal.name}</h1>
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-white transition-colors text-sm"
            >
              {personal.email}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <a
              href={`tel:${personal.phone}`}
              className="hover:text-white transition-colors text-sm"
            >
              {personal.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}