import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const hasAsked = messages.length > 0;

  const sendMessage = useCallback(async (overrideInput) => {
    const text = (overrideInput ?? input).trim();
    if (!text || loading) return;
    setInput('');
    const userMessage = { role: 'user', content: text };
    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setLoading(true);
    setChatError(null);

    try {
      const res = await fetch(API_BASE + '/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setChatError(data.error || 'Failed to get response');
        setMessages((prev) => prev.slice(0, -1));
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const payload = trimmed.slice(6);
          if (payload === '[DONE]') break;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) { setChatError(parsed.error); break; }
            if (parsed.token) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === 'assistant') {
                  updated[updated.length - 1] = { ...last, content: last.content + parsed.token };
                }
                return updated;
              });
            }
          } catch (_) {}
        }
      }
    } catch (e) {
      setChatError('Network error');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

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
