const pool = require('../db/db')


const insertTransaction = async (transaction) => {
  const query = `INSERT INTO transactionBudget (description, total_transaction, date, category_name, adv_budget_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [transaction.description, transaction.total_transaction, transaction.date, transaction.category_name, transaction.adv_budget_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findTransactionsByBudgetId = async (adv_budget_id) => {
  const query = `SELECT * FROM transactionBudget WHERE adv_budget_id = $1`;
  const values = [adv_budget_id];
  const { rows } = await pool.query(query, values);
  return rows;
};

const deleteTransacitonBudget = async (transactionBudgetId) => {
  const query = `DELETE FROM transactionBudget WHERE id = $1`
  const values = [transactionBudgetId]
  const {rows} = await pool.query(query, values)
  return rows
}

const editTransaction = async (transactionBudgetId, transaction) => {
  const query = `UPDATE transactionBudget SET description = $1, total_transaction = $2, date = $3, category_name = $4, adv_budget_id = $5 WHERE id = $6 RETURNING *`;
  const values = [transaction.description, transaction.total_transaction, transaction.date, transaction.category_name, transaction.adv_budget_id, transactionBudgetId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteTransacitonBudgetByUserId = async (userId) => {
  await pool.query(`DELETE FROM transaction_budget WHERE user_id = $1`, [userId])
}

module.exports = {
  findTransactionsByBudgetId,
  insertTransaction,
  editTransaction,
  deleteTransacitonBudget,
  deleteTransacitonBudgetByUserId
}