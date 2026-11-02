"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";

const links = [
  { href: "/3d-models", label: "3D Models" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-gray-200">
      <nav
        className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-2xl font-bold tracking-tight">
          PrintForge
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm uppercase tracking-wide transition-colors hover:text-black ${
                    isActive(link.href)
                      ? "font-semibold text-black underline underline-offset-8"
                      : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/3d-models"
            aria-label="Search models"
            className="p-2 text-gray-600 border border-gray-300 rounded-full hover:border-black hover:text-black transition"
          >
            <FiSearch size={18} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="p-2 md:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-gray-200 md:hidden">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm uppercase tracking-wide ${
                    isActive(link.href)
                      ? "font-semibold text-black"
                      : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/3d-models"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600"
              >
                <FiSearch size={16} />
                Search
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
