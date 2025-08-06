const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://rohandb:F3Z7KcmHVwIDsup3@cluster0.59o0qu4.mongodb.net/Blogs?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB...", err));

module.exports = mongoose;