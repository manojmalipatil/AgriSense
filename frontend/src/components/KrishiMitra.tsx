import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const KrishiMitra: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🌾 Namaste! I\'m KrishiMitra, your digital farming companion. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startListening = () => {
  recognition.start();
};

recognition.onresult = (event: any) => {
  const transcript = event.results[0][0].transcript;
  setInputText(transcript);
  handleSendMessage();
};

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
};

  const getBotResponseFromAPI = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch("http://localhost:8000/chat", { // Change to your backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "❌ Sorry, I couldn’t connect to the AI service.";
  }
};

const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputText,
    sender: "user",
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, userMessage]);
  setInputText("");
  setIsTyping(true);

  const botText = await getBotResponseFromAPI(inputText);

  const botResponse: Message = {
    id: (Date.now() + 1).toString(),
    text: botText,
    sender: "bot",
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, botResponse]);
  setIsTyping(false);

  speak(botText); // 🗣 KrishiMitra speaks here
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌿</span>
              <MessageCircle className="w-6 h-6" />
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden border border-green-200 animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🧑‍🌾</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">KrishiMitra</h3>
                  <p className="text-green-100 text-sm">Your Digital Farm Friend</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="25" cy="25" r="2" fill="%23f0f9ff" opacity="0.3"/><circle cx="75" cy="75" r="1.5" fill="%23dcfce7" opacity="0.4"/><circle cx="50" cy="10" r="1" fill="%23fef3c7" opacity="0.3"/><circle cx="10" cy="60" r="1.5" fill="%23f0fdf4" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
                backgroundSize: '50px 50px'
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">🌾</span>
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white rounded-br-md'
                        : 'bg-amber-50 text-amber-900 border border-amber-200 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-amber-600'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-100 text-amber-800">
                      <span className="text-sm">🌾</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-green-100 bg-green-50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about crops, weather, prices..."
                  className="flex-1 p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
                <button
                  onClick={startListening}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
                  >
                  🎤
                </button>
              </div>
              <p className="text-xs text-green-600 mt-2 text-center">
                🌱 Powered by AI • Here to help with your farming needs
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KrishiMitra;