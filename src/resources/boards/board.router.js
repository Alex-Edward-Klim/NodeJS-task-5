const router = require('express').Router();

const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const data = await boardsService.getBoardById(req.params.boardId);
  if (!data) {
    return res
      .status(404)
      .send(`The board with the ID: ${req.params.boardId} was NOT found`);
  }
  res.status(200).json(data);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createNewBoard(req.body);
  res.status(200).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.updateBoardById(
    req.params.boardId,
    req.body
  );
  if (!board) {
    return res
      .status(404)
      .send(`The board with the ID: ${req.params.boardId} was NOT found`);
  }
  res.status(200).json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardsService.deleteBoardById(req.params.boardId);
  if (!board) {
    return res
      .status(404)
      .send(`The board with the ID: ${req.params.boardId} was NOT found`);
  }
  return res.status(200).json(board);
});

module.exports = router;
