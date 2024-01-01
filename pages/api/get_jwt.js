import jwt from 'jsonwebtoken';

export default function getJWT(req, res) {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.status(200).json({ token });
}