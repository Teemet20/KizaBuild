'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

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
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('plans')}
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            Plans
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm transition-colors text-kiza-dark-blue/60 hover:text-kiza-dark-blue"
          >
            FAQ
          </button>
          <Button
            onClick={() => scrollToSection('plans')}
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
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('plans')}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              Plans
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-lg text-kiza-dark-blue/60 hover:text-kiza-dark-blue transition-colors py-2"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('plans')}
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
