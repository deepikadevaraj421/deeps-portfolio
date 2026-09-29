import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDownRight } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  logo: string;
  domain: string;
  category: 'PROGRAMMING LANGUAGES' | 'WEB DEVELOPMENT' | 'CLOUD & DEVOPS' | 'AI & ML';
  ring: 1 | 2 | 3;
}

interface CategoryGroup {
  title: 'PROGRAMMING LANGUAGES' | 'WEB DEVELOPMENT' | 'CLOUD & DEVOPS' | 'AI & ML';
  skills: SkillItem[];
}

// All 21 authentic skills preserved exactly
const ALL_SKILLS: SkillItem[] = [
  // PROGRAMMING LANGUAGES (4)
  {
    id: 'c',
    name: 'C',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    domain: 'Systems & Core Fundamentals',
    category: 'PROGRAMMING LANGUAGES',
    ring: 1,
  },
  {
    id: 'cpp',
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    domain: 'High Performance DSA',
    category: 'PROGRAMMING LANGUAGES',
    ring: 1,
  },
  {
    id: 'java',
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    domain: 'Enterprise & OOP',
    category: 'PROGRAMMING LANGUAGES',
    ring: 1,
  },
  {
    id: 'python',
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    domain: 'AI, ML & Scripting',
    category: 'PROGRAMMING LANGUAGES',
    ring: 1,
  },

  // WEB DEVELOPMENT (9)
  {
    id: 'html',
    name: 'HTML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    domain: 'Semantic Markup',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'css',
    name: 'CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    domain: 'Modern Styling',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    domain: 'Async & ES6+',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'react',
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    domain: 'Component Architecture',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    domain: 'Backend Services',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'express',
    name: 'Express.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    domain: 'RESTful Routing',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    domain: 'NoSQL Document Store',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    domain: 'Relational Database',
    category: 'WEB DEVELOPMENT',
    ring: 2,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    domain: 'ACID Relational SQL',
    category: 'WEB DEVELOPMENT',
    ring: 3,
  },

  // CLOUD & DEVOPS (6)
  {
    id: 'aws',
    name: 'AWS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    domain: 'Cloud Services & Deploy',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },
  {
    id: 'git',
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    domain: 'Version Control',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },
  {
    id: 'github',
    name: 'GitHub',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    domain: 'CI/CD & Collaboration',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },
  {
    id: 'linux',
    name: 'Linux',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    domain: 'CLI & Server OS',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },
  {
    id: 'docker',
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    domain: 'Containerization',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
    domain: 'Cluster Orchestration',
    category: 'CLOUD & DEVOPS',
    ring: 3,
  },

  // AI & ML (2)
  {
    id: 'ml',
    name: 'Machine Learning',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    domain: 'CNNs & Regression',
    category: 'AI & ML',
    ring: 3,
  },
  {
    id: 'mlops',
    name: 'MLOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    domain: 'Model Pipelines',
    category: 'AI & ML',
    ring: 3,
  },
];

// Categorized structure matching reference image exactly
const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    title: 'PROGRAMMING LANGUAGES',
    skills: ALL_SKILLS.filter((s) => s.category === 'PROGRAMMING LANGUAGES'),
  },
  {
    title: 'WEB DEVELOPMENT',
    skills: ALL_SKILLS.filter((s) => s.category === 'WEB DEVELOPMENT'),
  },
  {
    title: 'CLOUD & DEVOPS',
    skills: ALL_SKILLS.filter((s) => s.category === 'CLOUD & DEVOPS'),
  },
  {
    title: 'AI & ML',
    skills: ALL_SKILLS.filter((s) => s.category === 'AI & ML'),
  },
];

// 3 Concentric Orbit Rings
const ORBIT_RINGS = [
  { ring: 1, radius: 135, speed: 30, dir: 'cw' as const },
  { ring: 2, radius: 240, speed: 45, dir: 'ccw' as const },
  { ring: 3, radius: 345, speed: 60, dir: 'cw' as const },
];

