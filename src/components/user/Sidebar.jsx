function Sidebar({ user, active, onChange }) {
  const items = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "services", icon: "🛠️", label: "Services Book Karein" },
    { id: "bookings", icon: "📋", label: "Meri Bookings" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-700/40 flex-shrink-0" style={{ background: "#0d1222" }}>
      <div className="p-5 border-b border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            <span className="text-base">🏠</span>
          </div>
          <div>
            <h1 className="text-base font-black text-white" style={{ fontFamily: "Georgia, serif" }}>SevaConnect</h1>
            <p className="text-xs text-slate-500">Services Marketplace</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map(item => (
          <button key={item.id} onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${active === item.id ? "text-orange-400 border-l-2 border-orange-500" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
            style={active === item.id ? { background: "rgba(249,115,22,0.12)" } : {}}>
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-md shadow-orange-500/20" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            {(user?.name || "U")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-200 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;