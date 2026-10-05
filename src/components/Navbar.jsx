import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, Ticket, Compass, Award } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#hero', icon: Compass },
    { label: 'EVENT', href: '#event-details', icon: Sparkles },
    { label: 'TIMELINE', href: '#timeline', icon: Calendar },
    { label: 'GUIDELINES', href: '#guidelines', icon: Award },
    { label: 'INVITATION', href: '#invitation', icon: Ticket },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-amber-950/20' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand logo & College Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <span className="font-serif-luxury text-amber-400 text-lg font-bold">SV</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury font-bold text-slate-100 text-sm sm:text-base tracking-wider group-hover:text-amber-300 transition-colors">
                SRI VASAVI
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 border border-amber-500/40 px-1.5 py-0.2 rounded bg-amber-500/10 font-sans-modern">
                aikyam
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans-modern tracking-wide hidden sm:block">
              Engineering College (A)
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-amber-500/20 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-widest text-slate-300 hover:text-amber-300 hover:bg-amber-500/15 transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5 text-amber-400/80" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#invitation"
            className="relative group overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-xs tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 fill-slate-950" />
              GET INVITATION
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-400 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-amber-500/30 backdrop-blur-2xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold tracking-wider text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  {item.label}
                </a>
              );
            })}
            <a
              href="#invitation"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm tracking-wider shadow-lg shadow-amber-500/20"
            >
              GENERATE MY INVITATION
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
