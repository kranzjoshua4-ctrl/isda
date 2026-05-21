export function FloatingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#ffffff]"
    >
      <div className="grain absolute inset-0 opacity-[0.2]" />
      <div className="bg-atmosphere absolute inset-0 opacity-[0.65]" />

      <div
        className="absolute -right-[8%] top-[8%] h-[min(70vh,520px)] w-[min(55vw,480px)] -rotate-[18deg] rounded-[2.5rem] bg-gradient-to-br from-[#e8c547]/35 via-[#c9a227]/22 to-transparent"
        style={{ clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)" }}
      />

      <div className="absolute -left-[12%] top-[22%] h-[min(40vw,320px)] w-[min(50vw,420px)] rounded-full bg-[radial-gradient(circle,rgb(242_242_242/0.9),transparent_68%)] blur-3xl" />
      <div className="absolute -right-[6%] bottom-[12%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgb(201_162_39/0.08),transparent_70%)] blur-3xl" />
    </div>
  );
}
