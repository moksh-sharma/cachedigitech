import React, { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext(null);

// No backend: chat is disabled; show a friendly message instead of calling API.
const CHAT_UNAVAILABLE_MSG = 'Chat is not available. All content is managed in the frontend.';

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const hasAsked = messages.length > 0;

  const sendMessage = useCallback((overrideInput) => {
    const raw = overrideInput != null && typeof overrideInput === 'string' ? overrideInput : input;
    const text = String(raw).trim();
    if (!text || loading) return;
    setInput('');
    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setChatError(null);
    // No backend: add assistant message with unavailable notice
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: CHAT_UNAVAILABLE_MSG }]);
      setLoading(false);
    }, 300);
  }, [input, loading]);

  return (
    <ChatContext.Provider value={{ messages, setMessages, input, setInput, loading, chatError, setChatError, hasAsked, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}

export default ChatContext;
