const { decode } = require("jsonwebtoken");

const verifyIdToken = async (req, res, next) => {
  try {
    // const nonSecurePaths = ['/'];

    // if (nonSecurePaths.includes(req.path)) return next()

    if (!req.headers.authorization) {
      throw new Error('Unauthorized')
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = decode(idToken);
    req['currentUser'] = decodedToken;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = { verifyIdToken }
