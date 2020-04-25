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

const MongooseTask = mongoose.model('Task', customSchema);

const getAll = async () => {
  return MongooseTask.find()
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const getTaskById = async id => {
  return MongooseTask.findById(id)
    .lean()
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
};

const createNewTask = async task => {
  const mongooseTask = new MongooseTask(task);
  return mongooseTask.save();
};

const updateTaskById = async (taskId, boardId, requestBody) => {
  return MongooseTask.find()
    .lean()
    .exec()
    .then(data => {
      const task = data.find(
        elem => elem._id === taskId && elem.boardId === boardId
      );
      if (!task) {
        return null;
      }
      return MongooseTask.findByIdAndUpdate(
        taskId,
        requestBody,
        { new: true, useFindAndModify: false },
        (err, doc) => {
          if (err) {
            return err;
          }
          if (!doc) {
            return null;
          }
          return doc;
        }
      );
    })
    .catch(err => {
      return err;
    });
};

const deleteTaskById = async id => {
  return MongooseTask.findOneAndRemove({ _id: id }, { useFindAndModify: false })
    .exec()
    .then(data => {
      return data;
    });
};

module.exports = {
  MongooseTask,
  getAll,
  createNewTask,
  getTaskById,
  updateTaskById,
  deleteTaskById
};
