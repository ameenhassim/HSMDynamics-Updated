import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import logoDark from './Assets/HSMDynamicsLogo_Transparent.png';
import logoLight from './Assets/HSMDynamicsLogoLight_Transparent.png';
import Connect from './pages/connect';
import Footer from './components/Footer';
import Home from './pages/home';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigateToConnect = () => {
      navigate('/connect');
    };
    window.addEventListener('navigate-to-connect', handleNavigateToConnect);
    return () => window.removeEventListener('navigate-to-connect', handleNavigateToConnect);
  }, [navigate]);

  useEffect(() => {
    const handleOpenServiceModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedService(customEvent.detail.serviceIndex);
    };
    window.addEventListener('open-service-modal', handleOpenServiceModal as EventListener);
    return () => window.removeEventListener('open-service-modal', handleOpenServiceModal as EventListener);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.onload = () => {
      // @ts-ignore
      window.voiceflow.chat.load({
        verify: { projectID: '67fad7a75ae9b06f689a1399' },
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
    <Routes>
      <Route 
        path="/" 
        element={
          <Home 
            isDark={isDark}
            setIsDark={setIsDark}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        } 
      />
      <Route 
        path="/connect" 
        element={
          <Connect
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
            onNavigateHome={() => navigate('/')}
          />
        } 
      />
    </Routes>
  );
}

export default App;