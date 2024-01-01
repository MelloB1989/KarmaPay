import jwt from 'jsonwebtoken';
require('dotenv').config();

function emailCheck(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export default function createAPIKey(req, res) {
    const { email, uid, expiry } = req.body;

    if(!emailCheck(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const token = jwt.sign({ email, uid }, process.env.JWT_API_KEY, {
        expiresIn: expiry,
    });
    const base64Token = Buffer.from(token).toString('base64');
    const prefixedToken = 'karmapay_' + base64Token;

    res.status(200).json({ prefixedToken });
}