//transaction.repository.js
const pool = require('../db/db');

const findAllTransaction = async () => {
  const query = `SELECT * FROM Transactions`
  const { rows } = await pool.query(query)
  return rows;
}

const findTransactionById = async (transactionId) => {
  try {
    const query = 'SELECT * FROM Transactions WHERE id = $1';
    const values = [transactionId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find transaction by ID');
  }
};

const findTransactionsByUserId = async (userId) => {
  try {
    const query = 'SELECT * FROM Transactions WHERE user_id = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw new Error('Failed to find transactions by user ID');
  }
};

const insertTransaction = async (type, payment_method, total_transaction, transaction_date, user_id, description, category_name) => {
  const query = `INSERT INTO Transactions (type, payment_method, total_transaction, date, user_id, description, category_name)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [type, payment_method, total_transaction, transaction_date, user_id, description, category_name];
  const { rows } = await pool.query(query, values);
  return rows;
};

const editTransaction = async (dataTransaction) => {
  const { transactionId, type, payment_method, total_transaction, date, user_id, description, category_name } = dataTransaction;
  const query = `
    UPDATE Transactions 
    SET type = $1, payment_method = $2, total_transaction = $3, date = $4, user_id = $5, description = $6, category_name = $7 
    WHERE id = $8 
    RETURNING *`;
  const values = [type, payment_method, total_transaction, date, user_id, description, category_name, transactionId];
  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new Error('Transaction Not Found');
  }
  return rows[0];
};

const deleteTransaction = async (transactionId) => {
  await pool.query(`DELETE FROM Transactions WHERE id = $1`, [transactionId])
}

module.exports = {
  findAllTransaction,
  findTransactionById,
  findTransactionsByUserId,
  insertTransaction,
  editTransaction,
  deleteTransaction
}