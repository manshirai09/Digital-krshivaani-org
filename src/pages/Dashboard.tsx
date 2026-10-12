import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Newspaper, 
  TrendingUp, 
  CloudSun, 
  Sprout, 
  FlaskConical, 
  Bug, 
  ShoppingCart, 
  MessageSquare, 
  Calculator, 
  Cpu, 
  CalendarDays, 
  Map,
  ArrowUpRight,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const modules = [
    { 
      icon: Newspaper, 
      title: t('news'), 
      description: 'Stay updated with latest farming news and connect with other farmers.',
      path: '/news',
      color: 'bg-blue-500'
    },
    { 
      icon: TrendingUp, 
      title: t('market_price'), 
      description: 'Real-time prices of crops in various mandis across the country.',
      path: '/market-price',
      color: 'bg-orange-500'
    },
    { 
      icon: CloudSun, 
      title: t('weather'), 
      description: 'Accurate weather forecasts and alerts tailored for your farm location.',
      path: '/weather',
      color: 'bg-sky-500'
    },
    { 
      icon: Sprout, 
      title: t('crop_recommendation'), 
      description: 'AI-powered suggestions for the best crops based on your soil and season.',
      path: '/crop-recommendation',
      color: 'bg-green-500'
    },
    { 
      icon: FlaskConical, 
      title: t('soil_health'), 
      description: 'Analyze your soil nutrients and get customized fertilizer recommendations.',
      path: '/soil-health',
      color: 'bg-amber-600'
    },
    { 
      icon: Bug, 
      title: t('disease_detection'), 
      description: 'Upload photos of your crops to identify pests and diseases instantly.',
      path: '/disease-detection',
      color: 'bg-red-500'
    },
    { 
      icon: ShoppingCart, 
      title: t('smart_shop'), 
      description: 'Buy high-quality seeds, fertilizers, and tools at the best prices.',
      path: '/shop',
      color: 'bg-indigo-500'
    },
    { 
      icon: MessageSquare, 
      title: t('chatbot'), 
      description: 'Ask any farming-related questions to our intelligent AI assistant.',
      path: '/chatbot',
      color: 'bg-purple-500'
    },
    { 
      icon: Calculator, 
      title: t('profit_calculator'), 
      description: 'Estimate your investment and expected profit for different crops.',
      path: '/profit-calculator',
      color: 'bg-emerald-600'
    },
    { 
      icon: Cpu, 
      title: t('iot_monitoring'), 
      description: 'Monitor your farm sensors and irrigation systems in real-time.',
      path: '/iot',
      color: 'bg-slate-700'
    },
    { 
      icon: CalendarDays, 
      title: t('harvest_planning'), 
      description: 'Plan your harvest timeline and manage post-harvest activities.',
      path: '/harvest',
      color: 'bg-rose-500'
    },
    { 
      icon: Map, 
      title: t('market_guidance'), 
      description: 'Get expert advice on where and when to sell your produce for max profit.',
      path: '/market-guidance',
      color: 'bg-cyan-600'
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Land', value: '5.2 Acres', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Crops', value: 'Wheat, Mustard', icon: Sprout, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Market Trend', value: '+12%', icon: TrendingUpIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Soil Health', value: 'Good', icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Explore Modules</h2>
          <button className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <DashboardCard 
              key={index}
              {...module}
            />
          ))}
        </div>
      </div>

      {/* Quick Alerts */}
      <div className="bg-green-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Smart Tip of the Day</h3>
          <p className="text-green-50 max-w-2xl">
            Applying urea in split doses during the tillering stage of wheat can increase yield by up to 15%. 
            Check your Soil Health module for precise dosage.
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors">
            Learn More
          </button>
        </div>
        <Sprout className="absolute -right-10 -bottom-10 w-64 h-64 text-green-500/20 rotate-12" />
      </div>
    </div>
  );
};

export default Dashboard;
