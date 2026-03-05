import { Draggable } from "@hello-pangea/dnd";

export default function Card({ card, index }: { card: any; index: number }) {
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group relative bg-slate-800 border rounded-xl px-4 py-3 text-sm text-slate-200
            font-medium cursor-grab active:cursor-grabbing
            hover:bg-slate-750 hover:border-slate-500 hover:shadow-lg
            transition-all duration-150 select-none
            ${snapshot.isDragging
              ? "border-amber-400/60 shadow-xl shadow-amber-400/10 bg-slate-700 rotate-1 scale-105"
              : "border-slate-700/60"
            }
          `}
        >
          {/* Drag handle indicator */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity duration-150">
            <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 11-4 0 2 2 0 014 0zM7 8a2 2 0 11-4 0 2 2 0 014 0zM7 14a2 2 0 11-4 0 2 2 0 014 0zM17 2a2 2 0 11-4 0 2 2 0 014 0zM17 8a2 2 0 11-4 0 2 2 0 014 0zM17 14a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="pl-3">{card.title}</span>
        </div>
      )}
    </Draggable>
  );
}