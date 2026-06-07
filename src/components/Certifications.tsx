import { motion } from 'framer-motion';
import { ExternalLink, Cloud, ShieldCheck, Code, Award, CheckCircle } from 'lucide-react';

interface Certification {
  domain: string;
  name: string;
  org: string;
  year: string;
  link: string;
}

export default function Certifications() {
  const certificationsList: Certification[] = [
    {
      domain: 'Cloud',
      name: 'AWS Certified Cloud Practitioner',
      org: 'Amazon Web Services',
      year: '2026',
      link: 'https://www.credly.com/badges/9b830ce8-80bc-48a9-a0cf-5e5d16635577/public_url'
    },
    {
      domain: 'Computer Applications',
      name: 'Honour Diploma in Computer Application(HDCA)',
      org: 'CSC',
      year: '2024',
      link: ''
    },
    {
      domain: 'Programming',
      name: 'NPTEL Java',
      org: 'NPTEL',
      year: '2025',
      link: ''
    },
    {
      domain: 'DSA',
      name: 'Mastering Data Structures & Algorithms',
      org: 'Udemy',
      year: '2025',
      link: ''
    },
    {
      domain: 'Design',
      name: 'NPTEL Design Thinking',
      org: 'NPTEL',
      year: '2026',
      link: ''
    },
    {
      domain: 'Programming',
      name: 'Introduction to C',
      org: 'SoloLearn',
      year: '2025',
      link: ''
    }
  ];

  const getDomainIcon = (domain: string) => {
    switch (domain.toLowerCase()) {
      case 'cloud':
        return <Cloud className="w-4 h-4 text-gold" />;
      case 'salesforce':
        return <ShieldCheck className="w-4 h-4 text-gold" />;
      case 'programming':
        return <Code className="w-4 h-4 text-charcoal/80" />;
      case 'dsa':
        return <Award className="w-4 h-4 text-gold" />;
      default:
        return <CheckCircle className="w-4 h-4 text-warmgray" />;
    }
  };

  const getDomainStyle = (domain: string) => {
    switch (domain.toLowerCase()) {
      case 'cloud':
        return 'bg-gold/10 text-gold border-gold/20';
      case 'salesforce':
        return 'bg-charcoal text-white border-charcoal';
      case 'programming':
        return 'bg-ivory text-charcoal/80 border-bordercolor';
      case 'dsa':
        return 'bg-gold/10 text-gold border-gold/20';
      default:
        return 'bg-white text-warmgray border-bordercolor';
    }
  };

  return (
    <section id="certifications" className="py-24 sm:py-32 w-full bg-ivory overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Verifiable Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Certifications
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            A comprehensive list of academic accomplishments, technical specializations, and cloud standards.
          </p>
        </div>

        {/* Table layout for larger screens */}
        <div className="hidden md:block w-full max-w-5xl mx-auto bg-white rounded-3xl border border-bordercolor shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-bordercolor bg-ivory/50">
                <th className="p-6 text-xs font-bold uppercase tracking-wider text-charcoal font-heading">Domain</th>
                <th className="p-6 text-xs font-bold uppercase tracking-wider text-charcoal font-heading">Certification</th>
                <th className="p-6 text-xs font-bold uppercase tracking-wider text-charcoal font-heading">Organization</th>
                <th className="p-6 text-xs font-bold uppercase tracking-wider text-charcoal font-heading">Year</th>
                <th className="p-6 text-xs font-bold uppercase tracking-wider text-charcoal font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificationsList.map((cert, index) => (
                <tr
                  key={index}
                  className="border-b border-bordercolor last:border-0 hover:bg-ivory/20 transition-colors duration-200"
                >
                  {/* Domain tag */}
                  <td className="p-6">
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getDomainStyle(cert.domain)}`}>
                      {getDomainIcon(cert.domain)}
                      <span>{cert.domain}</span>
                    </span>
                  </td>
                  {/* Name */}
                  <td className="p-6">
                    <span className="text-sm sm:text-base font-bold text-charcoal font-heading">
                      {cert.name}
                    </span>
                  </td>
                  {/* Organization */}
                  <td className="p-6">
                    <span className="text-xs sm:text-sm text-warmgray font-medium">
                      {cert.org}
                    </span>
                  </td>
                  {/* Year */}
                  <td className="p-6">
                    <span className="text-xs sm:text-sm text-warmgray font-medium">
                      {cert.year}
                    </span>
                  </td>
                  {/* Action Link */}
                  <td className="p-6 text-right">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-bordercolor hover:border-gold hover:text-gold text-xs font-semibold text-charcoal transition-all duration-300 hover:bg-white bg-ivory/40"
                      >
                        <span>View Credential</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-bordercolor text-xs font-semibold text-warmgray bg-ivory/20 cursor-not-allowed whitespace-nowrap">
                        <span>Available Upon Request</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card list layout for mobile screens */}
        <div className="md:hidden space-y-4 max-w-md mx-auto">
          {certificationsList.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-white border border-bordercolor flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getDomainStyle(cert.domain)}`}>
                  {getDomainIcon(cert.domain)}
                  <span>{cert.domain}</span>
                </span>
                <span className="text-[10px] text-warmgray font-semibold">{cert.year}</span>
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-charcoal">{cert.name}</h3>
                <p className="text-xs text-warmgray mt-1 font-medium">{cert.org}</p>
              </div>
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-bordercolor text-xs font-semibold text-charcoal bg-ivory/40 hover:bg-white hover:text-gold hover:border-gold transition-colors duration-300"
                >
                  <span>View Credential</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-bordercolor text-[11px] font-semibold text-warmgray bg-ivory/20 cursor-not-allowed text-center">
                  <span>Credential Available Upon Request</span>
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
