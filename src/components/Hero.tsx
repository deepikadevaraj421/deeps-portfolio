import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Custom Typewriter Effect
  const words = [
    "AI & ML Student",
    "AWS Certified Cloud Practitioner",
    "MLOps Enthusiast",
    "MERN Stack Developer",
    "Cloud Enthusiast",
    "Problem Solver"
  ];
  
  const [wordIdx, setWordIdx] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (subIndex === words[wordIdx].length + 1 && !isDeleting) {
      // pause at end of word
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIdx]);

  // Adjust typing speed dynamically for smooth typing feel
  useEffect(() => {
    if (isDeleting) {
      setTypingSpeed(40);
    } else {
      setTypingSpeed(100 + Math.random() * 80);
    }
  }, [subIndex, isDeleting]);

  // Canvas floating neural connection animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = Math.min(60, Math.floor((width * height) / 20000));
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'rgba(212, 180, 131, 0.4)';
        c.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 180, 131, ${0.15 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ivory pt-20"
    >
      {/* Background Interactive Network */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Decorative Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Small Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-gold uppercase bg-white px-4 py-2 rounded-full border border-bordercolor/80 shadow-sm">
            LET'S BUILD SOMETHING IMPACTFUL TOGETHER
          </span>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal mb-4"
        >
          Hi, I'm <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-charcoal via-gold to-charcoal">Kanimozhi R</span>
        </motion.h1>

        {/* Animated Typewriter Subheading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-6"
        >
          <p className="text-lg sm:text-2xl font-semibold font-heading text-gold tracking-wide">
            {words[wordIdx].substring(0, subIndex)}
            <span className="inline-block w-[2px] h-[1em] ml-1 bg-gold animate-[pulse_0.8s_infinite] align-middle" />
          </p>
        </motion.div>

        {/* Tagline & Short Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="text-md sm:text-xl font-medium text-charcoal/90 mb-4 tracking-wide font-heading">
            Building AI-Powered Applications, Scalable Cloud Systems, and the Future of MLOps.
          </h2>
          <p className="text-sm sm:text-base text-warmgray leading-relaxed mb-10">
            I am a Computer Science (AI & ML) student passionate about Artificial Intelligence, Cloud Computing, Full Stack Development, and MLOps. I enjoy building intelligent and scalable solutions that create real-world impact.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-12"
        >
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="group flex items-center justify-center space-x-2 bg-charcoal text-white hover:bg-gold transition-all duration-300 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase shadow-lg shadow-charcoal/10 hover:shadow-gold/15"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="resume/Kanimozhi_R_Resume.pdf"
            download
            className="group flex items-center justify-center space-x-2 bg-white/60 text-charcoal hover:bg-gold/10 border border-bordercolor/60 transition-all duration-300 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase shadow-sm backdrop-blur-md"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Social Profile Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex items-center space-x-6 sm:space-x-8"
        >
          <a
            href="https://www.linkedin.com/in/kani03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warmgray hover:text-gold transition-colors duration-300"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/kanimozhi2630"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warmgray hover:text-gold transition-colors duration-300"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://leetcode.com/u/Kanimozhi_R/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warmgray hover:text-gold transition-colors duration-300"
            title="LeetCode"
          >
            {/* Custom LeetCode Icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="inline-block">
              <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.08.697-1.728.697a2.4 2.4 0 0 1-1.728-.697l-5.141-4.97a2.503 2.503 0 0 1 0-3.475l5.141-4.97a2.4 2.4 0 0 1 1.728-.697c.648 0 1.262.248 1.728.697l2.697 2.607c.466.45.693 1.09.627 1.769-.067.678-.427 1.248-.96 1.529l-3.66 1.94a.78.78 0 0 0-.34.693c0 .285.139.544.385.69l3.5 2.07c.533.28 1 .84 1.066 1.52.066.68-.16 1.32-.627 1.77zM15 2.44a.75.75 0 0 0-1.077-.689l-9.141 4.97a1.5 1.5 0 0 0-.782 1.31v10.518c0 .524.277 1.007.729 1.272l9.141 5.378a.75.75 0 0 0 1.13-.647V15c0-.414-.336-.75-.75-.75h-3.328a.75.75 0 0 0 0 1.5h2.578v5.828l-7.791-4.582V8.349l7.791-4.237V6.75c0 .414.336.75.75.75h3.328a.75.75 0 0 0 0-1.5H15V2.44z" />
            </svg>
          </a>
          <a
            href="https://www.skillrack.com/profile/442656/cbe22aiml014"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warmgray hover:text-gold transition-colors duration-300"
            title="Skillrack"
          >
            {/* Custom Skillrack Icon (Award/Trophy style) */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
              <path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
            </svg>
          </a>
          <a
            href="mailto:kanimozhi.r2024aiml@sece.ac.in"
            className="text-warmgray hover:text-gold transition-colors duration-300"
            title="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto z-10"
        onClick={handleScrollToProjects}
      >
        <span className="text-[9px] tracking-[0.25em] text-warmgray uppercase mb-2">Scroll</span>
        <div className="w-[1.5px] h-6 bg-gold/50 rounded-full" />
      </motion.div>
    </section>
  );
}
