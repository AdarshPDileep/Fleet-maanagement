import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/#about" },
    { id: "services", label: "Services", path: "/#services" },
    { id: "track", label: "Track", path: "/track" },
    { id: "rentals", label: "Rentals", path: "/rentals" },
    { id: "packages", label: "Packages", path: "/my-packages" },
    { id: "contact", label: "Contact", path: "/#contact" },
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a href="#home" className="brand" onClick={() => setActiveLink("home")}>
        <div className="brand-mark">
          <span className="brand-mark-text">FM</span>
          <span className="brand-mark-ring" />
        </div>
        <div className="brand-text">
          <span className="brand-name">FleetCare</span>
          <span className="brand-sub">Management System</span>
        </div>
      </a>

      <nav className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className={`nav-link ${activeLink === link.id ? "nav-link-active" : ""}`}
            onClick={() => setActiveLink(link.id)}
          >
            {link.label}
            <span className="nav-link-underline" />
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <Link to="/partner" className="nav-btn-green">Be a Partner</Link>
        <Link to="/login" className="nav-btn">
          <span>Login</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </Link>
      </div>

      <button
        className={`hamburger ${menuOpen ? "hamburger-open" : ""}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`mobile-link ${activeLink === link.id ? "mobile-link-active" : ""}`}
              onClick={() => { setActiveLink(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-actions">
          <Link to="/partner" className="nav-btn-outline w-full" onClick={() => setMenuOpen(false)}>Be a Partner</Link>
          <Link to="/login" className="nav-btn w-full" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
