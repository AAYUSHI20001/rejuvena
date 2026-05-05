import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import { ToastContainer, toast } from "react-toastify";
import { Menu, X, User, LogOut } from 'lucide-react'; 
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function getProfile() {
      if (!session?.user) return;

      const { data } = await supabase
        .from("users")
        .select("name, avatar_url")
        .eq("user_id", session.user.id)
        .single();

      if (data) setProfile(data);
    }

    getProfile();
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
    toast.success("Logged out Successfully");
    closeMenu();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar main-nav-wrapper">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="container">
          <div className="brand-section">
            <img src='/nav.jpg' className="logo" alt="logo" />
            <span className="heading">Glowmii  </span>
          </div>

   
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </div>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <NavLink to="/" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#4CE680' : '' })}>
              Courses
            </NavLink>
           
            {/* <NavLink to="/aidiary" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#4CE680' : '' })}>
              AI Diary
            </NavLink> */}
            {/* <NavLink to="/pricing" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#4CE680' : '' })}>
              Pricing
            </NavLink> */}

            <div className="auth-wrapper">
              {session ? (
                <>
                  <NavLink to="/memberArea" className="book-btn" onClick={closeMenu}>
                   My Courses
                  </NavLink>
              
                  {menuOpen && (
                    <button onClick={handleLogout} className="logout-btn" style={{width: 'auto'}}>
                      <LogOut size={18} /> Logout
                    </button>
                  )}
                </>
              ) : (
                <NavLink to="/login" className="book-btn" onClick={closeMenu}>
                  Start Trial
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>


      {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;

