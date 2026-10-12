import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, ArrowRight, ShieldCheck, Zap, Users, CloudSun } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "../assets/logo.png";

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {logo ? (
            <img 
              src={logo} 
              alt="DigitalKrishvaani Logo" 
              className="h-[40px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="hidden w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <Sprout className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-2xl text-green-800 tracking-tight">DigitalKrishvaani</span>
        </div>
        <Link 
          to="/login" 
          className="px-6 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-full transition-colors"
        >
          {t('login')}
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-24 lg:flex items-center gap-12">
        <div className="lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
              {t('smart_farming_india')}
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
              Empowering Every <span className="text-green-600">Farmer</span> with Intelligence.
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed max-w-xl">
              {t('hero_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200 transition-all hover:scale-105"
            >
              {t('get_started')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-100 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:border-green-200 transition-all"
            >
              {t('open_app')}
            </Link>
          </motion.div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-gray-900">50k+</p>
              <p className="text-sm text-gray-500">Active Farmers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-500">Prediction Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-500">AI Support</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mt-16 lg:mt-0 relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-green-200 rounded-full blur-3xl opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200&h=800" 
            alt="Vibrant Agriculture" 
            className="rounded-[40px] shadow-2xl relative z-10 border-8 border-white object-cover aspect-square lg:aspect-auto"
            referrerPolicy="no-referrer"
          />
          
          {/* Floating Cards */}
          <div className="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CloudSun className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Weather Alert</p>
              <p className="text-sm font-bold">Rain Expected in 2h</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DigitalKrishvaani?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We combine traditional wisdom with cutting-edge AI to help you grow more and earn more.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: ShieldCheck, title: 'Secure Data', desc: 'Your farm data is encrypted and safe with us.' },
            { icon: Zap, title: 'Real-time Insights', desc: 'Get live updates on market prices and weather.' },
            { icon: Users, title: 'Community Support', desc: 'Connect with thousands of expert farmers.' }
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <f.icon className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
