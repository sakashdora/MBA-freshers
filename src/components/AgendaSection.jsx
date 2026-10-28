import React from 'react';
import { motion } from 'motion/react';
import {
  Clock, Utensils, Crown, MapPin, Users,
  Music2, Megaphone, CalendarPlus
} from 'lucide-react';
import { playMicroTap } from '../utils/audio';

const TIMELINE_EVENTS = [
  {
    id: 1,
    time: "11:40 AM – 12:30 PM",
    duration: "50 MIN",
    title: "WELCOME & BATCH ICEBREAKERS",
    badge: "11:40 AM WELCOME",
    subtitle: "Warm Introductions & Stage Games",
    desc: "The celebration begins as seniors and juniors unite. Meet your mentors, enjoy lively stage icebreakers, and begin forging bonds that will define your MBA years.",
    icon: Users
  },
  {
    id: 2,
    time: "12:30 PM – 01:30 PM",
    duration: "60 MIN",
    title: "GRAND FELLOWSHIP LUNCH",
    badge: "12:30 PM LUNCH",
    subtitle: "Festive Fellowship Meal",
    desc: "A delicious fellowship lunch to relax, share stories, and create fond memories together with batchmates, seniors, and faculty.",
    icon: Utensils
  },
  {
    id: 3,
    time: "01:30 PM – 04:15 PM",
    duration: "2 HR 45 MIN",
    title: "STAGE SHOWCASE & FRESHER TITLES ’26",
    badge: "01:30 PM SHOWCASE",
    subtitle: "Performances & Title Competitions",
    desc: "Dance, singing, mimicry, comedy, and the Mr. Fresher and Miss Fresher competitions. The title winners will be announced after the activities conclude.",
    icon: Crown
  },
  {
    id: 4,
    time: "04:15 PM – 05:00 PM",
    duration: "45 MIN",
    title: "OPEN DJ FLOOR & CELEBRATION",
    badge: "04:15 PM FINALE",
    subtitle: "Music, Dance & Group Photos",
    desc: "Turn up the celebration on the open dance floor. Celebrate, dance, take batch photographs, and close the day with unforgettable joy.",
    icon: Music2
  }
];

