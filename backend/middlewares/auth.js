const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization failed' })
  }

  const token = authorization.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).send({ message: 'Authorization failed' })
  }
}

module.exports = {
  auth,
}
