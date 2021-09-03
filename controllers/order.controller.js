const Razorpay = require('razorpay');
const shortid = require('shortid');

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});

const orders = async (req, res) => {
    const { cartTotal } = req.body;
    const payment_capture = 1;
    const amount = cartTotal;
    const currency = 'INR';

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: 'error occured',
            error: error
        });
    }
};

module.exports = {
    orders
};
