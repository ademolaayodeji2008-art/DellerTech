const SIZES = {
  sm: { box: "h-8 w-8", text: "text-sm", label: "text-base" },
  md: { box: "h-10 w-10", text: "text-base", label: "text-lg" },
  lg: { box: "h-16 w-16", text: "text-2xl", label: "text-3xl" },
  xl: { box: "h-24 w-24", text: "text-4xl", label: "text-5xl" },
};

export default function Logo({ size = "md", withLabel = true, className = "" }) {
  const s = SIZES[size] || SIZES.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${s.box} rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow shrink-0`}
      >
        <span className={`font-extrabold text-base-950 tracking-tight ${s.text}`}>DT</span>
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
      </div>
      {withLabel && (
        <span className={`font-extrabold tracking-tight text-white ${s.label}`}>
          Deller<span className="gradient-text">Tech</span>
        </span>
      )}
    </div>
  );
}
