import Card from "../models/Card.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCard = asyncHandler(async (req, res) => {
  const { title, description, listId } = req.body;

  const cardCount = await Card.countDocuments({ list: listId });

  const newCard = await Card.create({
    title: title,
    description: description,
    list: listId,
    order: cardCount,
  });

  res.status(201).json(newCard);
});

export const getCards = asyncHandler(async (req, res) => {
  const card = await Card.findById({ listId: req.params.listId }).sort("order");

  res.status(201).json(card);
});

export const moveCard = asyncHandler(async (req, res) => {
  const { sourceListId, destinationListId, sourceIndex, destinationIndex } =
    req.body;

  const cardId = req.params.id;

  const card = await Card.findById(cardId);
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  await Card.updateMany(
    {
      list: sourceListId,
      order: { $gt: sourceIndex },
    },
    { $inc: { order: -1 } },
  );

  await Card.updateMany(
    {
      list: destinationListId,
      order: { $gte: destinationIndex },
    },
    { $inc: { order: 1 } },
  );

  // 3️⃣ Update moved card
  card.list = destinationListId;
  card.order = destinationIndex;

  await card.save();

  res.json({ message: "Card moved successfully" });
});

export const deleteCard = asyncHandler(async (req, res) => {
  const deletedCard = await Card.findByIdAndDelete(req.params.id);
  res.status(201).json(deletedCard);
});

export const updateCard = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const card = await Card.findById(req.params.id);

  if (!card) {
    return res.status(400).json({ message: "Card not found!" });
  }

  card.title = title ?? card.title;
  card.description = description ?? card.description;
  card.status = status ?? card.status;

  await card.save();

  res.json(card);
});
