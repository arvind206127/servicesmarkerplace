import { useState } from "react";
import Modal from "./Modal";

function BookingModal({ service, onClose, onConfirm }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:00 AM");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const confirm = () => {
        if (!date) { return; }

        // Pehle data ko ek variable mein store karein
        const finalData = {
            serviceId: service.id,
            serviceName: service.name,
            amount: service.price,
            date,
            time,
            address,
            phone
        };

        console.log("------- FORM DATA SUBMITTED -------");
        console.table(finalData); 

        onConfirm(finalData);
    };

    return (
        <Modal onClose={onClose}>
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "#0f1422" }}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-black text-white">Service Book Karein</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xl leading-none">✕</button>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${service.border} bg-gradient-to-r ${service.bg} mb-4`}>
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                        <p className="text-sm font-bold text-slate-100">{service.name}</p>
                        <p className="text-xs text-slate-400">{service.provider}</p>
                    </div>
                </div>
                {[
                    { label: "Tarikh Chunein", el: <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500/60" /> },
                    { label: "Samay Chunein", el: <select value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none">{["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map(t => <option key={t}>{t}</option>)}</select> },
                    { label: "Phone", el: <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500/60" /> },
                    { label: "Address", el: <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Ghar ka pura address likhein" className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/60" /> },
                ].map(f => (
                    <div key={f.label} className="mb-4">
                        <label className="text-xs text-slate-400 mb-1.5 block font-medium">{f.label}</label>
                        {f.el}
                    </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 mb-4">
                    <span className="text-sm text-slate-400">Total Amount</span>
                    <span className="text-lg font-black text-orange-400">₹{service.price}</span>
                </div>
                <button onClick={confirm} disabled={!date}
                    className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all ${date ? "shadow-lg shadow-orange-500/20 hover:opacity-90 active:scale-95" : "opacity-40 cursor-not-allowed"}`}
                    style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
                    Booking Confirm Karein ✓
                </button>
                {!date && <p className="text-xs text-rose-400 text-center mt-2">Pehle tarikh chunein</p>}
            </div>
        </Modal>
    );
}

export default BookingModal;