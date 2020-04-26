const bcrypt = require('bcrypt');

const usersRepo = require('./user.memory.repository');

const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createNewUser = async newUser => {
  const user = new User(newUser);
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const hashedUser = Object.assign(user, { password: hashedPassword });
  return usersRepo.createNewUser(User.toSend(hashedUser)).then(() => {
    return User.toResponse(hashedUser);
  });
};

const updateUserById = async (id, requestBody) => {
  return usersRepo.updateUserById(id, requestBody);
};

const deleteUserById = async id => {
  const user = await usersRepo.deleteUserById(id);
  if (!user) {
    return null;
  }
  return User.toGet(user.toObject());
};

module.exports = {
  getAll,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
};
