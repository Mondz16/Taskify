import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../services/api.tsx";

type Board = {
  _id: any;
  title: string;
  owner: any;
};

const BOARD_COLORS = [
  "from-violet-600 to-violet-800",
  "from-amber-500 to-orange-700",
  "from-emerald-500 to-teal-700",
  "from-sky-500 to-blue-700",
  "from-rose-500 to-pink-700",
  "from-fuchsia-500 to-purple-700",
];

export default function Boards() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await API.get("/boards");
      setBoards(data);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const { data } = await API.post("/boards", { title });
      setBoards([...boards, data]);
      setTitle("");
      setShowInput(false);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Boards</h1>
            <p className="text-slate-400 text-sm mt-0.5">{boards.length} board{boards.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setShowInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-sm rounded-xl shadow-md shadow-amber-400/10 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Board
          </button>
        </div>

        {/* Create board inline card */}
        {showInput && (
          <div className="mb-6 bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
            <h3 className="text-white font-semibold mb-3 text-sm">Name your board</h3>
            <form onSubmit={createBoard} className="flex gap-2">
              <input
                type="text"
                autoFocus
                placeholder="e.g. Q3 Roadmap, Sprint 12..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => { setShowInput(false); setTitle(""); }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-sm transition-all duration-200 cursor-pointer border border-slate-700"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Boards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : boards.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">No boards yet</p>
            <p className="text-slate-600 text-sm mt-1">Create your first board to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((board, i) => (
              <div
                key={board._id}
                onClick={() => navigate(`/boards/${board._id}`)}
                className="group relative h-32 rounded-2xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${BOARD_COLORS[i % BOARD_COLORS.length]} opacity-90`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-200" />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-sm">
                    {board.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/70 text-xs font-medium">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Open board
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}