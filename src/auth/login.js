const express = require('express')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const router = express.Router()
const SECRET_KEY = "TEST"
const userService = require('../user/user.service')

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.getUserByUsername(username)
    const passValid = await bcrypt.compare(password, user.password)
    if (!passValid) {
      throw new Error("Password not Valid")
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

router.post('/register', async (req, res)=> {
    
})

module.exports = router

