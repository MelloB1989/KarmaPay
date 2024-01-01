import axios from 'axios';
import { parse } from 'graphql';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export default async function handler(req, res) {
    //Get auth cookie from request
    const { auth } = req.cookies;
    //Verify the auth cookie
    const d = jwt.verify(auth, process.env.JWT_KEY);

    if(!d) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    else {
        // Forward the request to the GraphQL endpoint
        const response = await axios.post(process.env.GRAPHQL_ENDPOINT, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.GRAPHQL_API_KEY,
            },
        });
        res.status(200).json(response.data);
    }
}