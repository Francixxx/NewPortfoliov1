"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from "lucide-react";

const SUGGESTIONS = ["Tell me about Francis", "What projects has he built?", "How can I contact him?"];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const logRef = useRef(null);
  const requestRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [open, messages, pending, error]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  async function send(text, retry = false) {
    const question = text.trim();
    if ((!question && !retry) || sendingRef.current) return;
    const history = retry ? messages : [...messages, { role: "user", content: question }];
    sendingRef.current = true;
    setMessages(history);
    setDraft("");
    setError("");
    setPending(true);
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Couldn’t send your message. Please try again.");
      if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("No reply arrived. Please try again.");
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch (failure) {
      setError(failure.name === "AbortError" ? "The reply took too long. Please try again." : failure.message);
    } finally {
      window.clearTimeout(timeout);
      sendingRef.current = false;
      setPending(false);
    }
  }

  return (
    <div className="floating-chat">
      {open && <section className="chat-panel" id="portfolio-chat" role="dialog" aria-modal="false" aria-labelledby="chat-title" onKeyDown={event => {
        if (event.key === "Escape") { event.stopPropagation(); close(); }
      }}>
        <header className="chat-header">
          <span className="chat-avatar" aria-hidden="true"><Sparkles size={19} /></span>
          <div><h2 id="chat-title">Ask about Francis</h2><p>AI portfolio assistant</p></div>
          <button className="chat-close" type="button" onClick={close} aria-label="Close chat"><X size={18} /></button>
        </header>
        <div className="chat-log" ref={logRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
          <div className="chat-message assistant"><span className="sr-only">Assistant: </span>Hey! I’m Francis’s AI assistant. Ask me about his projects, skills, or how to get in touch.</div>
          {messages.length === 0 && <div className="chat-suggestions">{SUGGESTIONS.map(question => <button type="button" key={question} onClick={() => send(question)}>{question}<ArrowUpRight size={14} /></button>)}</div>}
          {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={index}><span className="sr-only">{message.role === "user" ? "You: " : "Assistant: "}</span>{message.content}</div>)}
          {pending && <p className="chat-thinking" role="status">Thinking<span aria-hidden="true">…</span></p>}
          {error && <div className="chat-error" role="alert"><p>{error}</p><button type="button" onClick={() => send("", true)}>Try again</button></div>}
        </div>
        <form className="chat-form" onSubmit={event => { event.preventDefault(); send(draft); }}>
          <label className="sr-only" htmlFor="chat-question">Your message</label>
          <input ref={inputRef} id="chat-question" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask about my work…" maxLength={2000} autoComplete="off" disabled={pending} />
          <button type="submit" disabled={pending || !draft.trim()} aria-label="Send message"><Send size={17} /></button>
        </form>
        <div className="chat-footer"><span>AI can make mistakes.</span><Link href="/#work" onClick={close}>Browse projects <ArrowUpRight size={12} /></Link></div>
      </section>}
      <button ref={triggerRef} className={`chat-trigger${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-controls="portfolio-chat" aria-label={open ? "Close AI chat" : "Open AI chat"} onClick={() => open ? close() : setOpen(true)}>
        {open ? <X size={22} /> : <><MessageCircle size={21} /><span>Ask AI</span></>}
      </button>
    </div>
  );
}
