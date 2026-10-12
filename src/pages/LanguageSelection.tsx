import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, ArrowRight, Globe } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const LanguageSelection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('userLanguageSelected', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <Sprout className="text-white w-7 h-7" />
          </div>
          <span className="font-bold text-2xl text-green-800">Krishvaani</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="text-green-600 w-8 h-8" />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t('choose_language')}</h2>
          <p className="text-gray-500 mb-10">{t('select_language_desc')}</p>

          <LanguageSelector 
            selectedLang={selectedLang} 
            onSelect={setSelectedLang} 
          />

          <button
            onClick={handleContinue}
            className="w-full mt-10 flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-green-100 text-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-all hover:scale-[1.02]"
          >
            {t('continue_dashboard')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
