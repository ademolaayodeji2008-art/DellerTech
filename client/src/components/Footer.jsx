import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo size="sm" />

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
        </div>

        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} DellerTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
