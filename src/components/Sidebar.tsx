import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
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
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/dashboard' },
    { icon: Newspaper, label: t('news'), path: '/news' },
    { icon: TrendingUp, label: t('market_price'), path: '/market-price' },
    { icon: CloudSun, label: t('weather'), path: '/weather' },
    { icon: Sprout, label: t('crop_recommendation'), path: '/crop-recommendation' },
    { icon: FlaskConical, label: t('soil_health'), path: '/soil-health' },
    { icon: Bug, label: t('disease_detection'), path: '/disease-detection' },
    { icon: ShoppingCart, label: t('smart_shop'), path: '/shop' },
    { icon: MessageSquare, label: t('chatbot'), path: '/chatbot' },
    { icon: Calculator, label: t('profit_calculator'), path: '/profit-calculator' },
    { icon: Cpu, label: t('iot_monitoring'), path: '/iot' },
    { icon: CalendarDays, label: t('harvest_planning'), path: '/harvest' },
    { icon: Map, label: t('market_guidance'), path: '/market-guidance' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-bottom border-gray-100">
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
            <div className="hidden w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-green-800">DigitalKrishvaani</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-120px)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path 
                  ? "bg-green-50 text-green-700 font-medium" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-green-600" : "text-gray-400")} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
