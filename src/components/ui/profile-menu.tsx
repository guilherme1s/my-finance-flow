import { LogOut, Settings, User } from "lucide-react";
import { Separator } from "./separator";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./theme/theme-toggle";
import { DropdownMenuContent } from "./dropdown-menu";

export function ProfileMenu() {
  return (
    <DropdownMenuContent align="end" className="w-auto py-3 flex flex-col gap-3">
      <div className="px-4">
        <p className="text-md font-semibold">John Doe</p>
        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
      </div>

      <Separator />

      <div className="flex items-center space-x-2 px-4">
        <User size={16} />
        <NavLink to="#" className="w-full cursor-pointer text-left">
          Perfil
        </NavLink>
      </div>

      <div className="flex items-center space-x-2 px-4">
        <Settings size={16} />
        <NavLink to="#" className="w-full cursor-pointer text-left">
          Configurações
        </NavLink>
      </div>

      <Separator />

      <div className="flex items-center md:hidden">
        <ModeToggle />
      </div>

      <Separator className="block md:hidden" />

      <div className="flex items-center space-x-2 px-4">
        <LogOut size={16} />
        <NavLink
          to="#"
          className="w-full cursor-pointer text-left font-semibold text-red-500"
        >
          Logout
        </NavLink>
      </div>
    </DropdownMenuContent>
  );
}
