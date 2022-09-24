const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();


// Database connection
const uri = "mongodb+srv://dumibxd:dumi-199-secure@cluster1.q1a6lzi.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.connect(uri, connectionParams).then(() => {
    console.log('connected to mongodb atlas');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

const user = require('./routes/user');
app.use('/user', user);

app.listen(5500, () => {
    console.log("first server has started on port 5500");
});
