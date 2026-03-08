import Board from "../models/Board.js";
import List from "../models/List.js";
import Card from "../models/Card.js";
import { generateBoardWithTemplate } from "../helper/boardTemplateHelper.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a board from an AI-generated project templates
export const createBoardWithProject = asyncHandler(async (req, res) => {
  const { title, description, frontend, backend } = req.body;

  if (!title || !frontend || !backend) {
    return res.status(400).json({
      message: "title, frontend, and backend are required.",
    });
  }

  const result = await generateBoardWithTemplate({
    title,
    description,
    frontend,
    backend,
    ownerId: req.user,
  });

  console.log(result);
  res.status(201).json(result);
});

export const createBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const newBoard = await Board.create({
    title: title,
    owner: req.user,
  });

  res.status(200).json(newBoard);
});

export const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ owner: req.user, status: "active" });
  if (!boards) return res.status(500).json({ message: "No boards found!" });

  console.log(`Get boards: ${boards}`);
  res.status(200).json(boards);
});

export const updateBoard = asyncHandler(async (req, res) => {
  const { title, status } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) return res.status(500).json({ message: "No boards found!" });

  board.title = title ?? board.title;
  board.status = status ?? board.status;

  var updatedBoard = await board.save();

  console.log(`Board updated: ${updatedBoard}`);
  res.status(200).json(updatedBoard);
});

export const getFullBoards = asyncHandler(async (req, res) => {
  const boardId = req.params.id;

  const board = await Board.findOne({
    _id: boardId,
    owner: req.user,
  });

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const lists = await List.find({ board: board, status: "active" });

  const listIds = lists.map((list) => list._id);

  const cards = await Card.find({
    list: { $in: listIds },
    status: "active",
  }).sort("order");

  const listWithCards = lists.map((list) => ({
    ...list.toObject(),
    cards: cards
      .filter((card) => card.list.toString() === list._id.toString())
      .sort((a, b) => a.order - b.order),
  }));

  console.log(`board: ${board} | list: ${JSON.stringify(listWithCards)}`);
  res.status(200).json({
    message: "Fetch full boards with card successfully!",
    board,
    lists: listWithCards,
  });
});
