import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, X, Cpu, Play, RotateCcw } from 'lucide-react';
import signifyImg from '../assets/signify_new.png';
import lifetraxImg from '../assets/project_lifetrax.jpeg';
import quizCortexImg from '../assets/quizcortex.png';
import roadsosImg from '../assets/project_roadsos.jpeg';
import buddytostudyImg from '../assets/buddytostudy.png';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tech: string[];
  image: string;
  video?: string;
  poster?: string;
  github: string;
  live: string;
  architecture: {
    title: string;
    steps: { name: string; desc: string; type: 'ai' | 'cloud' | 'web' }[];
  };
}

interface ProjectCardMediaProps {
  project: Project;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}

function ProjectCardMedia({ project, activeVideoId, setActiveVideoId }: ProjectCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  // If another project card begins playing, pause this video cleanly
  useEffect(() => {
    if (activeVideoId !== project.id && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [activeVideoId, project.id, isPlaying]);

  const handleTogglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      if (hasEnded || video.ended) {
        video.currentTime = 0;
        setHasEnded(false);
      }
      setActiveVideoId(project.id);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasEnded(false);
          })
          .catch((err) => {
            console.warn('Audio playback restricted, falling back to muted video play:', err);
            video.muted = true;
            video
              .play()
              .then(() => {
                setIsPlaying(true);
                setHasEnded(false);
              })
              .catch((playErr) => console.error('Video playback error:', playErr));
          });
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  // If no video is available, fallback to static image with existing design
  if (!project.video) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory border-b border-bordercolor">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className="glass text-[10px] font-semibold tracking-wider text-charcoal px-2.5 py-1 rounded-md border border-white/40 uppercase"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleTogglePlay}
      role="button"
      tabIndex={0}
      aria-label={`${isPlaying ? 'Pause' : hasEnded ? 'Replay' : 'Play'} demo video for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTogglePlay(e as unknown as React.MouseEvent);
        }
      }}
      className="relative aspect-[16/10] w-full overflow-hidden bg-black/90 border-b border-bordercolor cursor-pointer select-none group/media focus:outline-none"
    >
      <video
        ref={videoRef}
        src={project.video}
        poster={project.poster || project.image}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />

      {/* Subtle Play / Replay Overlay Icon - Disappears while video is actively playing */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isPlaying ? 'opacity-0 scale-95' : 'opacity-100 bg-black/25 group-hover/media:bg-black/15'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-charcoal/85 text-white flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md group-hover/media:scale-110 group-hover/media:bg-gold transition-all duration-300">
          {hasEnded ? (
            <RotateCcw size={18} className="text-white" />
          ) : (
            <Play size={18} className="text-white fill-white translate-x-0.5" />
          )}
        </div>
      </div>

      {/* Subtle Demo Status Badge in Top Right */}
      <div
        className={`absolute top-3 right-3 z-10 transition-opacity duration-300 pointer-events-none ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="glass text-[9px] font-bold tracking-wider text-charcoal px-2.5 py-0.5 rounded-full border border-white/50 uppercase flex items-center gap-1.5 shadow-sm">
          <Play size={8} className="fill-gold text-gold" />
          {hasEnded ? 'Replay' : 'Live Demo'}
        </span>
      </div>

      {/* Tech Badges on Media - Fades out during playback for clear visibility */}
      <div
        className={`absolute bottom-4 left-4 flex flex-wrap gap-2 transition-opacity duration-300 pointer-events-none ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {project.tech.slice(0, 2).map((t) => (
          <span
            key={t}
            className="glass text-[10px] font-semibold tracking-wider text-charcoal px-2.5 py-1 rounded-md border border-white/40 uppercase"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const projectsList: Project[] = [
    {
      id: 'retailmind',
      title: 'RetailMind',
      subtitle: 'SMART RETAIL & EDGE-AI PLATFORM',
      description:
        'An Edge-AI retail operations copilot and store intelligence platform that integrates live computer vision camera analytics, XGBoost queue congestion forecasting, inventory stockout risk prediction, and automated staff replenishment dispatch for modern supermarkets.',
      details: [
        'Live Edge-AI Camera Feeds & CV Bounding Box Overlays',
        'Real-Time Queue Congestion & Wait-Time Forecasting',
        'Predictive Shelf Inventory & Stockout Risk Detection (XGBoost)',
        'Planogram Compliance & Misplaced Product Detection',
        'Multi-Track Interactive Timeline & Historical Event Scrubber',
        'Autonomous Staff Replenishment Dispatch & Alert Engine',
        'Multi-Store Network Health & Cross-Store Benchmarking',
        'Shopper Footfall, Dwell Time & Zone Traffic Heatmaps'
      ],
      tech: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'XGBoost', 'MongoDB', 'Socket.IO', 'Tailwind CSS'],
      image: '/project-videos/RetailMind-poster.jpg',
      video: '/project-videos/RetailMind.mp4',
      poster: '/project-videos/RetailMind-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/RetailMind-SIH2026.git',
      live: 'https://retailmind-yzjx.onrender.com',
      architecture: {
        title: 'RetailMind Distributed Architecture',
        steps: [
          {
            name: 'Client Application [Web]',
            desc: 'React 18 + Vite + Tailwind CSS interface featuring interactive camera feeds, scrubber timeline, and operational analytics dashboards.',
            type: 'web'
          },
          {
            name: 'AI & ML Prediction Engine [AI / Cloud]',
            desc: 'FastAPI microservice executing dual trained XGBoost regression models for queue congestion and shelf stockout forecasting.',
            type: 'ai'
          },
          {
            name: 'Backend API & Simulation Engine [Web]',
            desc: 'Node.js + Express + TypeScript server with Socket.IO real-time event pipeline and continuous store state simulation.',
            type: 'web'
          },
          {
            name: 'Database & Infrastructure [Cloud]',
            desc: 'MongoDB Atlas for time-series persistence, alert deduplication, store telemetry, and cloud deployment.',
            type: 'cloud'
          }
        ]
      }
    },
    {
      id: 'ai-virtual-stylist',
      title: 'AI Virtual Stylist',
      subtitle: 'AI-POWERED FASHION PLATFORM',
      description:
        'An intelligent fashion and wardrobe assistant that helps users digitize their closets, auto-classify clothing items, and receive personalized outfit recommendations based on weather, occasion, and personal styling preferences.',
      details: [
        'Wardrobe Ingestion & Management: Camera capture and file upload system with multi-category support.',
        'MobileNetV2 CNN Auto-Classification: Automated detection and tagging of clothing items (tops, bottoms, shoes, accessories).',
        'Smart Outfit Pairing & Ranking: KNN similarity matching coupled with XGBoost scoring to curate the top 5 outfit combinations.',
        'Context-Aware Recommendations: Dynamic filtering tailored to real-time weather conditions and event formality.',
        'Weekly Outfit Planner: Scheduled calendar view for planning and coordinating outfits throughout the week.',
        'Laundry & Availability Tracking: Real-time state management to mark items as clean, in-use, or in laundry.',
        'Interactive AI Styling Chatbot: Dedicated assistant offering styling advice, color-palette suggestions, and fashion tips.',
        'User Authentication & Favorites: Secure JWT-based authentication with saved outfits and historical styling logs.'
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Flask', 'MobileNetV2', 'XGBoost', 'JWT'],
      image: '/project-videos/AIvirtual-Stylist-poster.jpg',
      video: '/project-videos/AIvirtual-Stylist.mp4',
      poster: '/project-videos/AIvirtual-Stylist-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/AI-virtual-stylist-local.git',
      live: 'https://ai-virtual-stylist-vppu.onrender.com/',
      architecture: {
        title: 'AI Virtual Stylist Architecture',
        steps: [
          {
            name: 'Client Application [Web]',
            desc: 'React interface for wardrobe management, weekly outfit planning, and real-time styling recommendations.',
            type: 'web'
          },
          {
            name: 'ML Recommendation Service [AI/ML]',
            desc: 'Python Flask microservice deploying MobileNetV2 for image classification, KNN for item compatibility, and XGBoost for ranking combinations.',
            type: 'ai'
          },
          {
            name: 'Backend API [Web]',
            desc: 'Express.js and Node.js server handling user authentication, CRUD operations, and recommendation routing.',
            type: 'web'
          },
          {
            name: 'Database & Infrastructure [Cloud]',
            desc: 'MongoDB Atlas for user data persistence, item attributes, and cloud image hosting.',
            type: 'cloud'
          }
        ]
      }
    },
    {
      id: 'odoo-urban-furniture',
      title: 'Urban Furniture Accounting & Operations ERP',
      subtitle: 'URBAN FURNITURE – ACCOUNTING ERP',
      description:
        'A centralized enterprise resource planning (ERP) system designed specifically for the furniture industry to manage sales, purchasing, inventory, real-time sandbox payments, double-entry accounting, and financial reporting under strict role-based access control.',
      details: [
        'Centralized Master Data & Unique ID Mapping: Master records for Contacts, Customers (e.g., CUS-00001), Vendors, Products, and Chart of Accounts serving as a single source of truth across all modules.',
        'Multi-Factor & OAuth Authentication: Secure user login powered by OTP verification, Google OAuth integration, JWT tokens, and strict role-based authorization (Admin, Sales Accountant, Purchase Accountant, Customer).',
        'End-to-End Sales & Invoicing Lifecycle: Automated calculation of subtotals, taxes, and grand totals, seamlessly generating customer invoices linked directly to customer dashboards.',
        'Multi-Step Purchase Workflow & Approval Engine: Enforces authorization hierarchies (Purchase Order Creation -> Admin Approval -> Goods Receipt Verification -> Vendor Bill -> Settlement).',
        'Interactive Sandbox Payment Gateway: Simulated end-to-end payment processing with real-time state updates (Unpaid, Partially Paid, Paid) and automatic balance adjustments.',
        'Double-Entry Accounting & Financial Ledger: Strict double-entry accounting system where every transaction balances equal debits and credits across Assets, Liabilities, Income, Expenses, and Capital.',
        'Analytical Accounting & Budgeting Engine: Cost-center tracking across departments (Sales, Marketing, Warehouse) and automated budget vs. actual performance reports.',
        'Server-Enforced Role-Based Security: Dual-layer security enforcing API endpoint authorization at the Node.js backend level to prevent unauthorized access and data tampering.'
      ],
      tech: ['React', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'Google OAuth', 'Sandbox Payments'],
      image: '/project-videos/Odoo-Urban-furniture-poster.jpg',
      video: '/project-videos/Odoo-Urban-furniture.mp4',
      poster: '/project-videos/Odoo-Urban-furniture-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/odoo-urban-furniture.git',
      live: 'https://odoo-urban-furniture.onrender.com/',
      architecture: {
        title: 'Urban Furniture ERP Architecture',
        steps: [
          {
            name: 'Client Application [Web]',
            desc: 'React and Vite single-page application providing responsive dashboards tailored for Admins, Accountants, and Customers.',
            type: 'web'
          },
          {
            name: 'Backend API [Web]',
            desc: 'Node.js and Express server handling JWT authentication, OTP verification, Google OAuth, business workflow logic, and server-side role authorization.',
            type: 'web'
          },
          {
            name: 'Database & ORM [Infrastructure]',
            desc: 'PostgreSQL database managed with Prisma ORM for relational data persistence, strict data integrity, and complex queries.',
            type: 'cloud'
          }
        ]
      }
    },
    {
      id: 'signify',
      title: 'Signify',
      subtitle: 'Sign Language Converter',
      description:
        'Built a bidirectional sign language system enabling Text/Voice/File-to-Sign and Sign-to-Text/Audio conversion using real-time gesture recognition and dataset-driven mapping. Deployed scalable cloud processing with AWS.',
      details: [
        'Integrated Google MediaPipe Hands for multi-dimensional real-time gesture landmark tracking (21 key points per hand).',
        'Built a bidirectional translation pipeline transforming vocal queries to custom gold 3D gesture sequences.',
        'Engineered scalable model inferencing on AWS EC2 instances with CPU/GPU dynamic auto-scaling.',
        'Structured modular data-pipelines storing hand-movement coordinate vectors as custom JSON datasets.'
      ],
      tech: ['React.js', 'Python', 'AWS', 'MediaPipe'],
      image: signifyImg,
      video: '/project-videos/Signify.mp4',
      poster: '/project-videos/Signify-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/signify-signlanguage-converter',
      live: 'https://signify-signlanguage-converter.onrender.com',
      architecture: {
        title: 'Signify Pipeline Architecture',
        steps: [
          { name: 'Input Layer', desc: 'Real-time Camera/Audio streaming capture via WebRTC.', type: 'web' },
          { name: 'Gesture Landmarks Extraction', desc: 'MediaPipe processes coordinate mapping at 30+ FPS.', type: 'ai' },
          { name: 'Translation Core', desc: 'Custom Python mapping dictionary translates tokens to animations.', type: 'ai' },
          { name: 'AWS Scaled Inference', desc: 'Elastic Load Balancing paths request to optimal auto-scaled nodes.', type: 'cloud' }
        ]
      }
    },
    {
      id: 'roadsos',
      title: 'Road SOS',
      subtitle: 'Emergency Response Platform',
      description:
        'A smart emergency assistance platform that helps travelers request roadside support during vehicle breakdowns and emergencies.',
      details: [
        'Emergency Request System',
        'Live Location Tracking',
        'Nearby Service Discovery',
        'Breakdown Reporting',
        'Real-Time Status Updates',
        'Emergency Contact Notifications',
        'Service Tracking Dashboard'
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Google Maps API', 'AWS'],
      image: roadsosImg,
      video: '/project-videos/RoadSOS.mp4',
      poster: '/project-videos/RoadSOS-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/RoadSafety-Project',
      live: 'https://intelsos-frontend.onrender.com/',
      architecture: {
        title: 'Road SOS Architecture',
        steps: [
          { name: 'Client Application', desc: 'React interface for requesting emergency assistance.', type: 'web' },
          { name: 'Location Services', desc: 'Google Maps API integration for real-time tracking and nearby discovery.', type: 'cloud' },
          { name: 'Backend API', desc: 'Express.js server handling requests and status updates.', type: 'web' },
          { name: 'Database & Infrastructure', desc: 'MongoDB for data persistence and AWS for cloud hosting.', type: 'cloud' }
        ]
      }
    },
    {
      id: 'lifetrax',
      title: 'Life Trax',
      subtitle: 'Digital Health Record Management System',
      description:
        'Developed a migrant healthcare platform with a Unique Digital Health ID, doctor portal, multilingual offline voice chatbot, and preventive healthcare support.',
      details: [
        'Created a Unique Digital Health ID generator integrating secured hashed QR codes containing medical data logs.',
        'Integrated TensorFlow Lite client-side inside the React environment for offline voice speech analysis.',
        'Designed SQL database schemas in AWS RDS PostgreSQL supporting rapid multi-tenant query execution.',
        'Built dynamic multilingual chatbot enabling offline health reporting in 3 languages.'
      ],
      tech: ['React', 'Spring Boot', 'PostgreSQL', 'AWS', 'TensorFlow Lite'],
      image: lifetraxImg,
      github: 'https://github.com/deepikadevaraj421/Digital-Health-Record',
      live: '#',
      architecture: {
        title: 'Life Trax Distributed Architecture',
        steps: [
          { name: 'Multilingual Client UI', desc: 'React interface optimized for tablet and mobile devices.', type: 'web' },
          { name: 'Offline TensorFlow Bot', desc: 'TF Lite model analyzes client speech offline on-device.', type: 'ai' },
          { name: 'Spring Boot Backend', desc: 'Microservices architecture managing user security & clinical data.', type: 'web' },
          { name: 'AWS Secured RDS', desc: 'PostgreSQL instance configured with Multi-AZ redundancy and AES-256 encryption.', type: 'cloud' }
        ]
      }
    },
    {
      id: 'quizcortex',
      title: 'Quiz Cortex',
      subtitle: 'Online Quiz Management System',
      description:
        'Architected and delivered a full-stack MERN application enabling teachers to create quizzes and students to attempt them online. Automated quiz evaluation and result generation, reducing manual assessment effort by 50%.',
      details: [
        'Implemented JWT-based authentication and role-based access control for secure user management.',
        'Automated quiz evaluation and result generation, reducing manual assessment effort by 50%.',
        'Deployed frontend on Vercel and backend on Render.'
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Vercel', 'Render'],
      image: quizCortexImg,
      video: '/project-videos/QuizCortex.mp4',
      poster: '/project-videos/QuizCortex-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/mern-project-quizz-app-.git',
      live: 'https://quiz-cortex-quiz-app-mern-stack-fro.vercel.app/',
      architecture: {
        title: 'Quiz Cortex Architecture',
        steps: [
          { name: 'React Client', desc: 'Interactive frontend for students and teachers.', type: 'web' },
          { name: 'Access Control', desc: 'JWT role-based authentication and security.', type: 'web' },
          { name: 'Express API Server', desc: 'Backend handling automated evaluation and quiz generation.', type: 'web' },
          { name: 'Data Storage', desc: 'MongoDB for user data and assessment records.', type: 'cloud' }
        ]
      }
    },
    {
      id: 'buddytostudy',
      title: 'Buddy to Study',
      subtitle: 'Behavioral Clustering and Hybrid Recommendation System',
      description:
        'Developed a full-stack web application that helps students find compatible study partners using data-driven recommendations. The system analyzes student attributes such as subject interests, skill levels, availability, and learning behavior.',
      details: [
        'Implemented behavioral clustering techniques and a hybrid recommendation approach to generate personalized study partner suggestions.',
        'Features include study group management, task tracking, attendance monitoring, and group health evaluation.',
        'Built using React, Spring Boot, PostgreSQL, and JWT Authentication.'
      ],
      tech: ['React', 'Vite', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'JWT', 'REST APIs'],
      image: buddytostudyImg,
      video: '/project-videos/BuddyToStudy.mp4',
      poster: '/project-videos/BuddyToStudy-poster.jpg',
      github: 'https://github.com/deepikadevaraj421/fullstack_Buddy_to_study.git',
      live: 'https://buddy-to-study.onrender.com',
      architecture: {
        title: 'Buddy To Study Architecture',
        steps: [
          { name: 'React Frontend', desc: 'Interactive UI for study group and task management.', type: 'web' },
          { name: 'Recommendation Engine', desc: 'Behavioral clustering and hybrid matching algorithm.', type: 'ai' },
          { name: 'Spring Boot Backend', desc: 'RESTful APIs managing users, attendance, and study tasks.', type: 'web' },
          { name: 'PostgreSQL Database', desc: 'Relational data management for attributes and groups.', type: 'cloud' }
        ]
      }
    }
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 w-full bg-white overflow-hidden border-b border-bordercolor">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Featured Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading">
            Projects
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            A curated showcase of applications built with AI capability, scalable cloud infrastructure, and robust MERN/Spring Boot architectures.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-3xl border border-bordercolor overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-2"
            >
              {/* Project Video / Media Area */}
              <ProjectCardMedia
                project={project}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase mb-1.5 block">
                  {project.subtitle}
                </span>
                <h3 className="text-xl font-bold text-charcoal mb-3 font-heading group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-warmgray leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack complete list */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-charcoal/70 bg-ivory px-2 py-0.5 rounded border border-bordercolor/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-3 gap-2 border-t border-bordercolor/50 pt-4 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-1.5 py-2 px-1 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-gold transition-colors duration-300 border border-transparent rounded-lg hover:bg-ivory"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline-block"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span className="text-[10px]">GitHub</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-1.5 py-2 px-1 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-gold transition-colors duration-300 border border-transparent rounded-lg hover:bg-ivory"
                  >
                    <ExternalLink size={13} />
                    <span className="text-[10px]">Live</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="flex items-center justify-center space-x-1 py-2 px-1 text-xs font-semibold uppercase tracking-wider text-white bg-charcoal hover:bg-gold transition-all duration-300 rounded-lg"
                  >
                    <span className="text-[10px]">Detail</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learn More Slider / Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl border border-bordercolor shadow-2xl overflow-y-auto z-10 no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-ivory text-charcoal hover:text-gold border border-bordercolor hover:shadow transition-all duration-300"
              >
                <X size={16} />
              </button>

              {/* Banner Image / Media */}
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-ivory border-b border-bordercolor">
                <img
                  src={selectedProject.poster || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-8">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Description */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Project Overview</p>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technical Highlights */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-4">
                    Technical Highlights & Implementation
                  </p>
                  <ul className="space-y-3">
                    {selectedProject.details.map((detail, index) => (
                      <li key={index} className="flex items-start text-xs sm:text-sm text-warmgray font-sans">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mt-2 mr-3 flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Engineering Pipeline / Architecture */}
                <div className="bg-ivory border border-bordercolor rounded-2xl p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-wider text-charcoal font-bold mb-5 flex items-center">
                    <Cpu size={14} className="text-gold mr-2" />
                    <span>{selectedProject.architecture.title}</span>
                  </p>
                  <div className="relative flex flex-col space-y-4">
                    {/* Visual Connector Line */}
                    <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-gold/30" />

                    {selectedProject.architecture.steps.map((step, index) => (
                      <div key={index} className="flex items-start pl-6 relative">
                        {/* Node circle */}
                        <div className="absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-gold z-10 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-gold"></div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-charcoal font-heading uppercase tracking-wide flex items-center">
                            {step.name}
                            <span
                              className={`text-[8px] font-bold px-1.5 py-0.5 rounded ml-2 uppercase ${
                                step.type === 'ai'
                                  ? 'bg-gold/10 text-gold'
                                  : step.type === 'cloud'
                                  ? 'bg-charcoal text-white'
                                  : 'bg-warmgray/10 text-warmgray'
                              }`}
                            >
                              {step.type}
                            </span>
                          </p>
                          <p className="text-[11px] sm:text-xs text-warmgray mt-1 leading-relaxed font-sans">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack badges */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1.5 rounded-lg border border-bordercolor/80 text-xs font-semibold text-charcoal/80 bg-white shadow-sm font-sans"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons footer */}
                <div className="flex items-center space-x-4 pt-6 border-t border-bordercolor/60">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-bordercolor text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-ivory hover:text-gold hover:border-gold/30 transition-all duration-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline-block mr-1"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span>View GitHub Repository</span>
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-gold transition-all duration-300 shadow-lg shadow-charcoal/5"
                  >
                    <ExternalLink size={15} />
                    <span>View Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
