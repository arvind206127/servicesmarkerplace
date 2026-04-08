import { useState } from "react";
import { login, signUp } from "../../API/api";
import { jwtDecode } from "jwt-decode";

function AuthPage({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [err, setErr] = useState("");

    const handle = async () => {
        if (isSignup && !form.name) { setErr("Pehle apna naam likhein"); return; }
        if (!form.email || !form.password) { setErr("Email aur password bhariye"); return; }

        try {
            setErr("");
            let res;

            if (isSignup) {
                res = await signUp(form);
            } else {
                res = await login({ email: form.email, password: form.password });
            }

            if (res.data.success) {
                // ⭐ SABSE ZAROORI LINE: Token ko save karein
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    console.log("Token Saved Successfully!");
                }
                const decoded = jwtDecode(res.data.token);
                console.log("Decoded Token:", decoded);
                onLogin(decoded);

                setForm({ name: "", email: "", password: "" });
            } else {
                setErr(res.data.message || "Authentication failed!");
            }

        } catch (error) {
            console.error("Auth Error:", error);
            setErr(error.response?.data?.message || "Server se connection nahi ho paya!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#060b14 0%,#0d1117 60%,#060b14 100%)" }}>
            {/* BG blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />

            <div className="relative z-10 w-full max-w-sm mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg shadow-orange-500/20" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                        <span className="text-2xl">🏠</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "Georgia, serif" }}>SevaConnect</h1>
                    <p className="text-slate-400 text-sm mt-1">Aapki seva, hamare haath mein 🙏</p>
                </div>

                <div className="rounded-2xl border border-slate-700/50 p-6 shadow-2xl" style={{ background: "rgba(15,20,35,0.9)", backdropFilter: "blur(20px)" }}>
                    {/* Tab */}
                    <div className="flex bg-slate-800/60 rounded-xl p-1 mb-6">
                        {["Login", "Sign Up"].map((t, i) => (
                            <button key={t} onClick={() => { setIsSignup(!!i); setErr(""); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isSignup === !!i ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "text-slate-400 hover:text-slate-200"}`}>{t}</button>
                        ))}
                    </div>

                    {isSignup && (
                        <div className="mb-4">
                            <label className="text-xs text-slate-400 mb-1.5 block font-medium">Aapka Naam</label>
                            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ramesh Kumar"
                                className="w-full bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/60 transition-colors" />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="text-xs text-slate-400 mb-1.5 block font-medium">Email</label>
                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="aap@example.com" type="email"
                            className="w-full bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/60 transition-colors" />
                    </div>
                    <div className="mb-5">
                        <label className="text-xs text-slate-400 mb-1.5 block font-medium">Password</label>
                        <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" type="password"
                            className="w-full bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/60 transition-colors" />
                    </div>
                    {err && <p className="text-rose-400 text-xs mb-3 text-center">{err}</p>}
                    <button onClick={handle}
                        className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-orange-500/25"
                        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                        {isSignup ? "Account Banayein →" : "Login Karein →"}
                    </button>
                    {!isSignup && <p className="text-center text-xs text-slate-500 mt-3">Demo: koi bhi email/password chalega</p>}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;