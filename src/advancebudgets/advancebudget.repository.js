const pool = require('../db/db');

const findAllAdvanceBudget = async () => {
  const query = `SELECT * FROM adv_budget`;
  const { rows } = await pool.query(query);
  return rows;
};

const findAdvanceBudgetById = async (advbudgetId) => {
  const query = `SELECT * FROM adv_budget WHERE id = $1`;
  const values = [advbudgetId];
  const { rows } = await pool.query(query, values);
  return rows;
};

const findAdvanceBudgetByUserId = async (userId) => {
  const query = `SELECT * FROM adv_budget WHERE user_id = $1`;
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows;
};

const insertAdvanceBudget = async (budget) => {
  const query = `INSERT INTO adv_budget (date, total_budget, user_id, category_name, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [budget.date, budget.total_budget, budget.user_id, budget.category_name, budget.payment_method];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const editAdvanceBudget = async (advbudgetId, date, total_budget, user_id, category_name, payment_method) => {
  const query = `UPDATE adv_budget SET date = $1, total_budget = $2, user_id = $3, category_name = $4, payment_method = $5 WHERE id = $6 RETURNING *`;
  const values = [date, total_budget, user_id, category_name, payment_method, advbudgetId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteAdvanceBudget = async (advbudgetId) => {
  const query = `DELETE FROM adv_budget WHERE id = $1 RETURNING *`;
  const values = [advbudgetId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};



module.exports = {
  findAllAdvanceBudget,
  findAdvanceBudgetById,
  findAdvanceBudgetByUserId,
  insertAdvanceBudget,
  editAdvanceBudget,
  deleteAdvanceBudget,
  
};
