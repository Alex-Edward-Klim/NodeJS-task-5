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

const MongooseBoard = mongoose.model('Board', customSchema);

const MongooseTask = require('../tasks/task.memory.repository').MongooseTask;

const getAll = async () => {
  return MongooseBoard.find()
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const getBoardById = async id => {
  return MongooseBoard.findById(id)
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const createNewBoard = async board => {
  const mongooseBoard = new MongooseBoard(board);
  return mongooseBoard.save();
};

const updateBoardById = async (id, requestBody) => {
  return MongooseBoard.findByIdAndUpdate(
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

const deleteBoardById = async id => {
  return new Promise(res => {
    MongooseBoard.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    ).exec((err, item) => {
      if (err) {
        res(err);
      } else if (!item) {
        res(null);
      } else {
        MongooseTask.deleteMany({ boardId: id }, error => {
          if (err) {
            res(error);
          } else {
            res(item.toObject());
          }
        });
      }
    });
  });
};

module.exports = {
  MongooseBoard,
  getAll,
  getBoardById,
  createNewBoard,
  updateBoardById,
  deleteBoardById
};
