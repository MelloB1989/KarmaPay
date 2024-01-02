/**
 * API V1 KARMAPAY
 * AUTHOR: MELLOB
 * VERSION: 1.0.0
    @param {int} order_amt
    @param {string} order_currency
    @param {string} order_description
    @param {string} order_mode
*/
import redis from '@/lib/redis';
import decode from '@/lib/decode_kpapi';
import { uuid } from 'uuidv4';

export default async function createOrder(req, res) {

    const pushToRedis = async (oid, uid, email, order_amt, order_currency, order_description, order_mode) => {
        const client = await redis()
        await client.set(oid, JSON.stringify({
            uid,
            email,
            order_amt,
            order_currency,
            order_description,
            order_mode,
            order_status: 'PENDING',
            order_cid: ""
        }));
        client.disconnect();
    }
    
    if(req.method !== 'POST') return res.status(400).json({ error: 'Invalid request method' });
    if(!req.headers.authorization) return res.status(400).json({ error: 'Missing API Key' });

    const KPApiKey = req.headers.authorization.split(' ')[1];
    const { order_amt, order_currency, order_description, order_mode } = req.body;

    if(!order_amt || !order_currency || !order_description || !order_mode) return res.status(400).json({ error: 'Missing required fields' });
    if(order_amt < 1) return res.status(400).json({ error: 'Invalid order amount' });
    if(order_currency.length !== 3) return res.status(400).json({ error: 'Invalid order currency' });
    if(order_mode !== "RAZORPAY" && order_mode !== "PAYPAL" && order_mode !== "PHONEPE" && order_mode !== "UPI" && order_mode !== "STRIPE" && order_mode !== "CASHFREE" && order_mode !== "PAYTM") return res.status(400).json({ error: 'Unsupported order mode' });

    try{
        const uid = decode(KPApiKey).uid;
        const email = decode(KPApiKey).email;
        const oid = uuid();
        //Asynchronously push to Redis to avoid blocking the API and to speed up the response
        pushToRedis(oid, uid, email, order_amt, order_currency, order_description, order_mode);
        return res.status(200).json({ oid });
    } catch(error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid API Key' });
    }
}