import { motion } from 'framer-motion';
import { Trophy, Lightbulb, CloudLightning } from 'lucide-react';

interface AchievementCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export default function Achievements() {
  const achievementsList: AchievementCard[] = [
    {
      title: '2nd Place – Freshathon',
      subtitle: 'Innovation Hackathon',
      description: 'Secured second position competing among 120+ student engineering teams, presenting an interactive AI solution prototype.',
      icon: <Trophy className="w-5 h-5 text-gold" />,
      tag: 'Competition'
    },
    {
      title: 'Innovative Idea Recognition',
      subtitle: 'VSB College of Engineering',
      description: 'Honored with special recognition for presenting a novel social-impact technical project at VSB innovation symposium.',
      icon: <Lightbulb className="w-5 h-5 text-gold" />,
      tag: 'Research & Idea'
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      subtitle: 'Professional Validation',
      description: 'Earned certification with a score of 820/1000, validating expertise in AWS cloud services, scaling structures, and billing.',
      icon: <CloudLightning className="w-5 h-5 text-gold" />,
      tag: 'Credential'
    }
  ];

  return (
    <section id="achievements" className="py-24 sm:py-32 w-full bg-ivory overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Key Achievements
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            Recognitions, performance scores, and technical achievements earned throughout my engineering trajectory.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievementsList.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-bordercolor hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
            >
              <div>
                {/* Upper row */}
                <div className="flex items-center justify-between mb-6">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-ivory border border-bordercolor flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-500">
                    {achievement.icon}
                  </div>
                  {/* Tag */}
                  <span className="text-[9px] font-bold tracking-widest text-warmgray group-hover:text-gold uppercase transition-colors duration-300">
                    {achievement.tag}
                  </span>
                </div>

                {/* Subtitle */}
                <span className="text-[10px] font-semibold tracking-widest text-gold uppercase mb-1 block">
                  {achievement.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-warmgray leading-relaxed font-sans">
                  {achievement.description}
                </p>
              </div>

              {/* Gold Left Border Highlight on Hover */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-r" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
