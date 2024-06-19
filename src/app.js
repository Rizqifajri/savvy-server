const express = require('express');
const cors = require('cors')
require('dotenv').config();
const logIn = require('./auth/login')

const app = express()
const port =  3000;

app.use(express.json());
app.use(cors());


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

function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})