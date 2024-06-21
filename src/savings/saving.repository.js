const pool = require('../db/db')


const findAllSavings = async () => {
  const query = `SELECT * FROM savings`
  const {rows} = await pool.query(query)
  return rows
}

const findSavingsById = async (savingsId) => {
  const query = `SELECT * FROM savings WHERE id = $1`
  const {rows} = await pool.query(query, [savingsId])
  return rows
}

const findSavingsByUserId = async (userId)=> {
  const query = `SELECT * FROM savings WHERE user_id = $1`
  const {rows} = await pool.query(query, [userId])
  return rows
}

const insertSaving = async (dataSaving) => {
  const {date, saving_method, total_saving, user_id, category_name, start_date, end_date, saving_frequency, nominal} = dataSaving;
  const query = `INSERT INTO savings (date, saving_method, total_saving, user_id, category_name, start_date, end_date, saving_frequency, nominal)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
  const values = [date, saving_method, total_saving, user_id, category_name, start_date, end_date, saving_frequency, nominal]
  const {rows} = await pool.query(query, values)
  return rows
}

const deleteSaving = async (savingId) => {
  await pool.query (`DELETE FROM savings WHERE id = $1`, [savingId])

}

const editSaving = async (dataSaving) => {
  const {savingId, date, saving_method, total_saving, user_id, category_name, start_date, end_date, saving_frequency, nominal} = dataSaving;
  const query = `
  UPDATE savings 
  SET date = $1, saving_method = $2, total_saving = $3, user_id = $4, category_name = $5, start_date = $6, end_date = $7, 
  saving_frequency = $8, nominal= $9
  WHERE id = $10
  RETURNING *`
  const values = [date, saving_method, total_saving, user_id, category_name, start_date, end_date, saving_frequency, savingId]
  const {rows} = await pool.query(query, values)
  return rows
}


module.exports = {
  findAllSavings,
  findSavingsById,
  findSavingsByUserId,
  insertSaving,
  editSaving,
  deleteSaving
}