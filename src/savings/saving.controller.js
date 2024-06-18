const express = require('express')
const router = express.Router()
const userService = require('../user/user.service')
const savingService = require('../savings/saving.service')

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUser();
    const savings = await savingService.getAllSavings();
    const responseData = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      savings: savings.filter(saving => saving.user_id === user.id)
    }));

    res.status(200).send({
      data: responseData
    })

  } catch (error) {
    res.status(500).send({
      message: 'Failed to fetch users or savings'
    })
  }
})

router.get('/:id', async (req, res) => {
  const currentUser = req['currentUser']
  const userId = req.params.id
  try {
    const users = await userService.getAllUser()
    const savings = await savingService.getAllSavings()
    const responseData = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      savings: savings.filter(saving => saving.user_id === user.id)
    }))
    const savingData = responseData.filter(data => data.id == Number(userId))
    if (!savingData) {
      return res.status(404).send({ message: 'Saving data not found' })
    }
    res.status(200).send(savingData)
  } catch (error) {
    res.status(500).send({ message: `Failed to fetch saving data : ${error.message}` })
  }
})

router.post('/', async (req, res) => {
  try {
    const newSaving = req.body;
    const saving = await savingService.createSaving(newSaving)
    res.status(200).send({
      message: "saving successfully created!",
      saving: saving
    })

  } catch (error) {
    res.status(400).send({
      message: "Failed to create saving",
      error: error.message
    });
  }
}
)

router.delete('/:id', async (req, res) => {
  try {
    const savingId = req.params.id
    const saving = await savingService.deleteSaving(savingId)
    res.status(200).send({ message: 'Saving has been deleted' })
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete saving",
      error: error.message
    })
  }

})

router.patch('/:id', async (req, res) => {
  try {
    const savingId = req.params.id
    const savingData = req.body
    savingData.savingId = savingId
    const saving = await savingService.editSavingById(savingData)
    res.status(200).send({
      message: 'Saving data has been updated!',
      data: saving
    })
  } catch (error) {
    res.status(500).send({
      message: 'Failed to update saving data!',
      error: error.message
    })
  } 
})



module.exports = router