export default function SkillsConstellation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // isGrid = false -> Orbit View
  // isGrid = true  -> Categorized Grid View
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [isSlowingDown, setIsSlowingDown] = useState<boolean>(false);
  const [orbitScale, setOrbitScale] = useState<number>(1);
  const hasTriggeredTransition = useRef<boolean>(false);

  // Clear any old sessionStorage from previous iterations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('deepika_skills_grid_active');
    }
  }, []);

  // Responsive scaling for the orbit canvas so it fits all viewports
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setOrbitScale(0.46);
      } else if (width < 640) {
        setOrbitScale(0.58);
      } else if (width < 768) {
        setOrbitScale(0.72);
      } else if (width < 1024) {
        setOrbitScale(0.86);
      } else {
        setOrbitScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // SCROLL-DIRECTION LOGIC:
  // 1. Scrolling down from above -> Show the Orbit!
  // 2. Scrolling up from below -> Hide the Orbit (show categorized grid directly)!
  // 3. User leaves section and later approaches again scrolling down -> Show Orbit again!
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Condition 1: User is completely ABOVE the Skills section (e.g. Hero, About)
      if (rect.top > windowHeight * 0.4 || currentScrollY < 150) {
        // Prepare Orbit mode so when user scrolls down, Orbit is immediately visible
        setIsGrid(false);
        setIsSlowingDown(false);
        hasTriggeredTransition.current = false;
        return;
      }

      // Condition 2: User is completely BELOW the Skills section (e.g. Projects, Contact)
      if (rect.bottom < 0) {
        // User has passed Skills; if they scroll up, do NOT show orbit
        setIsGrid(true);
        return;
      }

      // Condition 3: User is scrolling UP from below into the Skills section
      if (isScrollingUp && rect.bottom > 0 && rect.bottom < windowHeight) {
        // Do NOT show the orbit when scrolling upward from below
        if (!isGrid) {
          setIsGrid(true);
        }
      }

      // Condition 4: User is scrolling DOWN from above into the Skills section
      if (isScrollingDown && !hasTriggeredTransition.current && rect.top < windowHeight * 0.85) {
        // When approaching while scrolling down, ensure orbit is visible
        if (isGrid) {
          setIsGrid(false);
          setIsSlowingDown(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGrid]);

  // TRIGGER THE TRANSITION:
  // When user hovers or taps the center of the orbit
  const triggerTransition = () => {
    if (hasTriggeredTransition.current || isGrid) return;
    hasTriggeredTransition.current = true;
    setIsSlowingDown(true);

    // Smooth deceleration moment, then launch the slow, graceful flight to categorized grid
    setTimeout(() => {
      setIsGrid(true);
    }, 650);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 w-full bg-ivory overflow-hidden border-b border-bordercolor relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Skills Constellation
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-2xl mx-auto">
            {isGrid
              ? 'A curated collection of programming languages, frameworks, cloud platforms, and AI technologies I work with.'
              : 'Move your cursor over the center to release all 21 technologies into their structured engineering layout.'}
          </p>

          {/* Minimal Status Hint (Visible when Orbit is active) */}
          {!isGrid && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 border border-gold/40 shadow-sm text-xs font-semibold text-charcoal"
            >
              <Sparkles size={13} className="text-gold animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-charcoal/90">Hover or tap the center point to expand</span>
              <ArrowDownRight size={13} className="text-gold" />
            </motion.div>
          )}
        </div>

        {/* ================================================================ */}
        {/* VIEW 1: ORBIT ANIMATION (Visible when scrolling DOWN from above) */}
        {/* ================================================================ */}
        {!isGrid && (
          <div className="w-full flex items-center justify-center my-4 overflow-visible select-none min-h-[580px] sm:min-h-[700px] md:min-h-[780px]">
            <div className="relative w-full max-w-[850px] h-[640px] sm:h-[720px] md:h-[780px] flex items-center justify-center">

              {/* Scaled Orbit Container */}
              <div
                style={{
                  transform: `scale(${orbitScale})`,
                  transition: 'transform 0.2s ease-out',
                }}
                className="relative w-[780px] h-[780px] flex items-center justify-center origin-center"
              >
                {/* 3 CONCENTRIC ORBITAL TRACKS */}
                {ORBIT_RINGS.map((ring) => {
                  const ringDiameter = ring.radius * 2;
                  const isCW = ring.dir === 'cw';
                  const skillsOnThisRing = ALL_SKILLS.filter((s) => s.ring === ring.ring);
                  const currentSpeed = isSlowingDown ? ring.speed * 2.8 : ring.speed;

                  return (
                    <React.Fragment key={ring.ring}>
                      {/* Visual Orbit Track (Minimal Gold/Bordercolor theme) */}
                      <div
                        style={{
                          width: `${ringDiameter}px`,
                          height: `${ringDiameter}px`,
                        }}
                        className="absolute rounded-full pointer-events-none"
                      >
                        <svg className="w-full h-full" viewBox={`0 0 ${ringDiameter} ${ringDiameter}`}>
                          <circle
                            cx={ring.radius}
                            cy={ring.radius}
                            r={ring.radius - 1}
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1.2"
                            strokeDasharray="4 6"
                            opacity={0.3}
                          />
                        </svg>
                      </div>

                      {/* Rotating Orbital Carrier Container */}
                      <div
                        style={{
                          width: `${ringDiameter}px`,
                          height: `${ringDiameter}px`,
                          animation: `${isCW ? 'orbit-spin-cw' : 'orbit-spin-ccw'} ${currentSpeed}s linear infinite`,
                          transition: 'animation-duration 0.8s ease-out',
                        }}
                        className="absolute rounded-full pointer-events-none flex items-center justify-center"
                      >
                        {skillsOnThisRing.map((skill, index) => {
                          const angle = (2 * Math.PI * index) / skillsOnThisRing.length;
                          const x = ring.radius * Math.cos(angle);
                          const y = ring.radius * Math.sin(angle);

                          return (
                            <div
                              key={skill.id}
                              style={{
                                position: 'absolute',
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: 'translate(-50%, -50%)',
                              }}
                              className="pointer-events-auto"
                            >
                              {/* Counter-Rotating Card Wrapper (Keeps card upright and readable) */}
                              <div
                                style={{
                                  animation: `${isCW ? 'orbit-counter-cw' : 'orbit-counter-ccw'} ${currentSpeed}s linear infinite`,
                                  transition: 'animation-duration 0.8s ease-out',
                                }}
                              >
                                {/* Framer Motion layoutId for fluid flight into the categorized grid */}
                                <motion.div
                                  layoutId={`skill-card-${skill.id}`}
                                  className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-2xl bg-white border border-bordercolor shadow-md shadow-charcoal/5 flex flex-col items-center justify-center p-2 hover:scale-110 hover:border-gold hover:shadow-lg transition-transform"
                                >
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
                                    <img
                                      src={skill.logo}
                                      alt={skill.name}
                                      className="w-full h-full object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span className="text-[9px] sm:text-[10px] font-bold text-charcoal text-center tracking-tight truncate max-w-[56px]">
                                    {skill.name}
                                  </span>
                                </motion.div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  );
                })}

                {/* ======================================================== */}
                {/* INTERACTIVE CENTER HUB (Triggers the flight animation)   */}
                {/* ======================================================== */}
                <div
                  onMouseEnter={triggerTransition}
                  onClick={triggerTransition}
                  onTouchStart={triggerTransition}
                  className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center"
                >
                  {/* Subtle pulsing background glow */}
                  <div className="absolute w-36 h-36 rounded-full bg-gold/15 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  {/* Outer Gold Ring with subtle pulse */}
                  <div className="w-28 h-28 rounded-full border-2 border-dashed border-gold/60 flex items-center justify-center p-2 bg-white/95 backdrop-blur-md shadow-xl shadow-gold/15 group-hover:scale-105 group-hover:border-gold transition-all duration-300">
                    {/* Inner Core */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-charcoal via-charcoal to-black flex flex-col items-center justify-center text-center p-2 border border-gold shadow-inner group-hover:scale-102 transition-transform">
                      <Sparkles size={16} className="text-gold animate-spin mb-0.5" style={{ animationDuration: '8s' }} />
                      <span className="text-[9px] font-bold text-white tracking-widest uppercase font-heading">
                        EXPAND
                      </span>
                      <span className="text-[7px] text-gold font-mono tracking-tighter uppercase">
                        Hover Me
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* VIEW 2: CATEGORIZED GRID LAYOUT                                  */}
        {/* Shown after transition OR when scrolling UP from below           */}
        {/* ================================================================ */}
        {isGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-16"
          >
            {CATEGORY_GROUPS.map((catGroup, catIdx) => (
              <motion.div
                key={catGroup.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: catIdx * 0.06,
                  ease: 'easeOut',
                }}
              >
                {/* Category Heading & Divider Line */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-[1px] bg-gold" />
                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-gold uppercase font-heading">
                    {catGroup.title}
                  </h3>
                  <div className="flex-1 h-[1px] bg-bordercolor/60" />
                </div>

                {/* Grid of Skill Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                  {catGroup.skills.map((skill, skillIdx) => {
                    // Staggered slow flight arrival delay
                    const arrivalDelay = (catIdx * 0.12) + (skillIdx * 0.045);

                    return (
                      <motion.div
                        key={skill.id}
                        layoutId={`skill-card-${skill.id}`}
                        transition={{
                          duration: 2.2,
                          ease: [0.16, 1, 0.3, 1],
                          delay: arrivalDelay,
                        }}
                        className="group relative"
                      >
                        {/* Physical Skill Card with refined hover lift & subtle shadow */}
                        <div className="relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white border border-bordercolor shadow-sm transition-all duration-300 hover:border-gold hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1.5 cursor-pointer">
                          
                          {/* Logo */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <img
                              src={skill.logo}
                              alt={skill.name}
                              className="w-full h-full object-contain filter drop-shadow-sm"
                              loading="lazy"
                            />
                          </div>

                          {/* Skill Name */}
                          <span className="text-xs sm:text-sm font-bold text-charcoal text-center tracking-tight group-hover:text-charcoal transition-colors duration-200">
                            {skill.name}
                          </span>

                          {/* Domain Subtext */}
                          <span className="text-[10px] text-warmgray text-center mt-1 font-medium truncate max-w-full">
                            {skill.domain}
                          </span>

                          {/* Subtle hover tooltip */}
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[9px] font-medium tracking-wide px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-gold/30">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
