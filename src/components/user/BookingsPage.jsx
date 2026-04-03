import { useEffect, useState } from "react";
import Modal from "./Modal";
import Stars from "./Star";
import { Snowflake, Wrench, Zap, Hammer, Droplets, Bug } from 'lucide-react';


function BookingsPage({ bookings, setBookings, showToast }) {
    const [ratingTarget, setRatingTarget] = useState(null);
    const [ratingVal, setRatingVal] = useState(0);
    const [loading, setLoading] = useState(true);

    const statusConfig = {
        pending: { label: "⏳ Pending", cls: "bg-amber-500/15 text-amber-400" }, // Ise add karein
        completed: { label: "✅ Completed", cls: "bg-emerald-500/15 text-emerald-400" },
        upcoming: { label: "⏳ Upcoming", cls: "bg-cyan-500/15 text-cyan-400" },
        cancelled: { label: "❌ Cancelled", cls: "bg-rose-500/15 text-rose-400" },
    };

    const serviceIcons = {
        "AC Repair & Service": <Snowflake className="text-blue-400" />,
        "Plumbing Services": <Droplets className="text-cyan-400" />,
        "Electrician": <Zap className="text-yellow-400" />,
        "Carpenter": <Hammer className="text-orange-400" />,
        "Home Cleaning": <Wrench className="text-green-400" />,
        "Pest Control": <Bug className="text-red-400" />
    };

    const cancel = (id) => {
        setBookings(bs => bs.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
        showToast("Booking cancel ho gayi", "info");
    };

    const submitRating = () => {
        if (!ratingVal) { showToast("Stars chunein", "error"); return; }
        setBookings(bs => bs.map(b => b.id === ratingTarget ? { ...b, rating: ratingVal } : b));
        showToast("Rating dene ke liye shukriya! ⭐", "success");
        setRatingTarget(null); setRatingVal(0);
    };


    return (
        <div className="space-y-3">
            {bookings.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                    <div className="text-5xl mb-3">📋</div>
                    <p>Abhi koi booking nahi</p>
                </div>
            )}
            {bookings.map(b => (
                <div key={b.id} className="rounded-2xl p-4 border border-slate-700/40" style={{ background: "rgba(15,20,35,0.9)" }}>
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                            {/* ✅ Added default icon */}
                            <span className="text-2xl">{serviceIcons[b.service_name] || <Wrench className="text-slate-400" />}</span>
                            <div>
                                {/* ✅ Changed 'service' to 'service_name' */}
                                <p className="text-sm font-bold text-slate-100">{b.service_name || serviceIcons[b.service_name]}</p>
                                {/* ✅ Added default provider */}
                                <p className="text-xs text-slate-500">{b.provider || "CoolTech Solutions"}</p>
                            </div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusConfig[b.status].cls}`}>{statusConfig[b.status].label}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-3 ml-11">
                        <span>📅 {b.date}</span>
                        <span>🕐 {b.time}</span>
                        <span className="text-orange-400 font-bold">₹{b.amount}</span>
                        <span className="text-slate-600">{b.id}</span>
                    </div>
                    <div className="ml-11 flex items-center justify-between">
                        {b.status?.toLowerCase() === "completed" && b.rating
                            ? <Stars value={b.rating} size="text-base" />
                            : b.status?.toLowerCase() === "completed"
                                ? <button onClick={() => setRatingTarget(b.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>⭐ Rating Dein</button>
                                : <div />}
                        {b.status === "upcoming" && (
                            <button onClick={() => cancel(b.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-colors">Cancel</button>
                        )}
                    </div>
                </div>
            ))}

            {/* Rating Modal */}
            {ratingTarget && (
                <Modal onClose={() => { setRatingTarget(null); setRatingVal(0); }}>
                    <div className="rounded-2xl p-6 border border-slate-700/50 text-center" style={{ background: "#0f1422" }}>
                        <div className="text-4xl mb-2">⭐</div>
                        <h3 className="text-lg font-black text-white mb-1">Rating Dein</h3>
                        <p className="text-xs text-slate-400 mb-5">Is service se aap kitna khush hain?</p>
                        <div className="flex justify-center mb-5">
                            <Stars value={ratingVal} onChange={setRatingVal} size="text-4xl" />
                        </div>
                        <textarea placeholder="Apna anubhav likhein (optional)..." className="w-full bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/40 resize-none h-20 mb-4" />
                        <div className="flex gap-3">
                            <button onClick={() => { setRatingTarget(null); setRatingVal(0); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-800/60 text-slate-400 border border-slate-700/40">Cancel</button>
                            <button onClick={submitRating} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>Submit ✓</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default BookingsPage;