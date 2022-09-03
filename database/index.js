const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');


app.use(cors());
app.use(express.json());
app.use(compression());

const user = require('./routes/user');
app.use('/api/user', user);

app.listen(5000, () => {
    console.log("server has started on port 5000");
});