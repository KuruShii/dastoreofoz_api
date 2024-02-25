const pool = require('./pool');

const checkout = async(user_id, func) => {
     const client = await pool.connect();
     try {
        let cart = await client.query('SELECT * FROM user_basket WHERE user_id = $1', [user_id]);
        cart = cart.rows;
        let nextOrder = await client.query('SELECT MAX(order_id) FROM user_orders');
        nextOrder = nextOrder.rows[0] || 0;
        for (let item of cart) {
            await client.query('INSERT INTO user_orders VALUES($1, $2, $3, $4)', [order_id, user_id, item.item_id, item.quantity]);
        }
        await client.query('DELETE FROM user_basket WHERE user_id = $1', [user_id])
        func(null, nextOrder);
     } catch(err) {
        console.log(err);
        func(err);
     } finally {
        client.release();
     }
}

module.exports = {
    checkout
}