import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Sparkles, Play } from 'lucide-react';
import {
  playMasterSoundtrack,
  stopMasterSoundtrack,
  toggleMasterSoundtrackMute,
  getMasterIntroAudio,
  initGlobalAudioUnlock,
  playMicroTap,
  playCelestialRevealChime,
  isMuted as checkIsMuted
} from '../utils/audio';

const LETTER_BEATS = [
  { char: 'P', time: 1.55 },
  { char: 'R', time: 2.05 },
  { char: 'A', time: 2.55 },
  { char: 'R', time: 3.05 },
  { char: 'A', time: 3.60 },
  { char: 'M', time: 4.15 },
  { char: 'B', time: 4.75 },
  { char: 'H', time: 5.30 },
];

const CUES = {
  START_BEATS: 1.55,
  END_BEATS: 5.40,
  RISER: 5.50,
  CLIMAX: 6.30,
  YEAR: 6.80,
  TAGLINE: 7.30,
  DETAILS: 8.00,
  TOTAL: 9.74
};

export default function CinematicIntro({ onComplete }) {
  const [isMuted, setIsMuted] = useState(() => checkIsMuted());
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const hasFinishedRef = useRef(false);
  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    stopMasterSoundtrack(350);
    try {
      playCelestialRevealChime();
    } catch (e) {}
    onComplete();
  }, [onComplete]);

  // Audio start & fallback clock loop
  useEffect(() => {
    initGlobalAudioUnlock();
    startTimeRef.current = performance.now();

    const cleanup = playMasterSoundtrack({
      onEnded: () => {
        handleFinish();
      },
      onError: (err) => {
        console.warn('Intro soundtrack autoplay prevented:', err);
        setAudioBlocked(true);
      }
    });

    // User gesture fallback unlocker
    const handleGestureUnlock = () => {
      initGlobalAudioUnlock();
      const a = getMasterIntroAudio();
      if (a && a.paused) {
        a.play().then(() => setAudioBlocked(false)).catch(() => {});
      }
    };
    window.addEventListener('click', handleGestureUnlock, { once: true, passive: true });
    window.addEventListener('keydown', handleGestureUnlock, { once: true, passive: true });

    // High-precision RAF loop for beat tracking
    const tick = () => {
      const audio = getMasterIntroAudio();
      let t = 0;
      if (audio && !audio.paused && audio.currentTime > 0) {
        t = audio.currentTime;
      } else {
        t = (performance.now() - startTimeRef.current) / 1000;
      }

      setCurrentTime(t);
      const p = Math.min(1, t / CUES.TOTAL);
      setProgress(p);

      if (t >= CUES.TOTAL) {
        handleFinish();
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (cleanup) cleanup();
      stopMasterSoundtrack(350);
      window.removeEventListener('click', handleGestureUnlock);
      window.removeEventListener('keydown', handleGestureUnlock);
    };
  }, [handleFinish]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      } else if (e.key === 'm' || e.key === 'M') {
        const nextMuted = toggleMasterSoundtrackMute();
        setIsMuted(nextMuted);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    playMicroTap();
    const a = getMasterIntroAudio();
    if (a && a.paused) {
      a.play().then(() => setAudioBlocked(false)).catch(() => {});
    }
    const nextMuted = toggleMasterSoundtrackMute();
    setIsMuted(nextMuted);
  };

  const handleManualEnter = (e) => {
    if (e) e.stopPropagation();
    playMicroTap();
    handleFinish();
  };

  // Beat state calculations
  const isClimaxReached = currentTime >= CUES.CLIMAX;
  const isRiser = currentTime >= CUES.RISER && !isClimaxReached;
  const showYear = currentTime >= CUES.YEAR;
  const showTagline = currentTime >= CUES.TAGLINE;
  const showDetails = currentTime >= CUES.DETAILS;

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
          className={`intro-hud-btn sound-toggle ${!isMuted ? 'active' : ''} ${audioBlocked ? 'needs-unlock' : ''}`}
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
          title="Toggle audio (Press M)"
        >
          {audioBlocked ? (
            <>
              <Play size={13} className="hud-icon pulse-gold" />
              <span>PLAY SONG</span>
            </>
          ) : isMuted ? (
            <>
              <VolumeX size={13} className="hud-icon" />
              <span>MUTED</span>
            </>
          ) : (
            <>
              <Volume2 size={13} className="hud-icon" />
              <span>AUDIO ON</span>
            </>
          )}
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

              <circle cx="50" cy="50" r="47" stroke="url(#crestGoldGrad)" strokeWidth="1" strokeDasharray="3 4" opacity="0.65" />
              <circle cx="50" cy="50" r="44" stroke="url(#crestGoldGrad)" strokeWidth="1.4" opacity="0.9" />

              <polygon points="50,14 80,26 80,56 50,82 20,56 20,26" fill="url(#crestShieldGrad)" stroke="url(#crestGoldGrad)" strokeWidth="1.2" />

              <path d="M 50 34 C 43 32 32 34 30 42 C 30 52 42 50 50 53 C 58 50 70 52 70 42 C 68 34 57 32 50 34 Z" fill="none" stroke="url(#crestGoldGrad)" strokeWidth="1.4" />
              <line x1="50" y1="34" x2="50" y2="53" stroke="url(#crestGoldGrad)" strokeWidth="1.2" />

              <path d="M 50 24 C 52 27 54 29 52 32 C 50 34 48 34 48 32 C 48 29 50 27 50 24 Z" fill="#FDE047" stroke="url(#crestGoldGrad)" strokeWidth="0.8" />

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
            CORDIALLY INVITING RESPECTED FACULTY, DIGNITARIES &amp; MBA SCHOLARS
          </p>

          {/* Master Title Stage with Smooth Beat Synchronization */}
          <div className="overture-title-stage" aria-label="PRARAMBH '26">
            {isClimaxReached ? (
              <h1 className="overture-grand-title climax-drop">
                PRARAMBH {showYear && <span className="overture-gold-year">’26</span>}
              </h1>
            ) : (
              <div className={`overture-letter-rack ${isRiser ? 'is-riser' : ''}`}>
                {LETTER_BEATS.map((item, index) => {
                  const isHit = currentTime >= item.time;
                  const isRecentHit = isHit && (currentTime - item.time < 0.45);
                  return (
                    <span
                      key={index}
                      className={`overture-beat-letter ${isHit ? 'hit' : ''} ${isRecentHit ? 'just-hit' : ''}`}
                    >
                      {item.char}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Thematic Tagline */}
          <p className={`overture-grand-tagline ${showTagline ? 'revealed' : 'waiting'}`}>
            Ek Nayi Kahani, Ek Naya Junoon
          </p>

          {/* Logistics Ribbon */}
          <div className={`overture-brief-ribbon ${showDetails ? 'revealed' : 'waiting'}`}>
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

          {/* Designed & Developed by : Chandan Mahapatra , S Akash Dora */}
          <div className="overture-credits-bar">
            <span className="credits-label">Designed &amp; Developed by :</span>
            <strong className="credits-names">Chandan Mahapatra</strong>
            <span className="credits-sep">,</span>
            <strong className="credits-names">S Akash Dora</strong>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
