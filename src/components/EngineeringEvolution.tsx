import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Terminal, Award, Briefcase, Globe, Cpu, Cloud, Code } from 'lucide-react';

interface TimelineEvent {
  phase: string;
  title: string;
  desc: React.ReactNode;
  icon: React.ReactNode;
}

export default function EngineeringEvolution() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const events: TimelineEvent[] = [
    {
      phase: 'Phase 01',
      title: 'Started Programming',
      desc: 'Learned programming fundamentals using C.',
      icon: <Terminal className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 02',
      title: 'Mastering C++, Python & Java',
      desc: 'Learned object-oriented programming and core fundamentals across multiple languages.',
      icon: <Code className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 03',
      title: 'Data Structures & Algorithms',
      desc: 'Solved coding challenges and improved algorithmic thinking.',
      icon: <Terminal className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 04',
      title: 'Web Development',
      desc: 'Learned HTML, CSS, and JavaScript.',
      icon: <Globe className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 05',
      title: 'MERN Stack Development',
      desc: 'Built a quiz application (QuizCortex) using MongoDB, ExpressJS, React and NodeJS.',
      icon: <Globe className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 06',
      title: 'Web Development Internship',
      desc: 'Completed MERN Stack internship at Dream Learn.',
      icon: <Briefcase className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 07',
      title: 'AWS Certified Cloud Practitioner',
      desc: 'Earned professional certification scoring 967/1000.',
      icon: <Cloud className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 08',
      title: 'Machine Learning Journey',
      desc: 'Explored AI and ML concepts and projects.',
      icon: <Cpu className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 09',
      title: 'Building Real-World AI Solutions',
      desc: 'Developed Signify (Sign language converter), Life Trax (Health management platform) and IntelSOS (Road Safety Alert System).',
      icon: <Cpu className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 10',
      title: 'Hackathons & Innovation',
      desc: 'Secured 2nd Place in Freshathon and earned Innovative Idea recognition.',
      icon: <Award className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 11',
      title: 'MLOps Internship',
      desc: 'Mastered DevOps basics including Git, GitHub, Docker, Linux, CI/CD, Kubernetes, and end-to-end MLOps workflows at Aptitude Guru.',
      icon: <Briefcase className="w-4 h-4 text-gold" />
    },
  ];

  return (
    <section id="journey" className="py-24 sm:py-32 w-full bg-white overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            The Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            My Engineering Evolution
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            A chronological roadmap showing my progress from writing my first line of C code to building production-ready AI models and scalable cloud platforms.
          </p>
        </div>

        {/* Timeline Layout */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Static Background Rail (Desktop center, Mobile left) */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-bordercolor/60 -translate-x-1/2" />

          {/* Dynamic Animated Glowing Scroll Beam */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-gold via-[#E2CDAE] to-gold -translate-x-1/2 origin-top z-10"
          />

          {/* Events list */}
          <div className="space-y-12">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={event.phase}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } relative w-full`}
                >
                  {/* Left spacing for centering (Desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Connector Node */}
                  <div className="absolute left-[20px] md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-9 h-9 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-md shadow-gold/20 relative cursor-pointer group"
                    >
                      {event.icon}
                      {/* Interactive Pulse Ring */}
                      <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-50 pointer-events-none group-hover:opacity-100" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10"
                  >
                    <div className="relative group p-6 sm:p-8 rounded-3xl bg-ivory/50 border border-bordercolor hover:border-gold/40 hover:bg-white hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1 transition-all duration-300">
                      {/* Phase Label */}
                      <span className="text-[10px] font-bold tracking-widest text-gold uppercase mb-2 block font-heading">
                        {event.phase}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-3 font-heading group-hover:text-gold transition-colors duration-300">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-warmgray leading-relaxed font-sans">
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

