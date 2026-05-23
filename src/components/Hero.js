'use client';

import Link from 'next/link';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* Announcement Badge */}
        <div className="hero-badge animate-fade-in-up">
          <span className="badge-dot"></span>
          <span>🚀 Empowering Students. Building Futures.</span>
          <span className="badge-arrow">→</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          World-class Tech Partner<br />
          Engineering Your Digital{' '}
          <span className="hero-highlight">Success</span>
        </h1>

        {/* Floating testimonial cards */}
        <div className="hero-testimonials">
          <div className="testimonial-card left-card animate-float">
            <span className="quote-mark">"</span>
            <p>"We were close to giving up. Skill Horizon rebuilt our confidence."</p>
            <span className="quote-author">- Student, JNTUK</span>
          </div>

          {/* Sub-headline + CTA (center) */}
          <div className="hero-center">
            <p className="hero-subheadline animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              We help startups &amp; B2B enterprises move from vision to reality, and
              beyond. One hand on design, the other on development.
            </p>

            <div className="hero-cta animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#contact" className="btn-cta-main">
                <span className="cta-s-icon">S</span>
                Book a 30-Min Call
              </a>
            </div>
          </div>

          <div className="testimonial-card right-card animate-float-rev">
            <span className="quote-mark">"</span>
            <p>"Skill Horizon brought my project to life: an AI-powered platform."</p>
            <span className="quote-author">- Grad, AU</span>
          </div>
        </div>

      </div>
    </section>
  );
}
