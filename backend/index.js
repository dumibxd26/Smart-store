const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');

const app = express();
app.use(cors());
app.use(express.json());

// // Connect this server to the one that is running on port 5000 which is an API server
// const proxy = require('http-proxy-middleware');
// app.use('/api', proxy({ target: 'http://localhost:5000', changeOrigin: true }));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
// app.use(passport.initialize()); erorile de la passport
// app.use(passport.session());  

const axios = require('axios');

app.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await axios.post('http://localhost:5000/api/user/login', {
            email: email,
            password: password
        });
        console.log(user.data);
        res.json(user.data);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const { first_name, last_name,
            email, birth_date,
            password } = req.body;
        
        const newUser = await axios.post('http://localhost:5000/api/user/register', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birth_date: birth_date,
            password: password
        });
        console.log(newUser.data);
        res.json(newUser.data);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/update", async (req, res) => {
    try {
        console.log(req.body);
        const { first_name, last_name,
            email, birth_date,
            password } = req.body;

        const updateUser = await axios.put('http://localhost:5000/api/user/update', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birth_date: birth_date,
            password: password
        });
        console.log(updateUser.data);
        res.json(updateUser.data);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/delete", async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;

        const deleteUser = await axios.delete('http://localhost:5000/api/user/delete', {
            email: email
        });
        console.log(deleteUser.data);
        res.json(deleteUser.data);
    } catch (err) {
        console.error(err.message);
    }
});


app.post("/check", async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
} );

app.listen(6000, () => {
    console.log("first server has started on port 6000");
});
