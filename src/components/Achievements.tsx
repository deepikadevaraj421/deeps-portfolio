import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

interface Achievement {
  title: string;
  category: string;
  description: string;
  image: string;
  linkedIn: string;
}

const achievements: Achievement[] = [
  {
    title: '2nd Place — Freshathon 2025',
    category: 'COMPETITION',
    description:
      'Secured 2nd Place in Freshathon among 120+ teams at Sri Eshwar College of Engineering.',
    image: '/achievements/freshathon.png',
    linkedIn:
      'https://www.linkedin.com/posts/deepika-devaraj-2172a831a_freshathon2025-signlanguageproject-aiforgood-activity-7326996087611772929-zPWn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    category: 'CERTIFICATION',
    description:
      'AWS Certified Cloud Practitioner (Foundational) exam with a score of 967/1000.',
    image: '/achievements/aws.png',
    linkedIn:
      'https://www.linkedin.com/posts/deepika-devaraj-2172a831a_awscertified-cloudpractitioner-aws-activity-7417114302999916544-V3D9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: '3rd Place — Department Problem-Solving',
    category: 'CODING / PROBLEM SOLVING',
    description:
      'Secured 3rd place in my department for problem-solving skills on a global coding platform.',
    image: '/achievements/department-problem-solving.png',
    linkedIn:
      'https://www.linkedin.com/posts/deepika-devaraj-2172a831a_problemsolving-coding-achievement-activity-7322998767928913920-BuIv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: 'Innovative Idea Recognition',
    category: 'RECOGNITION',
    description:
      'Recognized as "Innovative Idea" in VSB College of Engineering.',
    image: '/achievements/innovativeIdea.png',
    linkedIn:
      'https://www.linkedin.com/posts/kani03_hackathon-innovation-webdevelopment-ugcPost-7430183870794334208-oWZN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: '1st Prize — Quiz Competition',
    category: 'COMPETITION',
    description:
      'Secured 1st Prize in the Quiz Competition at INFIQ 2K26, with a ₹1,500 cash prize.',
    image: '/achievements/infiq-2k26.png',
    linkedIn:
      'https://www.linkedin.com/posts/karthickraja-t-m_infiq2k26-vsbcollegeofengineering-paperpresentation-ugcPost-7430077941717352448-F9TN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: 'Top 50 — Odoo Hackathon 2026',
    category: 'HACKATHON',
    description:
      'Selected in the Top 50 teams among 20,000+ teams in Odoo Hackathon 2026.',
    image: '/achievements/odoo-final.png',
    linkedIn:
      'https://www.linkedin.com/posts/lina-g-a2729332b_odoohackathon-odoohackathon2026-hackathon-ugcPost-7489940548456468481-i0uM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
  {
    title: 'Technology Integration Award — IPL 2026',
    category: 'AWARD / RECOGNITION',
    description:
      'Secured the Technology Integration Award in IPL 2026 among 300+ teams at Sri Eshwar College of Engineering.',
    image: '/achievements/ipl.png',
    linkedIn:
      'https://www.linkedin.com/posts/kani03_innovativeproductleague-ipl-technologyintegrationaward-ugcPost-7507439575695298560-VQ-h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFDYWTMBYsqpUmPr3Z-kmkHQIR77wK72EK0',
  },
];

export default function Achievements() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => {
    setLightboxImage(src);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxImage) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxImage, closeLightbox]);

  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 w-full bg-ivory overflow-hidden border-b border-bordercolor"
    >
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
            Recognitions, performance scores, and technical achievements earned
            throughout my engineering trajectory.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex flex-col rounded-2xl bg-white border border-bordercolor overflow-hidden hover:shadow-xl hover:shadow-gold/8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Large Image Area */}
              <button
                type="button"
                onClick={() => openLightbox(item.image)}
                className="relative w-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 bg-[#f5f4f2]"
                aria-label={`View ${item.title} image in full size`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{
                    display: 'block',
                    maxHeight: '280px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    margin: '0 auto',
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    Click to enlarge
                  </span>
                </div>
              </button>

              {/* Content Area */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                {/* Category Tag */}
                <span className="text-[10px] font-bold tracking-[0.15em] text-gold uppercase mb-2">
                  {item.category}
                </span>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal mb-2 leading-snug group-hover:text-gold-hover transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-warmgray leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {/* LinkedIn Proof Button */}
                <a
                  href={item.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-gold transition-colors duration-200 group/link w-fit"
                >
                  <span>View LinkedIn Post</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>

              {/* Gold bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm" />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={lightboxImage}
              alt="Achievement enlarged view"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-w-full max-h-[85vh] rounded-xl shadow-2xl"
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
