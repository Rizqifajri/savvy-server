const advBudgetRepository = require('../advancebudgets/advancebudget.repository');

const getAllAdvanceBudget = async () => {
  const advanceBudgets = await advBudgetRepository.findAllAdvanceBudget();
  return advanceBudgets;
};

const getAdvanceBudgetById = async (advBudgetId) => {
  const advanceBudget = await advBudgetRepository.findAdvanceBudgetById(advBudgetId);
  return advanceBudget;
};

const getAdvanceBudgetByUserId = async (userId) => {
  const advanceBudgets = await advBudgetRepository.findAdvanceBudgetByUserId(userId);
  return advanceBudgets;
};

const createAdvanceBudget = async (budget) => {
  const newAdvanceBudget = await advBudgetRepository.insertAdvanceBudget(budget);
  return newAdvanceBudget;
};

const editAdvanceBudgetById = async (advBudgetId, date, total_budget, user_id, category_name, payment_method) => {
  const updatedAdvanceBudget = await advBudgetRepository.editAdvanceBudget(advBudgetId, date, total_budget, user_id, category_name, payment_method);
  return updatedAdvanceBudget;
};

const deleteAdvanceBudget = async (advBudgetId) => {
  const deletedAdvanceBudget = await advBudgetRepository.deleteAdvanceBudget(advBudgetId);
  return deletedAdvanceBudget;
};

module.exports = {
  getAllAdvanceBudget,
  getAdvanceBudgetById,
  getAdvanceBudgetByUserId,
  createAdvanceBudget,
  editAdvanceBudgetById,
  deleteAdvanceBudget
};
