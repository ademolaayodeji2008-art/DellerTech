import { useEffect } from "react";

export default function Card() {
  useEffect(() => {
    document.title = "Ademola Ayodeji Fredrick | DellerTech";
  }, []);

  function downloadVCard() {
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Ademola Ayodeji Fredrick",
      "ORG:DellerTech",
      "TITLE:Founder & Lead Developer",
      "TEL;TYPE=CELL:+2349138008234",
      "EMAIL:Dellerindustry1@gmail.com",
      "URL:https://dellertech.com.ng",
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ademola-Fredrick-DellerTech.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-base-950 flex items-center justify-center p-4">
      {/* Gradient border wrapper */}
      <div className="bg-brand-gradient p-[1px] rounded-2xl w-full max-w-sm shadow-glow">
        {/* Card */}
        <div className="bg-base-900 rounded-2xl px-8 py-10 flex flex-col items-center gap-5">
          {/* Brand name */}
          <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest">
            DellerTech
          </p>

          {/* Profile photo */}
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-full border-4 border-brand-blue shadow-glow overflow-hidden">
              <img
                src="/owner.jpeg"
                alt="Ademola Ayodeji Fredrick"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add(
                    "bg-brand-blue",
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                  const initials = document.createElement("span");
                  initials.textContent = "AF";
                  initials.className = "text-white text-3xl font-bold";
                  e.target.parentElement.appendChild(initials);
                }}
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white leading-tight">
              Ademola Ayodeji Fredrick
            </h1>
            <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mt-1">
              Founder &amp; Lead Developer
            </p>
            <p className="text-slate-400 text-sm mt-0.5">DellerTech</p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-white/10" />

          {/* Contact buttons */}
          <div className="flex flex-col gap-3 w-full">
            {/* WhatsApp */}
            <a
              href="https://wa.me/2349138008234"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-100"
              style={{backgroundColor: "#25D366"}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.534 5.853L0 24l6.335-1.52A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.374l-.36-.214-3.728.896.934-3.638-.234-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Email */}
            <a
              href="mailto:Dellerindustry1@gmail.com"
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-white bg-brand-blue transition-all hover:opacity-90 hover:scale-[1.02] active:scale-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Send an Email
            </a>

            {/* Website */}
            <a
              href="https://dellertech.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 00.284 2.253" />
              </svg>
              Visit dellertech.com.ng
            </a>
          </div>

          {/* Save Contact */}
          <button
            onClick={downloadVCard}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 bg-white/5 transition-all hover:border-brand-gold hover:text-brand-gold hover:scale-[1.02] active:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Save Contact
          </button>

          {/* Footer */}
          <p className="text-slate-600 text-xs text-center">
            &copy; DellerTech &middot; dellertech.com.ng
          </p>
        </div>
      </div>
    </div>
  );
}
