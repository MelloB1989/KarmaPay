/**
 * @authorization {KPApiKey}
 * @param {order_id} req 
 * @param {*} res 
 */
import querygen from '@querygen';
import { GraphQLClient } from 'graphql-request';
import decode from '@/lib/decode_kpapi';
import dotenv from 'dotenv';
dotenv.config();

const graphqlclient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      "x-api-key": process.env.GRAPHQL_API_KEY,
    },
});

export default async function Describe(req, res){
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTIONS")
        return res.status(200).json({});
    else
        res.setHeader('Content-Type', 'application/json');

    if(!req.headers.authorization) return res.status(400).json({ error: 'Missing API Key' });
    const KPApiKey = req.headers.authorization.split(' ')[1];
    const decoded = decode(KPApiKey);

    if(!req.body.order_id) return res.status(400).json({error: "Invalid request"});
    const { order_id } = req.body;
    const data = await graphqlclient.request(querygen("getOrder", {order_id: order_id, uid: decoded.uid}));
    
    return res.status(200).json({data: data.getOrder});
}