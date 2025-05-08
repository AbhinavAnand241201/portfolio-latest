import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Show chatbot after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initial message after opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { 
            text: "Hey! 👋 Are you hiring a talented iOS developer?", 
            isBot: true, 
            options: ["Yes!", "No, just browsing"] 
          }
        ]);
      }, 500);
    }
  }, [isOpen, messages]);
  
  // No response timer - show additional option after 10 seconds
  useEffect(() => {
    if (messages.length === 1 && !hasInteracted) {
      const timer = setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            text: "I can show you a live coding demo of my skills! Interested?", 
            isBot: true, 
            options: ["Show me the demo", "No thanks"] 
          }
        ]);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [messages, hasInteracted]);
  
  const handleResponse = (text: string) => {
    setHasInteracted(true);
    
    // Add user response
    setMessages(prev => [...prev, { text, isBot: false }]);
    
    // Add bot reply based on user's response
    setTimeout(() => {
      if (text === "Yes!") {
        setMessages(prev => [
          ...prev, 
          { 
            text: "Great! Let me show you my best work!", 
            isBot: true 
          }
        ]);
        
        // Scroll to projects section
        setTimeout(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } 
      else if (text === "No, just browsing") {
        setMessages(prev => [
          ...prev, 
          { 
            text: "No worries! Want to see my skills in action? I've solved 700+ LeetCode problems and contributed to Bitcoin-Core!", 
            isBot: true,
            options: ["Show LeetCode", "Show Contributions"]
          }
        ]);
      }
      else if (text === "Show me the demo") {
        setMessages(prev => [
          ...prev, 
          { 
            text: "Let's check out a live demo of my coding skills!", 
            isBot: true 
          }
        ]);
        
        setTimeout(() => {
          document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
      else if (text === "Show LeetCode") {
        setMessages(prev => [
          ...prev, 
          { 
            text: "Let's look at my LeetCode profile where I've solved over 700 problems!", 
            isBot: true 
          }
        ]);
        
        setTimeout(() => {
          document.getElementById('leetcode')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
      else if (text === "Show Contributions") {
        setMessages(prev => [
          ...prev, 
          { 
            text: "Check out my open-source contributions to Web3 and Bitcoin technologies!", 
            isBot: true 
          }
        ]);
        
        setTimeout(() => {
          document.getElementById('contributions')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
      else {
        setMessages(prev => [
          ...prev, 
          { 
            text: "Feel free to explore my portfolio. Let me know if you have any questions!", 
            isBot: true 
          }
        ]);
      }
    }, 500);
  };
  
  if (!isOpen) return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black border border-white text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-black transition-transform duration-300 hover:scale-110 z-50"
      aria-label="Open chat"
    >
      <MessageSquare size={24} />
    </button>
  );
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-80 md:w-96 h-96 rounded-2xl shadow-2xl border border-white overflow-hidden bg-black transition-all duration-300">
      <div className="px-4 py-3 bg-black text-white flex justify-between items-center border-b border-white">
        <div className="font-semibold">Abhinav's Assistant</div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200 text-white"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-black">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div 
              className={`px-4 py-2 rounded-lg inline-block max-w-[75%] ${
                message.isBot 
                  ? 'bg-black text-white border border-white rounded-tl-none' 
                  : 'bg-white text-black border border-white rounded-tr-none ml-auto'
              }`}
            >
              {message.text}
            </div>
            
            {message.options && (
              <div className="mt-2 space-y-2">
                {message.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleResponse(option)}
                    className="block bg-black border border-white px-4 py-2 rounded-lg text-sm w-full text-left text-white hover:bg-white hover:text-black transition-transform duration-200 hover:scale-105"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chatbot;