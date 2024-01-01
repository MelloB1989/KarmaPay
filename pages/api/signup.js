import querygen from '@querygen';
require('dotenv').config();
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      "x-api-key": process.env.GRAPHQL_API_KEY,
    },
});

export default async function signup(req, res) {
    const { email, uid } = req.body;
    const mutation = querygen("createUser", {email: email, uid: uid});
    const data = await client.request(mutation);
    res.status(200).json({ data });
}