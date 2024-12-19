export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(255,193,22)] to-black text-white relative overflow-hidden">
      {/* Background 2024 text */}
      <div
        className="absolute inset-0 top-60 text-[60rem] font-bold text-[#001a14]/10 select-none pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        2024
      </div>
      {children}
    </div>
  );
}
