const jwt = require('jsonwebtoken');
const secretKey = 'SECRET_KEY'; // Replace with your actual secret key

const generateToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '24h' }); // Token valid for 1 hour
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
