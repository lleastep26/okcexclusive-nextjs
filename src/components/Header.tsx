"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CloseIcon, MenuIcon, SparkleIcon } from "./Icons";
import { CONTACT, NAV_LINKS, SITE_NAME } from "@/lib/constants";

function HeaderContent({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-slate-950 transition-opacity hover:opacity-80"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-emerald-400">
            <SparkleIcon className="h-5 w-5" />
          </span>
          <span className="hidden font-display text-lg font-semibold sm:block">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-accent"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CONTACT.phoneHref}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            {CONTACT.phone}
          </a>
          <Button href="/book" size="sm">
            Book a Clean
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <nav className="section-container flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-3 text-base font-medium ${
                    active
                      ? "bg-emerald-50 text-accent"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={CONTACT.phoneHref}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
              onClick={closeMenu}
            >
              Call {CONTACT.phone}
            </a>
            <div className="pt-2">
              <Button href="/book" className="w-full" onClick={closeMenu}>
                Book a Clean
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Header() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}
