import React, { useState } from 'react';
import { Menu, Bell, Globe, ChevronDown, Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'gu', name: 'Gujarati' },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('userLanguageSelected', 'true');
    setShowLangMenu(false);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        
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
          <span className="font-bold text-xl text-green-800 tracking-tight hidden md:block">DigitalKrishvaani</span>
        </div>

        <h1 className="text-lg font-semibold text-gray-800 hidden lg:block border-l border-gray-200 pl-4 ml-2">
          {t('welcome')}, {user?.name || t('farmer')}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Language Switcher - Desktop */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                i18n.language === lang.code
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {lang.code.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Language Switcher Dropdown - Mobile/Small Screens */}
        <div className="relative md:hidden">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors border border-gray-100"
          >
            <Globe className="w-5 h-5 text-green-600" />
            <span className="text-xs font-bold uppercase">{i18n.language}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors ${
                    i18n.language === lang.code ? 'text-green-600 font-bold bg-green-50' : 'text-gray-600'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
            {user?.name?.[0] || 'F'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-700 leading-none">{user?.name}</p>
            <p className="text-xs text-gray-500 mt-1">{t('premium_member')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
