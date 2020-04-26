const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const userArr = await loginService.findUserByLogin(req.body.login);
  const user = userArr[0];
  if (!user) {
    return res.sendStatus(403);
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const payload = {
        userId: user._id,
        login: user.login
      };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      res.status(200).json({ token: accessToken });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
