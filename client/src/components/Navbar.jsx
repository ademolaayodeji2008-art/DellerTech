import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 relative border-b border-white/10 bg-base-950/80 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <Logo size="sm" />
        </NavLink>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-brand-blue" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="btn-primary text-sm px-5 py-2"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="md:hidden text-slate-200 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-4 border-t border-white/10 pt-4">
          <ul className="flex flex-col gap-1 mb-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-sm font-medium ${
                      isActive ? "text-brand-blue" : "text-slate-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary text-sm text-center"
          >
            Get a Quote
          </Link>
        </div>
      )}

      {/* Scroll progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: 'transparent' }}>
        <div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #2563EB, #F59E0B)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    </header>
  );
}
