const express = require('express');
const cors = require('cors');
require('./db')
const blogRouter = require('./routes/blog-route');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ["https://blog-app-git-main-rohan-pals-projects.vercel.app"],  // ✅ allow your Vercel site
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api',(req, res) => {
    res.send("API is working");
})


app.listen(process.env.PORT || 3000, () => console.log(`server is running on port ${process.env.PORT || 3000}`));