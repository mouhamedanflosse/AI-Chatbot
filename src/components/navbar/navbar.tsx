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

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:ml-4">
            <Link
              href="/sign-in"
              className="inline-flex items-center rounded-sm px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold shadow-sm hover:opacity-95"
            >
              Free Trial
            </Link>
          </div>

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

        {/* Mobile full-screen overlay panel */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <Link href="/" className="inline-flex items-center no-underline">
                <span className="sr-only">afs home</span>
                <span className="logo-font bg-clip-text text-2xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700">
                  afs
                </span>
              </Link>

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <ul className="flex w-full max-w-md flex-col items-stretch gap-4 text-lg font-medium text-neutral-800 dark:text-neutral-100">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block w-full rounded-lg px-4 py-4 text-center hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 w-full max-w-md">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md bg-[hsl(var(--primary))] px-6 py-3 text-center text-[hsl(var(--primary-foreground))] font-semibold shadow-sm"
                >
                  Free Trial
                </Link>
              </div>
            </div>

            <div className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} afs — All rights reserved
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
