import React from 'react';
import './Footer.css';
import LiquidButton from './LiquidButton'; // specifically using the flat v2 we modified earlier

export default function Footer() {
  return (
    <footer className="footer-section">
      
      {/* ─── 1. Newsletter Section ─── */}
      <div className="newsletter-wrapper">
        <div className="newsletter-box">
          <div className="nl-corners">
            <span className="nl-corner tl" />
            <span className="nl-corner tr" />
            <span className="nl-corner bl" />
            <span className="nl-corner br" />
          </div>
          
          <div className="nl-content">
            <h2 className="nl-title">ÚNETE A NUESTRO NEWLETTER</h2>
            <p className="nl-desc">Recibe las últimas noticias en oportunidades...</p>
            <button className="nl-btn">Unirse ahora</button>
          </div>
        </div>
      </div>

      {/* ─── 2. Partners Marquee / Logos ─── */}
      <div className="partners-wrapper">
        <div className="partners-list">
          <div className="partner-item">
            <span className="partner-logo placeholder">BID LAB</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item">
            <span className="partner-logo placeholder">C MINDS</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item">
            <span className="partner-logo placeholder">Suecia Sverige</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item multi-line">
            <span className="partner-logo placeholder small">GOUVERNEMENT</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item">
            <span className="partner-logo placeholder">AMAZONIA</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item">
             <span className="partner-logo placeholder">Climate Collective</span>
          </div>
          <div className="partner-divider" />
          
          <div className="partner-item">
            <span className="partner-logo placeholder">BID</span>
          </div>
        </div>
      </div>

      {/* ─── 3. Main Footer ─── */}
      <div className="main-footer">
        <div className="mf-left">
          <div className="mf-brand">
            <span className="brand-name">NaturaTech</span>
            <span className="brand-badge">LAC</span>
          </div>
          <p className="mf-text">
            At NaturaTech LAC we are driven by a commitment to discover<br />
            and explore de roots that emerge from the territories their<br />
            stories, and above all, their innovation.
          </p>
          
          <div className="mf-bottom-left">
            <p className="copyright">© NaturaTech LAC. All rights reserved. 2025</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><IconInstagram /></a>
              <a href="#" aria-label="Facebook"><IconFacebook /></a>
              <a href="#" aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href="#" aria-label="YouTube"><IconYouTube /></a>
              <a href="#" aria-label="WhatsApp"><IconWhatsApp /></a>
            </div>
          </div>
        </div>

        <div className="mf-right">
          <nav className="footer-nav">
            <a href="#">INICIO</a>
            <a href="#">STARTUPS</a>
            <a href="#">PORTAFOLIO</a>
            <a href="#">ECOS</a>
          </nav>
          
          <div className="lang-toggle">
             <button className="lang-btn">Inglés</button>
             <button className="lang-btn active">Español</button>
          </div>
        </div>
      </div>

    </footer>
  );
}

// Simple inline SVGs for social icons to match screenshot exactly
const IconInstagram = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);
const IconFacebook = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);
const IconLinkedIn = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);
const IconYouTube = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);
const IconWhatsApp = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);
