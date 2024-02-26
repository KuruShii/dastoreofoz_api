require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: true
});

const createUser = async(userInfo, func) => {
    const client = await pool.connect();
    try {
        const response = await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', 
        [userInfo.username, userInfo.password, userInfo.email]);
        func(null, response.rows[0]);
    } catch(err) {
        console.log(err);
        func(err)
    } finally {
        client.release();
    }
}

const getUserById = async(userID, func) => {
    const client = await pool.connect();
    try {
        const user = await client.query('SELECT * FROM users WHERE user_id = $1', [userID]);
        func(null, user.rows[0]);
    } catch (err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const getUserByUsername = async(username, func) => {
    const client = await pool.connect();
    try {
        const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        func(null, user.rows[0]);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const updateUser = async(newInfo, func) => {
    const client = await pool.connect();
    try {
        const new_Info = await client.query('UPDATE users SET username = $1, password = $2, email = $3, delivery_id = $4, billing_id = $5 WHERE user_id = $6 RETURNING *',
        [newInfo.username, newInfo.password, newInfo.email, newInfo.delivery_id, newInfo.billing_id, newInfo.user_id]);
        func(null, new_Info.rows[0]);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
}