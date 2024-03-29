require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: true,
});

module.exports = pool;