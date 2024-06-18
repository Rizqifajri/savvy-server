const express = require('express')
const router = express.Router()
const advanceBudgetService = require('../advancebudgets/advancebudget.service')
const transactionBudgetService = require('../transactionbduget/transactionbudget.service')
const userService = require('../user/user.service')

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUser();
    const advanceBudgets = await advanceBudgetService.getAllAdvanceBudget();

    const responseData = await Promise.all(users.map(async (user) => {
      const userAdvanceBudgets = advanceBudgets.filter(advBudget => advBudget.user_id === user.id);
      const budgetsWithTransactions = await Promise.all(userAdvanceBudgets.map(async (advBudget) => {
        const transactions = await transactionBudgetService.getTransactionsByBudgetId(advBudget.id);
        return { ...advBudget, transactions };
      }));
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        advanceBudget: budgetsWithTransactions
      };
    }));

    res.status(200).send({
      data: responseData
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const advanceBudget = await advanceBudgetService.getAdvanceBudgetByUserId(userId);
    if (!advanceBudget) {
      return res.status(404).json({ message: 'Advance budget not found for this user' });
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      advanceBudget: advanceBudget
    });
  } catch (error) {
    console.error('Error fetching user advance budget:', error);
    res.status(500).json({ message: `Failed to fetch user advance budget: ${error.message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAdvanceBudget = req.body
    const advancebudget = await advanceBudgetService.createAdvanceBudget(newAdvanceBudget)
    res.status(500).send({
      message: "Your budget is created successfully!",
      advancebudget: advancebudget
    })
  } catch (error) {
    res.status(400).send({
      message: "Failed to create",
      error: error.message
    });
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const advanceBudgetId = req.params.id
    const advanceBudget = await advanceBudgetService.deleteAdvanceBudget(advanceBudgetId)
    res.status(200).send({
      message: "Has been deleted!"
    })
  } catch (error) {
    res.status(400).send({
      message: "Failed to delete",
      error: error.message
    });
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const advanceBudgetId = req.params.id;
    const { date, total_budget, user_id, category_name, payment_method } = req.body;
    if (!date || !total_budget || !user_id || !category_name || !payment_method) {
      return res.status(400).send({
        message: "Missing required fields"
      });
    }
    const advanceBudget = await advanceBudgetService.editAdvanceBudgetById(advanceBudgetId, date, total_budget, user_id, category_name, payment_method);
    res.status(200).send({
      message: "Advance budget has been updated!",
      data: advanceBudget
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Failed to update data",
      error: error.message
    });
  }
});








module.exports = router