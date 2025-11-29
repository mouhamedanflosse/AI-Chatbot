"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "News Room", href: "/news" },
  { label: "Features", href: "/features" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center no-underline">
              <span className="sr-only">afs home</span>
              <span className="logo-font bg-clip-text text-3xl font-extrabold text-transparent tracking-tight bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700">
                afs
              </span>
              <span className="ml-2 -mt-1 text-cyan-400/80">❦</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex md:items-center md:space-x-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative inline-block px-2 py-1 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile actions */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-zinc-800"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden mt-2 rounded-lg border bg-white/60 p-3 shadow-sm dark:bg-zinc-900/70">
            <ul className="flex flex-col gap-2 text-base">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
