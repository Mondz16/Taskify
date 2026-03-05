import Card from "../models/Card.js";

export const createCard = async (req, res) => {
  try {
    const { title, description, listId } = req.body;

    const cardCount = await Card.countDocuments({ list: listId });

    const newCard = await Card.create({
      title: title,
      description: description,
      list: listId,
      order: cardCount,
    });

    res
      .status(201)
      .json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error });
  }
};

export const getCards = async (req, res) => {
  try {
    const card = await Card.findById({ listId: req.params.listId }).sort(
      "order",
    );

    res
      .status(201)
      .json(card);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error });
  }
};

export const moveCard = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json(deletedCard);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { title, description } = req.body;

    const card = await Card.findById(req.params.id);

    if(!card){
      return res.status(400).json({message: "Card not found!"});
    }

    card.title = title ?? card.title;
    card.description = description ?? card.description;

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error });
  }
}
