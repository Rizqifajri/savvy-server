const express = require('express');
require('dotenv').config();
const logIn = require('./auth/login')

const app = express()
const port =  3000;

app.use(express.json());

app.get('/', (req, res)=> {
  res.send("Welcome to Savvy API")
})

const userController = require('./user/user.controller')
const transactionController = require("./transactions/transaction.controller");
const savingsController = require('./savings/saving.controller');
const advanceBudgetController = require('./advancebudgets/advancebudget.conrtoller')
const transactionBudgetController = require('./transactionbduget/transactionbudget.controller')
const { verifyIdToken } = require('./auth/middleware');

app.use('/auth', logIn)
app.use('/users', userController)
app.use('/transactions', transactionController )
app.use('/savings', savingsController)
app.use('/advance-budget', advanceBudgetController)
app.use('/transaction-budget', transactionBudgetController)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})