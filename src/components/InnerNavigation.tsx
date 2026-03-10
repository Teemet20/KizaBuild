'use client'

/**
 * InnerNavigation
 *
 * Shared top navigation bar for all inner pages (/about, /how-it-works,
 * /plans, /stories, /faq, /contact). Uses `usePathname` to highlight the
 * currently active route with a gold underline.
 *
 * Do not use this on the home page — use `Navigation` (sections/Navigation.tsx)
 * there instead, as the home page has its own scroll-aware nav behaviour.
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Plans', href: '/plans' },
  { label: 'Stories', href: '/stories' },
  { label: 'FAQ', href: '/faq' },
];

export default function InnerNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 lg:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo-black.png"
            alt="Kiza"
            className="h-8 lg:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-kiza-dark-blue font-semibold'
                  : 'text-kiza-dark-blue/60 hover:text-kiza-dark-blue'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold text-sm"
          >
            <Link href="/#plans">Get started</Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-left text-lg transition-colors py-2 ${
                  pathname === link.href
                    ? 'text-kiza-dark-blue font-semibold'
                    : 'text-kiza-dark-blue/60 hover:text-kiza-dark-blue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold mt-2"
            >
              <Link href="/#plans" onClick={() => setIsMobileMenuOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
