const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');

const user = express.Router();
const userDB = require('../db/userDB');

const ensureAuthenticated = require('./ensureAuthenticated');

user.get('/', ensureAuthenticated, (req, res) => {
    let { user_id } = req.user;
    
    userDB.getUserById(user_id, (err, user) => {
        if (err) return res.status(500).json(err);

        if (!user) return res.sendStatus(404);

        res.send(user)
    })
})

user.put('/', ensureAuthenticated, async (req, res) => {
    let { user_id } = req.user;

    let username = req.body.username || req.user.username;
    let email = req.body.email || req.user.email;
    let delivery_id = req.body.delivery_id || req.user.delivery_id;
    let billing_id = req.body.billing_id || req.user.billing_id;

    let { oldPassword, password } = req.body;


    userDB.getUserById(user_id, async(err, user) => {
        if (err) return res.status(500).json(err);

        if (await bcrypt.compare(oldPassword, user.password) && validator.isEmail(email)) {
            try {
                username = validator.escape(username);
                email = validator.escape(email);
            } catch(err) {}

            password = password || oldPassword;
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const new_Info = {
                user_id,
                username,
                password: hashedPassword,
                email,
                delivery_id,
                billing_id,
            }
    
            userDB.updateUser(new_Info, (err, result) => {
                if (err) return res.status(500).json(err);
    
                if (!result) return res.sendStatus(400);
    
                res.redirect('/user'); 
            })
        } else if (!validator.isEmail(email)) {
            return res.status(400).send('Invalid email')
        } else {
            return res.status(400).send('Invalid password');
        }
    })
  
})

module.exports = user;