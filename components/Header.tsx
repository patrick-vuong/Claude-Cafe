'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Coffee, Menu, X } from 'lucide-react';
import TokenWallet from '@/components/TokenWallet';
import CartIcon from '@/components/CartIcon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-coral focus:text-offwhite focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 bg-cream border-b border-amber/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <Coffee className="w-6 h-6 text-coral group-hover:text-amber transition-colors" />
              <span className="font-display text-2xl text-espresso">
                Claude Caf&eacute;
              </span>
            </Link>
            <p className="hidden sm:block text-warmgray text-sm mt-0.5 pl-8">
              Where every prompt deserves a pour
            </p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/"
              className="text-espresso hover:text-coral transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-espresso hover:text-coral transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded"
            >
              Menu
            </Link>
            <a
              href="https://github.com/patrick-vuong/Claude-Cafe/blob/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent/Claude-Skills-Tutorial-Full-Training-Up-Cafe-Agent.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-espresso hover:text-coral transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded"
            >
              Build Skills for Claude Tutorial
            </a>
            <TokenWallet />
            <CartIcon />
          </nav>

          {/* Mobile: wallet + cart + hamburger */}
          <div className="flex sm:hidden items-center gap-4">
            <TokenWallet />
            <CartIcon />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="text-espresso hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav
            className="sm:hidden border-t border-amber/20 bg-cream px-4 py-3 space-y-2"
            aria-label="Mobile navigation"
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-espresso hover:text-coral transition-colors font-medium py-2"
            >
              Home
            </Link>
            <Link
              href="/menu"
              onClick={() => setMenuOpen(false)}
              className="block text-espresso hover:text-coral transition-colors font-medium py-2"
            >
              Menu
            </Link>
            <a
              href="https://github.com/patrick-vuong/Claude-Cafe/blob/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent/Claude-Skills-Tutorial-Full-Training-Up-Cafe-Agent.md"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block text-espresso hover:text-coral transition-colors font-medium py-2"
            >
              Build Skills for Claude Tutorial
            </a>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="block text-espresso hover:text-coral transition-colors font-medium py-2"
            >
              Cart
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
