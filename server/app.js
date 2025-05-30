const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const flagRoutes = require('./routes/flagRoutes');
const moderationRoutes = require('./routes/moderationRoutes');
const reputationRoutes = require('./routes/reputationRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();

// Enable CORS for React dev server
app.use(cors({
  origin: 'http://localhost:5173', // React frontend port
  credentials: true
}));

app.use(express.json());

// Serve static files only if you still use /public
app.use(express.static('public'));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/flags', flagRoutes);
app.use('/api/moderation', moderationRoutes);
app.use('/api/reputation', reputationRoutes);
app.use('/api/admin', adminRoutes);


module.exports = app;
