"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { href: "#about", label: "About" },
  { href: "#expect", label: "What to Expect" },
  { href: "#speakers", label: "Speakers" },
  { href: "#schedule", label: "Schedule" },
  { href: "#register", label: "Register" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const onLinkClick = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="text-lg font-bold tracking-wider text-white">
          Worship Confluence
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-white/80 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-purple-300"
              onClick={onLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white/90 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-4 pt-2 text-sm font-semibold text-white/90">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 transition hover:bg-purple-900/40 hover:text-purple-100"
                  onClick={onLinkClick}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
