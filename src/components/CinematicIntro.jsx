import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Sparkles, Award } from 'lucide-react';
import {
  playCelestialRevealChime,
  playMicroTap,
  initGlobalAudioUnlock,
  toggleAudioMute,
  isMuted as checkIsMuted
} from '../utils/audio';

export default function CinematicIntro({ onComplete }) {
  const [isMuted, setIsMuted] = useState(() => checkIsMuted());
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const hasFinishedRef = useRef(false);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    try {
      playCelestialRevealChime();
    } catch (e) {}
    onComplete();
  }, [onComplete]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      } else if (e.key === 'm' || e.key === 'M') {
        const nextMuted = toggleAudioMute();
        setIsMuted(nextMuted);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Smooth Auto-reveal progress (4 seconds)
  useEffect(() => {
    initGlobalAudioUnlock();
    const duration = 4200; // 4.2s graceful auto-advance
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        handleFinish();
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleFinish]);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    playMicroTap();
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
  };

  const handleManualEnter = (e) => {
    if (e) e.stopPropagation();
    playMicroTap();
    handleFinish();
  };

  return (
    <motion.div
      className="intro-editorial-curtain intro-academic-overture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
      role="dialog"
      aria-modal="true"
      aria-label="PRARAMBH 2026 Academic Overture and Official Welcome"
    >
      {/* Background radial luxury lighting & constellation dots */}
      <div className="intro-paper-substrate" aria-hidden="true" />
      <div className="overture-ambient-glow" aria-hidden="true" />
      <div className="overture-starfield-dots" aria-hidden="true" />

      {/* Top Utility HUD */}
      <header className="intro-control-hud">
        <button
          type="button"
          className={`intro-hud-btn sound-toggle ${!isMuted ? 'active' : ''}`}
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Unmute chime audio' : 'Mute chime audio'}
          title="Toggle audio (Press M)"
        >
          {isMuted ? <VolumeX size={13} className="hud-icon" /> : <Volume2 size={13} className="hud-icon" />}
          <span>{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
        </button>

        <button
          type="button"
          className="intro-hud-btn skip-pill is-available"
          onClick={handleManualEnter}
          aria-label="Skip directly to invitation"
          title="Press Esc or Enter to enter"
        >
          <span>Skip to Invitation</span>
          <ArrowRight size={13} className="hud-arrow" />
        </button>
      </header>

      {/* Main Prestigious Crest & Academic Invitation Centerpiece */}
      <main className="overture-center-monument">
        <motion.div
          className="overture-card-frame"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gilded Academic Crest Insignia */}
          <div className="overture-crest-wrapper" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="overture-crest-svg" fill="none">
              <defs>
                <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2CC" />
                  <stop offset="45%" stopColor="#D4A030" />
                  <stop offset="100%" stopColor="#8A6310" />
                </linearGradient>
                <linearGradient id="crestShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0E234A" />
                  <stop offset="100%" stopColor="#050C1B" />
                </linearGradient>
              </defs>

              {/* Outer Radiance Ring with Beaded Markers */}
              <circle cx="50" cy="50" r="47" stroke="url(#crestGoldGrad)" strokeWidth="1" strokeDasharray="3 4" opacity="0.65" />
              <circle cx="50" cy="50" r="44" stroke="url(#crestGoldGrad)" strokeWidth="1.4" opacity="0.9" />

              {/* Inner Shield / Crest Motif */}
              <polygon points="50,14 80,26 80,56 50,82 20,56 20,26" fill="url(#crestShieldGrad)" stroke="url(#crestGoldGrad)" strokeWidth="1.2" />

              {/* Open Book of Knowledge and Flame */}
              <path d="M 50 34 C 43 32 32 34 30 42 C 30 52 42 50 50 53 C 58 50 70 52 70 42 C 68 34 57 32 50 34 Z" fill="none" stroke="url(#crestGoldGrad)" strokeWidth="1.4" />
              <line x1="50" y1="34" x2="50" y2="53" stroke="url(#crestGoldGrad)" strokeWidth="1.2" />

              {/* Flame of Wisdom above Book */}
              <path d="M 50 24 C 52 27 54 29 52 32 C 50 34 48 34 48 32 C 48 29 50 27 50 24 Z" fill="#FDE047" stroke="url(#crestGoldGrad)" strokeWidth="0.8" />

              {/* Academic Year Stars */}
              <circle cx="38" cy="66" r="1.5" fill="#FCE7A2" />
              <circle cx="50" cy="71" r="2" fill="#FCE7A2" />
              <circle cx="62" cy="66" r="1.5" fill="#FCE7A2" />
            </svg>
          </div>

          {/* Academic Eyebrow */}
          <div className="overture-institution-eyebrow">
            <span className="eyebrow-rail" />
            <span className="eyebrow-institution">SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</span>
            <span className="eyebrow-rail" />
          </div>

          <p className="overture-department-tag">
            DEPARTMENT OF BUSINESS ADMINISTRATION · AUTONOMOUS
          </p>

          <p className="overture-formal-greeting">
            Cordially Inviting Respected Faculty, Dignitaries &amp; MBA Scholars
          </p>

          {/* Grand Master Event Title */}
          <h1 className="overture-grand-title">
            PRARAMBH <span className="overture-gold-year">’26</span>
          </h1>

          <p className="overture-grand-tagline">
            Ek Nayi Kahani, Ek Naya Junoon
          </p>

          {/* Logistics & Dignitary Honor Ribbon */}
          <div className="overture-brief-ribbon">
            <div className="brief-item">
              <span className="brief-label">DATE</span>
              <strong className="brief-val">Thursday, 29 Oct 2026</strong>
            </div>
            <span className="brief-sep">·</span>
            <div className="brief-item">
              <span className="brief-label">REPORTING</span>
              <strong className="brief-val">12:00 PM Sharp</strong>
            </div>
            <span className="brief-sep">·</span>
            <div className="brief-item">
              <span className="brief-label">BANQUET</span>
              <strong className="brief-val">1:00 PM – 2:00 PM</strong>
            </div>
            <span className="brief-sep">·</span>
            <div className="brief-item">
              <span className="brief-label">VENUE</span>
              <strong className="brief-val">JRD Tata Hall</strong>
            </div>
          </div>

          {/* Direct CTA Action */}
          <div className="overture-actions-row">
            <button
              type="button"
              id="overture-enter-btn"
              className="overture-enter-btn"
              onClick={handleManualEnter}
              autoFocus
              aria-label="Enter Official Invitation"
            >
              <Sparkles size={16} className="enter-btn-sparkle" />
              <span className="enter-btn-text">ENTER OFFICIAL INVITATION</span>
              <ArrowRight size={16} className="enter-btn-arrow" />
            </button>
          </div>

          {/* Gentle Auto-Transition Bar */}
          <div className="overture-timer-track" aria-hidden="true">
            <div
              className="overture-timer-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="overture-auto-hint">
            Advancing smoothly into celebration · Press Space or Enter to open immediately
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
