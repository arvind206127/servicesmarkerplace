import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const SERVICES = [
    { id: 1, name: "AC Repair & Service", icon: "❄️", category: "AC", price: 499, rating: 4.7, reviews: 312, time: "60-90 min", provider: "CoolTech Solutions", providerImg: "CT", description: "Complete AC service, gas refill, filter cleaning, compressor repair. All major brands covered.", features: ["Gas Recharge", "Deep Cleaning", "Filter Replace", "PCB Repair", "Thermostat Fix", "Cooling Check"], available: true, color: "cyan", bg: "from-cyan-500/20 to-cyan-900/10", border: "border-cyan-500/20", badge: "bg-cyan-500/15 text-cyan-400" },
    { id: 2, name: "Plumbing Services", icon: "🔧", category: "Plumbing", price: 299, rating: 4.5, reviews: 218, time: "45-60 min", provider: "AquaFix Pro", providerImg: "AF", description: "Pipe leak repair, tap installation, drain cleaning, bathroom fitting and more.", features: ["Leak Repair", "Tap Install", "Drain Clean", "Geyser Fit", "Toilet Repair", "Pipeline Work"], available: true, color: "blue", bg: "from-blue-500/20 to-blue-900/10", border: "border-blue-500/20", badge: "bg-blue-500/15 text-blue-400" },
    { id: 3, name: "Electrician", icon: "⚡", category: "Electrical", price: 349, rating: 4.6, reviews: 445, time: "30-60 min", provider: "SparkMaster", providerImg: "SM", description: "Wiring, switchboard repair, fan/light installation, short circuit fixing.", features: ["Wiring Fix", "Fan Install", "MCB Repair", "CCTV Wiring", "Inverter Setup", "Earthing"], available: true, color: "amber", bg: "from-amber-500/20 to-amber-900/10", border: "border-amber-500/20", badge: "bg-amber-500/15 text-amber-400" },
    { id: 4, name: "Carpenter", icon: "🪚", category: "Carpentry", price: 399, rating: 4.4, reviews: 176, time: "60-120 min", provider: "WoodCraft Studio", providerImg: "WC", description: "Furniture assembly, door/window repair, custom woodwork, modular kitchen fitting.", features: ["Furniture Fix", "Door Repair", "Custom Work", "Kitchen Fit", "Wardrobe", "Flooring"], available: true, color: "violet", bg: "from-violet-500/20 to-violet-900/10", border: "border-violet-500/20", badge: "bg-violet-500/15 text-violet-400" },
    { id: 5, name: "Home Cleaning", icon: "🧹", category: "Cleaning", price: 599, rating: 4.8, reviews: 520, time: "120-180 min", provider: "SparkleHome", providerImg: "SH", description: "Deep cleaning, sofa cleaning, carpet wash, kitchen & bathroom deep clean.", features: ["Deep Clean", "Sofa Wash", "Carpet Clean", "Kitchen Degrease", "Bathroom Sanitize", "Window Clean"], available: true, color: "emerald", bg: "from-emerald-500/20 to-emerald-900/10", border: "border-emerald-500/20", badge: "bg-emerald-500/15 text-emerald-400" },
    { id: 6, name: "Pest Control", icon: "🦟", category: "Pest Control", price: 799, rating: 4.3, reviews: 98, time: "60-90 min", provider: "PestBusters", providerImg: "PB", description: "Cockroach, termite, bed bug, mosquito treatment for complete home protection.", features: ["Cockroach", "Termite", "Bed Bug", "Mosquito", "Rat Control", "Fumigation"], available: true, color: "rose", bg: "from-rose-500/20 to-rose-900/10", border: "border-rose-500/20", badge: "bg-rose-500/15 text-rose-400" },
];

const CATEGORIES = ["All", "AC", "Plumbing", "Electrical", "Carpentry", "Cleaning", "Pest Control"];

function ServicesPage({ onBook, onOpenProvider }) {
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");

    const filtered = SERVICES.filter(s => {
        const cm = cat === "All" || s.category === cat;
        const q = search.toLowerCase();
        return cm && (!q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    });

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700/40 bg-slate-800/40">
                <span className="text-slate-500 text-sm">🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Service dhundhein... AC, Plumber..."
                    className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 focus:outline-none" />
                {search && <button onClick={() => setSearch("")} className="text-slate-500 hover:text-slate-300 text-sm">✕</button>}
            </div>

            {/* Category filter - scrollable */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCat(c)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${cat === c ? "text-white shadow-lg shadow-orange-500/20" : "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/40"}`}
                        style={cat === c ? { background: "linear-gradient(135deg,#f97316,#ea580c)" } : {}}>
                        {c}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(s => (
                    <div key={s.id} className={`rounded-2xl p-4 sm:p-5 border ${s.border} bg-gradient-to-br ${s.bg} relative overflow-hidden group`}>
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-3xl">{s.icon}</span>
                            {s.available
                                ? <div className="flex items-center gap-1"><span className="text-amber-400 text-sm">★</span><span className="text-xs font-bold text-slate-300">{s.rating}</span></div>
                                : <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400">Unavailable</span>}
                        </div>
                        <h3 className="font-black text-slate-100 text-sm mb-0.5">{s.name}</h3>
                        <p className="text-xs text-slate-500 mb-3">{s.provider}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400">⏱ {s.time}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400">👥 {s.reviews}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div><span className="text-lg font-black text-orange-400">₹{s.price}</span><span className="text-xs text-slate-500"> से शुरू</span></div>
                            <div className="flex gap-2">
                                <button onClick={() => onOpenProvider(s)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/40 transition-colors">
                                    Details
                                </button>
                                {s.available
                                    ? <button onClick={() => onBook(s)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>Book</button>
                                    : <button disabled className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-800/60 cursor-not-allowed">N/A</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-sm">Koi service nahi mili</p>
                </div>
            )}
        </div>
    );
}

export default ServicesPage;    