'use client'

/**
 * Navigation  (one-pager)
 *
 * Fixed top bar with anchor links that smooth-scroll to section IDs.
 * "Get started" scrolls to #plans. Active section is highlighted via
 * IntersectionObserver so the nav reflects where the visitor is.
 */

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'The problem', href: '#about' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Plans', href: '#plans' },
  { label: 'Your family', href: '#community' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track which section is in view
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 lg:py-5">
        {/* Logo — scrolls to top */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center"
        >
          <img
            src="/logo-black.png"
            alt="Kiza"
            className="h-8 lg:h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`text-sm transition-colors ${
                activeSection === href.replace('#', '')
                  ? 'text-kiza-dark-blue font-medium'
                  : 'text-kiza-dark-blue/60 hover:text-kiza-dark-blue'
              }`}
            >
              {label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo('#plans')}
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold text-sm"
          >
            Get started
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
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`text-left text-lg transition-colors py-2 ${
                  activeSection === href.replace('#', '')
                    ? 'text-kiza-dark-blue font-medium'
                    : 'text-kiza-dark-blue/60 hover:text-kiza-dark-blue'
                }`}
              >
                {label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo('#plans')}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 font-semibold mt-2"
            >
              Get started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
