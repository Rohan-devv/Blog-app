import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL; // ✅ make sure you set this in .env

export default function Login({ title = "Welcome back", subtitle = "Sign in to continue" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailValid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  const passValid = password.length >= 6;
  const formValid = emailValid && passValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!formValid || loading) return;

    try {
      setLoading(true);
      setError("");

      // ✅ Send request to backend
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });

      // ✅ Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to blogs page
      navigate("/getBlogs");
      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
      {/* Gradient Backgrounds */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 1.2 }} className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full blur-3xl bg-fuchsia-600/20" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 1.4 }} className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl bg-cyan-500/20" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-4 text-center relative">
              <div className="mx-auto mb-4 h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500/80 to-cyan-500/80 shadow-lg shadow-fuchsia-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-zinc-300 mt-1">{subtitle}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
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
                    autoComplete="current-password"
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

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-zinc-300 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-fuchsia-500"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm text-zinc-300 hover:text-white transition">Forgot password?</button>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={!formValid || loading}
                type="submit"
                className="group w-full rounded-xl mt-2 py-3 font-medium bg-gradient-to-r from-fuchsia-600 to-cyan-500 enabled:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Signing in…</span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              {/* Error */}
              {error && (
                <div className="text-xs text-red-400/90 pt-1">{error}</div>
              )}

              {/* Terms + Register */}
              <p className="text-center text-xs text-zinc-400 pt-4">
                By continuing, you agree to our <a className="underline underline-offset-4 hover:text-white" href="#">Terms</a> and <a className="underline underline-offset-4 hover:text-white" href="#">Privacy Policy</a>.
              </p>

              <p className="text-center text-sm text-zinc-300 pt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-4">
                  Register here
                </Link>
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
