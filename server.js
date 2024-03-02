const express = require('express');
const helmet = require('helmet');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.use(helmet());

const loginRouter = require('./routes/login');
app.use(loginRouter);

const productRouter = require('./routes/products');
app.use('/products', productRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

const orderRouter = require('./routes/orders');
app.use('/orders', orderRouter);

const checkoutRouter = require('./routes/checkout');
app.use('/checkout', checkoutRouter);


const options = require('./swagger');
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));


app.listen(port, () => {
    console.log('It\'s your host at radio', port);
})