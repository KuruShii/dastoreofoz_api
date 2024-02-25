const pool = require('./pool');

const getCart = async(user_id, func) => {
    const client = await pool.connect()
    try {
        const cart = await client.query('SELECT * FROM user_basket WHERE user_id = $1', [user_id]);
        func(null, cart.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const addToCart = async(user_id, item_id, quantity, func) => {
    const client = await pool.connect();
    try {
        const newCart = await client.query('INSERT INTO user_basket VALUES ($1, $2, $3)', [user_id, item_id, quantity]);
        func(null, newCart.rows);
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

const updateCart = async(user_id, item_id, quantity, func) => {
    const client = await pool.connect();
    try {
        let cart = await client.quantity('SELECT * FROM user_basket WHERE user_id = $1', [user_id]);
        cart = cart.rows;
        cart.forEach(async(item) => {
            if (item.item_id == item_id) {
                if (quantity <= 0) {
                    let newCart = await client.query('DELETE FROM user_basket WHERE user_id = $1 AND item_id = $2', [user_id, item_id]);
                    func(null, newCart.rows);
                } else if (quantity > 0) {
                    let newCart = await client.query('UPDATE user_basket SET quantity = $1 WHERE user_id = $2 AND item_id = $3', [quantity, user_id, item_id]);
                    func(null, newCart.rows);
                }
            }
        })
    } catch(err) {
        console.log(err);
        func(err);
    } finally {
        client.release();
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCart
}