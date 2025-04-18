import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    benefits: string[];
    icon: React.ReactNode;
  };
  isDark: boolean;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, isDark }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.dispatchEvent(new Event('modal-open'));
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.dispatchEvent(new Event('modal-close'));
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.dispatchEvent(new Event('modal-close'));
    };
  }, [isOpen]);

  // Handle touch events for swipe-to-dismiss
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      // Trigger haptic feedback if available
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      onClose();
    }
  }, [onClose]);

  const handleStartProject = () => {
    // Trigger haptic feedback if available
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    window.dispatchEvent(new CustomEvent('navigate-to-connect'));
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 touch-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={(e) => e.stopPropagation()}
            className={`
              w-[90%] max-w-2xl mx-auto
              max-h-[90vh]
              rounded-2xl
              will-change-transform
              ${isDark
                ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800'
                : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200'
              }
              relative
              overflow-hidden
              shadow-xl
            `}
            style={{
              transform: 'translate3d(0, 0, 0)',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Close Button - Increased touch target */}
            <button
              onClick={onClose}
              className={`
                absolute top-4 right-4
                w-11 h-11
                rounded-full
                transition-colors
                flex items-center justify-center
                touch-manipulation
                ${isDark 
                  ? 'bg-white text-black hover:bg-blue-500 hover:text-white' 
                  : 'bg-black text-white hover:bg-blue-500'
                }
              `}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div 
              ref={contentRef}
              className="overflow-y-auto overflow-x-hidden max-h-[90vh] overscroll-contain"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#4B5563 #1F2937' : '#D1D5DB #F3F4F6'
              }}
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div 
                    className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/10'}`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    {service.icon}
                  </div>
                  <h3 id="modal-title" className="text-2xl font-bold">{service.title}</h3>
                </div>

                <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Benefits</h4>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span className="text-base">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleStartProject}
                  className={`
                    group w-full px-8 py-4 rounded-full font-semibold
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    min-h-[44px]
                    touch-manipulation
                    ${isDark
                      ? 'bg-white text-black hover:bg-blue-500 hover:text-white'
                      : 'bg-black text-white hover:bg-blue-500'
                    }
                  `}
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;