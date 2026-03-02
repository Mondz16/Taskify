import Board from "../models/Board.js";
import List from '../models/List.js';
import Card from '../models/Card.js';
import Card from "../models/Card.js";

export const createBoard = async (req, res) => {
    try {
        const {title} = req.body;

        const newBoard = await Board.create({
            title,
            owner: req.user
        });

        res.status(200).json({message: "Created a board successfully!", data: newBoard});
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}

export const getBoards = async (req, res) => {
    try {
        
        const boards = await Board.find();
        if(!boards)
            return res.status(500).json({message: "No boards found!"});

        res.status(200).json({message: "Fetch board successfully!", data: boards});
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}

export const getFullBoards = async (req, res) => {
    try {
        const boardId = req.params.id;

        const board = await Board.findOne({
            _id: boardId,
            owner: req.user
        });

        if(!board){
            return res.status(404).json({ message: "Board not found" });
        }

        const lists = await List.find({board: board});

        const listIds = lists.map(list => list._id);

        const cards = await Card.find({list: {$in: listIds}}).sort("order");
        
        const listWithCards = lists.map(list => ({
            ...list.toObject(),
            cards: cards
            .filter(card => card.list.toString() === list._id.toString())
            .sort((a , b) => a.order - b.order)
        }));

        res.status(200).json({message: "Fetch full boards with card successfully!", board,
            lists: listWithCards});
    } catch (error) {
        res.status(500).json({message: "Server error!", error: error});
    }
}