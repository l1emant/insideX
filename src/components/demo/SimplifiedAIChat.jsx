import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Paperclip, SendIcon, LoaderIcon } from 'lucide-react';

export default function SimplifiedAIChat() {
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleSendMessage = () => {
    if (value.trim() || attachments.length > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setValue('');
        setAttachments([]);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
    // Reset file input
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-neutral-800/50 backdrop-blur-md rounded-2xl border border-neutral-700 p-6 shadow-xl">
        {/* Header section with AI assistant info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-12 w-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="font-bold text-white">AI</span>
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-xl text-white">InsideX AI Assistant</h3>
            <p className="text-sm text-gray-400 mt-1">
              {isTyping ? 'Analyzing market data...' : 'Ask me about stocks, insider trades, or market trends'}
            </p>
          </div>
        </div>

        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {attachments.map((attachment, index) => (
              <div key={index} className="bg-neutral-700/50 rounded-lg px-3 py-2 flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate text-white">{attachment.name}</span>
                  <span className="text-xs text-gray-500">{attachment.size}</span>
                </div>
                <button 
                  onClick={() => removeAttachment(index)}
                  className="text-gray-500 hover:text-white ml-2 w-5 h-5 flex items-center justify-center flex-shrink-0"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="flex items-end gap-3">
          <div className="flex-grow relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about AAPL's recent insider activity, NVDA's price trends, or market sentiment for tech stocks..."
              className="bg-neutral-700/70 border border-neutral-600 rounded-xl px-5 py-4 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[60px] max-h-[150px] resize-none transition-all duration-200"
              style={{ overflow: 'hidden' }}
            />
          </div>
          <div className="flex flex-col gap-2 mb-1">
            <button 
              onClick={handleAttachFile}
              className="p-3 bg-neutral-700 hover:bg-neutral-600 rounded-xl transition transform hover:scale-105 flex items-center justify-center"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <button
              onClick={handleSendMessage}
              disabled={(!value.trim() && attachments.length === 0) || isTyping}
              className={cn(
                'p-3 rounded-xl transition transform hover:scale-105 shadow-lg flex items-center justify-center',
                (value.trim() || attachments.length > 0) && !isTyping
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
                  : 'bg-neutral-700 cursor-not-allowed text-gray-500'
              )}
              aria-label="Send message"
            >
              {isTyping ? (
                <LoaderIcon className="h-5 w-5 animate-spin" />
              ) : (
                <SendIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}