const express = require('express');
const cors = require('cors');
const path = require('path');

const plantRoutes = require('./routes/plants');
const identifyRoutes = require('./routes/identify');
const noteAnalysisRoutes = require('./routes/noteAnalysis');
const authRoutes = require('./routes/auth');
const notebookRoutes = require('./routes/notebook');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/identify', identifyRoutes);
app.use('/api/analyze-note', noteAnalysisRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notebook', notebookRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Botanik Defteri API Aktif',
    aiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_api_key_here')
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Hatası:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Sunucuda bir hata oluştu.'
  });
});

module.exports = app;
