const Razorpay = require("razorpay");

const createOrder = async (key, secret, order_amt, order_id, order_description) => {
    var razorpay = new Razorpay({
        key_id: key,
        key_secret: secret,
      });
      const order = await razorpay.orders.create({
        "amount": order_amt+"00",
        "currency": "INR",
        "receipt": order_id,
        "notes": {
          "description": order_description
        }
        });
        return order;
}

module.exports = createOrder;