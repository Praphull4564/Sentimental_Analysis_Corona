import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Home() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Hero Section Animation
    tl.to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.stat-card', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.4');

    // Floating background animations
    gsap.to('.float-1', {
      y: 50, x: 30, rotation: 10,
      duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    
    gsap.to('.float-2', {
      y: -50, x: -30, rotation: -10,
      duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    gsap.to('.float-3', {
      y: 30, x: -20, rotation: 5,
      duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // ScrollTrigger for Overview Cards
    gsap.utils.toArray('.overview-card').forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: i * 0.1
      });
    });

    // ScrollTrigger for Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.to(title, {
        scrollTrigger: { trigger: title, start: 'top 85%' },
        opacity: 1,
        y: 0,
        duration: 0.8
      });
    });

    // ScrollTrigger for Features
    gsap.utils.toArray('.feature').forEach((feature, i) => {
      gsap.to(feature, {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: i * 0.1
      });
    });

    // CTA Animation
    gsap.from('.cta-content', {
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 80%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    });

  }, { scope: containerRef });

  return (
    <main className="home-page" ref={containerRef}>
      <div className="floating-element float-1"></div>
      <div className="floating-element float-2"></div>
      <div className="floating-element float-3"></div>
      
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Research Project
          </div>
          <h1 className="hero-title">
            Analyze Sentiments with <br />
            <span className="text-gradient">BERT & RoBERTa</span>
          </h1>
          <p className="hero-subtitle">
            Leveraging state-of-the-art transformer models to decode complex human emotions from Reddit and ChatGPT datasets with 95%+ accuracy.
          </p>
          <div className="hero-buttons">
            <Link to="/results" className="btn btn-primary magnetic-btn" id="hero-explore-btn">
              Explore Results →
            </Link>
            <Link to="/methodology" className="btn btn-secondary magnetic-btn" id="hero-methodology-btn">
              Learn Methodology
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card glass-panel interactive-card" id="stat-reviews">
            <div className="stat-number text-gradient">50K+</div>
            <div className="stat-label">Reviews Analyzed</div>
          </div>
          <div className="stat-card glass-panel interactive-card" id="stat-models">
            <div className="stat-number text-gradient">2</div>
            <div className="stat-label">Advanced Models</div>
          </div>
          <div className="stat-card glass-panel interactive-card" id="stat-accuracy">
            <div className="stat-number text-gradient">95%+</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview" id="overview-section">
        <h2 className="section-title">Project Architecture</h2>
        <div className="overview-grid">
          <div className="overview-card glass-panel interactive-card" id="card-data-mining">
            <div className="card-icon">📊</div>
            <h3>Data Mining</h3>
            <p>
              We compiled a robust, multi-domain dataset sourced directly from complex Reddit threads and nuanced ChatGPT interactions.
            </p>
          </div>

          <div className="overview-card glass-panel interactive-card" id="card-fine-tuning">
            <div className="card-icon">🧠</div>
            <h3>Model Fine-Tuning</h3>
            <p>
              Employed transfer learning on massive pre-trained language models, optimizing hyperparameters for peak sentiment classification.
            </p>
          </div>

          <div className="overview-card glass-panel interactive-card" id="card-analytics">
            <div className="card-icon">📈</div>
            <h3>Performance Analytics</h3>
            <p>
              Comprehensive breakdown of F1-scores, precision, and recall, visualized through intuitive comparative charts and graphs.
            </p>
          </div>

          <div className="overview-card glass-panel interactive-card" id="card-comparison">
            <div className="card-icon">🎯</div>
            <h3>Dual-Model Comparison</h3>
            <p>
              Compare BERT and RoBERTa predictions side by side to identify which architecture best understands conversational sentiment.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features" id="features-section">
        <h2 className="section-title">Why This Matters</h2>
        <div className="features-grid">
          <div className="feature glass-panel interactive-card" id="feature-context">
            <h4>✨ Multi-Source Context</h4>
            <p>Models trained on diverse text sources adapt better to real-world language variations.</p>
          </div>
          <div className="feature glass-panel interactive-card" id="feature-comparison">
            <h4>⚖️ BERT vs RoBERTa</h4>
            <p>Discover which architecture handles conversational AI sentiment more effectively.</p>
          </div>
          <div className="feature glass-panel interactive-card" id="feature-viz">
            <h4>🎨 Interactive Visualizations</h4>
            <p>Dynamic, responsive charts that make complex data easily understandable.</p>
          </div>
          <div className="feature glass-panel interactive-card" id="feature-speed">
            <h4>⚡ High Performance</h4>
            <p>Optimized inference pipeline delivers sentiment scores with exceptional accuracy.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta glass-panel" id="cta-section">
        <div className="cta-content">
          <h2>Ready to explore the data?</h2>
          <p>Dive into comprehensive analysis results, model comparisons, and download the full datasets.</p>
          <div className="cta-buttons">
            <Link to="/results" className="btn btn-primary magnetic-btn" id="cta-results-btn">
              View Results 📊
            </Link>
            <Link to="/comparison" className="btn btn-secondary magnetic-btn" id="cta-comparison-btn">
              Compare Models 🚀
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
