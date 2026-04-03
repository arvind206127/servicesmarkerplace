function Stars({ value, onChange, size = "text-xl" }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} onClick={() => onChange && onChange(n)}
          className={`${size} cursor-pointer transition-transform hover:scale-110 ${n <= value ? "text-amber-400" : "text-slate-600"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export default Stars;