import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800/30 rounded-full blur-3xl pointer-events-none" />

      {/* Logo mark */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
          <svg
            className="w-5 h-5 text-slate-900"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">
          Task<span className="text-amber-400">Flow</span>
        </span>
      </div>

      {/* Hero text */}
      <div className="text-center max-w-xl relative z-10">
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4">
          Your companion for
          <br />
          <span className="text-amber-400">daily tasks.</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          Organize work, track progress, and collaborate — all in one clean
          board.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all duration-200 cursor-pointer text-base"
          >
            Get started free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-7 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-500 font-medium rounded-xl transition-all duration-200 cursor-pointer text-base"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Decorative board preview hint */}
      <div className="mt-16 flex gap-3 opacity-20 pointer-events-none select-none">
        {["To Do", "In Progress", "Done"].map((col) => (
          <div
            key={col}
            className="w-32 bg-slate-800 rounded-lg p-3 border border-slate-700"
          >
            <div className="text-slate-400 text-xs font-medium mb-2">{col}</div>
            {[...Array(col === "In Progress" ? 2 : 1)].map((_, i) => (
              <div key={i} className="h-6 bg-slate-700 rounded mb-1.5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
