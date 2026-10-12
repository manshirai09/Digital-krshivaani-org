import React from 'react';
import { cn } from '../utils/cn';
import SpeechOutputButton from './SpeechOutputButton';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  time: string;
  language?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, time, language = 'en' }) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] p-4 rounded-2xl shadow-sm relative group",
        isBot 
          ? "bg-white text-gray-800 rounded-tl-none border border-gray-100" 
          : "bg-green-600 text-white rounded-tr-none"
      )}>
        <div className="flex justify-between items-start gap-4">
          <p className="text-sm leading-relaxed flex-1">{message}</p>
          {isBot && (
            <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
              <SpeechOutputButton text={message} language={language} />
            </div>
          )}
        </div>
        <p className={cn(
          "text-[10px] mt-1 opacity-70",
          isBot ? "text-gray-400" : "text-green-100"
        )}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
