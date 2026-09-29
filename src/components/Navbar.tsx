import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Coding Profiles', href: '#coding-profiles', id: 'coding-profiles' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 90; // account for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 py-4 pointer-events-none">
      <nav 
        className={`mx-auto max-w-7xl w-full rounded-full transition-all duration-500 pointer-events-auto border ${
          scrolled 
            ? 'glass py-2.5 px-6 shadow-lg shadow-charcoal/5 bg-white/80 border-bordercolor/80 backdrop-blur-md' 
            : 'bg-white/50 py-3.5 px-8 border-bordercolor/40 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Mark / Logo on Left for Quick Recognition */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="group flex items-center space-x-2 text-charcoal font-heading font-bold text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="w-7 h-7 rounded-full bg-charcoal text-white flex items-center justify-center text-[11px] font-extrabold group-hover:bg-gold transition-colors duration-300">
              D
            </span>
            <span className="hidden lg:inline text-xs font-bold tracking-[0.2em]">DEEPIKA D</span>
          </a>

          {/* Mobile Menu Button with Animated Hamburger Morph */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal hover:text-gold transition-colors duration-300 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-charcoal rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5 bg-gold' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-charcoal rounded-full transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-charcoal rounded-full transition-all duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-1.5 bg-gold' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* All Nav Items — centered interactive pill row */}
          <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 bg-ivory/60 p-1 rounded-full border border-bordercolor/50">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'text-charcoal font-semibold' 
                      : 'text-warmgray hover:text-charcoal'
                  }`}
                >
                  {/* Sliding Active Pill Background */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm border border-bordercolor/60 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Connect & Resume Buttons */}
          <div className="flex items-center flex-shrink-0 space-x-2 sm:space-x-3">
            <a
              href="/Deepika_Resume.pdf"
              download="Deepika_Resume.pdf"
              className="group hidden sm:flex items-center space-x-1.5 rounded-full bg-white text-charcoal hover:bg-gold/10 hover:text-charcoal transition-all duration-300 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase border border-bordercolor/80 hover:border-gold/50 shadow-sm"
            >
              <span>Resume</span>
              <Download size={13} className="text-gold group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group flex items-center space-x-1.5 rounded-full bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-all duration-300 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border border-charcoal hover:border-gold shadow-sm hover:shadow-gold/20"
            >
              <span>Connect</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 left-4 right-4 glass rounded-3xl border border-bordercolor/80 shadow-2xl py-6 px-6 flex flex-col space-y-3 md:hidden pointer-events-auto bg-white/95 backdrop-blur-xl"
          >
            {navItems.map((item, idx) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`font-medium text-xs uppercase tracking-widest py-2.5 px-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-charcoal font-bold bg-gold/15 border border-gold/30' 
                    : 'text-charcoal/70 hover:bg-ivory hover:text-charcoal'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            
            {/* Mobile Resume Link */}
            <div className="pt-2 border-t border-bordercolor/60 flex items-center justify-between">
              <a
                href="/Deepika_Resume.pdf"
                download="Deepika_Resume.pdf"
                className="flex items-center space-x-2 py-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-gold"
              >
                <Download size={14} className="text-gold" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
