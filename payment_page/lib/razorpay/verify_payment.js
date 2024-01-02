const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");

const VerifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature, secret) => {
    let validity = false;
    try{
        const validity = await validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, secret);
        validity = true;
    } catch(e){
        console.log(e);
    }
    return validity;
}

module.exports = VerifyPayment;