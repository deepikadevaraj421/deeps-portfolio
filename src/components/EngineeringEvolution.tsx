import { motion } from 'framer-motion';
import { Terminal, Award, Briefcase, Globe, Cpu, Cloud, Code } from 'lucide-react';

interface TimelineEvent {
  phase: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function EngineeringEvolution() {
  const events: TimelineEvent[] = [
    {
      phase: 'Phase 01',
      title: 'Started Programming',
      desc: 'Learned programming fundamentals using C.',
      icon: <Terminal className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 02',
      title: 'Explored C++',
      desc: 'Learned object-oriented concepts and problem-solving.',
      icon: <Code className="w-4 h-4 text-charcoal" />
    },
    {
      phase: 'Phase 03',
      title: 'Data Structures & Algorithms',
      desc: 'Solved coding challenges and improved algorithmic thinking.',
      icon: <Code className="w-4 h-4 text-gold" />
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
      desc: 'Built full-stack web applications.',
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
      title: 'Machine Learning Journey',
      desc: 'Explored AI and ML concepts and projects.',
      icon: <Cpu className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 08',
      title: 'AWS Certified Cloud Practitioner',
      desc: 'Earned professional certification scoring 820/1000.',
      icon: <Cloud className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 09',
      title: 'Hackathons & Innovation',
      desc: 'Secured 2nd Place in Freshathon and earned Innovative Idea recognition.',
      icon: <Award className="w-4 h-4 text-gold" />
    },
    {
      phase: 'Phase 10',
      title: 'Building Real-World AI Solutions',
      desc: 'Developed Signify (Sign language converter) and Life Trax (Health management platform).',
      icon: <Cpu className="w-4 h-4 text-charcoal" />
    }
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
        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line (Desktop) or Left Line (Mobile) */}
          <div className="absolute left-[20px] md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold/20 via-gold to-gold/20 -translate-x-1/2" />

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
                      whileHover={{ scale: 1.3 }}
                      className="w-9 h-9 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-lg shadow-gold/10 relative cursor-pointer"
                    >
                      {event.icon}
                      {/* Pulse Ring */}
                      <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-60 pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10"
                  >
                    <div className="relative group p-6 sm:p-8 rounded-3xl bg-ivory/50 border border-bordercolor hover:border-gold/30 hover:bg-white hover:shadow-xl hover:shadow-gold/5 transition-all duration-300">
                      
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
