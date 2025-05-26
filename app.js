const express = require('express');
const app = express();
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

app.use(cors());
app.use(express.json());
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

module.exports = app;
