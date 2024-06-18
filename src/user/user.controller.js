//controle http request dari client, validasi input dan memanggil layanan yan sesuai
//menentukan logika rute dan response yang sesuai
const userService = require('./user.service');
const transactionService = require('../transactions/transaction.service')
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  try { 
    const users = await userService.getAllUser();

    const responseData = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    }));

    res.status(200).send({ data: responseData });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).send({ message: 'Failed to fetch data' });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    const responseData = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      }
    };
    res.status(200).send({ data: responseData });
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    res.status(500).send({ message: 'Failed to fetch user data' });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userService.getUserByUsername(username);
    if (user) {
      const responseData = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        }
      };
      res.status(200).send({ data: responseData });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    res.status(500).send({ message: 'Failed to fetch user data' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = await userService.createUser(name, username, email, password);
    res.status(201).send({ data: { newUser }, message: "Success Create User" });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    res.status(200).send({ data: { deletedUser }, message: "Success Deleted User" });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(400).send({ message: error.message });
  }
});


module.exports = router;
