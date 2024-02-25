const express = require('express');
const validator = require('validator');

const cart = express.Router();
const cartDB = require('../db/cartDB');

const ensureAuthenticated = require('./ensureAuthenticated');

cart.get('/', ensureAuthenticated, (req, res) => {
    const user_id = req.user?.user_id;
    cartDB.getCart(user_id, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    })
})

cart.post('/', ensureAuthenticated, (req, res) => {
    const user_id = req.user?.user_id;
    const { item_id, quantity } = req.body;
    cartDB.addToCart(user_id, item_id, quantity, (err, result) => {
        if (err) return res.status(500).json(err);

        return res.redirect('/cart');
    })
})

cart.put('/', ensureAuthenticated, (req, res) => {
    const user_id = req.user?.user_id;
    const { item_id, quantity } = req.body;
    cartDB.updateCart(user_id, item_id, quantity, (err, result) => {
        if (err) return res.status(500).json(err);

        return res.redirect('/cart');
    })
})

module.exports = cart;