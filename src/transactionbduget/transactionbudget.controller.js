const express = require('express');
const router = express.Router();
const transactionBudgetService = require('./transactionbudget.service');


router.get('/:id', async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send(error.message);
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

module.exports = router;