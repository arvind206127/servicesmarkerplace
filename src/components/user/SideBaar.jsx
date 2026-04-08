import React from 'react'

function SideBaar({ state, onNavChange }) {
  const nav = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "services", icon: "🛠️", label: "Services Book Karein" },
    { id: "bookings", icon: "📋", label: "Meri Bookings" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-gray-800 flex-shrink-0" style={{ background: "#111827" }}>
      <div className="p-5 border-b border-gray-800">
        <div className="text-xl font-bold" style={{ color: "#f97316" }}>SevaConnect</div>
        <div className="text-xs mt-0.5 text-gray-500">Services Marketplace</div>
      </div>

      <div className="p-3 flex-1">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavChange(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-colors ${
              state.activeNav === n.id ? 'bg-orange-500/10 text-orange-400' : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <span className="text-lg">{n.icon}</span>
            <span>{n.label}</span>.
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
            {(state.user?.name || "U")[0].toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-200">{state.user?.name || "User"}</div>
            <div className="text-xs text-gray-500">{state.user?.email || ""}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBaar;