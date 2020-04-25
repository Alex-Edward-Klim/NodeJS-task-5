const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customSchema = new Schema(
  {
    _id: {
      type: String
    }
  },
  {
    strict: false,
    versionKey: false
  }
);

const MongooseUser = mongoose.model('User', customSchema);

const MongooseTask = require('../tasks/task.memory.repository').MongooseTask;

const getAll = async () => {
  return MongooseUser.find()
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const getUserById = async id => {
  return MongooseUser.findById(id)
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const createNewUser = async newUser => {
  const mongooseUser = new MongooseUser(newUser);
  return mongooseUser.save();
};

const updateUserById = async (id, requestBody) => {
  return MongooseUser.findByIdAndUpdate(
    id,
    requestBody,
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) {
        return err;
      }
      return doc;
    }
  );
};

const deleteUserById = async id => {
  return new Promise(res => {
    MongooseUser.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    ).exec((err, item) => {
      if (err) {
        res(err);
      } else if (!item) {
        res(null);
      } else {
        MongooseTask.updateMany({ userId: id }, { userId: null }, error => {
          if (err) {
            res(error);
          }
          res(item);
        });
      }
    });
  });
};

module.exports = {
  getAll,
  MongooseUser,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById
};
