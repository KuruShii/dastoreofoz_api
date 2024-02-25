const order = require('../routes/orders');
const pool = require('./pool');

const getOrders = async(user_id, func) => {
    const client = await pool.connect();
    try {
        const orders = await client.query('SELECT order_id, user_id FROM user_orders GROUP BY order_id, user_id HAVING user_id = $1', [user_id]);
        func(null, orders.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const getOrder = async(user_id, order_id, func) => {
    const client = await pool.connect();
    try {
        const order = await client.query('SELECT * FROM user_orders AS uo, items WHERE uo.user_id = $1 AND uo.order_id = $2 AND uo.item_id = items.item_id', 
        [user_id, order_id, item_id]);
        func(null, order.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

module.exports = {
    getOrders,
    getOrder,
}