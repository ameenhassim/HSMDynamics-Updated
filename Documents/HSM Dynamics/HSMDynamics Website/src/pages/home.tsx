import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Send,
  ChevronDown,
  Sun,
  Moon,
  Clock,
  Palette,
  Sparkle,
  ChevronUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import logoDark from '../Assets/HSMDynamicsLogo_Transparent.png';
import logoLight from '../Assets/HSMDynamicsLogoLight_Transparent.png';
import Footer from '../components/Footer';

interface HomeProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  selectedService: number | null;
  setSelectedService: (service: number | null) => void;
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((c) => c + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="inline-block min-w-[20ch]">
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </span>
  );
}

function Home({ isDark, setIsDark, selectedService, setSelectedService }: HomeProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle initial page load with hash
    if (location.hash === '#about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Agents",
      description: "Autonomous systems built to engage, support and convert — 24/7. Our intelligent agents handle conversations, make decisions and deliver results without human intervention.",
      benefits: [
        "24/7 Instant Support",
        "Smart, Human-Like Conversations",
        "Seamless Integration",
        "Effortless Scalability",
        "Real-Time Actionable Insights"
      ]
    },
    {
      icon: <Send className="w-8 h-8" />,
      title: "Automated Email Outreach",
      description: "Harness the power of Artificial Intelligence to streamline personalised outreach at scale. Engage 2,500 qualified leads daily with intelligent, end-to-end automation — built for results.",
      benefits: [
        "Effortless Lead Engagement at Scale",
        "Precision Targeting with Smart Segmentation",
        "Fully Automated Outreach, Saving You Time",
        "Dynamic Personalization for Maximum Impact",
        "Reliable, Scalable Outreach for Consistent Results"
      ]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Website Design",
      description: "Rapid development of stunning, modern websites with pixel-perfect aesthetics and seamless functionality.",
      benefits: [
        "Rapid Website Delivery",
        "Bespoke Designs",
        "Mobile-Optimized Experiences",
        "Lightning-Fast Loading Speeds",
        "Proactive Support & Maintenance"
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="top"
      className={`relative min-h-screen w-full transition-colors duration-300 overflow-hidden ${
        isDark ? 'text-white' : 'text-black'
      }`}
    >
      {/* Background Gradient & Blobs */}
      <div
        className={`fixed inset-0 z-0 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-black via-gray-900 to-black'
            : 'bg-gradient-to-br from-white via-gray-100 to-white'
        }`}
      >
        {/* Mesh Pattern Overlay */}
        <div className="absolute inset-0 bg-mesh opacity-5"></div>

        {/* Radial Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-radial ${
            isDark
              ? 'from-blue-500/10 via-purple-500/5 to-transparent'
              : 'from-blue-200/20 via-purple-200/10 to-transparent'
          }`}
        ></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full animate-pulse-slow">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-10'}`}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 frosted-navbar border-b ${
            isScrolled
              ? isDark
                ? 'bg-black/70 backdrop-blur-lg border-b-white/20'
                : 'bg-white/70 backdrop-blur-lg border-b-black/30'
              : isDark
              ? 'border-b-white/20'
              : 'border-b-black/30'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center h-20">
              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={isDark ? logoDark : logoLight}
                    alt="HSM Dynamics Logo"
                    className="h-40 md:h-44 lg:h-48 w-auto drop-shadow-md transition-all duration-300"
                  />
                </button>
              </div>
              <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                <span
                  onClick={scrollToAbout}
                  className="cursor-pointer hover:text-blue-400"
                >
                  About
                </span>
                <span
                  onClick={() =>
                    document
                      .getElementById('services')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="cursor-pointer hover:text-blue-400"
                >
                  Services
                </span>
                <span
                  onClick={() => navigate('/connect')}
                  className="cursor-pointer hover:text-blue-400"
                >
                  Connect
                </span>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-3 rounded-full ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-6 pt-32 text-center flex flex-col items-center gap-16">
            <h1
              className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r animate-gradient max-w-5xl leading-tight md:leading-[1.15] ${
                isDark
                  ? 'from-white via-blue-500 to-white'
                  : 'from-black via-blue-500 to-black'
              }`}
            >
              Unlock the Power of
              <br />
              Autonomous Intelligence
            </h1>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
              <TypewriterText text="This website was built in under 24 hours" />
            </div>
            <p
              className={`text-xl max-w-2xl ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Transform your business with cutting-edge AI solutions. We build
              intelligent systems that automate, innovate and elevate your
              operations.
            </p>
            <button
              onClick={() => navigate('/connect')}
              className={`group px-8 py-4 rounded-full font-semibold flex items-center gap-2 ${
                isDark
                  ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
                  : 'bg-black text-white hover:bg-blue-500'
              }`}
            >
              Build with Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Scroll Down Visual Cue */}
            <div className="mt-8 flex justify-center">
              <ChevronDown className="w-8 h-8 text-blue-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-24 bg-transparent">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">About HSM Dynamics</h2>
            <p
              className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              We specialise in AI automation that redefines business
              performance. Our intelligent systems are designed to streamline
              operations, scale effortlessly and drive measurable growth.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-transparent">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
            >
              What We Do
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    onClick={() => setSelectedService(index)}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Modal */}
        <ServiceModal
          isOpen={selectedService !== null}
          onClose={() => setSelectedService(null)}
          service={selectedService !== null ? services[selectedService] : services[0]}
          isDark={isDark}
        />

        {/* Try Me Arrow Label for Voiceflow */}
        <div
          className={`
            fixed bottom-6 right-20 z-50 hidden md:flex flex-row items-center
            transition-opacity duration-500 ease-in-out
            ${isScrolled ? 'opacity-30' : 'opacity-100'}
            animate-pulse
          `}
        >
          <div
            className={`
              px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-md
              transition-colors duration-300 flex items-center gap-2
              relative
              ${isDark ? 'bg-white/90 text-black' : 'bg-black/90 text-white'}
              after:content-['']
              after:absolute
              after:right-[-12px]
              after:top-1/2
              after:-translate-y-1/2
              after:border-[6px]
              after:border-transparent
              ${isDark 
                ? 'after:border-l-[rgba(255,255,255,0.9)]' 
                : 'after:border-l-[rgba(0,0,0,0.9)]'
              }
            `}
          >
            <Sparkle className="w-4 h-4" />
            <span>Ask AI</span>
          </div>
        </div>

        {/* Footer */}
        <Footer isDark={isDark} />
      </div>
      <ScrollToTopButton isDark={isDark} />
    </div>
  );
}

function ScrollToTopButton({ isDark }: { isDark: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('modal-open', handleModalOpen);
    window.addEventListener('modal-close', handleModalClose);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('modal-open', handleModalOpen);
      window.removeEventListener('modal-close', handleModalClose);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-[90px] sm:bottom-24 right-5 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
        isVisible && !isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${
        isDark
          ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
          : 'bg-black text-white hover:bg-blue-500'
      }`}
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}

export default Home;