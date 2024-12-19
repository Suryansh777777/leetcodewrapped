export function UserCount() {
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-full border-2 border-[#001a14] bg-gradient-to-br from-[#ffa116] to-[#ff6b6b]"
          />
        ))}
      </div>
      <p className="text-sm">
        <span className="font-semibold">150+ users</span> have checked their
        Wrapped so far
      </p>
    </div>
  );
}
