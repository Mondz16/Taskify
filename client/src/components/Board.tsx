import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DragDropContext } from "@hello-pangea/dnd";
import List from "./List.tsx";
import API from "../services/api.tsx";

export default function Board() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [addingList, setAddingList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const { data } = await API.get(`/boards/${id}/full`);
      setBoard(data);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  const createList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    try {
      await API.post("/lists", { title: newListTitle, boardId: id });
      setNewListTitle("");
      setAddingList(false);
      fetchBoard();
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const newBoard = { ...board };
    const sourceList = newBoard.lists.find((l: any) => l._id === source.droppableId);
    const destinationList = newBoard.lists.find((l: any) => l._id === destination.droppableId);
    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, movedCard);
    setBoard(newBoard);

    try {
      await API.patch(`/cards/${draggableId}/move`, {
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    } catch {
      fetchBoard();
    }
  };

  if (!board) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-400">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading board…
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Board header */}
      <div className="flex items-center gap-4 px-6 py-4 bg-slate-900/80 backdrop-blur border-b border-slate-700/60">
        <button
          onClick={() => navigate("/boards")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors duration-150 cursor-pointer group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Boards
        </button>
        <div className="w-px h-4 bg-slate-700" />
        <h1 className="text-white font-bold text-lg">{board.board.title}</h1>
        <div className="ml-auto text-xs text-slate-500 font-medium">
          {board.lists.length} list{board.lists.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Board canvas */}
      <div className="flex-1 overflow-x-auto px-6 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 items-start min-w-max">
            {board.lists.map((list: any) => (
              <List key={list._id} list={list} refresh={fetchBoard} />
            ))}

            {/* Add list column */}
            <div className="flex-shrink-0 w-72">
              {addingList ? (
                <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4 shadow-lg">
                  <form onSubmit={createList} className="space-y-3">
                    <input
                      type="text"
                      autoFocus
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="List name..."
                      className="w-full bg-slate-800 border border-amber-400/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        Add list
                      </button>
                      <button
                        type="button"
                        onClick={() => { setAddingList(false); setNewListTitle(""); }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-sm rounded-xl border border-slate-700 transition-all duration-200 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setAddingList(true)}
                  className="w-full flex items-center gap-2 text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-700/40 hover:border-slate-600 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer group"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add a list
                </button>
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}