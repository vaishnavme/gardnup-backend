const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require('./db/db.connect');

const productRouter = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const cartRoute = require('./routes/cart.route');
const wishlistRoute = require('./routes/wishlist.route');

const errorHandler = require('./middleware/errorHandler');
const routeHandler = require('./middleware/routeHandler');

dbConnection();

app.use('/products', productRouter);
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.use('/wishlist', wishlistRoute);

app.get('/', (req, res) => {
    res.send('Cultive ecom app api..');
});

//middleware
app.use(routeHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
});
