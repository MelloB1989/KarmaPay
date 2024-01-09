/**
 * AUTHOR: MelloB
 * 
 * @param {string} order_id
 * @param {string} payment_id
 * @param {string} signature
 * @param {string} RZKey
 * @description Verify Razorpay payment
 */
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import redis from '@/lib/redis';
import querygen from '@querygen';
import dotenv from 'dotenv';
dotenv.config();
import { GraphQLClient } from 'graphql-request';

const graphqlclient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      "x-api-key": process.env.GRAPHQL_API_KEY,
    },
});

export default async function Verify(req, res){

    const pushToDB = async(oid, cid) => {
        const client = await redis();
        let orderDetails = await client.get(oid);
        orderDetails = JSON.parse(orderDetails);
        await client.del(oid);
        await graphqlclient.request(querygen("createOrder", {
            orderAmt: parseInt(orderDetails.order_amt, 10),
            orderCid: cid,
            orderCurrency: orderDetails.order_currency,
            orderDescription: orderDetails.order_description,
            orderID: oid,
            orderStatus: "SUCCESS",
            orderTimestamp: orderDetails.timestamp,
            orderUpiTrnx: "",
            uid: orderDetails.uid
        }));
        client.disconnect();
    }

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

    const { order_id, payment_id, signature, RZKey, oid, cid } = req.body;
    const KPApiKey = req.headers.authorization.split(' ')[1];

    if(!order_id || !payment_id || !signature || !RZKey || !oid)
        return res.status(400).json({error: "Invalid request"});
    //Get ip address of the request
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    try{
        const r = await validatePaymentVerification({"order_id": order_id, "payment_id": payment_id}, signature, RZKey);
        let data = {};
        if(!r){
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
        pushToDB(oid, cid);
        res.status(200).json({ data, v: r });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}