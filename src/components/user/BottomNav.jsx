function BottomNav({ active, onChange }) {
  const items = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "services", icon: "🛠️", label: "Services" },
    { id: "bookings", icon: "📋", label: "Bookings" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-700/50 flex md:hidden" style={{ background: "rgba(9,13,24,0.97)", backdropFilter: "blur(20px)" }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)} className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all ${active === item.id ? "text-orange-400" : "text-slate-500"}`}>
          <span className="text-lg leading-none">{item.icon}</span>
          <span className="text-[10px] font-semibold">{item.label}</span>
          {active === item.id && <span className="w-1 h-1 rounded-full bg-orange-400" />}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;