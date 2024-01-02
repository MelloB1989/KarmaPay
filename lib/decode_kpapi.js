/**
 * @param {string} kp - The KarmaPay API Key
 * @returns {object} - The decoded cookie
 */

const jwt = require('jsonwebtoken');
const decode = (kp) => {
    const base = kp.substring(3);
    const token = Buffer.from(base, 'base64').toString('ascii');
    const decoded = jwt.decode(token);
    return decoded;
}

module.exports = decode;