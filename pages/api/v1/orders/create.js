/**
 * API V1 KARMAPAY
 * AUTHOR: MELLOB
 * VERSION: 1.0.0
    @param {int} order_amt
    @param {string} order_currency
    @param {string} order_description
    @param {string} order_mode
    @param {string} webhook_url
    @param {string} redirect_url
*/
import redis from '@/lib/redis';
import decode from '@/lib/decode_kpapi';
import { uuid } from 'uuidv4';
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';

const graphqlclient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      "x-api-key": process.env.GRAPHQL_API_KEY,
    },
});

export default async function createOrder(req, res) {

    //Verify cors
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTIONS")
        return res.status(200).json({});
    else
        res.setHeader('Content-Type', 'application/json');

    const pushToRedis = async (oid, uid, email, order_amt, order_currency, order_description, order_mode, webhook_url, redirect_url, kpapi) => {
        //Get the API Key for the order mode
        const apis = await graphqlclient.request(querygen("listAPIKeys", {uid: uid}));
        const api = apis.listUserAPIKeys.items.map((key)=>{
            if(key.pgEnum === order_mode) return key;
        }).filter((key)=>{return key !== undefined})[0];
        //Push to Redis
        const client = await redis();
        await client.set(oid, JSON.stringify({
            uid,
            email,
            kpapi: kpapi,
            api_key: api.apiKey,
            order_amt,
            order_currency,
            order_description,
            order_mode,
            webhook_url,
            redirect_url,
            order_status: 'PENDING',
            order_cid: "",
            PGorder: {}
        }));
        client.disconnect();
    }
    
    if(req.method !== 'POST') return res.status(400).json({ error: 'Invalid request method' });
    if(!req.headers.authorization) return res.status(400).json({ error: 'Missing API Key' });

    const KPApiKey = req.headers.authorization.split(' ')[1];
    const { order_amt, order_currency, order_description, order_mode, webhook_url, redirect_url } = req.body;

    if(!order_amt || !order_currency || !order_description || !order_mode || !webhook_url || !redirect_url) return res.status(400).json({ error: 'Missing required fields' });
    if(order_amt < 1) return res.status(400).json({ error: 'Invalid order amount' });
    if(order_currency.length !== 3) return res.status(400).json({ error: 'Invalid order currency' });
    if(order_mode !== "RAZORPAY" && order_mode !== "PAYPAL" && order_mode !== "PHONEPE" && order_mode !== "UPI" && order_mode !== "STRIPE" && order_mode !== "CASHFREE" && order_mode !== "PAYTM") return res.status(400).json({ error: 'Unsupported order mode' });

    try{
        const uid = decode(KPApiKey).uid;
        const email = decode(KPApiKey).email;
        const oid = uuid();
        //Asynchronously push to Redis to avoid blocking the API and to speed up the response
        pushToRedis(oid, uid, email, order_amt, order_currency, order_description, order_mode, webhook_url, redirect_url, KPApiKey);
        return res.status(200).json({ oid });
    } catch(error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid API Key' });
    }
}