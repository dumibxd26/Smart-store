const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const reqAuth = require('../AuthMiddleware/safeRoutes');
const activeSession = require('../AuthMiddleware/activeSessionSchema');

// ROUTES //

const axios = require('axios');

const getUser = async (email) => {

    var data = JSON.stringify({
    "email": email
    });

    var config = {
    method: 'get',
    url: 'http://localhost:5000/api/user/getOne',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
   return await axios(config)
    .then( response => JSON.stringify(response.data).slice(1, -1)
    ) .catch(function (error) {
    console.log(error);
});
}              

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const accountPassword = await getUser(email); // Hashed

        bcrypt.compare(password, accountPassword, function(err, isMatch) {

            if (isMatch) {
                const token = jwt.sign({email: email}, "secretkey", {expiresIn: "86400"});

                const session = {email: email, token: 'JWT ' + token};

                activeSession.create(session, function(err, resp) {
                    res.json({succes: true, token: 'JWT ' + token});
                });

            } else {
                res.json({succes: false, message: "Wrong password"});
            }
        });

    } catch (err) {
        console.error(err.message);
    }
});

router.post("/logout", async (req, res) => {
    try {
        const { email } = req.body;

        let find = await activeSession.findOne({email: email});

        if (find) {
            console.log({"user":find});

        activeSession.deleteOne({email: email}, function(err, resp) {
            if (err) throw err;
            res.json({succes: true, message: "Logged out"});
        });
    } else {
        res.json({succes: false, message: "Not logged in"});
    }
    } catch (err) {
        console.error(err.message);
    }
});


async function hashPassword (user) {

    const password = user.password;
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
    
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) reject(err);
                resolve(hash);
            });
        });
    });
    return hashedPassword;

}
  

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        let { first_name, last_name,
            email, birth_date,
            password } = req.body;

        password = await hashPassword({password: password});

        console.log(password);

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

router.put("/update", async (req, res) => {
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

router.delete("/delete", async (req, res) => {
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


router.post("/check", reqAuth, async (req, res) => {
    try {
        res.json(req.body);
    } catch (err) {
        console.error(err.message);
        res.json({"msg": "Error"});
    }
} );

module.exports = router;