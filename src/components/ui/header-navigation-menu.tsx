import { ArrowRightLeft, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Separator } from "./separator";

interface HeaderNavigationMenuProps {
  display: "desktop" | "mobile";
}

export function HeaderNavigationMenu({ display }: HeaderNavigationMenuProps) {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded px-4 py-2 transition-colors ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <nav className="flex gap-2">
      {display === "desktop" ? (
        <>
          <NavLink to="/" className={navItemClass}>
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>

          <NavLink to="/transaction" className={navItemClass}>
            <ArrowRightLeft size={16} />
            Transações
          </NavLink>
        </>
      ) : (
        <div className="flex flex-col gap-4 text-xl p-4 w-full">
          <NavLink to="/" className="flex items-center gap-2">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

					<Separator />

          <NavLink to="/transaction" className="flex items-center gap-2">
            <ArrowRightLeft size={20} />
            Transações
          </NavLink>
        </div>
      )}
    </nav>
  );
}
