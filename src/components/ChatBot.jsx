import React, { useMemo, useRef, useState } from "react";
import { apiUrl } from "../lib/api";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  HeartPulse
} from "lucide-react";
import "../Styles/ChatBot.css";

const DEFAULT_MESSAGES = [
  {
    id: "welcome",
    role: "bot",
    text:
      "Hello! I am your Medilink AI Health Assistant. I can help explain medical terms, vitals ranges, or lab values. How can I assist you today?",
  },
];

const SUGGESTIONS = [
  "Normal blood pressure range?",
  "What does high glucose indicate?",
  "Explain AI health risk scores",
];

const renderFormattedText = (text) => {
  if (!text) return "";
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const pushMessage = (message) => {
    setMessages((prev) => [...prev, message]);
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, 50);
  };

  const sendMessageText = async (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed || sending) return;

    const userMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    pushMessage(userMessage);
    setInput("");

    try {
      setSending(true);
      const response = await fetch(apiUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "Failed to get response");
      }

      const botMessage = {
        id: `b_${Date.now()}`,
        role: "bot",
        text: data.reply || "I couldn't process that query at this time.",
      };
      pushMessage(botMessage);
    } catch (err) {
      const botMessage = {
        id: `b_${Date.now()}`,
        role: "bot",
        text:
          "I'm currently unable to connect to the medical knowledge base. Please try again or verify the Gemini API configuration.",
      };
      pushMessage(botMessage);
    } finally {
      setSending(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessageText(input);
  };

  return (
    <div className="chatbot-root">
      {open && (
        <div className="chatbot-panel animate-fade-in" role="dialog" aria-label="Medical chatbot">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <div className="chatbot-title">
                  <span>Medilink AI Assistant</span>
                  <Sparkles size={13} className="header-sparkle" />
                </div>
                <div className="chatbot-subtitle">
                  <span className="online-indicator"></span>
                  Clinical Terms & Vitals Guide
                </div>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => sendMessageText(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Message List */}
          <div className="chatbot-messages" ref={listRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-message-row chatbot-message-row--${msg.role}`}
              >
                {msg.role === "bot" && (
                  <div className="message-avatar message-avatar--bot">
                    <HeartPulse size={14} />
                  </div>
                )}
                <div className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
                  {renderFormattedText(msg.text)}
                </div>
                {msg.role === "user" && (
                  <div className="message-avatar message-avatar--user">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div className="chatbot-message-row chatbot-message-row--bot">
                <div className="message-avatar message-avatar--bot">
                  <HeartPulse size={14} />
                </div>
                <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing">
                  <Loader2 size={16} className="spinner-icon" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Medical Disclaimer */}
          <div className="chatbot-disclaimer">
            Informational only. Not a substitute for professional diagnosis.
          </div>

          {/* Input Footer */}
          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask about vitals, lab terms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!canSend || sending}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`chatbot-toggle-btn ${open ? "chatbot-toggle-btn--active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X size={24} />
        ) : (
          <>
            <MessageSquare size={24} />
            <span className="toggle-badge">AI</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
