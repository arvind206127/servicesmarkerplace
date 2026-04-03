function ProfilePage({ user, bookings, onNav }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="rounded-2xl p-6 border border-slate-700/40 text-center" style={{ background: "rgba(15,20,35,0.9)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-4 shadow-xl shadow-orange-500/20" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
          {(user?.name || "U")[0].toUpperCase()}
        </div>
        <h2 className="text-xl font-black text-white">{user?.name}</h2>
        <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
        <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-slate-700/40">
          {[{ val: bookings.length, label: "Bookings" }, { val: "4.8★", label: "Rating" }, { val: "2", label: "Reviews" }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-black text-orange-400">{s.val}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(15,20,35,0.9)" }}>
        <h3 className="text-sm font-bold text-slate-200 mb-4">Profile Information</h3>
        {[
          { icon: "👤", label: "Naam", val: user?.name },
          { icon: "📧", label: "Email", val: user?.email },
          { icon: "📱", label: "Phone", val: bookings?.phone },
          { icon: "📍", label: "Shehar", val: bookings?.address },
          { icon: "🗓️", label: "Member Since", val: "January 2025" },
        ].map(f => (
          <div key={f.label} className="flex items-center gap-3 py-3 border-b border-slate-700/30 last:border-0">
            <span className="text-lg w-7">{f.icon}</span>
            <div>
              <p className="text-xs text-slate-500">{f.label}</p>
              <p className="text-sm text-slate-200">{f.val}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => onNav("settings")} className="w-full py-3 rounded-xl text-sm font-semibold border border-slate-700/40 text-slate-300 hover:text-white hover:border-orange-500/30 transition-all" style={{ background: "rgba(15,20,35,0.9)" }}>
        ⚙️ Profile Edit Karein
      </button>
    </div>
  );
}

export default ProfilePage;