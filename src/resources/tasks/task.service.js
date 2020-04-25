const tasksRepo = require('./task.memory.repository');

const Task = require('./task.model');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  if (tasks) {
    return tasks.map(Task.toGet);
  }
};

const getTaskById = async id => {
  const task = await tasksRepo.getTaskById(id);
  if (task) {
    return Task.toGet(task);
  }
  return null;
};

const createNewTask = async (boardId, requestBody) => {
  const task = Object.assign(new Task(requestBody), {
    boardId
  });

  return tasksRepo.createNewTask(Task.toSend(task)).then(() => {
    return task;
  });
};

const updateTaskById = async (taskId, boardId, requestBody) => {
  const task = await tasksRepo.updateTaskById(taskId, boardId, requestBody);
  if (!task) {
    return null;
  }
  return Task.toGet(task.toObject());
};

const deleteTaskById = async id => {
  const task = await tasksRepo.deleteTaskById(id);
  if (!task) {
    return null;
  }
  return Task.toGet(task.toObject());
};

module.exports = {
  getAll,
  createNewTask,
  getTaskById,
  updateTaskById,
  deleteTaskById
};
