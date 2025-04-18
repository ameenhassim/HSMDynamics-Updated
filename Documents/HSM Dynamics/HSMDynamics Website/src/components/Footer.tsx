import React from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import LogoDark from '../Assets/HSMLogoBoxDark_Transparent.png';
import LogoLight from '../Assets/HSMLogoBoxLight_Transparent.png';

interface FooterProps {
  isDark: boolean;
}

function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dispatch custom event to trigger navigation
    window.dispatchEvent(new CustomEvent('navigate-to-connect'));
  };

  const handleServiceClick = (index: number) => {
    // Dispatch custom event to open service modal
    window.dispatchEvent(new CustomEvent('open-service-modal', { 
      detail: { serviceIndex: index } 
    }));
  };

  return (
    <footer className={`py-20 relative z-10 ${isDark ? 'text-white' : 'text-black'}`}>
      {/* Pre-footer CTA Section */}
      <div className="container mx-auto px-6 mb-20">
        <div className={`max-w-7xl mx-auto rounded-2xl p-12 ${
          isDark ? 'bg-gray-900/50' : 'bg-gray-50'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Business?</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Let's discuss how AI can elevate your operations.
              </p>
            </div>
            <button
              onClick={handleConnectClick}
              className={`group px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
                isDark
                  ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
                  : 'bg-black text-white hover:bg-blue-500'
              }`}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={isDark ? LogoDark : LogoLight}
                  alt="HSM Dynamics"
                  className="h-8 w-auto"
                />
                <span className="text-lg"><span className="font-semibold">HSM</span> Dynamics</span>
              </div>
              <div className={`space-y-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="font-semibold">Smarter Business. Simplified.</p>
                <p className="text-sm leading-relaxed">
                  AI-powered solutions to streamline operations and elevate digital presence.
                </p>
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:pl-12">
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className={`space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="text-sm">
                  <a
                    href="#about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    href="#services"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    href="#"
                    onClick={handleConnectClick}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Connect
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className={`space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="text-sm">
                  <button 
                    onClick={() => handleServiceClick(0)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    AI Agents
                  </button>
                </li>
                <li className="text-sm">
                  <button 
                    onClick={() => handleServiceClick(1)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Automated Email Outreach
                  </button>
                </li>
                <li className="text-sm">
                  <button 
                    onClick={() => handleServiceClick(2)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Website Design
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:contact@hsmdynamics.com" className={`text-sm hover:text-blue-400 transition-colors ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    contact@hsmdynamics.com
                  </a>
                </div>
                {/* Phone contact commented out
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+1234567890" className="text-sm hover:text-blue-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                */}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className={`pt-8 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © {currentYear} HSM Dynamics. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;