import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isDark: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick, isDark }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`h-full p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500'
          : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200 hover:border-blue-500'
      }`}
    >
      <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className={`flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </motion.div>
  );
}

export default ServiceCard;