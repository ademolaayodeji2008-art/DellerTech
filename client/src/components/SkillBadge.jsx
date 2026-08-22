export default function SkillBadge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-slate-300">
      {children}
    </span>
  );
}
