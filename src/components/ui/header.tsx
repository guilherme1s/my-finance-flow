import { Button } from "./button";
import { Separator } from "./separator";
import { HeaderNavigationMenu } from "./header-navigation-menu";
import { ChevronDown, LayoutDashboard, Menu, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ProfileMenu } from "./profile-menu";

export function Header() {
  return (
    <header className="border-b border-border bg-background px-6 min-[1720px]:px-0">
      <div className="mx-auto flex w-full max-w-430 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2 text-white">
              <LayoutDashboard size={20} />
            </div>

            <h1 className="text-xl font-semibold text-foreground">
              MyFinanceFlow
            </h1>
          </NavLink>
          <Separator orientation="vertical" />

          <div className="hidden md:flex">
            <HeaderNavigationMenu display="desktop" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-auto">
                <HeaderNavigationMenu display="mobile" />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                <span className="block md:hidden">
                  <User size={20} />
                </span>

                <div className="hidden items-center gap-2 md:flex">
                  John Doe
                  <ChevronDown size={16} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <ProfileMenu />
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
