import { useEffect, useState } from 'react'
import './App.css'
import DashboardHome from './components/user/DashboardHome'
import Toast from './components/user/Toast';
import AuthPage from './components/user/AuthPage';
import Sidebar from './components/user/Sidebar';
import BottomNav from './components/user/BottomNav';
import ProviderModal from './components/user/ProviderModal';
import BookingModal from './components/user/BookingModal';
import BookingsPage from './components/user/BookingsPage';
import SettingsPage from './components/user/SettingsPage';
import ServicesPage from './components/user/ServicesPage';
import ProfilePage from './components/user/ProfilePage';
import { createBooking, fetchUserDashboard } from './API/api';
import LoginButton from './components/user/LoginButton';

function App() {
  const [page, setPage] = useState("auth");
  const [user, setUser] = useState(null);
  const [nav, setNav] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [providerService, setProviderService] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // 1. Pehle user state restore karein
      setPage("dashboard");

      // 2. Phir data fetch karein
      const syncData = async () => {
        try {
          console.log("Fetching data from backend..."); // 1. Check if this prints
          const res = await fetchUserDashboard();
          console.log("Backend Response:", res.data);   // 2. Check if this prints
          if (res.data.success) {
            setUser(res.data.user)
            setBookings(res.data.bookings);
          }
        } catch (err) {
          console.error("API Error details:", err.response || err); // 3. Check exact error
        }
      };
      syncData();
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setPage("dashboard");
    showToast(`Welcome, ${u.name}! 🙏`);
  };

  const handleLogout = () => {
    localStorage.clear(); // Sab saaf karein
    setUser(null);
    setPage("dashboard");
    setNav("dashboard");
  };

  // App.js mein is function ko sahi karein
  const confirmBooking = async (bookingDataFromModal) => {
    try {
      if (!user) {
        showToast("please login to book a service")
        setPage("auth")
        setBookingService(null);
        return;
      }

      // 1. Loader ya Toast dikhayein
      showToast("Booking process ho rahi hai...", "info");

      // 2. API call (Isme withCredentials already set hai aapke api.js mein)
      const res = await createBooking(bookingDataFromModal);

      if (res.data.success) {
        // Backend se aane wala 'newBooking' use karein
        setBookings(prev => [...prev, res.data.newBooking]);
        setBookingService(null);
        showToast("Booking Successful! ✓", "success");
      }
    } catch (err) {
      // Agar token nahi hoga, toh middleware 401 error dega jo yahan catch hoga
      const errorMsg = err.response?.data?.message || "Unauthorized! Please login.";
      showToast(errorMsg, "error");
    }
  };

  const pageTitles = { dashboard: "Dashboard", services: "Services", bookings: "Meri Bookings", profile: "Profile", settings: "Settings" };

  if (page === "auth") return <AuthPage onLogin={handleLogin} />;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#090d18" }}>
      <Sidebar user={user} active={nav} onChange={setNav} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-700/40 flex-shrink-0" style={{ background: "#0d1222" }}>
          <h2 className="text-base font-black text-slate-100" style={{ fontFamily: "Georgia, serif" }}>{pageTitles[nav]}</h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <LoginButton user={user} onLogin={handleLogin} onLogout={handleLogout} onClick={() => setPage("auth")} />
            <div className="relative cursor-pointer">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-slate-800/60 border border-slate-700/40 hover:border-orange-500/30 transition-colors">🔔</div>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ background: "#f97316" }}>3</span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white cursor-pointer shadow-md shadow-orange-500/20" style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
              {(user?.name || "U")[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6">
          {nav === "dashboard" && <DashboardHome user={user} bookings={bookings} onNav={setNav} onOpenProvider={setProviderService} />}
          {nav === "services" && <ServicesPage onBook={setBookingService} onOpenProvider={setProviderService} />}
          {nav === "bookings" && <BookingsPage bookings={bookings} setBookings={setBookings} showToast={showToast} />}
          {nav === "profile" && <ProfilePage user={user} bookings={bookings} onNav={setNav} />}
          {nav === "settings" && <SettingsPage user={user} setUser={setUser} onLogout={handleLogout} showToast={showToast} />}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav active={nav} onChange={setNav} />

      {/* Modals */}
      {bookingService && <BookingModal service={bookingService} onClose={() => setBookingService(null)} onConfirm={confirmBooking} />}
      {providerService && <ProviderModal service={providerService} onClose={() => setProviderService(null)} onBook={setBookingService} />}

      <Toast toast={toast} />
    </div>
  );
}
export default App
