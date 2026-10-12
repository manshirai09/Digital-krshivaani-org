import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  onSelect: (lang: string) => void;
  selectedLang?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect, selectedLang }) => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'à¤¹à¤¿à¤¨à¥ à¤¦à¥€' },
    { code: 'pa', name: 'Punjabi', native: 'à¨ªà©°à¨œà¨¾à¨¬à©€' },
    { code: 'gu', name: 'Gujarati', native: 'àªªà« àªœàª°àª¾àªªà«€' },
  ];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    onSelect(code);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleSelect(lang.code)}
          className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
            selectedLang === lang.code 
              ? 'border-green-600 bg-green-50' 
              : 'border-gray-100 hover:border-green-200 bg-white'
          }`}
        >
          <div className="text-left">
            <p className="font-bold text-gray-800">{lang.native}</p>
            <p className="text-sm text-gray-500">{lang.name}</p>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selectedLang === lang.code ? 'border-green-600 bg-green-600' : 'border-gray-300'
          }`}>
            {selectedLang === lang.code && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
