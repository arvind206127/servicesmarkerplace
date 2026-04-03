import { useState } from "react";

function SettingsPage({ user, setUser, onLogout, showToast }) {
    const [tab, setTab] = useState("profile");
    const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
    const [pass, setPass] = useState({ current: "", next: "", confirm: "" });
    const [notifs, setNotifs] = useState([true, true, true, false]);

    const saveProfile = () => {
        setUser({ ...user, name: form.name, email: form.email, phone: form.phone });
        showToast("Profile update ho gayi! ✓", "success");
    };

    const changePass = () => {
        if (!pass.next) { showToast("Naya password likhein", "error"); return; }
        if (pass.next !== pass.confirm) { showToast("Passwords match nahi karte!", "error"); return; }
        showToast("Password change ho gaya! ✓", "success");
        setPass({ current: "", next: "", confirm: "" });
    };

    const tabs = [{ id: "profile", label: "👤 Profile" }, { id: "security", label: "🔒 Security" }, { id: "notif", label: "🔔 Alerts" }];

    return (
        <div className="space-y-4 max-w-lg mx-auto">
            {/* Tab Bar */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === t.id ? "text-white shadow-lg shadow-orange-500/20" : "bg-slate-800/60 text-slate-400 border border-slate-700/40"}`}
                        style={tab === t.id ? { background: "linear-gradient(135deg,#f97316,#ea580c)" } : {}}>
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "profile" && (
                <div className="rounded-2xl p-5 border border-slate-700/40 space-y-4" style={{ background: "rgba(15,20,35,0.9)" }}>
                    <h3 className="text-sm font-bold text-slate-200">Profile Update Karein</h3>
                    {[{ label: "Naam", key: "name", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "tel" }].map(f => (
                        <div key={f.key}>
                            <label className="text-xs text-slate-400 mb-1.5 block font-medium">{f.label}</label>
                            <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} type={f.type}
                                className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500/60 transition-colors" />
                        </div>
                    ))}
                    <button onClick={saveProfile} className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                        Save Changes ✓
                    </button>
                </div>
            )}

            {tab === "security" && (
                <>
                    <div className="rounded-2xl p-5 border border-slate-700/40 space-y-4" style={{ background: "rgba(15,20,35,0.9)" }}>
                        <h3 className="text-sm font-bold text-slate-200">Password Change Karein</h3>
                        {[{ label: "Current Password", key: "current" }, { label: "Naya Password", key: "next" }, { label: "Confirm Password", key: "confirm" }].map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-slate-400 mb-1.5 block font-medium">{f.label}</label>
                                <input value={pass[f.key]} onChange={e => setPass({ ...pass, [f.key]: e.target.value })} type="password" placeholder="••••••••"
                                    className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60 transition-colors" />
                            </div>
                        ))}
                        <button onClick={changePass} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#06b6d4,#0284c7)" }}>
                            Password Update Karein ✓
                        </button>
                    </div>
                    <div className="rounded-2xl p-5 border border-rose-500/20" style={{ background: "rgba(15,20,35,0.9)" }}>
                        <h3 className="text-sm font-bold text-rose-400 mb-4">Danger Zone</h3>
                        <button onClick={onLogout} className="w-full py-3 rounded-xl text-sm font-bold text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-colors">
                            🚪 Logout Karein
                        </button>
                    </div>
                </>
            )}

            {tab === "notif" && (
                <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(15,20,35,0.9)" }}>
                    <h3 className="text-sm font-bold text-slate-200 mb-4">Notification Preferences</h3>
                    {[
                        { label: "Booking Confirmation", sub: "Jab booking confirm ho" },
                        { label: "Service Reminder", sub: "Service se 1 ghante pehle" },
                        { label: "Offers & Deals", sub: "Exclusive discounts" },
                        { label: "Rating Reminder", sub: "Service ke baad" },
                    ].map((n, i) => (
                        <div key={i} className="flex items-center justify-between py-3.5 border-b border-slate-700/30 last:border-0">
                            <div>
                                <p className="text-sm text-slate-200">{n.label}</p>
                                <p className="text-xs text-slate-500">{n.sub}</p>
                            </div>
                            <button onClick={() => setNotifs(prev => prev.map((v, idx) => idx === i ? !v : v))}
                                className={`w-11 h-6 rounded-full relative transition-all duration-300 flex-shrink-0 ${notifs[i] ? "bg-orange-500" : "bg-slate-700"}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notifs[i] ? "left-6" : "left-1"}`} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SettingsPage;