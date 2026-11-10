"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { PhoneIcon } from "./Icons";
import { LINKS } from "@/lib/config";

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/#categories", label: "التصنيفات" },
  { href: "/catalog", label: "الكتالوج" },
  { href: "/#wholesale", label: "تجار الجملة" },
  { href: "/#contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-ink/80 transition hover:text-gold-dark"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SocialLinks itemClass="h-9 w-9 border-gold/40 text-gold-dark hover:bg-gold hover:text-ink" />
          <Link href="/catalog" className="btn btn-dark !py-2.5">
            استكشف الكتالوج
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 lg:hidden"
          aria-label="القائمة"
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute inset-x-0 h-0.5 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute inset-x-0 top-1.5 h-0.5 bg-ink transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute inset-x-0 h-0.5 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-ink px-5 pb-6 pt-4 text-cream lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-base font-semibold hover:text-gold-light"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={LINKS.phoneHref}
            className="mt-4 flex items-center gap-2 text-gold-light"
            dir="ltr"
          >
            <PhoneIcon /> {LINKS.phone}
          </a>
          <SocialLinks className="mt-4" />
        </div>
      )}
    </header>
  );
}
