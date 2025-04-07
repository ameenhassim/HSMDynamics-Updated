import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, Workflow, Database, ChevronDown, Sun, Moon, Clock, Sparkles, Palette } from 'lucide-react';
import logo from './Assets/HSM Dynamics Logo.png';

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="inline-block min-w-[20ch]">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-blink">|</span>
      )}
    </span>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation Ribbon */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300
        ${isScrolled 
          ? (isDark ? 'bg-black/70 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg')
          : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-1">
              <img src={logo} alt="HSM Dynamics" className="h-8 w-auto" />
              <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r
                ${isDark 
                  ? 'from-blue-400 via-purple-400 to-blue-400' 
                  : 'from-blue-600 via-purple-600 to-blue-600'}`}>
                HSM Dynamics
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              <a href="#about" className={`transition-colors duration-300 hover:text-blue-400
                ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>About</a>
              <a href="#services" className={`transition-colors duration-300 hover:text-blue-400
                ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Services</a>
              <a href="#contact" className={`transition-colors duration-300 hover:text-blue-400
                ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Contact</a>
            </div>

            {/* Theme Toggle */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-full transition-all duration-300
                  ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className={`absolute inset-0 transition-colors duration-300
          ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-100 to-white'}`}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-full h-full animate-pulse-slow">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0">
          <div className={`grid grid-cols-8 gap-4 h-full transition-colors duration-300 
            ${isDark ? 'opacity-10' : 'opacity-5'}`}>
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={`border-[0.5px] ${isDark ? 'border-gray-500' : 'border-gray-400'}`}></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-32">
          <div className="flex flex-col items-center text-center gap-16">
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r animate-gradient max-w-5xl
              ${isDark ? 'from-white via-blue-500 to-white' : 'from-black via-blue-500 to-black'}`}>
              Unlock the Power of<br />Autonomous Intelligence
            </h1>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
              <TypewriterText text="This website was built in under 24 hours" />
            </div>
            <p className={`text-xl transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl`}>
              Transform your business with cutting-edge AI solutions. We build intelligent systems that automate, innovate, and elevate your operations.
            </p>
            <button className={`group px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300
              ${isDark ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-black text-white hover:bg-blue-500'}`}>
              Build with Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <ChevronDown className="w-8 h-8 animate-bounce mt-8" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 transition-colors duration-300
        ${isDark ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">About HSM Dynamics</h2>
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We are pioneers in AI automation, dedicated to transforming businesses through intelligent solutions. Our mission is to bridge the gap between cutting-edge technology and practical business applications, creating seamless, efficient, and powerful automated systems.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">What We Do</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Bot className="w-8 h-8" />}
              title="AI Agents"
              description="Custom AI agents that engage, support, and convert your customers 24/7."
              isDark={isDark}
            />
            <ServiceCard
              icon={<Workflow className="w-8 h-8" />}
              title="Workflow Automation"
              description="Streamline your operations with intelligent automation solutions."
              isDark={isDark}
            />
            <ServiceCard
              icon={<Database className="w-8 h-8" />}
              title="CRM Integration"
              description="Seamlessly connect your systems with smart CRM solutions."
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
      <section id="contact" className={`py-24 transition-colors duration-300
        ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className={`text-lg mb-12 max-w-2xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's discuss how we can automate and elevate your business operations with cutting-edge AI solutions.
          </p>
          <button className={`group px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto transition-all duration-300
            ${isDark ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-black text-white hover:bg-blue-500'}`}>
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, isDark }: { icon: React.ReactNode; title: string; description: string; isDark: boolean }) {
  return (
    <div className={`p-8 rounded-2xl transition-all duration-300
      ${isDark 
        ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500' 
        : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200 hover:border-blue-500'}`}>
      <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
}

export default App;