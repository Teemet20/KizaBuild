'use client'

/**
 * Navigation  (home page)
 *
 * Top navigation bar used exclusively on the home page (/).
 * All links use Next.js `<Link>` for client-side routing; the
 * "Get started" button routes to /plans.
 *
 * For all inner pages (/about, /plans, etc.) use `InnerNavigation` instead,
 * which highlights the active route via `usePathname`.
 */

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 lg:py-5">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src="/logo-black.png"
            alt="Kiza"
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            About
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            How it works
          </Link>
          <Link
            href="/plans"
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            Plans
          </Link>
          <Link
            href="/stories"
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            Stories
          </Link>
          <Link
            href="/faq"
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            FAQ
          </Link>
          <Button
            asChild
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold text-sm"
          >
            <Link href="/plans">Get started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 transition-colors text-kiza-dark-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              How it works
            </Link>
            <Link
              href="/plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              Plans
            </Link>
            <Link
              href="/stories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              Stories
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              FAQ
            </Link>
            <Button
              asChild
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold mt-2"
            >
              <Link href="/plans" onClick={() => setIsMobileMenuOpen(false)}>Get started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
