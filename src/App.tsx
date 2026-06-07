import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsConstellation from './components/SkillsConstellation';
import Projects from './components/Projects';
import EngineeringEvolution from './components/EngineeringEvolution';
import Certifications from './components/Certifications';
import CodingProfiles from './components/CodingProfiles';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);

  // Hide loader after assets render
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll positions for Active Section in Navbar
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'journey', 'certifications', 'coding-profiles', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger active when section occupies middle viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Luxury Minimal Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
          >
            <div className="relative flex flex-col items-center">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-gold/20 border-t-gold"
              />
              {/* Pulsing Initials */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center font-heading text-xs font-bold tracking-[0.2em] text-charcoal"
              >
                KR
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 font-heading text-[10px] font-bold tracking-[0.3em] text-gold uppercase"
              >
                KANIMOZHI R
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Layout */}
      {!loading && (
        <div className="min-h-screen flex flex-col justify-between select-text selection:bg-gold/30 selection:text-charcoal relative">
          
          {/* Active section tracker navbar */}
          <Navbar activeSection={activeSection} />

          <main className="flex-grow">
            <Hero />
            <About />
            <SkillsConstellation />
            <Projects />
            <EngineeringEvolution />
            <Certifications />
            <CodingProfiles />
            <Achievements />
            <Contact />
          </main>

          {/* Premium Minimalist Footer */}
          <footer className="w-full bg-charcoal text-white/95 py-12 border-t border-charcoal/10 font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
              
              {/* Copyright */}
              <div className="text-center md:text-left mb-6 md:mb-0">
                <span className="font-heading text-sm font-bold tracking-[0.25em] text-gold block mb-2">
                  KANIMOZHI R
                </span>
                <span className="text-xs text-warmgray tracking-wide">
                  &copy; {new Date().getFullYear()} Kanimozhi R. All rights reserved.
                </span>
              </div>

              {/* Tagline */}
              <div className="text-center md:text-right text-[11px] sm:text-xs text-warmgray max-w-sm leading-relaxed">
                Designed and built with luxury minimal guidelines. Powered by React, Tailwind CSS & Framer Motion.
              </div>

            </div>
          </footer>

        </div>
      )}
    </>
  );
}
