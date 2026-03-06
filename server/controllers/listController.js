import List from "../models/List.js";
import Board from "../models/Board.js";

export const createList = async (req,res) => {
    try {
        const {title, boardId} = req.body;

        const listCount = await List.countDocuments({board: boardId});

        const newList = await List.create({
            title: title,
            board: boardId,
            order: listCount
        });

        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}

export const getList = async (req, res) => {
    try {
        const list = await List.find({board: req.params.boardId}).sort("order");

        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}

export const updateListOrder = async (req, res) => {
    try {
        const {order} = req.body;

        const list = await List.findByIdAndUpdate(req.params.id,
            { order: order }, 
            { new: true});

        res.status(201).json({message: "Updated List Order Successfully", data: list});
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}

export const updateListStatus = async (req, res) => {
    try {
        const {status} = req.body;

        const list = await List.findByIdAndUpdate(req.params.id, {status: status});

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}