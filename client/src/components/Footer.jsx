import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Web Hosting & Deployment",
  "IT Consulting",
  "DellerTech Coding School",
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 bg-base-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-brand-gold font-semibold text-sm">We Build. We Teach. We Deliver.</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              DellerTech is a Nigerian tech company delivering professional web solutions and coding education.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-slate-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Dellerindustry1@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue flex-shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Dellerindustry1@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349138008234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.475 5.77L0 24l6.389-1.459A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.6-.5-5.1-1.37l-.366-.211-3.793.866.9-3.692-.233-.381A9.946 9.946 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  +2349138008234
                </a>
              </li>
              <li className="text-slate-400 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue flex-shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Nigeria
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} DellerTech. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">Registered in Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
