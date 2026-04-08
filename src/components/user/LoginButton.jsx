import React from 'react'

function LoginButton({ onClick, user }) {
    // Agar user logged in hai, toh kuch bhi mat dikhao (null return)
    if (user) return null;

    return (
        <button
            onClick={onClick}
            className="group relative flex items-center justify-center gap-2 px-6 py-2.5 
                 bg-gradient-to-r from-orange-500 to-orange-600 
                 text-white font-bold text-sm rounded-xl
                 shadow-lg shadow-orange-500/30 
                 transition-all duration-300 ease-out
                 hover:opacity-90 hover:scale-105 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0d1117]"
        >
            <span>Login</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
            </span>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}

export default LoginButton;