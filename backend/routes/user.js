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
        return error;
});
}              

router.post("/login", async (req, res) => {
    try {

        console.log(`Backend received login request from ${req.body.email} at ${new Date()}`);

        let { email, password } = req.body;

        email = email.toLowerCase().trim();
        password = password.trim();

        const accountPassword = await getUser(email); // Hashed

        bcrypt.compare(password, accountPassword, function(err, isMatch) {

            if (isMatch) {
                const token = jwt.sign({email: email}, "secretkey", {expiresIn: "15s"});

                const session = {email: email, token: 'JWT ' + token};

                // Check if session already exists for the user
                activeSession.findOne({email: email}, (err, doc) => {
                    if (err) {
                        res.status(500).json({error: err});
                    } else if (doc) {
                        // If session exists, update the token

                        activeSession.findOneAndUpdate({email: email}, session, (err, doc) => {
                            if (err) {
                                res.status(500).json({error: err});
                            } else {
                                res.json({success: true, token: 'JWT ' + token});
                            }
                        });
                    } else {
                        // If session does not exist, create a new one
                        activeSession.create(session, function(err, resp) {
                            res.json({succes: true, token: 'JWT ' + token});
                        });
                
                    }
                });

            } else {
                res.json({success: false});
            }
        });

    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.post("/logout", async (req, res) => {
    try {

        console.log(`Backend received logout request from ${req.body.email} at ${new Date()}`);

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
        res.status(500).json({error: err});
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
        
        console.log(`Backend received register request from ${req.body.email} at ${new Date()}`);
        
        let { firstName, lastName,
            email, birthDate,
            password } = req.body;
        
        email = email.trim().toLowerCase();
        password = password.trim();

        if (!checkPassword(password)) {
            res.json({succes: false, message: "Password must contain 8-20 characters, at least one number and one special character"});
        } else if (!checkEmail(email)) {
            res.json({succes: false, message: "Invalid email"});
        } else {
            password = await hashPassword({password: password});
            email = email.trim();
            firstName = firstName.trim();
            lastName = lastName.trim();

            console.log(password);

            const newUser = await axios.post('http://localhost:5000/api/user/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                birthDate: birthDate,
                password: password
            });

            res.json({success : true, data: newUser.data});
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.put("/update", async (req, res) => {
    try {
       
        console.log(`Backend received update request from ${req.body.email} at ${new Date()}`);

        let { firstName, lastName,
            email, birthDate,
            password } = req.body;
        
        if (!checkPassword(password)) {
            res.json({succes: false, message: "Password must contain 8-20 characters, at least one number and one special character"});
        } else if (!checkEmail(email)) {
            res.json({succes: false, message: "Invalid email"});
        } else {
            password = await hashPassword({password: password});
            email = email.trim();
            firstName = firstName.trim();
            lastName = lastName.trim();

            const updateUser = await axios.put('http://localhost:5000/api/user/update', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                birthDate: birthDate,
                password: password
            });
            console.log(updateUser.data);
            res.json(updateUser.data);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete", async (req, res) => {
    try {
        
        console.log(`Backend received delete request from ${req.body.email} at ${new Date()}`);

        const { email } = req.body;
        email = email.trim().toLowerCase();

        const deleteUser = await axios.delete('http://localhost:5000/api/user/delete', {
            email: email
        });
        console.log(deleteUser.data);
        res.json(deleteUser.data);
    } catch (err) {
        res.status(500).json({error: err});
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