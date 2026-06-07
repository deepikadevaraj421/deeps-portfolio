import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

// Reusable Animated Counter component
function AnimatedCounter({ value, duration = 1.5, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl sm:text-5xl text-charcoal">
      {count}
      {suffix}
    </span>
  );
}

export default function CodingProfiles() {
  const profiles = [
    {
      platform: 'Skillrack',
      url: 'https://www.skillrack.com/profile/442656/cbe22aiml014',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      metrics: [
        { label: 'Problems Solved', value: 850, suffix: '+' },
        { label: 'Certificates', value: 11, suffix: '' }
      ],
      description: 'Active platform solver in basic programming, logic constructs, and engineering test-suites.'
    },
    {
      platform: 'LeetCode',
      url: 'https://leetcode.com/u/Kanimozhi_R/',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-2.697 2.607a1.372 1.372 0 0 0-.007 1.948l2.697 2.607c.466.45 1.08.697 1.728.697a2.4 2.4 0 0 0 1.728-.697l2.697-2.607c.466-.45.693-1.09.627-1.769a1.375 1.375 0 0 0-.96-1.529l-3.66-1.94a.78.78 0 0 1-.34-.693c0-.285.139-.544.385-.69l3.5-2.07c.533-.28 1-.84 1.066-1.52.066-.68-.16-1.32-.627-1.77zM12 2.44a.75.75 0 0 1-1.077-.689l-9.141 4.97a1.5 1.5 0 0 1-.782 1.31v10.518c0 .524.277 1.007.729 1.272l9.141 5.378a.75.75 0 0 1 1.13-.647V15c0-.414-.336-.75-.75-.75h-3.328a.75.75 0 0 1 0 1.5h2.578v5.828l-7.791-4.582V8.349l7.791-4.237V6.75c0 .414.336.75.75.75h3.328a.75.75 0 0 1 0-1.5H12V2.44z" />
        </svg>
      ),
      metrics: [
        { label: 'Problems Solved', value: 100, suffix: '+' }
      ],
      description: 'Solving data structures, algorithm complexities, array dynamics, and graph logic problems.'
    },
    {
      platform: 'CodeChef',
      url: 'https://www.codechef.com/users/kanimozhi_r',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      metrics: [
        { label: 'Problems Solved', value: 50, suffix: '+' }
      ],
      badge: 'Bronze Badge',
      description: 'Participating in structured coding contests and solving key algorithmic questions.'
    },
    {
      platform: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/kanimozhi_r',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M22 6.136h-4.364V1.773A1.773 1.773 0 0 0 15.864 0H8.136a1.773 1.773 0 0 0-1.772 1.773v4.363H2A2 2 0 0 0 0 8.136v13.864A2 2 0 0 0 2 24h20a2 2 0 0 0 2-2V8.136a2 2 0 0 0-2-2zM8.136 1.773h7.728v4.363H8.136V1.773zm13.864 20.454H2V8.136h20v14.091z" />
        </svg>
      ),
      metrics: [
        { label: 'Java Proficiency', value: 1, suffix: ' Star' }
      ],
      description: 'Demonstrating core object-oriented knowledge, functional testing, and syntax structures.'
    }
  ];

  return (
    <section id="coding-profiles" className="py-24 sm:py-32 w-full bg-white overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Competitive Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Coding Profiles
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            Quantitative metrics showcasing code solution rates and verified competency levels across globally recognized platforms.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, idx) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative flex flex-col justify-between bg-ivory/40 hover:bg-white rounded-3xl border border-bordercolor p-8 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white border border-bordercolor flex items-center justify-center text-charcoal group-hover:text-gold transition-colors duration-300 group-hover:border-gold/20 shadow-sm">
                    {profile.icon}
                  </div>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-transparent hover:border-bordercolor hover:text-gold text-warmgray hover:bg-ivory/50 transition-all duration-300"
                    title={`Open ${profile.platform} profile`}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Platform Name */}
                <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
                  {profile.platform}
                </h3>

                {/* Counters */}
                <div className="space-y-4 mb-6">
                  {profile.metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warmgray mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}

                  {/* Extra custom status badges */}
                  {profile.badge && (
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-gold/10 text-gold border border-gold/20 text-[10px] font-bold uppercase tracking-wider">
                      <Award size={10} />
                      <span>{profile.badge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-warmgray leading-relaxed border-t border-bordercolor/60 pt-4 mt-auto">
                {profile.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
