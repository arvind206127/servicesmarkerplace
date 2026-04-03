import React, { useState } from 'react';
import SideBaar from './SideBaar';
import DashboardHome from './DashboardHome'; // Aapka component

function MainUserDashboard() {
    const [activeNav, setActiveNav] = useState('dashboard');
    const [user, setUser] = useState({ name: "Arvind" }); //
    const [bookings, setBookings] = useState([]);

    return (
        // 'flex h-screen' ensures Sidebar and Content are side-by-side
        <div className="flex h-screen w-full bg-[#0d1117] overflow-hidden text-slate-200">

            {/* 1. Sidebar Fixed Width */}
            <div className="w-64 flex-shrink-0 border-r border-slate-800">
                <SideBaar activeNav={activeNav} onNavChange={setActiveNav} user={user} />
            </div>

            {/* 2. Content Area (Flexible) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Scrollable Main Section */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {activeNav === 'dashboard' && (
                        <DashboardHome
                            user={user}
                            bookings={bookings}
                            onNav={setActiveNav}
                            onOpenProvider={(s) => console.log("Opening:", s)}
                        />
                    )}
                    {/* Baaki pages yahan aayenge */}
                    {activeNav === 'services' && <div>Services List Page...</div>}
                </main>
            </div>
        </div>
    );
}

export default MainUserDashboard;

//