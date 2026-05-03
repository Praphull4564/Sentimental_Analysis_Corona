import React, { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ModelComparison.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);
gsap.registerPlugin(ScrollTrigger, useGSAP);

function ModelComparison() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.from('.comparison-page h1', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });

    // Model Cards Stagger Animation
    gsap.from('.model-card-large', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.5)',
      delay: 0.2
    });

    // Scroll Animations for Sections
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%'
        }
      });
    });

    // Differences Grid Stagger
    gsap.from('.diff-card', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.differences-grid',
        start: 'top 80%'
      }
    });

  }, { scope: containerRef });

  const performanceChartData = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
    datasets: [
      {
        label: 'BERT',
        data: [94.5, 93.8, 94.2, 94.0],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1
      },
      {
        label: 'RoBERTa',
        data: [95.8, 95.2, 95.6, 95.4],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8b5cf6',
        borderWidth: 1
      }
    ]
  };

  const sentimentChartData = {
    labels: ['BERT', 'RoBERTa'],
    datasets: [
      { label: 'Positive', data: [94.2, 95.6], backgroundColor: 'rgba(16, 185, 129, 0.8)', borderColor: '#10b981', borderWidth: 1 },
      { label: 'Negative', data: [93.8, 95.2], backgroundColor: 'rgba(239, 68, 68, 0.8)', borderColor: '#ef4444', borderWidth: 1 },
      { label: 'Neutral', data: [92.5, 94.1], backgroundColor: 'rgba(251, 191, 36, 0.8)', borderColor: '#fbbf24', borderWidth: 1 }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { size: 12, family: 'Inter' },
          padding: 15,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } }
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } }
      }
    }
  };

  return (
    <main className="comparison-page" ref={containerRef}>
      <h1>Model <span className="text-gradient">Comparison</span></h1>

      {/* Overview */}
      <section className="comparison-overview">
        <div className="model-card-large interactive-card">
          <h2>BERT</h2>
          <p className="model-full-name">Bidirectional Encoder Representations from Transformers</p>
          <div className="model-specs">
            <div className="spec-item">
              <strong>Release</strong>
              <span>2018 (Google)</span>
            </div>
            <div className="spec-item">
              <strong>Parameters</strong>
              <span>110M (base model)</span>
            </div>
            <div className="spec-item">
              <strong>Pre-training Data</strong>
              <span>Wikipedia + Books Corpus (3.3B words)</span>
            </div>
            <div className="spec-item">
              <strong>Key Feature</strong>
              <span>Bidirectional context understanding</span>
            </div>
          </div>
          <div className="model-score">
            <div className="score-label">Average Accuracy</div>
            <div className="score-value">95.1%</div>
          </div>
        </div>

        <div className="model-card-large">
          <h2>RoBERTa</h2>
          <p className="model-full-name">Robustly Optimized BERT Pretraining Approach</p>
          <div className="model-specs">
            <div className="spec-item">
              <strong>Release</strong>
              <span>2019 (Facebook)</span>
            </div>
            <div className="spec-item">
              <strong>Parameters</strong>
              <span>125M (base model)</span>
            </div>
            <div className="spec-item">
              <strong>Pre-training Data</strong>
              <span>Diverse text (160GB)</span>
            </div>
            <div className="spec-item">
              <strong>Key Feature</strong>
              <span>Improved pre-training methodology</span>
            </div>
          </div>
          <div className="model-score">
            <div className="score-label">Average Accuracy</div>
            <div className="score-value">96.7%</div>
          </div>
        </div>
      </section>

      {/* Performance Comparison Chart */}
      <section className="chart-section">
        <h2>Performance Metrics Comparison</h2>
        <div className="chart-container" style={{height: '500px'}}>
          <Bar data={performanceChartData} options={chartOptions} />
        </div>
      </section>

      {/* Detailed Metrics Table */}
      <section className="metrics-section">
        <h2>Detailed Metrics Breakdown</h2>
        <div className="metrics-table-container">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>BERT</th>
                <th>RoBERTa</th>
                <th>Difference</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="metric-name"><strong>Accuracy</strong></td>
                <td className="bert-value">94.5%</td>
                <td className="roberta-value">95.8%</td>
                <td className="difference"><span className="badge">+1.3%</span></td>
                <td className="description">Overall correctness of predictions</td>
              </tr>
              <tr>
                <td className="metric-name"><strong>Precision</strong></td>
                <td className="bert-value">93.8%</td>
                <td className="roberta-value">95.2%</td>
                <td className="difference"><span className="badge">+1.4%</span></td>
                <td className="description">True positives / (TP + FP)</td>
              </tr>
              <tr>
                <td className="metric-name"><strong>Recall</strong></td>
                <td className="bert-value">94.2%</td>
                <td className="roberta-value">95.6%</td>
                <td className="difference"><span className="badge">+1.4%</span></td>
                <td className="description">True positives / (TP + FN)</td>
              </tr>
              <tr>
                <td className="metric-name"><strong>F1-Score</strong></td>
                <td className="bert-value">94.0%</td>
                <td className="roberta-value">95.4%</td>
                <td className="difference"><span className="badge">+1.4%</span></td>
                <td className="description">Harmonic mean of Precision & Recall</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accuracy by Sentiment */}
      <section className="sentiment-accuracy">
        <h2>Accuracy by Sentiment Class</h2>
        <div className="chart-container" style={{height: '400px'}}>
          <Bar data={sentimentChartData} options={chartOptions} />
        </div>
      </section>

      {/* Key Differences */}
      <section className="differences-section">
        <h2>Key Differences</h2>
        <div className="differences-grid">
          <div className="diff-card interactive-card">
            <h3>Pre-training Approach</h3>
            <div className="diff-item">
              <strong>BERT</strong>
              <p>Uses masked language modeling (MLM) and next sentence prediction (NSP)</p>
            </div>
            <div className="diff-item">
              <strong>RoBERTa</strong>
              <p>Improved MLM with longer training on more data, removed NSP</p>
            </div>
          </div>

          <div className="diff-card">
            <h3>Training Data</h3>
            <div className="diff-item">
              <strong>BERT</strong>
              <p>3.3B words from Wikipedia and Books Corpus</p>
            </div>
            <div className="diff-item">
              <strong>RoBERTa</strong>
              <p>160GB of diverse text including web data</p>
            </div>
          </div>

          <div className="diff-card">
            <h3>Fine-tuning</h3>
            <div className="diff-item">
              <strong>BERT</strong>
              <p>Straightforward transfer learning approach</p>
            </div>
            <div className="diff-item">
              <strong>RoBERTa</strong>
              <p>Requires careful hyperparameter tuning for best results</p>
            </div>
          </div>

          <div className="diff-card">
            <h3>Performance</h3>
            <div className="diff-item">
              <strong>BERT</strong>
              <p>Strong baseline with 95.1% average score</p>
            </div>
            <div className="diff-item">
              <strong>RoBERTa</strong>
              <p>Superior performance with 96.7% average score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="conclusion">
        <h2>Conclusion</h2>
        <div className="conclusion-box interactive-card">
          <p>
            Both BERT and RoBERTa demonstrate excellent performance in sentiment analysis tasks, with accuracies exceeding 95%. 
            However, RoBERTa shows consistent improvements across all metrics due to its more robust pre-training approach and 
            larger and more diverse training data.
          </p>
          <p>
            For this project's purposes, <strong>RoBERTa is recommended</strong> as the primary model for production deployment 
            due to its superior performance (+1.6% improvement), especially for critical applications where every percentage point 
            of accuracy matters.
          </p>
          <p>
            BERT remains a solid choice for resource-constrained environments or as an ensemble component for increased robustness.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ModelComparison;
