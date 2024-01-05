/**
 * API V1 KARMAPAY
 * AUTHOR: MELLOB
 * VERSION: 1.0.0
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} email
 * @param {string} phone
 * @param {string} uid
 * @param {string} KPApiKey
 */

import querygen from '@querygen';
require('dotenv').config();
import cookie from 'cookie';
import decode from '@/lib/decode_kpapi';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      "x-api-key": process.env.GRAPHQL_API_KEY,
    },
});

export default async function handler(req, res) {

    //Verify cors
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

    const { first_name, last_name, email, phone, uid } = req.body;
    const KPApiKey = req.headers.authorization.split(' ')[1];

    if(!first_name || !last_name || !email || !phone || !uid)
        return res.status(400).json({error: "Invalid request"});
    //Get ip address of the request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    try{
        const uid = decode(KPApiKey).uid;
        const mutation = querygen("createCustomer", {email: email, ip: ip, location: "NA", name: first_name + " " + last_name, phone: phone, uid: uid});
        const data = await client.request(mutation);
        res.setHeader('Set-Cookie', [
            cookie.serialize('customer_id', data.createCustomer.cid, {
                httpOnly: true,
                secure: true,
                maxAge: 86400 * 30,
                path: '/'
            }),
            cookie.serialize('customer_email', email, {
                httpOnly: true,
                secure: true,
                maxAge: 86400 * 30,
                path: '/'
            }),
            cookie.serialize('customer_name', first_name + " " + last_name, {
                httpOnly: true,
                secure: true,
                maxAge: 86400 * 30,
                path: '/'
            }),
            cookie.serialize('customer_phone', phone, {
                httpOnly: true,
                secure: true,
                maxAge: 86400 * 30,
                path: '/'
            })
        ]);
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}