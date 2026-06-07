import { motion } from 'framer-motion';

interface Skill {
  name: string;
  logo: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export default function SkillsConstellation() {
  const categories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
        { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      ],
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
        { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
      ],
    },
    {
      title: 'AI & ML',
      skills: [
        { name: 'Machine Learning', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
        { name: 'MLOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 w-full bg-ivory overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Skills Constellation
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            A curated collection of programming languages, frameworks, cloud platforms, and AI technologies I work with.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-16">
          {categories.map((category, catIdx) => (
            <div key={category.title}>
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-8 h-[1px] bg-gold" />
                <h3 className="text-xs font-bold tracking-[0.2em] text-gold uppercase font-heading">
                  {category.title}
                </h3>
                <div className="flex-1 h-[1px] bg-bordercolor/60" />
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: (catIdx * 0.1) + (idx * 0.06) }}
                    className="group"
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        y: {
                          repeat: Infinity,
                          duration: 4 + idx * 0.5,
                          ease: 'easeInOut',
                        },
                      }}
                      className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white border border-bordercolor/80 shadow-sm cursor-pointer transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-xl group-hover:shadow-gold/8 group-hover:-translate-y-1 group-hover:scale-[1.04]"
                    >
                      {/* Logo */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Name */}
                      <span className="text-[10px] sm:text-xs font-semibold text-charcoal/80 text-center tracking-wide group-hover:text-charcoal transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
