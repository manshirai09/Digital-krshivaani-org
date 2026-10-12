import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeechOutputButtonProps {
  text: string;
  language: string;
}

const SpeechOutputButton: React.FC<SpeechOutputButtonProps> = ({ text, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language codes to BCP 47 tags
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'pa': 'pa-IN',
      'gu': 'gu-IN'
    };
    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className={`p-2 rounded-lg transition-all ${
        isSpeaking 
          ? 'bg-green-100 text-green-600' 
          : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
      }`}
      title={isSpeaking ? 'Stop Speaking' : 'Listen to Response'}
    >
      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
};

export default SpeechOutputButton;
