import React, { useState, useLayoutEffect, useEffect } from 'react';
import { ArrowRight, Sun, Moon, Home } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logoDark from '../Assets/HSMDynamicsLogo_Transparent.png';
import logoLight from '../Assets/HSMDynamicsLogoLight_Transparent.png';
import Footer from '../components/Footer';

interface ConnectProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onNavigateHome: () => void;
}

function Connect({ isDark, onThemeToggle, onNavigateHome }: ConnectProps) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  // Force immediate scroll to top on mount
  useLayoutEffect(() => {
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Re-enable smooth scrolling after the immediate scroll
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        'YOUR_PUBLIC_KEY'
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

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
      {/* Background Gradient & Blobs */}
      <div className={`fixed inset-0 z-0 transition-colors duration-300 ${
        isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-100 to-white'
      }`}>
        {/* Mesh Pattern Overlay */}
        <div className="absolute inset-0 bg-mesh opacity-5"></div>

        {/* Radial Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-radial ${
          isDark ? 'from-blue-500/10 via-purple-500/5 to-transparent' : 'from-blue-200/20 via-purple-200/10 to-transparent'
        }`}></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full animate-pulse-slow">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 frosted-navbar border-b ${
        isScrolled
          ? isDark ? 'bg-black/70 backdrop-blur-lg border-b-white/20' : 'bg-white/70 backdrop-blur-lg border-b-black/30'
          : isDark ? 'border-b-white/20' : 'border-b-black/30'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center h-20">
            <div className="flex items-center gap-2 flex-1">
              <button onClick={onNavigateHome} className="cursor-pointer">
                <img
                  src={isDark ? logoDark : logoLight}
                  alt="HSM Dynamics Logo"
                  className="h-40 md:h-44 lg:h-48 w-auto drop-shadow-md transition-all duration-300"
                />
              </button>
            </div>
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                  setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="cursor-pointer hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                  setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="cursor-pointer hover:text-blue-400"
              >
                Services
              </a>
              <span className="text-blue-400">Connect</span>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onThemeToggle}
                className={`p-3 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-32">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className={`text-lg mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's discuss how we can automate and elevate your business operations with our cutting-edge AI solutions.
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
                    setErrors((prev) => ({ ...prev, name: '' }));
                  }
                }}
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                ${isDark ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700' : 'bg-white text-black placeholder-gray-400 border-gray-300'}
                ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                    setErrors((prev) => ({ ...prev, email: '' }));
                  }
                }}
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                ${isDark ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700' : 'bg-white text-black placeholder-gray-400 border-gray-300'}
                ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project..."
                rows={5}
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${isDark ? 'bg-gray-900 text-white placeholder-gray-500 border-gray-700' : 'bg-white text-black placeholder-gray-400 border-gray-300'}`}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 w-full
                ${isDark ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-black text-white hover:bg-blue-500'}
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-500 text-center mt-4">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center mt-4">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Mobile Back to Home Button */}
      {/* <button
         onClick={onNavigateHome}
         className={`md:hidden fixed bottom-[90px] sm:bottom-24 right-5 z-50 p-3 rounded-full shadow-lg transition-all duration-300
           ${isScrolled ? 'opacity-100' : 'opacity-0 hover:opacity-100'}
           ${isDark
             ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
             : 'bg-black text-white hover:bg-blue-500'
           }`}
         aria-label="Back to home"
       >
         <Home className="w-5 h-5 md:w-6 md:h-6" />
       </button> */}
    </div>
  );
}

export default Connect;