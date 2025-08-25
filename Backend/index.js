const express = require('express');
const cors = require('cors');
require('./db')
const blogRouter = require('./routes/blog-route');
const authRouter = require('./routes/auth-route');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api',(req, res) => {
    res.send("API is working");
})


app.listen(process.env.PORT || 3000, () => console.log(`server is running on port ${process.env.PORT || 3000}`));