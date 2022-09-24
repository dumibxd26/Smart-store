const express = require("express");
const router = express.Router();
const pool = require('../db');

// ROUTES //

const checkUserExistance = async email => {
    
    const user = await pool.query(
        `SELECT * FROM user_info WHERE email = $1`,
        [email])

        if(user)
            return user;
        
        return false;
}

router.post("/register", async (req, res) => {
    try {
        console.log(`Database register request from ${req.body.email} at ${new Date()}`);

        const { firstName, lastName,
                email, birthDate,
                password } = req.body;

        const checkUser = await checkUserExistance(email);

        if(checkUser.rows.length > 0)
            res.json("User already exists");
        else {
        const newUser = await pool.query(
            "INSERT INTO user_info (firstName, lastName, email, birthDate, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, lastName, email, birthDate, password]
        );      
        res.json(newUser.rows[0]);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.post("/login", async (req, res) => {
    try {
        console.log(`Database received login request from ${req.body.email} at ${new Date()}`);

        const { email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM user_info WHERE email = $1",
            [email]
        );

        if(user.rows.length === 0) {
            res.json("User does not exist");
        } else if (password === user.rows[0].password) {
            res.json("Login successful");
        } else {
            res.json("Login failed");
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.put("/update", async (req, res) => {
    try {

        console.log(`Database received update request from ${req.body.email} at ${new Date()}`);

        const { firstName, lastName,
                email, birthDate,
                password } = req.body;

        const checkUser = await checkUserExistance(email);

        if(checkUser.rows.length === 0) {
            res.json("User does not exist");
        } else {
            const updateUser = await pool.query(
                "UPDATE user_info SET firstName = $1, lastName = $2, email = $3, birthDate = $4, password = $5 WHERE email = $3 RETURNING *",
                [firstName, lastName, email, birthDate, password]
            );
            res.json("User was updated");
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.get("/getOne", async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await checkUserExistance(email);

        if(checkUser.rows.length === 0) {
            res.json("User does not exist");
        } else {
            const user = await pool.query(
                "SELECT * FROM user_info WHERE email = $1",
                [email]
                );

            res.json(user.rows[0].password);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});             

router.get("/all", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_info");
        res.json(allUsers.rows);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete", async (req, res) => {
    try {

        console.log(`Database received delete request from ${req.body.email} at ${new Date()}`);

        const { email } = req.body;

        const checkUser = await checkUserExistance(email);

        if(checkUser.rows.length === 0) {
            res.json("User does not exist");
        } else {
            const deleteUser = await pool.query(
                "DELETE FROM user_info WHERE email = $1",
                [email]
            );
            res.json("User was deleted!");
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;