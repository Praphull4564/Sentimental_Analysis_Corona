# Sentiment Analysis Project Website

A professional website showcasing sentiment analysis using BERT and RoBERTa models trained on Reddit and ChatGPT datasets.

## Features

✨ **Interactive Visualizations** - Charts and graphs showing sentiment distributions  
🎯 **Live Demo** - Real-time sentiment analysis with both models  
📊 **Model Comparison** - Detailed performance metrics (BERT vs RoBERTa)  
📥 **Downloadable Results** - Export datasets and analysis reports  
📖 **Complete Documentation** - Methodology and technical details  
📱 **Responsive Design** - Works on all devices  

## Tech Stack

- **Frontend**: React 18, CSS3, Chart.js
- **Deployment**: GitHub Pages
- **Additional**: React Router, Axios

## Project Structure

```
website/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── components/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Methodology.js
│   │   ├── Results.js
│   │   ├── ModelComparison.js
│   │   └── LiveDemo.js
│   └── data/
├── backend/
│   └── app.py (Optional Flask backend)
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Install dependencies**:
```bash
cd website
npm install
```

2. **Start the development server**:
```bash
npm start
```

The site will open at `http://localhost:3000`

3. **Build for production**:
```bash
npm run build
```

## Deployment on GitHub Pages

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add GitHub Pages configuration to package.json
# (Already configured in the provided package.json)
```

### Step 2: Deploy to GitHub Pages

1. **Create a GitHub repository** named `sentiment-analysis-showcase`

2. **Add the repository as remote**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/sentiment-analysis-showcase.git
```

3. **Deploy**:
```bash
npm run deploy
```

This will build the site and push it to the `gh-pages` branch.

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch as source
   - Save

Your site will be live at: `https://YOUR_USERNAME.github.io/sentiment-analysis-showcase/`

## Pages Overview

### 🏠 Home
- Project introduction with hero section
- Key statistics
- Feature highlights

### 📚 Methodology
- Data collection process
- Preprocessing steps
- Model selection and training details
- Evaluation metrics
- Technical challenges and solutions

### 📊 Results
- Sentiment distribution charts
- Model performance comparison
- Domain-specific analysis
- Key insights and findings
- Download options for datasets

### 🔄 Model Comparison
- BERT vs RoBERTa detailed comparison
- Performance metrics across all benchmarks
- Key differences in architecture and training
- Recommendations for deployment

### 🎯 Live Demo
- Real-time sentiment analysis
- Side-by-side predictions
- Example texts to try
- Analysis history
- Interactive prediction scores

## Features in Detail

### Interactive Visualizations
Using Chart.js for:
- Bar charts for sentiment distribution
- Line charts for performance trends
- Data comparison visualizations

### Live Sentiment Demo
- Mock implementation included (ready for backend integration)
- Real-time analysis with confidence scores
- Support for positive, negative, and neutral classifications

### Responsive Design
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly interface

## Backend Integration (Optional)

To integrate with actual ML models:

1. **Create a Python Flask backend**:
```python
# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load models
bert_classifier = pipeline("sentiment-analysis", model="bert-base-uncased")
roberta_classifier = pipeline("sentiment-analysis", model="roberta-base")

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    bert_pred = bert_classifier(text)
    roberta_pred = roberta_classifier(text)
    return jsonify({
        'bert': bert_pred,
        'roberta': roberta_pred
    })

if __name__ == '__main__':
    app.run(debug=True)
```

2. **Install requirements**:
```bash
pip install flask flask-cors transformers torch
```

3. **Update LiveDemo.js** to call your backend:
```javascript
const response = await axios.post('http://localhost:5000/predict', {
  text: inputText
});
```

## Customization

### Update Project Info
Edit these files to customize:
- `src/App.js` - Navigation and branding
- `src/pages/Home.js` - Hero content
- `src/pages/Methodology.js` - Your research details
- `src/pages/Results.js` - Your actual results and data

### Styling
- Main styles: `src/App.css`
- Each page has its own CSS file for modular styling
- Color scheme: Purple gradient (#667eea to #764ba2)

### Data & Visualizations
- Update chart data in `src/pages/Results.js`
- Add real model outputs in `src/pages/LiveDemo.js`
- Customize comparison metrics in `src/pages/ModelComparison.js`

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- CSS minification
- Build optimization with production flag

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### Build issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Deployment issues
```bash
# Verify your GitHub token
npm list gh-pages

# Check your repository URL
git remote -v
```

## Future Enhancements

- [ ] Backend integration with live models
- [ ] User authentication and saved analyses
- [ ] Export results to PDF/CSV
- [ ] Model fine-tuning interface
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] API documentation
- [ ] Performance dashboard

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please:
1. Check the troubleshooting section
2. Review the methodology page
3. Contact the project author

---

**Built with ❤️ using React and Transformers** 🚀
