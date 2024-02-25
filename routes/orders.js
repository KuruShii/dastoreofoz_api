const express = require('express');
const validator = require('validator');

const order = express.Router();
const orderDB = require('../db/ordersDB');

const ensureAuthenticated = require('./ensureAuthenticated');

order.get('/', ensureAuthenticated, (req, res) => {
    const { user_id } = req.user;
    orderDB.getOrders(user_id, (err, orders) => {
        if (err) return res.status(500).json(err);

        res.json(orders);
    })
})

order.get('/:id', ensureAuthenticated, (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    orderDB.getOrder(user_id, id, (err, order) => {
        if (err) return res.status(500).json(err);

        res.json(order);
    })
})

module.exports = order