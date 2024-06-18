//transaction.controller.js
const transactionService = require('./transaction.service');
const userService = require('../user/user.service')
const express = require('express');
const { verifyIdToken } = require('../auth/middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUser();
    const transactions = await transactionService.getAllTransaction();
    const responseData = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      transactions: transactions.filter(transaction => transaction.user_id === user.id)
    }));

    res.status(200).send({ data: responseData });
  } catch (error) {
    console.error('Failed to fetch users or transactions:', error);
    res.status(500).send({ message: 'Failed to fetch users or transactions' });
  }
})

router.get('/:id', verifyIdToken, async (req, res) => {
  const currentUser = req["currentUser"]
  console.log(currentUser)
  const userId = req.params.id
  try {
    const users = await userService.getAllUser();
    const transactions = await transactionService.getAllTransaction();
    const responseData = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      transactions: transactions.filter(transaction => transaction.user_id === user.id)
    }));
    const transactionData = responseData.filter(data => data.id == Number(userId))
    if (!transactionData) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send(transactionData);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).send({ message: `Failed to fetch transaction: ${error.message}` });
  }
});


router.post('/', async (req, res) => {
  try {
    const newTransaction = req.body;
    const transaction = await transactionService.createTransaction(newTransaction);
    res.status(200).send({
      message: "Transaction created successfully",
      transaction: transaction
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create transaction",
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transactionId = req.params.id
    const transaction = await transactionService.deleteTransaction(transactionId)
    res.status(200).send({ message: "Transaction has been deleted" }
    )
  } catch (error) {
    res.status(400).send({
      message: "Failed to delete transaction",
      error: error.message
    });
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transactionData = req.body;
    transactionData.transactionId = transactionId;
    const transaction = await transactionService.editTransactionById(transactionData);
    res.status(200).send({
      message: "Transaction has been updated!",
      data: transaction
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to update transaction",
      error: error.message
    });
  }
});






module.exports = router;
