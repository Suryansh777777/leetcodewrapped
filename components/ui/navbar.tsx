import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 relative z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <span
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          24
        </span>
      </div>
    </nav>
  );
}
