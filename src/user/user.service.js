//logic bisnis atau aturan pakai aplikasi nya.
//menentukan operasi CRUD entitas user

const userRepository = require('./user.repository')
const { generateToken } = require("../jwt")

const getAllUser = async () => {
  const users = await userRepository.findAllUser()
  if (!users) {
    throw Error('User Not Found')
  }
  return users
}

const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId)
  if (!user) {
    throw Error('User Not Found')
  }
  return user;
}

const getUserByUsername = async (username) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};




const createUser = async (name, username, email, password) => {
  const existingUser = await userRepository.findUserByUsername(username)
  if (existingUser) {
    throw Error("Username is already exsits!")
  }
  const newUser = await userRepository.insertUser(name, username, email, password)
  console.log(newUser)
  return {user : newUser};
}

const deleteUser = async (userId) => {
  const user = await userRepository.deleteUser(userId)
  return user;
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByUsername,
  createUser,
  deleteUser
}