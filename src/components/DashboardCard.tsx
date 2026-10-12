import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, path, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={path}
        className="block h-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
      >
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center text-green-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
          Explore Now
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </Link>
    </motion.div>
  );
};

export default DashboardCard;
