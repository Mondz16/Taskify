import { useState } from "react";

const FRONTEND_FRAMEWORKS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "SolidJS",
  "Astro",
];

const BACKEND_FRAMEWORKS = [
  "Node.js / Express",
  "Django",
  "Ruby on Rails",
  "Laravel",
  "Spring Boot",
  "FastAPI",
  "NestJS",
  "Go / Gin",
  "ASP.NET Core",
];

type TemplateForm = {
  title: string;
  description: string;
  frontend: string;
  backend: string;
};

export default function TemplateModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit?: (data: TemplateForm) => void;
}) {
  const [form, setForm] = useState<TemplateForm>({
    title: "",
    description: "",
    frontend: "",
    backend: "",
  });

  const isValid = form.title.trim() && form.frontend && form.backend;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit?.(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-amber-400"
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
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Create from Template
              </h2>
              <p className="text-slate-500 text-xs">
                Set up a new board with a preset stack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white hover:bg-slate-700 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Title <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full-Stack SaaS Starter"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what this template is for..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
              />
            </div>

            {/* Dropdowns row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Frontend */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Front-end <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.frontend}
                    onChange={(e) =>
                      setForm({ ...form, frontend: e.target.value })
                    }
                    className="w-full appearance-none bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-sm outline-none transition-all duration-200 rounded-xl px-4 py-2.5 pr-9 cursor-pointer
                      text-slate-500 [&:not([value=''])]:text-white"
                    style={{ color: form.frontend ? "white" : undefined }}
                  >
                    <option value="" disabled hidden>
                      Select...
                    </option>
                    {FRONTEND_FRAMEWORKS.map((f) => (
                      <option
                        key={f}
                        value={f}
                        className="bg-slate-800 text-white"
                      >
                        {f}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Backend */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Back-end <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.backend}
                    onChange={(e) =>
                      setForm({ ...form, backend: e.target.value })
                    }
                    className="w-full appearance-none bg-slate-800 border border-slate-700 hover:border-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-sm outline-none transition-all duration-200 rounded-xl px-4 py-2.5 pr-9 cursor-pointer"
                    style={{ color: form.backend ? "white" : "#6b7280" }}
                  >
                    <option value="" disabled hidden>
                      Select...
                    </option>
                    {BACKEND_FRAMEWORKS.map((b) => (
                      <option
                        key={b}
                        value={b}
                        className="bg-slate-800 text-white"
                      >
                        {b}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stack preview pill */}
            {(form.frontend || form.backend) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">
                  Stack:
                </span>
                {form.frontend && (
                  <span className="inline-flex items-center gap-1 text-xs bg-violet-500/10 border border-violet-500/25 text-violet-300 rounded-full px-3 py-1 font-medium">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {form.frontend}
                  </span>
                )}
                {form.frontend && form.backend && (
                  <span className="text-slate-600 text-xs">+</span>
                )}
                {form.backend && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 rounded-full px-3 py-1 font-medium">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                      />
                    </svg>
                    {form.backend}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/60 bg-slate-900/50">
            <p className="text-xs text-slate-600">
              <span className="text-amber-400">*</span> Required fields
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-xl transition-all duration-200 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="px-5 py-2 text-sm bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-xl shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 transition-all duration-200 cursor-pointer"
              >
                Use Template
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
