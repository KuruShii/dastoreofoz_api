const express = require('express');
const validator = require('validator');

const checkout = express.Router();
const checkoutDB = require('../db/checkoutDB');

const ensureAuthenticated = require('./ensureAuthenticated');

checkout.post('/', ensureAuthenticated, (req, res) => {
    const { user_id } = req.user;
    checkoutDB.checkout(user_id, (err, result) => {
        if (err) return res.status(500).json(err);

        res.redirect('/orders');
    })
})

module.exports = checkout;