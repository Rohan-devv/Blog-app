const express = require('express ');
const cors = require('cors');
require('./db')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',(req, res) => {
    res.send("API is working");
})


app.listen(3000, () => console.log("server is runnig on port 3000"));