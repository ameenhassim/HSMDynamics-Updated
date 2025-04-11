import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
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
} from 'lucide-react';
import logoDark from './Assets/HSMDynamicsLogo_Transparent.png';
import logoLight from './Assets/HSMDynamicsLogoLight_Transparent.png';
import { ChevronUp } from 'lucide-react';

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);  // Instantly scrolls to the top
  }, []);

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

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'default_service',
        'template_default',
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'ameenhassim23@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({ name: '', email: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {

      // 1. Clear any known Voiceflow session data
  localStorage.clear();
  sessionStorage.clear();

  // 2. Remove any existing Voiceflow script if it's already there
  const existingScript = document.querySelector('script[src*="voiceflow.com/widget"]');
  if (existingScript) {
    existingScript.remove();
  }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.type = 'text/javascript';
    script.onload = () => {
      // @ts-ignore
      window.voiceflow.chat.load({
        verify: { projectID: '67f8290560582c52d7eb0b06' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: 'https://runtime-api.voiceflow.com',
        },
      });
    };
    document.body.appendChild(script);
  }, []);

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
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
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
                  onClick={() =>
                    document
                      .getElementById('about')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
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
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="cursor-pointer hover:text-blue-400"
                >
                  Contact
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
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
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
        <section id="about" className="py-24 bg-transparent">
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
            <h2 className="text-4xl font-bold text-center mb-16">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Bot className="w-8 h-8" />}
                title="AI Agents"
                description="Autonomous systems built to engage, support and convert — 24/7. Our intelligent agents handle conversations, make decisions and deliver results without human intervention."
                isDark={isDark}
              />
              <ServiceCard
                icon={<Send className="w-8 h-8" />}
                title="Automated Email Outreach"
                description="Harness the power of Artificial Intelligence to streamline personalised outreach at scale. Engage 2,500 qualified leads daily with intelligent, end-to-end automation — built for results."
                isDark={isDark}
              />
              <ServiceCard
                icon={<Palette className="w-8 h-8" />}
                title="Website Design"
                description="Rapid development of stunning, modern websites with pixel-perfect aesthetics and seamless functionality."
                isDark={isDark}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-transparent">
          <div className="container mx-auto px-6 text-center max-w-xl">
            <h2 className="text-4xl font-bold mb-8">
              Ready to Transform Your Business?
            </h2>
            <p
              className={`text-lg mb-12 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Let's discuss how we can automate and elevate your business
              operations with our cutting-edge AI solutions.
            </p>
            <form onSubmit={handleSubmit} className="grid gap-6 text-left">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors(prev => ({ ...prev, name: '' }));
                    }
                  }}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${
                    isDark
                      ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700'
                      : 'bg-white text-black placeholder-gray-400 border-gray-300'
                  } ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: '' }));
                    }
                  }}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${
                    isDark
                      ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700'
                      : 'bg-white text-black placeholder-gray-400 border-gray-300'
                  } ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${
                      isDark
                        ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700'
                        : 'bg-white text-black placeholder-gray-400 border-gray-300'
                    }`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 w-full ${
                  isDark
                    ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
                    : 'bg-black text-white hover:bg-blue-500'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-500 text-center mt-4">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center mt-4">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Try Me Arrow Label for Voiceflow */}
        <div
          className={`
            fixed bottom-6 right-20 z-50 hidden md:flex flex-row items-center space-x-2
            transition-opacity duration-500 ease-in-out
            ${isScrolled ? 'opacity-30' : 'opacity-100'}
            animate-pulse
          `}
        >
          <div
            className={`
              px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-md
              transition-colors duration-300 flex items-center space-x-2
              ${isDark ? 'bg-white/90 text-black' : 'bg-black/90 text-white'}
            `}
          >
            <Sparkle className="w-4 h-4" />
            <span>Ask AI</span>
          </div>

          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-black'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <ScrollToTopButton isDark={isDark} />
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-2xl transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500'
          : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200 hover:border-blue-500'
      }`}
    >
      <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}

function ScrollToTopButton({ isDark }: { isDark: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-[90px] sm:bottom-24 right-5 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
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

export default App;