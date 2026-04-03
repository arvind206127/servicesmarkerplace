function Toast({ toast }) {
  if (!toast) return null;
  const colors = { success: "border-emerald-500/40 text-emerald-400", error: "border-rose-500/40 text-rose-400", info: "border-cyan-500/40 text-cyan-400" };
  const dots = { success: "bg-emerald-400", error: "bg-rose-400", info: "bg-cyan-400" };
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl animate-pulse ${colors[toast.type]} bg-slate-900/90 shadow-2xl max-w-xs`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dots[toast.type]}`} />
      <span className="text-sm font-medium text-slate-200">{toast.msg}</span>
    </div>
  );
}

export default Toast;