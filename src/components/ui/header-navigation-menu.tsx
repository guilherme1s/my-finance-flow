import { ArrowRightLeft, LayoutDashboard, Tag } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Separator } from "./separator";

interface HeaderNavigationMenuProps {
  display: "desktop" | "mobile";
}

export function HeaderNavigationMenu({ display }: HeaderNavigationMenuProps) {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded px-4 py-2 transition-colors ${
      isActive
        ? "bg-primary/10 dark:bg-primary/20 text-primary"
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

          <NavLink to="/category" className={navItemClass}>
            <Tag size={16} />
            Categorias
          </NavLink>
        </>
      ) : (
        <div className="flex w-full flex-col gap-4 p-4 text-xl">
          <NavLink to="/" className="flex items-center gap-2">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <Separator />

          <NavLink to="/transaction" className="flex items-center gap-2">
            <ArrowRightLeft size={20} />
            Transações
          </NavLink>

          <Separator />

          <NavLink to="/category" className="flex items-center gap-2">
            <ArrowRightLeft size={20} />
            Categorias
          </NavLink>
        </div>
      )}
    </nav>
  );
}
