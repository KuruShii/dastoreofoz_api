const pool = require('./pool');

const getProducts = async(func) => {
    const client = await pool.connect();
    try {
        const products = await client.query('SELECT * FROM items');
        func(null, products.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const getProductsByCategories = async(category_id, func) => {
    const client = await pool.connect();
    try {
        const products = await client.query('SELECT * FROM item_categories AS pc, item AS p WHERE pc.category_id = $1 AND p.item_id = pc.item_id', [category_id]);
        func(null, products.rows);
    } catch (err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const getProductByID = async(item_id, func) => {
    const client = await pool.connect();
    try {
        const product = await client.query('SELECT * FROM items WHERE item_id = $1', [item_id]);
        func(null, product.rows[0])
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const getPopularProduct = async(func) => {
    const client = await pool.connect();
    try {
        const popular = await client.query('SELECT * FROM items ORDER BY sold DESC LIMIT 3');
        func(null, popular.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

module.exports = {
    getProducts,
    getProductsByCategories,
    getProductByID,
    getPopularProduct,
}