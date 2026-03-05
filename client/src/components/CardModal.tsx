import { useState, useEffect } from "react";
import API from "../services/api";
import { sileo } from "sileo";

export default function CardModal({ card, onClose, refresh }: { card: any; onClose: Function; refresh: Function }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [saving, setSaving] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedCard = await API.put(`/cards/${card._id}`, { title, description });
      refresh();
      onClose();
      console.log(updatedCard);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
        const deletedCard = await API.delete(`/cards/${card._id}`);
        refresh();
        onClose();
      console.log(deletedCard);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">Edit Card</span>
          </div>
          <button
            onClick={() => onClose()}
            className="text-slate-500 hover:text-white hover:bg-slate-700 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Title input */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200"
            />
          </div>

          {/* Description textarea */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Add a description…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-700/60 bg-slate-900/50">
          <button
            onClick={() =>{
                sileo.action({
                    title: "Removed Card?",
                    description: "Are you sure you want to remove this card?",
                    styles: {
                        title: "text-[#007BFF]",
                        description: "text-[#007BFF]"
                    },
                    button: {
                        title: "Delete",
                        onClick: () => {
                            sileo.promise(handleDelete(), {
                                    loading: { title: "Loading..." },
                                    success: { title: "Card Removed!" },
                                    error: { title: "Failed" },
                                    });
                        }
                    }
                });
            }}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-xl transition-all duration-200 cursor-pointer font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => onClose()}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-xl transition-all duration-200 cursor-pointer font-medium"
          >
            Cancel
          </button>
          <button
            onClick={
                () => {
                    sileo.promise(handleSave(), {
                        loading: { title: "Loading..." },
                        success: { title: "Card Updated!" },
                        error: { title: "Failed" },
                        });
                }
            }
            disabled={saving || !title.trim()}
            className="px-5 py-2 text-sm bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-xl shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 transition-all duration-200 cursor-pointer"
          >
            {saving ? "Saving changes…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}