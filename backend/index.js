const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());


// require('./config/passport')(passport);

const user = require('./routes/user');
app.use('/user', user);

app.listen(6000, () => {
    console.log("first server has started on port 6000");
});
