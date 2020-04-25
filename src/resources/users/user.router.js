const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toGet));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .send(`The user with the ID: ${req.params.userId} was NOT found`);
  }
  res.status(200).json(User.toGet(user.toObject()));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createNewUser(req.body);
  res.status(200).json(user);
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.updateUserById(req.params.userId, req.body);
  if (!user) {
    return res
      .status(404)
      .send(`The user with the ID: ${req.params.userId} was NOT found`);
  }
  res.status(200).json(User.toGet(user.toObject()));
});

router.route('/:userId').delete(async (req, res) => {
  const user = await usersService.deleteUserById(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .send(`The user with the ID: ${req.params.userId} was NOT found`);
  }
  res.json(user);
});

module.exports = router;
