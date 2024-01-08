/**
 * AUTHOR: MelloB
 * 
 * @param {string} order_id
 * @param {string} payment_id
 * @param {string} signature
 * @param {string} RZKey
 * @description Verify Razorpay payment
 */
import VerifyPayment from "@/payment_page/lib/razorpay/verify_payment";

export default async function Verify(req, res){
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTIONS")
        return res.status(200).json({});
    else
        res.setHeader('Content-Type', 'application/json');

    if(req.method !== "POST")
        return res.status(400).json({error: "Invalid request"});
    if(!req.headers.authorization) return res.status(400).json({ error: 'Missing API Key' });

    const { order_id, payment_id, signature, RZKey } = req.body;
    const KPApiKey = req.headers.authorization.split(' ')[1];

    if(!order_id || !payment_id || !signature || !RZKey)
        return res.status(400).json({error: "Invalid request"});
    //Get ip address of the request
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    try{
        const r = await VerifyPayment(order_id, payment_id, signature, RZKey);
        let data = {};
        if(r){
            data = {
                "status": "success",
                "message": "Payment verified"
            }
        }
        else{
            data = {
                "status": "failed",
                "message": "Payment verification failed"
            }
        }
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}