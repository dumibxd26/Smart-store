const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

const user = require('./routes/user');
app.use('/api/user', user);

app.listen(5000, () => {
    console.log("server has started on port 5000");
});