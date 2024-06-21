
const savingRepository = require('../savings/saving.repository')
const userRepository = require('../user/user.repository')
const userService = require('../user/user.service')

const getAllSavings = async ()=> {
  const savings = await savingRepository.findAllSavings()
  return savings
}

const getSavingById = async (savingId) => {
  const saving = await savingRepository.findSavingsById(savingId)
  if(!saving){
    throw new Error('Saving not found')
  }
  return saving
}


const createSaving = async (newSaving) => {
    const userId = newSaving.user_id;
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const saving = await savingRepository.insertSaving({
      date: newSaving.date,
      saving_method: newSaving.saving_method,
      total_saving: newSaving.total_saving,
      user_id: newSaving.user_id,
      category_name: newSaving.category_name,
      start_date: newSaving.start_date,
      end_date: newSaving.end_date,
      saving_frequency: newSaving.saving_frequency,
      nominal: newSaving.nominal
    });
    return saving;
 
};

const deleteSaving = async (savingId) => {
  const saving = await savingRepository.deleteSaving(savingId)
  return saving
}

const editSavingById = async (dataSaving) => {
  const {savingId, user_id} = dataSaving
  const user = await userService.getUserById(user_id)
  if(!user){
    throw new Error('user not found')
  }
  const saving = await savingRepository.editSaving(dataSaving)
  return saving
}



module.exports = {
  getAllSavings,
  getSavingById,
  createSaving,
  editSavingById,
  deleteSaving

}