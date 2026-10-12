import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  Loader2, 
  Trash2, 
  Sparkles,
  Sprout,
  CloudSun,
  TrendingUp,
  Languages,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import ChatMessage from '../components/ChatMessage';
import VoiceInputButton from '../components/VoiceInputButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI farming assistant. How can I help you today? You can ask me about crop diseases, weather impact, market trends, or general farming advice.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'gu', name: 'Gujarati' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Map language code to full name for Gemini
      const langNames: Record<string, string> = {
        'en': 'English',
        'hi': 'Hindi',
        'pa': 'Punjabi',
        'gu': 'Gujarati'
      };
      const targetLang = langNames[i18n.language] || 'English';

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: textToSend,
        config: {
          systemInstruction: `You are an expert farming assistant named Krishvaani AI. Your goal is to provide accurate, practical, and helpful advice to Indian farmers. 
          IMPORTANT: You MUST respond in ${targetLang}. 
          Speak in a friendly, professional tone. Use simple language. 
          Provide specific insights relevant to Indian farming regarding crops, soil, fertilizers, weather alerts, and market prices. 
          If you don't know something, suggest they consult a local farming officer.`,
        },
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't process that request. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to my brain right now. Please check your internet connection and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Chat cleared. How else can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  const quickPrompts = [
    { text: 'Best crops for black soil?', icon: Sprout },
    { text: 'Weather impact on wheat?', icon: CloudSun },
    { text: 'Current market trends?', icon: TrendingUp },
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
            <MessageSquare className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Krishvaani AI</h2>
            <p className="text-gray-500 text-sm">Your 24/7 intelligent farming companion.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Languages className="w-4 h-4 text-green-600" />
              {currentLang.name}
              <ChevronDown className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-green-50 transition-colors ${
                        i18n.language === lang.code ? 'text-green-600 font-bold bg-green-50/50' : 'text-gray-600'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={clearChat}
            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id}
              message={msg.content}
              isBot={msg.role === 'assistant'}
              time={msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              language={i18n.language}
            />
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                  <span className="text-sm text-gray-500 italic">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/50">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:border-green-300 hover:text-green-600 transition-all flex items-center gap-2 shadow-sm"
                >
                  <prompt.icon className="w-3 h-3" />
                  {prompt.text}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <VoiceInputButton 
              onResult={(text) => setInput(text)} 
              language={i18n.language} 
            />
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about farming..."
                className="w-full pl-6 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm shadow-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Sparkles className="w-5 h-5 text-green-300" />
              </div>
            </div>
            
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-4 rounded-2xl transition-all shadow-lg ${
                !input.trim() || isLoading 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-4">
            Krishvaani AI can make mistakes. Verify important information with local authorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
