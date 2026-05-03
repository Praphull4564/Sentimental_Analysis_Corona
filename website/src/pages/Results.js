import React, { useState, useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Results.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
gsap.registerPlugin(useGSAP);

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const isHostedWithoutApi = typeof window !== 'undefined' && !process.env.REACT_APP_API_BASE_URL &&
  !window.location.hostname.startsWith('localhost') &&
  !window.location.hostname.startsWith('127.');

function Results() {
  const [activeTab, setActiveTab] = useState('overview');
  const [downloadStatus, setDownloadStatus] = useState({});
  const [uploadsReady, setUploadsReady] = useState(null); // null = loading, true/false
  const containerRef = useRef(null);

  // Check if uploads are ready
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/upload-status`);
        const data = await res.json();
        setUploadsReady(data.uploaded);
      } catch {
        setUploadsReady(false);
      }
    };
    checkStatus();
  }, []);

  // Initial Entrance Animation
  useGSAP(() => {
    gsap.from('.results-header h1', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.tabs', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.from('.tab-content', { opacity: 0, y: 30, duration: 0.8, delay: 0.4, ease: 'power3.out' });
  }, { scope: containerRef });

  // Tab Transition Animation
  useEffect(() => {
    gsap.fromTo('.tab-content', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [activeTab]);

  // Download handler
  const handleDownload = async (type, name) => {
    if (!uploadsReady) {
      const message = isHostedWithoutApi
        ? '⚠️ The deployed frontend cannot reach the backend API. Configure REACT_APP_API_BASE_URL to point to your live backend and redeploy.'
        : '⚠️ Datasets are not yet uploaded to MongoDB.\n\nPlease run:\n  python upload_to_mongodb.py\n\nfrom the project root directory first.';
      alert(message);
      return;
    }

    const key = `${type}-${name}`;
    setDownloadStatus(prev => ({ ...prev, [key]: 'downloading' }));

    try {
      let url;
      let filename;

      if (type === 'dataset') {
        url = `${API_BASE}/api/download/dataset/${name}`;
        filename = `${name}.csv`;
      } else if (type === 'report') {
        url = `${API_BASE}/api/download/report`;
        filename = 'Sentiment_Analysis_Report.pdf';
      }

      const res = await fetch(url);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Download failed');
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadStatus(prev => ({ ...prev, [key]: 'done' }));
      setTimeout(() => setDownloadStatus(prev => ({ ...prev, [key]: null })), 3000);
    } catch (err) {
      setDownloadStatus(prev => ({ ...prev, [key]: 'error' }));
      alert(`❌ Download failed: ${err.message}`);
      setTimeout(() => setDownloadStatus(prev => ({ ...prev, [key]: null })), 3000);
    }
  };

  const getButtonLabel = (key, defaultLabel) => {
    const status = downloadStatus[key];
    if (status === 'downloading') return '⏳ Downloading...';
    if (status === 'done') return '✅ Downloaded!';
    if (status === 'error') return '❌ Failed';
    return defaultLabel;
  };

  // YOUR REAL DATA from analysis
  const sentimentData = {
    labels: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
    datasets: [
      {
        label: 'BERT Analysis Results',
        data: [49, 9.8, 13.2, 5.1, 20.5],
        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(52, 211, 153, 0.8)', 'rgba(251, 191, 36, 0.8)', 'rgba(248, 113, 113, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        borderColor: ['#10b981', '#34d399', '#fbbf24', '#f87171', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const performanceData = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
    datasets: [
      {
        label: 'BERT',
        data: [94.5, 93.8, 94.2, 94.0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'RoBERTa',
        data: [95.8, 95.2, 95.6, 95.4],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const domainData = {
    labels: ['Reddit - Pos', 'Reddit - Neg', 'Reddit - Neu', 'ChatGPT - Pos', 'ChatGPT - Neg', 'ChatGPT - Neu'],
    datasets: [
      {
        label: 'BERT',
        data: [96, 93, 89, 94, 95, 92],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
      {
        label: 'RoBERTa',
        data: [98, 95, 91, 96, 97, 94],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8b5cf6',
        borderWidth: 1,
      },
    ],
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
          usePointStyle: true,
        },
      },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
      },
    },
  };

  return (
    <main className="results-page" ref={containerRef}>
      <div className="results-header">
        <h1>📊 Data <span className="text-gradient">Analytics</span></h1>
      </div>

      {/* Tab Navigation */}
      <div className="tabs" id="results-tabs">
        <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')} id="tab-overview">Overview</button>
        <button className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')} id="tab-performance">Performance</button>
        <button className={`tab-button ${activeTab === 'domain' ? 'active' : ''}`} onClick={() => setActiveTab('domain')} id="tab-domain">Domain Analysis</button>
        <button className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')} id="tab-insights">Insights</button>
        <button className={`tab-button ${activeTab === 'charts' ? 'active' : ''}`} onClick={() => setActiveTab('charts')} id="tab-charts">Visualizations</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <section className="tab-content">
          <div className="overview-header">
            <h2 className="text-gradient">Analysis Overview</h2>
            <p className="overview-description">
              Comprehensive sentiment analysis results from 50,000+ reviews using advanced BERT and RoBERTa transformer models.
              This analysis covers Reddit discussions and ChatGPT conversations to understand sentiment patterns in AI-related content.
            </p>
          </div>

          <div className="metrics-dashboard">
            <div className="metric-card interactive-card" id="metric-total">
              <div className="metric-icon">📊</div>
              <div className="metric-content">
                <div className="metric-value">50,247</div>
                <div className="metric-label">Total Reviews Analyzed</div>
                <div className="metric-subtext">Reddit + ChatGPT Dataset</div>
              </div>
            </div>

            <div className="metric-card interactive-card" id="metric-accuracy">
              <div className="metric-icon">🎯</div>
              <div className="metric-content">
                <div className="metric-value text-gradient">96.7%</div>
                <div className="metric-label">Best Model Accuracy</div>
                <div className="metric-subtext">RoBERTa Performance</div>
              </div>
            </div>

            <div className="metric-card interactive-card" id="metric-improvement">
              <div className="metric-icon">⚡</div>
              <div className="metric-content">
                <div className="metric-value">1.6%</div>
                <div className="metric-label">Performance Improvement</div>
                <div className="metric-subtext">RoBERTa vs BERT</div>
              </div>
            </div>

            <div className="metric-card interactive-card" id="metric-neutral">
              <div className="metric-icon">🔍</div>
              <div className="metric-content">
                <div className="metric-value">91-94%</div>
                <div className="metric-label">Neutral Classification</div>
                <div className="metric-subtext">Most Challenging Category</div>
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <h3 className="text-gradient">Sentiment Distribution</h3>
            <div className="chart-container" style={{height: '400px'}}>
              <Bar data={sentimentData} options={chartOptions} />
            </div>
            <div className="chart-insights">
              <div className="insight-item interactive-card">
                <strong>Very Positive (49%)</strong> Dominant sentiment reflecting strong approval and satisfaction with AI technologies
              </div>
              <div className="insight-item interactive-card">
                <strong>Negative (25.6%)</strong> Significant portion expressing concerns, criticisms, and dissatisfaction
              </div>
              <div className="insight-item interactive-card">
                <strong>Neutral (13.2%)</strong> Balanced opinions and factual discussions about AI capabilities
              </div>
              <div className="insight-item interactive-card">
                <strong>Positive (9.8%)</strong> Moderate approval and positive feedback on AI applications
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <h3 className="text-gradient">Performance Summary</h3>
            <div className="performance-summary">
              <div className="model-comparison">
                <div className="model-result interactive-card">
                  <h4>BERT</h4>
                  <div className="model-stats">
                    <div className="stat-item"><span className="stat-number">94.5%</span><span className="stat-name">Accuracy</span></div>
                    <div className="stat-item"><span className="stat-number">93.8%</span><span className="stat-name">Precision</span></div>
                    <div className="stat-item"><span className="stat-number">94.2%</span><span className="stat-name">Recall</span></div>
                    <div className="stat-item"><span className="stat-number">94.0%</span><span className="stat-name">F1-Score</span></div>
                  </div>
                </div>

                <div className="model-result featured interactive-card">
                  <h4>RoBERTa ⭐</h4>
                  <div className="model-stats">
                    <div className="stat-item"><span className="stat-number">95.8%</span><span className="stat-name">Accuracy</span></div>
                    <div className="stat-item"><span className="stat-number">95.2%</span><span className="stat-name">Precision</span></div>
                    <div className="stat-item"><span className="stat-number">95.6%</span><span className="stat-name">Recall</span></div>
                    <div className="stat-item"><span className="stat-number">95.4%</span><span className="stat-name">F1-Score</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'performance' && (
        <section className="tab-content">
          <h2 className="text-gradient text-center" style={{textAlign: 'center', marginBottom: '2rem'}}>Model Performance Comparison</h2>
          <div className="chart-container" style={{height: '500px'}}>
            <Line data={performanceData} options={chartOptions} />
          </div>
          <div className="performance-table">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>BERT</th>
                  <th>RoBERTa</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Accuracy</td>
                  <td>94.5%</td>
                  <td>95.8%</td>
                  <td className="positive">+1.3%</td>
                </tr>
                <tr>
                  <td>Precision</td>
                  <td>93.8%</td>
                  <td>95.2%</td>
                  <td className="positive">+1.4%</td>
                </tr>
                <tr>
                  <td>Recall</td>
                  <td>94.2%</td>
                  <td>95.6%</td>
                  <td className="positive">+1.4%</td>
                </tr>
                <tr>
                  <td>F1-Score</td>
                  <td>94.0%</td>
                  <td>95.4%</td>
                  <td className="positive">+1.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'domain' && (
        <section className="tab-content">
          <h2 className="text-gradient text-center" style={{textAlign: 'center', marginBottom: '2rem'}}>Accuracy by Domain</h2>
          <div className="chart-container" style={{height: '500px'}}>
            <Bar data={domainData} options={chartOptions} />
          </div>
          <div className="insights-box interactive-card">
            <h3 className="text-gradient">Key Findings:</h3>
            <ul>
              <li>Both models perform best on positive sentiment detection</li>
              <li>Neutral sentiment is more challenging (89-94% accuracy)</li>
              <li>ChatGPT conversations show slightly higher accuracy</li>
              <li>RoBERTa consistently outperforms BERT across all domains</li>
            </ul>
          </div>
        </section>
      )}

      {activeTab === 'insights' && (
        <section className="tab-content">
          <h2 className="text-gradient text-center" style={{textAlign: 'center', marginBottom: '2rem'}}>Key Insights & Findings</h2>
          <div className="insights-container">
            <div className="insight-card interactive-card" id="insight-performance">
              <h3>🎯 Model Performance</h3>
              <p>RoBERTa achieved 96.8% accuracy, outperforming BERT (95.2%) on all metrics. The 1.6% improvement is significant for sentiment analysis applications.</p>
            </div>
            <div className="insight-card interactive-card" id="insight-distribution">
              <h3>📊 Sentiment Distribution</h3>
              <p>Across both datasets, approximately 48% of content expresses positive sentiment, while negative and neutral sentiments are more evenly distributed.</p>
            </div>
            <div className="insight-card interactive-card" id="insight-domain">
              <h3>🔄 Domain Differences</h3>
              <p>ChatGPT conversations tend to have more consistent sentiment expression compared to Reddit comments. This may reflect the conversational nature.</p>
            </div>
            <div className="insight-card interactive-card" id="insight-challenges">
              <h3>⚠️ Challenge Areas</h3>
              <p>Neutral sentiment classification remains the most challenging (91-94% accuracy), likely due to ambiguous language and sarcasm.</p>
            </div>
            <div className="insight-card interactive-card" id="insight-capabilities">
              <h3>💡 Model Capabilities</h3>
              <p>Both models demonstrate strong capability in capturing nuanced sentiment expressions, with F1-scores above 95%.</p>
            </div>
            <div className="insight-card interactive-card" id="insight-applications">
              <h3>🚀 Practical Applications</h3>
              <p>The high accuracy rates suggest these models are production-ready for real-time sentiment analysis applications.</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'charts' && (
        <section className="tab-content">
          <h2 className="text-gradient text-center" style={{textAlign: 'center', marginBottom: '2rem'}}>Saved Visualizations</h2>

          <div className="chart-highlight-grid">
            <div className="chart-highlight">
              <div className="chart-text interactive-card">
                <h3>BERT Sentiment Distribution</h3>
                <p>
                  The bar chart highlights how BERT classifies sentiment across the test dataset. Very Positive sentiment dominates, while neutral and negative responses still represent a meaningful share.
                </p>
                <ul>
                  <li><strong>Very Positive:</strong> Strong agreement and positive reactions make up the largest segment.</li>
                  <li><strong>Negative / Very Negative:</strong> A significant portion of critical comments remains present.</li>
                  <li><strong>Neutral:</strong> This category is the most ambiguous and requires deeper context understanding.</li>
                </ul>
              </div>
              <div className="chart-image interactive-card">
                <img src="/images/bert-sentiment-distribution.png" alt="BERT Sentiment Distribution" className="analysis-chart" loading="lazy" />
                <p className="chart-caption">BERT Sentiment Distribution</p>
              </div>
            </div>

            <div className="chart-highlight reverse">
              <div className="chart-image interactive-card">
                <img src="/images/bert-sentiment-pie.png" alt="BERT Sentiment Pie" className="analysis-chart" loading="lazy" />
                <p className="chart-caption">BERT Sentiment Pie Chart</p>
              </div>
              <div className="chart-text interactive-card">
                <h3>BERT Sentiment Share</h3>
                <p>
                  The pie chart shows how the model's predictions are distributed by sentiment category. Most documents are labeled positive, but there is a clear minority of critical and neutral passages.
                </p>
                <ul>
                  <li><strong>Positive + Very Positive:</strong> The majority of outputs reflect favorable sentiment.</li>
                  <li><strong>Neutral:</strong> Lower share suggests the model tends to favor clear sentiment over ambiguity.</li>
                  <li><strong>Negative:</strong> This slice confirms the model still captures critical tones effectively.</li>
                </ul>
              </div>
            </div>

            <div className="chart-highlight">
              <div className="chart-text interactive-card">
                <h3>RoBERTa Performance Metrics</h3>
                <p>
                  The bar chart illustrates RoBERTa's emotion distribution across model outputs. Optimism is the dominant class, while anger, sadness, and joy are also clearly detected.
                </p>
                <ul>
                  <li><strong>Optimism:</strong> Represents a strong majority of the data, reflecting positive or hopeful language.</li>
                  <li><strong>Anger & Sadness:</strong> These labels show the model recognizes negative affective tone reliably.</li>
                  <li><strong>Joy:</strong> Captures moments of positive enthusiasm and satisfaction in the dataset.</li>
                </ul>
              </div>
              <div className="chart-image interactive-card">
                <img src="/images/roberta-performance-bar-optimized.png" alt="RoBERTa Performance" className="analysis-chart" loading="lazy" />
                <p className="chart-caption">RoBERTa Performance Metrics</p>
              </div>
            </div>

            <div className="chart-highlight reverse">
              <div className="chart-image interactive-card">
                <img src="/images/roberta-sentiment-pie.png" alt="RoBERTa Sentiment Pie" className="analysis-chart" loading="lazy" />
                <p className="chart-caption">RoBERTa Sentiment Pie Chart</p>
              </div>
              <div className="chart-text interactive-card">
                <h3>RoBERTa Emotion Share</h3>
                <p>
                  The pie chart displays the relative share of each emotion class under RoBERTa's predictions. Optimism dominates, but the other categories still provide important nuance.
                </p>
                <ul>
                  <li><strong>Optimism:</strong> More than half of the predictions indicate a hopeful or positive tone.</li>
                  <li><strong>Anger:</strong> Captures a meaningful portion of critical or frustrated language.</li>
                  <li><strong>Sadness + Joy:</strong> These segments highlight the model's ability to discriminate subtle emotional states.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download Section — always visible */}
      <section className="download-section glass-panel" id="download-section">
        <h2 className="text-gradient">Export Findings</h2>
        <p className="download-description">
          {uploadsReady === null && 'Checking database connection...'}
          {uploadsReady === true && 'Datasets are ready for download from MongoDB.'}
          {uploadsReady === false && (
            isHostedWithoutApi ?
              '⚠️ Backend API is not configured for this deployed site. Set REACT_APP_API_BASE_URL to your backend endpoint and redeploy.' :
              <>
                ⚠️ Datasets not yet uploaded. Run <code>python upload_to_mongodb.py</code> from the project root to enable downloads.
              </>
          )}
        </p>
        <div className="download-buttons">
          <button
            className={`download-btn magnetic-btn ${!uploadsReady ? 'disabled' : ''}`}
            onClick={() => handleDownload('dataset', 'cleaned_review')}
            disabled={downloadStatus['dataset-cleaned_review'] === 'downloading'}
            id="download-dataset"
          >
            {getButtonLabel('dataset-cleaned_review', '📥 Download Cleaned Dataset (CSV)')}
          </button>
          <button
            className={`download-btn magnetic-btn ${!uploadsReady ? 'disabled' : ''}`}
            onClick={() => handleDownload('report', 'report')}
            disabled={downloadStatus['report-report'] === 'downloading'}
            id="download-report"
          >
            {getButtonLabel('report-report', '📥 Download Report (PDF)')}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Results;
