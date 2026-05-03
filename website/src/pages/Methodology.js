import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Methodology.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Methodology() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.from('.methodology-header h1', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.methodology-header p', { y: -20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });

    // Timeline line animation
    gsap.fromTo('.timeline-container::before', 
      { height: 0 }, 
      { height: '100%', duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: '.timeline-container', start: 'top 80%', end: 'bottom 80%', scrub: 1 } }
    );

    // Section scroll animations
    gsap.utils.toArray('.methodology-section').forEach((section, index) => {
      gsap.from(section.querySelector('.step-number'), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      });

      gsap.from(section.querySelector('h2'), {
        x: -30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      });

      gsap.from(section.querySelector('.content-box'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      });
    });
  }, { scope: containerRef });

  return (
    <main className="methodology-page" ref={containerRef}>
      <div className="methodology-header">
        <h1>Project <span className="text-gradient">Methodology</span></h1>
        <p>A deep dive into the architecture, data processing, and neural network training procedures used to build our sentiment analysis pipeline.</p>
      </div>

      <div className="timeline-container">
        <section className="methodology-section">
          <div className="step-number">1</div>
          <h2>Data Collection</h2>
          <div className="content-box interactive-card">
            <h3>Sources</h3>
            <ul>
              <li><strong>Reddit:</strong> Comments from various subreddits discussing ChatGPT and AI topics</li>
              <li><strong>ChatGPT:</strong> Direct responses and conversations with ChatGPT about different topics</li>
            </ul>
            <h3>Dataset Characteristics</h3>
            <ul>
              <li>Total Records: 50,000+</li>
              <li>Text Length: Variable (short comments to longer responses)</li>
              <li>Sentiment Classes: Positive, Negative, Neutral</li>
              <li>Languages: Primarily English</li>
            </ul>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">2</div>
          <h2>Data Preprocessing</h2>
          <div className="content-box interactive-card">
            <h3>Pipeline Steps</h3>
            <ul>
              <li><strong>Text Cleaning:</strong> Removed URLs, special characters, extra whitespace</li>
              <li><strong>Tokenization:</strong> Split text into meaningful tokens using Hugging Face tokenizers</li>
              <li><strong>Lowercasing:</strong> Converted all text to lowercase for consistency</li>
              <li><strong>Normalization:</strong> Removed accents and standardized text format</li>
              <li><strong>Duplicate Removal:</strong> Eliminated duplicate entries to prevent bias</li>
              <li><strong>Label Encoding:</strong> Converted sentiment labels to numerical values tensor formats</li>
            </ul>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">3</div>
          <h2>Model Architecture</h2>
          <div className="content-box">
            <div className="models-grid">
              <div className="model-card interactive-card">
                <h3>BERT Base Uncased</h3>
                <ul>
                  <li>Pre-trained on 3.3 billion words (Wikipedia & BooksCorpus)</li>
                  <li>Bidirectional context understanding</li>
                  <li>Fine-tuned classification head for sentiment</li>
                  <li>Input constraint: Tokenized text up to 512 tokens</li>
                </ul>
              </div>
              <div className="model-card interactive-card">
                <h3>RoBERTa Base</h3>
                <ul>
                  <li>Robustly Optimized BERT Pretraining Approach</li>
                  <li>Trained on 160GB of diverse text data</li>
                  <li>Dynamic masking patterns during training</li>
                  <li>Superior performance on downstream NLP tasks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">4</div>
          <h2>Training Process</h2>
          <div className="content-box interactive-card">
            <h3>Hyperparameters</h3>
            <div className="params-grid">
              <div className="param interactive-card">
                <strong>Learning Rate</strong> 2e-5
              </div>
              <div className="param interactive-card">
                <strong>Batch Size</strong> 32
              </div>
              <div className="param interactive-card">
                <strong>Epochs</strong> 3-5
              </div>
              <div className="param interactive-card">
                <strong>Optimizer</strong> AdamW
              </div>
              <div className="param interactive-card">
                <strong>Max Length</strong> 128 tokens
              </div>
              <div className="param interactive-card">
                <strong>Warmup Steps</strong> 10%
              </div>
            </div>
            <h3>Training Details</h3>
            <ul>
              <li>Train/Validation/Test Split: 70/15/15 ratio</li>
              <li>Data Augmentation: Applied for balanced classes</li>
              <li>Early Stopping: Monitored on validation accuracy</li>
              <li>Cross-Validation: 5-fold cross-validation for robustness</li>
            </ul>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">5</div>
          <h2>Evaluation Metrics</h2>
          <div className="content-box interactive-card">
            <h3>Performance Criteria</h3>
            <ul>
              <li><strong>Accuracy:</strong> Overall correctness of predictions across all classes</li>
              <li><strong>Precision:</strong> True positives / (True positives + False positives) - measures exactness</li>
              <li><strong>Recall:</strong> True positives / (True positives + False negatives) - measures completeness</li>
              <li><strong>F1-Score:</strong> Harmonic mean of precision and recall for unbalanced datasets</li>
              <li><strong>Confusion Matrix:</strong> Detailed classification breakdown for error analysis</li>
              <li><strong>ROC-AUC:</strong> Area under the receiver operating characteristic curve</li>
            </ul>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">6</div>
          <h2>Technical Stack</h2>
          <div className="content-box interactive-card">
            <div className="tech-stack">
              <div className="tech-item"><strong>ML Framework</strong> PyTorch</div>
              <div className="tech-item"><strong>Transformers</strong> Hugging Face</div>
              <div className="tech-item"><strong>Data Processing</strong> Pandas, NumPy</div>
              <div className="tech-item"><strong>Visualization</strong> Matplotlib, Seaborn</div>
              <div className="tech-item"><strong>Frontend</strong> React, GSAP, Chart.js</div>
              <div className="tech-item"><strong>Backend API</strong> Flask / FastAPI</div>
            </div>
          </div>
        </section>

        <section className="methodology-section">
          <div className="step-number">7</div>
          <h2>Challenges & Solutions</h2>
          <div className="content-box interactive-card">
            <div className="challenges-grid">
              <div className="challenge interactive-card">
                <h4>Class Imbalance</h4>
                <p><strong>Solution:</strong> Applied weighted loss functions and synthetic data augmentation techniques.</p>
              </div>
              <div className="challenge interactive-card">
                <h4>Varying Text Lengths</h4>
                <p><strong>Solution:</strong> Implemented dynamic tokenizer padding and truncation to fixed length limits.</p>
              </div>
              <div className="challenge interactive-card">
                <h4>Sarcasm Detection</h4>
                <p><strong>Solution:</strong> Enhanced data labeling guidelines and utilized larger contextual windows.</p>
              </div>
              <div className="challenge interactive-card">
                <h4>Domain Shift</h4>
                <p><strong>Solution:</strong> Trained on a mixed-domain corpus and evaluated separate validation sets.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Methodology;
