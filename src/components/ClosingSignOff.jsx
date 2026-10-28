import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { playMicroTap } from '../utils/audio';

export default function ClosingSignOff() {
  const scrollToTop = () => {
    playMicroTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="closing-signoff-section" role="contentinfo" aria-label="Footer & Credits">
      {/* Top Ambient Glow Line */}
      <div className="signoff-top-border" aria-hidden="true" />

      <div className="section-container signoff-container">
        {/* Authentic Academic & Senior Cohort Sign-Off */}
        <div className="signoff-attribution-card">
          <div className="attribution-ambient-glow" aria-hidden="true" />
          
          <div className="attribution-content">
            <p className="attribution-quote">
              “Every great journey begins with a single step — welcome to the MBA family.”
            </p>
            <p className="attribution-dedication">
              Organized with pride by the <strong>Seniors of MBA (Batch 2025–2027)</strong>
            </p>
            <p className="attribution-dept">
              Department of MBA · Srusti Academy of Management &amp; Technology (Autonomous), Bhubaneswar
            </p>
          </div>
        </div>

        {/* Back to Top Navigation */}
        <div className="signoff-actions">
          <button
            type="button"
            className="signoff-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of invitation"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Gilded Divider */}
        <div className="signoff-bottom-hairline" aria-hidden="true">
          <span className="hairline-rail" />
          <span className="hairline-gem">◆</span>
          <span className="hairline-rail" />
        </div>

        {/* Authentic Campus & Senior Initiative Footer */}
        <div className="signoff-bottom-bar">
          <span className="signoff-event-stamp">
            PRARAMBH ’26 · Hosted by MBA Seniors
          </span>
          <span className="signoff-campus-stamp">
            Srusti Academy of Management &amp; Technology
          </span>
        </div>

        {/* True Inspire Credit with Official Asset */}
        <a 
          href="https://true-inspires.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="signoff-creator-credit"
          onClick={() => playMicroTap()}
          title="True Inspire — Ideas into extraordinary"
          aria-label="True Inspire — Ideas into extraordinary (opens in new tab)"
        >
          <img 
            src="/true_inspire.jpeg" 
            alt="True Inspire logo" 
            className="creator-credit-logo"
            width="24"
            height="24"
            loading="lazy"
          />
          <span className="creator-credit-text">
            Designed &amp; developed by <strong>True Inspire</strong>
          </span>
        </a>
      </div>
    </footer>
  );
}



