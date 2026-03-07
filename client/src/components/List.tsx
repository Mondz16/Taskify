import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card.tsx";
import API from "../services/api.tsx";
import { sileo } from "sileo";

export default function List({
  list,
  refresh,
}: {
  list: any;
  refresh: Function;
}) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addingCard, setAddingCard] = useState(false);
  const [listTitle, setListTitle] = useState(list.title || "");

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

  const archiveStatus = async () => {
    try {
      await API.patch(`/lists/${list._id}`, { status: "inactive" });
      refresh();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const updateListTitle = async () => {
    try {
      await API.patch(`/lists/${list._id}`, { title: listTitle });
      refresh();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-slate-900 border border-slate-700/60 rounded-2xl flex flex-col max-h-[calc(100vh-140px)] shadow-lg">
      {/* List header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-700/60">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          onBlur={updateListTitle}
          className="text-white font-semibold text-sm tracking-wide"
        />
        <span
          className="text-xs text-slate-500 hover:text-white rounded-full px-2 py-0.5 font-medium"
          onClick={() => {
            sileo.action({
              title: "Archive List?",
              description: "Are you sure you want to archive this list?",
              styles: {
                title: "text-[#007BFF]",
                description: "text-[#007BFF]",
              },
              button: {
                title: "Remove",
                onClick: () => {
                  sileo.promise(archiveStatus(), {
                    loading: { title: "Loading..." },
                    success: { title: "List Removed!" },
                    error: { title: "Failed" },
                  });
                },
              },
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          </svg>
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
              <Card
                key={card._id}
                card={card}
                index={index}
                refresh={refresh}
              />
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
                onClick={() => {
                  setAddingCard(false);
                  setNewCardTitle("");
                }}
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
            <svg
              className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add a card
          </button>
        )}
      </div>
    </div>
  );
}
