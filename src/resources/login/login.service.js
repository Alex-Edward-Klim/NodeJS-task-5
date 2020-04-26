const jwt = require('jsonwebtoken');

const MongooseUser = require('../users/user.memory.repository').MongooseUser;

const findUserByLogin = async userLogin => {
  return MongooseUser.find({ login: userLogin })
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const authenticationMiddleware = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, err => {
      if (err) {
        return res.sendStatus(401);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { findUserByLogin, authenticationMiddleware };
