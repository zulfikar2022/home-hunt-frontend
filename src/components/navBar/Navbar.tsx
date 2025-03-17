"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavItem } from "./navItem/navItem";
import { ModeToggle } from "./Mode/ModeToggle";
import { usePathname } from "next/navigation";
import { TRoute } from "@/routes";

export default function Navbar({ routes }: { routes: TRoute[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className=" shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          HomeHunt
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <NavItem
              customClassNames={
                pathname === route.href
                  ? "text-blue-600 underline font-bold"
                  : ""
              }
              key={route.value}
              href={route.href}
            >
              {route.value}
            </NavItem>
          ))}

          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col space-y-4 p-6">
            <SheetTitle></SheetTitle>
            {routes.map((route) => (
              <NavItem
                key={route.value}
                href={route.href}
                onClick={() => setOpen(false)}
                customClassNames={
                  pathname === route.href
                    ? "text-blue-600 underline font-bold"
                    : ""
                }
              >
                {route.value}
              </NavItem>
            ))}
            <ModeToggle />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
