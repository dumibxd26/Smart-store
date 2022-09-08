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
        let { email, password } = req.body;
        email = email.trim().toLowerCase();

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

const checkPassword = password => {
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return regularExpression.test(password);
}

const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        let { first_name, last_name,
            email, birth_date,
            password } = req.body;

        if (!checkPassword(password)) {
            res.json({succes: false, message: "Password must contain 8-20 characters, at least one number and one special character"});
        } else if (!checkEmail(email)) {
            res.json({succes: false, message: "Invalid email"});
        } else {
            password = await hashPassword({password: password});
            email = email.trim();
            first_name = first_name.trim();
            last_name = last_name.trim();

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
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/update", async (req, res) => {
    try {
        console.log(req.body);
        let { first_name, last_name,
            email, birth_date,
            password } = req.body;
        
        if (!checkPassword(password)) {
            res.json({succes: false, message: "Password must contain 8-20 characters, at least one number and one special character"});
        } else if (!checkEmail(email)) {
            res.json({succes: false, message: "Invalid email"});
        } else {
            password = await hashPassword({password: password});
            email = email.trim();
            first_name = first_name.trim();
            last_name = last_name.trim();

            const updateUser = await axios.put('http://localhost:5000/api/user/update', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                birth_date: birth_date,
                password: password
            });
            console.log(updateUser.data);
            res.json(updateUser.data);
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/delete", async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        email = email.trim().toLowerCase();

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