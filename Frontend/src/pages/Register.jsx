import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register({ onSubmit, loading = false, error, title = "Create an account", subtitle = "Join us today" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const emailValid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  const passValid = password.length >= 6;
  const nameValid = name.trim().length > 1;
  const formValid = emailValid && passValid && nameValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!formValid || loading) return;
    if (onSubmit) await onSubmit({ name, email, password });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 1.2 }} className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full blur-3xl bg-fuchsia-600/20" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 1.4 }} className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl bg-cyan-500/20" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-4 text-center relative">
              <div className="mx-auto mb-4 h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500/80 to-cyan-500/80 shadow-lg shadow-fuchsia-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-zinc-300 mt-1">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-zinc-300">Full Name</label>
                <div className={`flex items-center gap-2 rounded-xl border bg-white/5 focus-within:bg-white/10 transition ${touched.name && !nameValid ? "border-red-500/60" : "border-white/10"}`}>
                  <User className="h-5 w-5 ml-3 opacity-80" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="John Doe"
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 px-3 py-3"
                    autoComplete="name"
                  />
                </div>
                {touched.name && !nameValid && (
                  <p className="text-xs text-red-400">Enter your full name.</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-zinc-300">Email</label>
                <div className={`flex items-center gap-2 rounded-xl border bg-white/5 focus-within:bg-white/10 transition ${touched.email && !emailValid ? "border-red-500/60" : "border-white/10"}`}>
                  <Mail className="h-5 w-5 ml-3 opacity-80" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="you@example.com"
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 px-3 py-3"
                    autoComplete="email"
                  />
                </div>
                {touched.email && !emailValid && (
                  <p className="text-xs text-red-400">Enter a valid email.</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-zinc-300">Password</label>
                <div className={`flex items-center gap-2 rounded-xl border bg-white/5 focus-within:bg-white/10 transition ${touched.password && !passValid ? "border-red-500/60" : "border-white/10"}`}>
                  <Lock className="h-5 w-5 ml-3 opacity-80" />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 px-3 py-3"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="p-2 mr-2 rounded-lg hover:bg-white/10 active:scale-95 transition"
                  >
                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {touched.password && !passValid && (
                  <p className="text-xs text-red-400">Password must be at least 6 characters.</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={!formValid || loading}
                type="submit"
                className="group w-full rounded-xl mt-2 py-3 font-medium bg-gradient-to-r from-fuchsia-600 to-cyan-500 enabled:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Registering…</span>
                ) : (
                  <>
                    <span>Register</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              {error && (
                <div className="text-xs text-red-400/90 pt-1">{error}</div>
              )}

              {/* Login link */}
              <p className="text-center text-sm text-zinc-300 pt-4">
                Already have an account? {" "}
                <Link to="/" className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-4">Login here</Link>
              </p>
            </form>
          </div>

          <p className="text-center text-[11px] text-zinc-400 mt-4">
            Built with ❤️ using Tailwind & Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  );
}