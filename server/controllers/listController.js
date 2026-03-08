import List from "../models/List.js";
import Board from "../models/Board.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createList = asyncHandler(async (req, res) => {
  const { title, boardId } = req.body;

  const listCount = await List.countDocuments({ board: boardId });

  const newList = await List.create({
    title: title,
    board: boardId,
    order: listCount,
  });

  res.status(201).json(newList);
});

export const getList = asyncHandler(async (req, res) => {
  const list = await List.find({ board: req.params.boardId }).sort("order");

  res.status(201).json(list);
});

export const updateList = asyncHandler(async (req, res) => {
  const { title, status, order } = req.body;

  const list = await List.findById(req.params.id);

  list.title = title ?? list.title;
  list.status = status ?? list.status;
  list.order = order ?? list.order;

  await list.save();

  res
    .status(201)
    .json({ message: "Updated List Order Successfully", data: list });
});
