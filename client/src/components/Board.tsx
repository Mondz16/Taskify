import { useEffect  , useState} from "react";
import {DragDropContext} from '@hello-pangea/dnd';
import List from './List.tsx';
import API from "../services/api.tsx";

export default function Board(boardId: {board:any}){
    const [board, setBoard] = useState<any>(null);

    useEffect(() => {
        fetchBoard();
    },[]);

    const fetchBoard = async () => {
        const {data} = await API.get(`/boards/${boardId}/full`);
        setBoard(data);
    }

    const onDragEnd = async (result:any) => {
        const {source, destination, draggableId} = result;

        if(!destination) return;

        await API.put(`/cards/${draggableId}/move`, {
            sourceListId: source.droppableId,
            destinationListId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index
        });

        fetchBoard();
    }

    if(!board) return <p>Loading....</p>

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-container">
                {
                    board.lists.map((list:any) => (
                        <List key={list._id} list={list} />
                    ))
                }
            </div>
        </DragDropContext>
    );
}
