//transaction.service.js

const transactionRepository = require('./transaction.repository');
const userService = require('../user/user.service')

const getAllTransaction = async () => {
  const transactions = await transactionRepository.findAllTransaction();
  return transactions || [];
};


const getTransactionById = async (transactionId) => {
  const transaction = await transactionRepository.findTransactionById(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};

const createTransaction = async (newTransaction) => {
  const userId = newTransaction.user_id
  const user = await userService.getUserById(userId)
  if (!user) {
    throw new Error('User not Found')
  }
  const transaction = await transactionRepository.insertTransaction(
    newTransaction.type,
    newTransaction.payment_method,
    newTransaction.total_transaction,
    newTransaction.date,
    newTransaction.user_id,
    newTransaction.description,
    newTransaction.category_name
  )
  return transaction

}

const deleteTransaction = async (transactionId) => {
  const transaction = await transactionRepository.deleteTransaction(transactionId)
  return transaction
}

const deleteTransactionByUserId = async (userId) => {
  const transaction = await transactionRepository.deleteTransactionByUserId(userId)
  return transaction
}

const editTransactionById = async (dataTransaction) => {
  const { transactionId, user_id } = dataTransaction;
  const user = await userService.getUserById(user_id);
  if (!user) {
    throw new Error('User Not Found');
  }
  const transaction = await transactionRepository.editTransaction(dataTransaction);
  return transaction;
};



module.exports = { getAllTransaction, getTransactionById, createTransaction, deleteTransaction, editTransactionById, deleteTransactionByUserId };
