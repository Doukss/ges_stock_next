import { UserButton } from "@clerk/nextjs";
import { ListTree, Menu, PackagePlus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navLinks = [{ href: "/category", label: "categories", icon: ListTree }];

  const renderNavLinks = (baseClass: string) => (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        const activeClass = isActive ? "btn-active " : "btn-ghost ";
        return (
          <Link
            key={href}
            href={href}
            className={`${baseClass} ${activeClass} btn-sm flex gap-2 itrems-center `}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="border-b border-base-300 px-5 md:px[10%] py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2">
            <PackagePlus />
          </div>
          <span className="font-bold text-lg">Stock Management</span>
        </div>

        <button
          className="btn w-fit sm:hidden btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="hidden space-2 sm:flex items-center">
          {renderNavLinks("btn")}
          <UserButton />
        </div>
      </div>
      <div
        className={`absolute top-0 w-full bg-base-100 h-screen flex flex-col gap-2
      transition-all duration-300 sm:hidden z-50  ${
        menuOpen ? "left-0" : "left-full"
      }`}
      >
        <div className="flex justify-between">
          <UserButton />
            <button
          className="btn w-fit sm:hidden btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <X className="w-4 h-4" />
        </button>
        </div>
          {renderNavLinks("btn")}
      </div>
    </div>
  );
};

export default Navbar;
