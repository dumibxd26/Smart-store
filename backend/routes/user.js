const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');

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
    .then( response => JSON.stringify(response.data)
    ) .catch(function (error) {
    console.log(error);
});
}              

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const pass = await getUser(email);

        bcrypt.compare(password, pass, function(err, isMatch) {
            if (isMatch) {
                const token = jwt.sign({email: email}, "secretkey", {expiresIn: "86400"});
                res.json({succes: true, token: 'JWT ' + token});
            } else {
                res.json({succes: false, message: "Wrong password"});
            }
        });

        // const user = await axios.post('http://localhost:5000/api/user/login', {
        //     email: email,
        //     password: password
        // });

        // res.json(user.data);
    } catch (err) {
        console.error(err.message);
    }
});

const crypteaza = async (password) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
            return hash;
        });
    });
}

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        let { first_name, last_name,
            email, birth_date,
            password } = req.body;

        console.log(password);

        password = await crypteaza(password);//Error

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


router.post("/check", async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
} );

module.exports = router;