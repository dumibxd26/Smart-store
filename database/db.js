const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "dumi-199-secure",
    host: "localhost",
    port: 5432,
    database: "users_db"
});

module.exports = pool;