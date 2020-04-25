const boardsRepo = require('./board.memory.repository');

const Board = require('./board.model');

const getAll = async () => {
  const data = await boardsRepo.getAll();
  if (data) {
    return data.map(Board.toGet);
  }
};

const getBoardById = async id => {
  const board = await boardsRepo.getBoardById(id);
  if (board) {
    return Board.toGet(board);
  }
  return null;
};

const createNewBoard = async requestBody => {
  const board = new Board(requestBody);
  return boardsRepo.createNewBoard(Board.toSend(board)).then(() => {
    return board;
  });
};

const updateBoardById = async (id, requestBody) => {
  const board = await boardsRepo.updateBoardById(id, requestBody);
  if (board) {
    return Board.toGet(board.toObject());
  }
  return null;
};

const deleteBoardById = async id => {
  const board = await boardsRepo.deleteBoardById(id);
  if (!board) {
    return null;
  }
  return Board.toGet(board);
};

module.exports = {
  getAll,
  getBoardById,
  createNewBoard,
  updateBoardById,
  deleteBoardById
};
