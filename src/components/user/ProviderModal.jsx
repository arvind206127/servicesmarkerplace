import Modal from "./Modal";

function ProviderModal({ service, onClose, onBook }) {
    return (
        <Modal onClose={onClose}>
            <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "#0f1422" }}>
                {/* Header */}
                <div className={`p-5 bg-gradient-to-br ${service.bg} border-b ${service.border}`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-4xl">{service.icon}</span>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-xl">✕</button>
                    </div>
                    <h2 className="text-lg font-black text-white mb-1">{service.name}</h2>
                    <p className="text-sm text-slate-400 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${service.badge}`}>⏱ {service.time}</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400">★ {service.rating} ({service.reviews})</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${service.available ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>{service.available ? "✓ Available" : "✗ Unavailable"}</span>
                    </div>
                </div>

                <div className="p-5 space-y-4">
                    {/* Provider */}
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Service Provider</p>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white 
                                 ${service.badge?.includes("cyan") ? "bg-cyan-500" :
                                    service.badge?.includes("blue") ? "bg-blue-500" :
                                        service.badge?.includes("amber") ? "bg-amber-500" :
                                            service.badge?.includes("violet") ? "bg-violet-500" :
                                                service.badge?.includes("emerald") ? "bg-emerald-500" :
                                                    "bg-rose-500"}`}>
                                {service.providerImg}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-200">{service.provider}</p>
                                <p className="text-xs text-slate-500">Verified ✓ • 5+ Years Experience • 500+ Jobs</p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Is Service Mein Kya Milega</p>
                        <div className="grid grid-cols-2 gap-2">
                            {/* Galti: service.features.map(...) */}
                            {/* Sahi Fix: */}
                            {service?.features?.map((f) => (
                                <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                                    <span className={`${service?.badge?.split(" ")[0] || "text-orange-400"}`}>✓</span>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                        <div><span className="text-2xl font-black text-orange-400">₹{service.price}</span><span className="text-xs text-slate-500"> से शुरू</span></div>
                        {service.available
                            ? <button onClick={() => { onClose(); onBook(service); }} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>Book Now →</button>
                            : <span className="text-sm text-rose-400 font-semibold">Currently Unavailable</span>}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProviderModal;