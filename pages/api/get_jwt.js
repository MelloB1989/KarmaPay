import jwt from 'jsonwebtoken';
import cookie from 'cookie';
require('dotenv').config();

function emailCheck(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export default function getJWT(req, res) {
    const { email, uid } = req.body;

    if(!emailCheck(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const token = jwt.sign({ email, uid }, process.env.JWT_KEY, {
        expiresIn: '5d',
    });
    res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 86400 * 5,
        path: '/',
    }));
    res.status(200).json({ token });
}