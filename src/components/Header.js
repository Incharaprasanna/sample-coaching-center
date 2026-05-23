'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const checkUserSession = () => {
      const session = localStorage.getItem('sh_portal_user');
      if (session) {
        try {
          setUser(JSON.parse(session));
        } catch(e) {}
      } else {
        setUser(null);
      }
    };
    
    checkUserSession();
    window.addEventListener('storage', checkUserSession);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUserSession);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <img
            src="/skill-horizon.jpeg"
            alt="Skill Horizon"
            className="logo-img"
          />
        </Link>

        {/* Centered pill nav */}
        <nav className={`nav-pill ${isMobileOpen ? 'open' : ''}`}>
          <a href="/#programmes" className="nav-link" onClick={() => setIsMobileOpen(false)}>Programmes</a>
          <a href="/#faq"        className="nav-link" onClick={() => setIsMobileOpen(false)}>FAQs</a>
          <a href="/#contact"    className="nav-link" onClick={() => setIsMobileOpen(false)}>Contact</a>
        </nav>

        {/* CTA */}
        <div className="header-cta">
          {mounted ? (
            user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link href="/register" className="nav-link" style={{ fontWeight: '700', color: '#6366F1', border: '1px solid rgba(99,102,241,0.2)', padding: '6px 14px' }}>
                  My Account
                </Link>
                <Link href="/portal" className="btn-book-call" style={{ padding: '6px 18px 6px 6px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={user.avatar || ("https://i.pravatar.cc/150?u=" + user.name.replace(/\s+/g, ''))} 
                    alt={user.name} 
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = "https://i.pravatar.cc/150?u=" + user.name.replace(/\s+/g, ''); }}
                  />
                  <span>{user.name}</span>
                </Link>
              </div>
            ) : (
              <Link href="/portal" className="btn-book-call">Student Login ↗</Link>
            )
          ) : (
            <div className="btn-book-call" style={{ visibility: 'hidden' }}>Loading...</div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${isMobileOpen ? 'active' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
