import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

import Home from './pages/Home';
import Methodology from './pages/Methodology';
import Results from './pages/Results';
import ModelComparison from './pages/ModelComparison';

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

/* Scroll-to-top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const location = useLocation();

  // Determine active nav from current path
  const getActiveNav = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/methodology') return 'methodology';
    if (path === '/results') return 'results';
    if (path === '/comparison') return 'comparison';
    return 'home';
  };

  // Cursor glow effect
  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;

    const handleMove = (e) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleEnter = () => { glow.style.opacity = '1'; };
    const handleLeave = () => { glow.style.opacity = '0'; };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Interactive card mouse tracking
  useEffect(() => {
    const handleCardHover = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    const observer = new MutationObserver(() => {
      document.querySelectorAll('.interactive-card').forEach(card => {
        card.removeEventListener('mousemove', handleCardHover);
        card.addEventListener('mousemove', handleCardHover);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    document.querySelectorAll('.interactive-card').forEach(card => {
      card.addEventListener('mousemove', handleCardHover);
    });

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    // Initial global animation for the navbar
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    });
  }, []);

  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const activeNav = getActiveNav();

  return (
    <div className="App">
      {/* Cursor Glow */}
      <div className="cursor-glow" ref={cursorGlowRef}></div>

      {/* Navigation Bar */}
      <nav className="navbar" ref={navRef}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={handleNavClick}>
            <span>📊</span> Corona Sentiment
          </Link>

          {/* Hamburger Button */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="nav-hamburger"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/methodology"
                className={`nav-link ${activeNav === 'methodology' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Methodology
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/results"
                className={`nav-link ${activeNav === 'results' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Results
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/comparison"
                className={`nav-link ${activeNav === 'comparison' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Comparison
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/results" element={<Results />} />
        <Route path="/comparison" element={<ModelComparison />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">📊 Corona Sentiment</span>
            <p>COVID-19 (Corona) public-text sentiment analysis with BERT & RoBERTa</p>
          </div>
          <div className="footer-links">
            <div className="footer-link-group">
              <h4>Navigation</h4>
              <Link to="/" onClick={handleNavClick}>Home</Link>
              <Link to="/methodology" onClick={handleNavClick}>Methodology</Link>
              <Link to="/results" onClick={handleNavClick}>Results</Link>
              <Link to="/comparison" onClick={handleNavClick}>Comparison</Link>
            </div>
            <div className="footer-link-group">
              <h4>Tech Stack</h4>
              <span>React + GSAP</span>
              <span>Python + Flask</span>
              <span>MongoDB Atlas</span>
              <span>BERT & RoBERTa</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Sentimental Analysis Corona</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Wrap App with Router */
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
