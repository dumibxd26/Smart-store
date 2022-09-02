const express = require("express");
const router = express.Router();
const pool = require('../db');

// ROUTES //

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name,
                email, birth_date,
                password } = req.body;
        
        const newUser = await pool.query(
            "INSERT INTO user_info (first_name, last_name, email, birth_date, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, birth_date, password]
        );      

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM user_info WHERE email = $1",
            [email]
        );

        if (password === user.rows[0].password) {
            res.json("Login successful");
        } else {
            res.json("Login failed");
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/all", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_info");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { email } = req.body;
        const deleteUser = await pool.query(
            "DELETE FROM user_info WHERE email = $1",
            [email]
        );
        res.json("User was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;