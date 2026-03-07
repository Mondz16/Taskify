import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import API from "../services/api.tsx";
import { useNavigate, Link } from "react-router";

export default function Register() {
  const { login, user } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/boards");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);
      login(data);
      navigate("/boards");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
              <svg
                className="w-5 h-5 text-slate-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              Task<span className="text-amber-400">Flow</span>
            </span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">Create account</h2>
          <p className="text-slate-400 text-sm mt-1">
            Start organizing your work today
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                autoComplete="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-xl shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 transition-all duration-200 text-sm cursor-pointer"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
