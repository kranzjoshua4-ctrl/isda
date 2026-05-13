export function FloatingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#f7fafc] via-[#f4f7fa] to-[#e9eef5]"
    >
      <div className="grain absolute inset-0 opacity-[0.28]" />
      <div className="bg-atmosphere absolute inset-0 opacity-[0.55]" />

      <div className="absolute -left-[18%] top-[14%] h-[min(52vw,400px)] w-[min(88vw,680px)] rounded-[3rem] bg-gradient-to-r from-slate-400/10 via-slate-300/6 to-transparent blur-3xl" />
      <div className="absolute -right-[12%] bottom-[10%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgb(148_163_184/0.08),transparent_70%)] blur-3xl" />

      <div className="absolute right-[7%] top-[20%] h-28 w-44 rotate-[7deg] rounded-2xl border border-slate-400/12 bg-gradient-to-br from-white/40 to-transparent opacity-35 blur-[1.5px]" />
    </div>
  );
}
