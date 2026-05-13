import { AmbientCursorGlow } from "@/components/ambient/AmbientCursorGlow";
import { FloatingBackground } from "@/components/ambient/FloatingBackground";
import { GlassNavbar } from "@/components/layout/GlassNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FloatingBackground />
      <AmbientCursorGlow />
      <GlassNavbar />
      <div className="relative z-10 flex min-h-screen flex-col pt-[4.25rem]">
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
