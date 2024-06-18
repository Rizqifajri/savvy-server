//repository berinteraksi lgsg dengan db
const pool = require('../db/db');
const bcrypt = require('bcrypt');

const findAllUser = async () => {
  const { rows } = await pool.query('SELECT * FROM Users');
  return rows;
}

const findUserById = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM Users where id = $1', [userId])
  return rows[0];

}

const findUserByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM Users WHERE username = $1', [username])
  return rows[0];
}


const insertUser = async (name, username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO Users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING * `;
  const values = [name, username, email, hashedPassword]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

const deleteUser = async (userId) => {
  await pool.query(`DELETE FROM Users WHERE id=$1`, [userId])
}

const findUserTransactions = async (userId) => {
  const query = `SELECT id, type, payment_method, total_transaction, date FROM transactions WHERE user_id = $1;
  `
  const { rows } = await pool.query(query, [userId])
  return rows
}


module.exports = { findAllUser, findUserById, findUserByUsername, findUserTransactions, insertUser, deleteUser };
