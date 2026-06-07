import { motion, useMotionValue, useTransform } from 'framer-motion';
import profileImg from '../assets/deepika_profile.jpg';

export default function About() {
  // Mouse position inside the card for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse values to rotateX and rotateY
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section id="about" className="relative min-h-screen py-24 sm:py-32 w-full flex items-center justify-center bg-white overflow-hidden border-b border-bordercolor">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-8 leading-tight font-heading">
              Engineering Intelligent Solutions with AI, Cloud & MLOps
            </h2>
            
            <div className="space-y-6 text-sm sm:text-base text-warmgray leading-relaxed font-sans">
              <p>
                I am <strong className="text-charcoal font-semibold">Deepika D</strong>, a Computer Science (AI & ML) student at Sri Eshwar College of Engineering with a strong passion for Artificial Intelligence, Cloud Computing, Full-Stack Development, and MLOps.
              </p>
              <p>
                My journey spans developing AI-powered healthcare platforms, sign language accessibility systems, and scalable web applications. Through hands-on experience with MERN Stack, AWS Cloud, and Machine Learning technologies, I enjoy building solutions that bridge innovation and real-world impact.
              </p>
              <p>
                As an AWS Certified Cloud Practitioner and aspiring MLOps Engineer, I continuously explore cloud-native architectures, deployment strategies, and intelligent systems that can scale efficiently from development to production.
              </p>
            </div>

            {/* Micro stats banner for extra recruiter appeal */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-bordercolor mt-10">
              <div>
                <p className="font-heading text-2xl font-bold text-charcoal">GPA</p>
                <p className="text-xs text-warmgray">8.4+ / 10</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-charcoal">AWS</p>
                <p className="text-xs text-warmgray">Certified Practitioner</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-charcoal">Internship</p>
                <p className="text-xs text-warmgray">MERN Developer</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            {/* Perspective wrapper for 3D tilt */}
            <div 
              style={{ perspective: 1000 }} 
              className="relative w-72 sm:w-80 md:w-96 aspect-[4/5] flex items-center justify-center"
            >
              <motion.div
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-full h-full rounded-2xl p-1 bg-gradient-to-tr from-gold via-white to-gold/30 gold-glow hover:shadow-gold/30 hover:scale-[1.02] transition-shadow duration-500 cursor-pointer overflow-hidden group border border-gold/20"
              >
                {/* Rotating Border Layer */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_10%,#D4B483_50%,transparent_90%)] animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white z-10 flex items-center justify-center p-1.5">
                  <img
                    src={profileImg}
                    alt="Deepika D"
                    className="w-full h-full object-cover rounded-[14px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.05]"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Luxury Floating Tag */}
                  <div className="absolute bottom-6 left-6 right-6 glass py-3 px-4 rounded-xl border border-white/40 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <p className="font-heading text-xs font-semibold text-charcoal tracking-widest uppercase">Deepika D</p>
                    <p className="text-[10px] text-warmgray mt-0.5 font-medium">Sri Eshwar College of Engineering</p>
                  </div>
                </div>
              </motion.div>

              {/* Behind-image shadow circles */}
              <div className="absolute -bottom-4 w-[85%] h-6 bg-charcoal/5 blur-md rounded-full -z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
