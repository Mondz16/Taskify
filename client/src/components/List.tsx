import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card.tsx";
import API from "../services/api.tsx";

export default function List({ list, refresh }: { list: any; refresh: Function }) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addingCard, setAddingCard] = useState(false);

  const createCard = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    try {
      await API.post("/cards", { title: newCardTitle, listId: list._id });
      setNewCardTitle("");
      setAddingCard(false);
      refresh();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-slate-900 border border-slate-700/60 rounded-2xl flex flex-col max-h-[calc(100vh-140px)] shadow-lg">
      {/* List header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-700/60">
        <h3 className="text-white font-semibold text-sm tracking-wide">{list.title}</h3>
        <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5 font-medium">
          {list.cards?.length ?? 0}
        </span>
      </div>

      {/* Cards */}
      <Droppable droppableId={list._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-[40px] transition-colors duration-150
              ${snapshot.isDraggingOver ? "bg-amber-400/5" : ""}
            `}
          >
            {list.cards.map((card: any, index: number) => (
              <Card key={card._id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add card */}
      <div className="px-3 pb-3 pt-1">
        {addingCard ? (
          <form onSubmit={createCard} className="space-y-2">
            <input
              type="text"
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Card title..."
              className="w-full bg-slate-800 border border-amber-400/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-xs rounded-lg transition-all duration-200 cursor-pointer"
              >
                Add card
              </button>
              <button
                type="button"
                onClick={() => { setAddingCard(false); setNewCardTitle(""); }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs rounded-lg border border-slate-700 transition-all duration-200 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAddingCard(true)}
            className="w-full flex items-center gap-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl px-3 py-2 text-sm transition-all duration-150 cursor-pointer group"
          >
            <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add a card
          </button>
        )}
      </div>
    </div>
  );
}