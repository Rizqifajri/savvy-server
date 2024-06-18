const transactionBudgetRepository = require('./transactionbudget.repository');

const getTransactionsByBudgetId = async (advBudgetId) => {
  const transaction = await transactionBudgetRepository.findTransactionsByBudgetId(advBudgetId);
  return transaction;
};

const createTransaction = async (transaction) => {
  const newTransaction = await transactionBudgetRepository.insertTransaction(transaction);
  return newTransaction;
};

const deleteTransactionBudgetById = async (transactionBudgetId) => {
  const transaction = await transactionBudgetRepository.deleteTransacitonBudget(transactionBudgetId)
  return transaction
}

module.exports = {
  getTransactionsByBudgetId,
  createTransaction,
  deleteTransactionBudgetById
};