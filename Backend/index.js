const express = require('express');
const cors = require('cors');
require('./db')
const blogRouter = require('./routes/blog-route');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogRouter);

// Test route
app.get('/api', (req, res) => {
    res.send("API is working");
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(process.env.PORT || 3000, () => console.log(`server is running on port ${process.env.PORT || 3000}`));