export default function AgendaSection() {
  const handleGoogleCalendar = () => {
    playMicroTap();
    const title = encodeURIComponent("PRARAMBH ’26 — MBA Freshers Celebration");
    const details = encodeURIComponent(
      "Official Freshers Day Celebration for MBA Batch 2026–2028.\n\n" +
      "Date: Thursday, 29 October 2026 (11:40 AM – 5:00 PM)\n\n" +
      "Main Event Schedule Highlights:\n" +
      "• 11:40 AM: Welcome & Batch Icebreakers\n" +
      "• 12:30 PM: Grand Fellowship Lunch\n" +
      "• 01:30 PM – 04:15 PM: Stage Showcase & Fresher Titles ’26 (Performances & Mr./Miss Fresher competitions)\n" +
      "• 04:15 PM – 05:00 PM: Open DJ Floor & Celebration Dance\n\n" +
      "Venue: JRD Tata Hall, Srusti Academy of Management & Technology (Autonomous), Bhubaneswar."
    );
    const location = encodeURIComponent("JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar");
    const dates = "20261029T061000Z/20261029T113000Z";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=Asia/Kolkata`, '_blank');
  };

  return (
    <section 
      id="agenda-flow" 
      className="confluence-showcase-section"
      aria-label="The Freshers Celebration Programme"
    >
      {/* Background Decorative Ambience & Side Flourishes */}
      <div className="confluence-bg-overlay" aria-hidden="true" />
      <div className="confluence-corner-decor top-left" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="corner-filigree-svg">
          <path d="M 0 0 C 40 10 90 20 120 60 C 135 80 150 120 160 160" stroke="#E5B957" strokeWidth="1.2" opacity="0.45" />
          <path d="M 0 30 C 50 40 80 60 100 110" stroke="#C89B38" strokeWidth="0.8" opacity="0.35" />
          <path d="M 30 0 C 40 50 60 80 110 100" stroke="#C89B38" strokeWidth="0.8" opacity="0.35" />
          <circle cx="120" cy="60" r="3" fill="#E5B957" opacity="0.7" />
        </svg>
      </div>
      <div className="confluence-corner-decor top-right" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="corner-filigree-svg">
          <path d="M 160 0 C 120 10 70 20 40 60 C 25 80 10 120 0 160" stroke="#E5B957" strokeWidth="1.2" opacity="0.45" />
          <path d="M 160 30 C 110 40 80 60 60 110" stroke="#C89B38" strokeWidth="0.8" opacity="0.35" />
          <path d="M 130 0 C 120 50 100 80 50 100" stroke="#C89B38" strokeWidth="0.8" opacity="0.35" />
          <circle cx="40" cy="60" r="3" fill="#E5B957" opacity="0.7" />
        </svg>
      </div>

      <div className="confluence-container">
        {/* Header Block */}
        <div className="confluence-header-block">
          <div className="confluence-eyebrow-pill">
            <span>MAIN EVENT: THURSDAY, 29 OCTOBER 2026 · 11:40 AM TO 5:00 PM</span>
          </div>

          <h2 className="confluence-master-title">
            <span className="title-maroon">THE CELEBRATION</span>
            <span className="title-gold">SCHEDULE</span>
          </h2>

          <p className="confluence-batch-tagline">
            TWO BATCHES &nbsp;·&nbsp; ONE STAGE &nbsp;·&nbsp; LIFELONG BONDS
          </p>

          <p className="confluence-lead-description">
            A thoughtfully planned celebration hosted at <strong>JRD Tata Hall</strong>. From warm batch introductions
            to the fellowship lunch, stage performances, and the crowning of <strong>Mr. Fresher &amp; Miss Fresher ’26</strong>.
          </p>

          {/* Key Metrics Capsule Ribbon (4 coordinates) */}
          <div className="confluence-metrics-capsule">
            <div className="confluence-metric-item">
              <div className="metric-badge-icon">
                <Clock size={16} />
              </div>
              <div className="metric-text-group">
                <strong className="metric-primary">11:40 AM – 5:00 PM</strong>
                <span className="metric-secondary">Official Event Hours</span>
              </div>
            </div>

            <div className="metric-separator" aria-hidden="true" />

            <div className="confluence-metric-item">
              <div className="metric-badge-icon">
                <Utensils size={16} />
              </div>
              <div className="metric-text-group">
                <strong className="metric-primary">12:30 PM</strong>
                <span className="metric-secondary">Grand Lunch Break</span>
              </div>
            </div>

            <div className="metric-separator" aria-hidden="true" />

            <div className="confluence-metric-item">
              <div className="metric-badge-icon">
                <Crown size={16} />
              </div>
              <div className="metric-text-group">
                <strong className="metric-primary">Mr. &amp; Miss Fresher</strong>
                <span className="metric-secondary">Premier Honours &amp; Titles</span>
              </div>
            </div>

            <div className="metric-separator" aria-hidden="true" />

            <div className="confluence-metric-item">
              <div className="metric-badge-icon">
                <MapPin size={16} />
              </div>
              <div className="metric-text-group">
                <strong className="metric-primary">JRD Tata Hall</strong>
                <span className="metric-secondary">Srusti Academy, Bhubaneswar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Timeline Card Container */}
        <div className="confluence-timeline-card">
          <div className="timeline-rows-list">
            {TIMELINE_EVENTS.map((event, idx) => {
              const IconComp = event.icon;
              return (
                <div key={event.id} className="confluence-timeline-row">
                  {/* Timeline vertical node & spine */}
                  <div className="timeline-spine-wrapper" aria-hidden="true">
                    <div className="timeline-node-dot" />
                    {idx < TIMELINE_EVENTS.length - 1 && <div className="timeline-spine-line" />}
                  </div>

                  {/* 1. Time Column */}
                  <div className="timeline-time-col">
                    <span className="time-range">{event.time}</span>
                    <span className="time-duration">{event.duration}</span>
                  </div>

                  {/* 2. Circular Icon Column */}
                  <div className="timeline-icon-col" aria-hidden="true">
                    <div className="timeline-icon-disc">
                      <IconComp size={18} />
                    </div>
                  </div>

                  {/* 3. Information Column */}
                  <div className="timeline-info-col">
                    <div className="timeline-title-row">
                      <h3 className="timeline-event-title">{event.title}</h3>
                      <span className="timeline-badge-pill">{event.badge}</span>
                    </div>

                    <p className="timeline-event-subtitle">{event.subtitle}</p>
                    <p className="timeline-event-desc">{event.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Schedule Protocol Capsule */}
        <div className="confluence-protocol-card">
          <div className="protocol-icon-box" aria-hidden="true">
            <Megaphone size={18} />
          </div>
          <div className="protocol-content">
            <strong className="protocol-title">Official Schedule Protocol</strong>
            <p className="protocol-text">
              Reporting begins promptly at <strong>11:40 AM</strong> at JRD Tata Hall, with the Grand Fellowship Lunch at <strong>12:30 PM</strong>, followed by the crowning of <strong>Mr. &amp; Mrs. Fresher</strong> and concluding with the DJ celebration by <strong>5:00 PM</strong>.
            </p>
          </div>
        </div>

        {/* Calendar Sync Button */}
        <div className="confluence-calendar-action">
          <button
            type="button"
            onClick={handleGoogleCalendar}
            className="confluence-cal-btn"
            title="Add to Google Calendar"
          >
            <CalendarPlus size={15} />
            <span>Add Schedule to Google Calendar (11:40 AM – 5:00 PM)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
