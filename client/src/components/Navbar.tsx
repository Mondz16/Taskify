import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useNavigate, Link } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext<any>(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-slate-900/95 backdrop-blur border-b border-slate-700/60 shadow-lg">
      {/* Logo */}
      <Link
        to="/boards"
        className="flex items-center gap-2 group no-underline"
      >
        <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shadow-md group-hover:bg-amber-300 transition-colors duration-200">
          <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Task<span className="text-amber-400">Flow</span>
        </span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-amber-400 font-semibold text-sm">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-slate-300 text-sm font-medium hidden sm:block">
            {user.name}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
}