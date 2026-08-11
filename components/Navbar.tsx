"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Wordmark from "@/components/Wordmark";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "bg-navy shadow-md"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-cream">
          <Wordmark size="sm" />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-cream transition-colors hover:text-graybrand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="text-cream md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 bg-navy px-6 pb-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-wide text-cream transition-colors hover:text-graybrand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
