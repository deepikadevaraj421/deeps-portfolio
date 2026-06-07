import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';

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
        className={`mx-auto max-w-7xl w-full rounded-full transition-all duration-500 pointer-events-auto border border-bordercolor/80 ${
          scrolled 
            ? 'glass py-3 px-6 shadow-md shadow-charcoal/5 bg-white/70' 
            : 'bg-white/40 py-4 px-8 border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal hover:text-gold transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* All Nav Items — single centered row */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`relative font-medium text-xs lg:text-sm uppercase tracking-widest transition-colors duration-300 ${
                  activeSection === item.id 
                    ? 'text-gold' 
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeDot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Connect Button */}
          <div className="flex items-center flex-shrink-0 space-x-2 sm:space-x-3">
            <a
              href="resume/Kanimozhi_R_Resume.pdf"
              download
              className="group hidden sm:flex items-center space-x-1 rounded-full bg-white/60 text-charcoal hover:bg-gold/10 transition-all duration-300 px-4 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold tracking-wider uppercase border border-bordercolor/60 hover:border-gold shadow-sm backdrop-blur-md"
            >
              <span>Resume</span>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group flex items-center space-x-1 rounded-full bg-charcoal text-white hover:bg-gold transition-all duration-300 px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-semibold tracking-wider uppercase border border-charcoal hover:border-gold"
            >
              <span>Connect</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-4 right-4 glass rounded-3xl border border-bordercolor/80 shadow-xl py-6 px-8 flex flex-col space-y-5 md:hidden pointer-events-auto bg-white/95"
          >
            {navItems.map((item, idx) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`font-medium text-xs uppercase tracking-widest py-2 border-b border-bordercolor/40 transition-colors duration-300 ${
                  activeSection === item.id ? 'text-gold font-semibold' : 'text-charcoal/70'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
