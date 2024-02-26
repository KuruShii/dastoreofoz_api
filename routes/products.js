const express = require('express')
const validator = require('validator');

const products = express.Router();
const productDB = require('../db/productDB');

products.get('/',  (req, res) => {
    productDB.getProducts((err, result) => {
        if (err) return res.status(500).json(err);

        return res.json(result);
    })
})

products.get('/:category', (req, res) => {
    let { category } = req.params;
    category = validator.escape(category);

    productDB.getProductsByCategories(category, (err, result) => {
        if (err) return res.status(500).json(err);

        return res.json(result);
    })
})

products.get('/:id', (req, res) => {
    let { id } = req.params;
    id = validator.escape(id);
    productDB.getProductByID(id, (err, result) => {
        if (err) return res.status(500).json(err);

        if (!result) return res.sendStatus(404);

        res.json(result);
    })
})

products.get('/popular', (req, res) => {
    productDB.getPopularProduct((err, products) => {
        if (err) return res.status(500).json(err);

        res.json(products);
    })
})


module.exports = products;