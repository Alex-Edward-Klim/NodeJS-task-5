const router = require('express').Router({ mergeParams: true });

const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.filter(elem => elem.boardId === req.params.boardId));
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getTaskById(req.params.taskId);
  if (!task) {
    return res
      .status(404)
      .send(`The task with the ID: ${req.params.taskId} was NOT found`);
  }
  return res.status(200).json(task);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createNewTask(req.params.boardId, req.body);
  res.status(200).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.updateTaskById(
    req.params.taskId,
    req.params.boardId,
    req.body
  );
  if (!task) {
    return res
      .status(404)
      .send(`The task with the ID: ${req.params.taskId} was NOT found`);
  }
  res.status(200).json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const task = await tasksService.deleteTaskById(req.params.taskId);
  if (!task) {
    return res
      .status(404)
      .send(`The task with the ID: ${req.params.taskId} was NOT found`);
  }
  res.status(200).json(task);
});

module.exports = { router };
