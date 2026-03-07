import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../services/api.tsx";
import TemplateModal from "../components/TemplateModal.tsx";
import { sileo } from "sileo";

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
  const [showTemplate, setShowTemplate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await API.get("/boards");
      setBoards(data);
      console.log(data);
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

  const handleTemplateSubmit = async (templateData: any) => {
    try {
      const { data } = await API.post("/boards/template", {
        title: templateData.title,
        description: templateData.description,
        frontend: templateData.frontend,
        backend: templateData.backend,
      });
      // data.board is the newly created board from the template response
      setBoards([...boards, data.board]);
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
            <p className="text-slate-400 text-sm mt-0.5">
              {boards.length} board{boards.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Template button */}
          <button
            onClick={() => setShowTemplate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/40 text-slate-300 hover:text-amber-400 font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer group"
          >
            <svg
              className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
            Templates
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-5 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-slate-800/60 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-5 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Existing boards */}
            {boards.map((board, i) => (
              <div
                key={board._id}
                onClick={() => navigate(`/boards/${board._id}`)}
                className="group relative aspect-square rounded-2xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${BOARD_COLORS[i % BOARD_COLORS.length]}`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-200" />
                <div className="relative h-full flex flex-col justify-between p-4">
                  <h3 className="text-white font-bold text-base leading-snug line-clamp-3 drop-shadow-sm">
                    {board.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors duration-200">
                    <svg
                      className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Open
                  </div>
                </div>
              </div>
            ))}

            {/* Create new board tile */}
            {showInput ? (
              <div className="aspect-square bg-slate-900 border border-amber-400/40 rounded-2xl p-4 shadow-xl">
                <form
                  onSubmit={createBoard}
                  className="flex flex-col h-full gap-3"
                >
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    New Board
                  </p>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Board name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 w-full bg-slate-800 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-xl text-xs transition-all duration-200 cursor-pointer"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInput(false);
                        setTitle("");
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs border border-slate-700 transition-all duration-200 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="aspect-square bg-slate-900/50 hover:bg-slate-900 border-2 border-dashed border-slate-700 hover:border-amber-400/50 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-amber-400 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-amber-400/10 border border-slate-700 group-hover:border-amber-400/40 flex items-center justify-center transition-all duration-200">
                  <svg
                    className="w-5 h-5"
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
                </div>
                <span className="text-xs font-semibold">New Board</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Template Modal */}
      {showTemplate && (
        <TemplateModal
          onClose={() => setShowTemplate(false)}
          // onSubmit={(e) => {
          //   sileo.promise(handleTemplateSubmit(e),{
          //     loading: {title: "Loading..."},
          //     success: {title: "Board created!"},
          //     error: {title: "Failed.."}
          //   })
          //   }
          onSubmit={handleTemplateSubmit}
        />
      )}
    </div>
  );
}
