import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import styles from "./Navbar.module.css";

function NavbarComponent() {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.navLogo} onClick={closeMobile}>
            <span className={styles.logoIcon}>✈</span> TripVerse
          </NavLink>

          <div className={styles.navLinks}>
            <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`} end>Home</NavLink>
            <NavLink to="/trips" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>Explore</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>About</NavLink>
            {user && (
              <>
                <NavLink to="/myBookings" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>My Bookings</NavLink>
                <NavLink to="/profile" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>Profile</NavLink>
              </>
            )}
            {user ? (
              <button onClick={handleLogout} className={styles.navCta} style={{ background: "rgba(239,68,68,.9)" }}>Logout</button>
            ) : (
              <NavLink to="/auth" className={styles.navCta}>Sign Up</NavLink>
            )}
          </div>

          <button className={styles.hamburger} onClick={() => setIsOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`${styles.mobileNav} ${isOpen ? styles.mobileOpen : ""}`}>
        <button className={styles.closeBtn} onClick={closeMobile} aria-label="Close menu">&times;</button>
        <NavLink to="/" onClick={closeMobile}>Home</NavLink>
        <NavLink to="/trips" onClick={closeMobile}>Explore</NavLink>
        <NavLink to="/about" onClick={closeMobile}>About</NavLink>
        {user && (
          <>
            <NavLink to="/myBookings" onClick={closeMobile}>My Bookings</NavLink>
            <NavLink to="/profile" onClick={closeMobile}>Profile</NavLink>
          </>
        )}
        {user ? (
          <button onClick={handleLogout} className={styles.mobileLogout}>Logout</button>
        ) : (
          <NavLink to="/auth" onClick={closeMobile}>Sign Up</NavLink>
        )}
      </div>
    </>
  );
}

export default NavbarComponent;
