const express = require('express');
const router = express.Router();
const transactionBudgetService = require('./transactionbudget.service');
const advanceBudgetService = require('../advancebudgets/advancebudget.service')


router.get('/:id', async (req, res) => {
  try {
    const advBudgetId = req.params.id;
    const transactions = await transactionBudgetService.getTransactionsByBudgetId(advBudgetId);
    res.status(200).send(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to retrieve transactions", error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const { description, total_transaction, date, category_name, adv_budget_id } = req.body;
    if (!description || !total_transaction || !date || !category_name || !adv_budget_id) {
      return res.status(400).send("All fields are required.");
    }
    const newTransaction = await transactionBudgetService.createTransaction({
      description,
      total_transaction,
      date,
      category_name,
      adv_budget_id
    });

    res.status(201).send({
      message: "Succes add transaction",
      data: newTransaction
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transactionBudgetId = req.params.id
    const transacitonBudget = await transactionBudgetService.deleteTransactionBudgetById(transactionBudgetId)
    res.status(200).send({ message: "Transaction has been deleted!" })
  } catch (error) {
    res.status(400).send({
      message: "Failed to delete transaction",
      error: error.message
    });
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const transactionBudgetId = req.params.id;
    const transaction = req.body;
    if (!transaction.description || !transaction.total_transaction || !transaction.date || !transaction.category_name || !transaction.adv_budget_id) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const updatedTransaction = await transactionBudgetService.editTransactionBudgetById(transactionBudgetId, transaction);
    res.status(200).send({
      message: "Transaction has been updated!",
      data: updatedTransaction
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "Failed to update transaction",
      error: error.message
    });
  }
});

module.exports = router;