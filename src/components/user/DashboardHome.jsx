import React from 'react'

// ─── DASHBOARD HOME ───────────────────────────────────────────────────────────

const SERVICES = [
  { id: 1, name: "AC Repair", price: 500, icon: "❄️", rating: 4.8 },
  { id: 2, name: "Home Cleaning", price: 800, icon: "🧹", rating: 4.9 },
  { id: 3, name: "Electrician", price: 300, icon: "⚡", rating: 4.7 },
];

function DashboardHome({ user, bookings = [], onNav, onOpenProvider }) {
  // Yahan bookings || [] lagane se crash nahi hoga
  const upcoming = (bookings || []).filter(b => b.status === "upcoming");
  const completed = (bookings || []).filter(b => b.status === "completed");

  console.log("Dashboard user prop:", user);

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-5 sm:p-6 relative overflow-hidden border border-orange-500/15" style={{ background: "linear-gradient(135deg,#1a1f35,#141929)" }}>
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle,#f97316,transparent)" }} />
        <p className="text-slate-400 text-sm mb-1">Namaskar 🙏</p>
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">{user?.name}!</h2>
        <p className="text-slate-400 text-sm mb-4">Aaj kya seva chahiye aapko?</p>
        <button onClick={() => onNav("services")}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
          Service Book Karein →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", val: bookings.length, icon: "📋", color: "text-orange-400" },
          { label: "Upcoming", val: upcoming.length, icon: "⏳", color: "text-cyan-400" },
          { label: "Done", val: completed.length, icon: "✅", color: "text-emerald-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 sm:p-4 border border-slate-700/40 text-center" style={{ background: "rgba(15,20,35,0.8)" }}>
            <div className="text-xl sm:text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Popular Services */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-200">Popular Services</h3>
          <button onClick={() => onNav("services")} className="text-xs text-orange-400 hover:text-orange-300">Sab dekho →</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SERVICES.map(s => (
            <button key={s.id} onClick={() => onOpenProvider(s)}
              className="rounded-xl p-3 sm:p-4 text-left border border-slate-700/40 hover:border-orange-500/30 transition-all hover:-translate-y-0.5 group"
              style={{ background: "rgba(15,20,35,0.8)" }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-orange-300 transition-colors leading-tight">{s.name.split(" ").slice(0, 2).join(" ")}</div>
              <div className="text-xs text-orange-400 font-semibold mt-1">₹{s.price}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-xs text-slate-400">{s.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.map(service => ( // 'b' ko badal kar 'service' kar diya taaki aapka code chale
        <div key={service.id} className="p-4 rounded-xl border border-slate-700/40 bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{service.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-200">{service.service}</p>
                <p className="text-xs text-slate-500">{service.date} • {service.time}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400">Upcoming</span>
          </div>

          {/* YAHAN SE FEATURES AA RAHE HAIN */}
          <div className="mt-3 space-y-1">
            {service.features?.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                {/* split(" ")[0] se text color (text-cyan-400) uthayega */}
                <span className={`${service.badge?.split(" ")[0] || "text-orange-400"}`}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardHome