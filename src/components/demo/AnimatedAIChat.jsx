'use client';

import { useEffect, useRef, useCallback, useTransition, useMemo } from 'react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import {
  ImageIcon,
  Figma,
  MonitorIcon,
  Paperclip,
  SendIcon,
  XIcon,
  LoaderIcon,
  Sparkles,
  Command,
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}) {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const Textarea = React.forwardRef(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cn('relative', containerClassName)}>
        <textarea
          className={cn(
            'border-input bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
            'transition-all duration-200 ease-in-out',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            showRing
              ? 'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
              : '',
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <span
            className="ring-primary/30 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-0"
          />
        )}

        {props.onChange && (
          <div
            className="bg-primary absolute right-2 bottom-2 h-2 w-2 rounded-full opacity-0"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export default function AnimatedAIChat() {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const commandPaletteRef = useRef(null);

  const commandSuggestions = useMemo(() => [
    {
      icon: <ImageIcon className="h-4 w-4" />,
      label: 'Clone UI',
      description: 'Generate a UI from a screenshot',
      prefix: '/clone',
    },
    {
      icon: <Figma className="h-4 w-4" />,
      label: 'Import Figma',
      description: 'Import a design from Figma',
      prefix: '/figma',
    },
    {
      icon: <MonitorIcon className="h-4 w-4" />,
      label: 'Create Page',
      description: 'Generate a new web page',
      prefix: '/page',
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: 'Improve',
      description: 'Improve existing UI design',
      prefix: '/improve',
    },
  ], []);

  useEffect(() => {
    if (value.startsWith('/') && !value.includes(' ')) {
      setShowCommandPalette(true);

      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value),
      );

      if (matchingSuggestionIndex >= 0) {
        setActiveSuggestion(matchingSuggestionIndex);
      } else {
        setActiveSuggestion(-1);
      }
    } else {
      setShowCommandPalette(false);
    }
  }, [value, commandSuggestions]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const commandButton = document.querySelector('[data-command-button]');

      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !commandButton?.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (showCommandPalette) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < commandSuggestions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : commandSuggestions.length - 1,
        );
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          const selectedCommand = commandSuggestions[activeSuggestion];
          setValue(selectedCommand.prefix + ' ');
          setShowCommandPalette(false);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (value.trim()) {
      startTransition(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setValue('');
          adjustHeight(true);
        }, 3000);
      });
    }
  };

  const handleAttachFile = () => {
    const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, mockFileName]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const selectCommandSuggestion = (index) => {
    const selectedCommand = commandSuggestions[index];
    setValue(selectedCommand.prefix + ' ');
    setShowCommandPalette(false);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div className="flex w-screen overflow-x-hidden">
      <div className="text-foreground relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent p-6">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="bg-primary/10 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter" />
          <div className="bg-secondary/10 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter delay-700" />
          <div className="bg-primary/10 absolute top-1/4 right-1/3 h-64 w-64 animate-pulse rounded-full mix-blend-normal blur-[96px] filter delay-1000" />
        </div>
        <div className="relative mx-auto w-full max-w-2xl">
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-3 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <h1 className="pb-1 text-3xl font-medium tracking-tight">
                  How can I help today?
                </h1>
                <motion.div
                  className="via-primary/50 h-px bg-gradient-to-r from-transparent to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
              <motion.p
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Type a command or ask a question
              </motion.p>
            </div>

            <motion.div
              className="border-border bg-card/80 relative rounded-2xl border shadow-2xl backdrop-blur-2xl"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <AnimatePresence>
                {showCommandPalette && (
                  <motion.div
                    ref={commandPaletteRef}
                    className="border-border bg-background/90 absolute right-4 bottom-full left-4 z-50 mb-2 overflow-hidden rounded-lg border shadow-lg backdrop-blur-xl"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="bg-background py-1">
                      {commandSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={suggestion.prefix}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors',
                            activeSuggestion === index
                              ? 'bg-primary/20 text-foreground'
                              : 'text-muted-foreground hover:bg-primary/10',
                          )}
                          onClick={() => selectCommandSuggestion(index)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {suggestion.icon}
                          <div className="flex flex-col">
                            <span className="font-medium">{suggestion.label}</span>
                            <span className="text-muted-foreground">
                              {suggestion.description}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-primary h-8 w-8 rounded-lg"
                      style={{
                        maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 80%)`,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">InsiderX AI</span>
                      <span className="text-muted-foreground text-xs">
                        {isTyping ? 'Thinking...' : 'Ask me anything'}
                      </span>
                    </div>
                  </div>
                  <button
                    data-command-button
                    className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors"
                    onClick={() => setShowCommandPalette((prev) => !prev)}
                  >
                    <Command className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="bg-primary/10 text-primary flex items-center gap-2 rounded-md px-3 py-1 text-xs"
                        >
                          <Paperclip className="h-3 w-3" />
                          {attachment}
                          <button
                            onClick={() => removeAttachment(index)}
                            className="hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end gap-2">
                    <Textarea
                      ref={textareaRef}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="min-h-[60px]"
                      containerClassName="flex-grow"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleAttachFile}
                        className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={isPending || !value.trim()}
                        className={cn(
                          'rounded-md p-2 transition-colors',
                          value.trim()
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'text-muted-foreground',
                        )}
                      >
                        {isPending ? (
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                        ) : (
                          <SendIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}