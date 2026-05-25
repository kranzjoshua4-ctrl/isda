export function FloatingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-page-gradient"
    >
      <div className="grain absolute inset-0 opacity-[0.18]" />
      <div className="bg-atmosphere absolute inset-0 opacity-[0.6]" />
      <div className="absolute -left-[10%] top-[28%] h-[min(38vw,300px)] w-[min(48vw,400px)] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.85),transparent_68%)] blur-3xl" />
    </div>
  );
}
