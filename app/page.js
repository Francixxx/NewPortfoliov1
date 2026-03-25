"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoadingScreen from "./LoadingScreen";
import AnimatedBackground from "./AnimatedBackground";

const PROJECTS = [
  { title: "PiyuCheckpoint",     tag: "Security System", desc: "Web-Based Security ID System using RFID for efficient personnel & vehicle access monitoring.", tech: ["JavaScript","C++","RFID","Web Serial API"],           year: "2025", image: "/piyucheckpoint.png", live: "https://piyu-checkpoint.vercel.app/",                                        repo: "https://github.com/Francixxx/Piyu-Checkpoint",         num: "01" },
  { title: "PatrolNet",          tag: "Full-Stack",      desc: "Full-stack patrol monitoring system with real-time reporting, route tracking and incidents.",   tech: ["React.js","React Native","Node.js","MySQL"],           year: "2025", image: "/PatrolNet.png",      live: "https://patrolnet.vercel.app/",                                            repo: "https://github.com/Francixxx/PatrolNet",               num: "02" },
  { title: "Inzpect Scoreboard", tag: "Real-Time App",   desc: "Real-time digital scoreboard for live competition scoring built with React and Node.js.",      tech: ["React.js","Node.js","Express"],                        year: "2025", image: "/scoreboard.jpg",     live: "https://inzpect-scoreboard.vercel.app/",                                   repo: "https://github.com/Francixxx/Inzpect-Scoreboard",      num: "03" },
  { title: "Inzpect Attendance Selfie App",  tag: "Mobile App",      desc: "Cross-platform mobile attendance with selfie capture for biometric time-in/out verification.", tech: ["React Native","Expo","Node.js","MySQL"],               year: "2025", image: "/inzpect.jpg",     live: "https://play.google.com/store/apps/details?id=com.inzpect.selfieinout",    repo: "https://github.com/Francixxx/Selfie-In-Out-App",       num: "04" },
   { title: "Food O' Clock",      tag: "E-Commerce",      desc: "Responsive e-commerce site for food ordering with cart, menu browsing and checkout flow.",     tech: ["HTML","CSS","JavaScript"],                            year: "2024", image: "/FoodOclock.jpg",      live: "https://francixxx.github.io/Food-O-Clock/",                                repo: "https://github.com/Francixxx/Food-O-Clock",            num: "05" },
];

const SKILLS = [
  {
    name: "React & Next.js",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React logo" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js logo" },
    ],
  },
  {
    name: "JavaScript / TypeScript",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript logo" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript logo" },
    ],
  },
  {
    name: "React Native",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React Native logo" },
    ],
  },
  {
    name: "PHP & Laravel",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", alt: "PHP logo" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", alt: "Laravel logo" },
    ],
  },
  {
    name: "Python & AI/ML",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python logo" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow logo" },
    ],
  },
  {
    name: "C++ & IoT",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++ logo" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", alt: "Arduino logo" },
    ],
  },
];

const EXP = [
  { role: "Software Developer", company: "Koruna Assist Pty Ltd", period: "January 2026 – Present",    type: "Contract",   active: true  },
  { role: "Software Developer", company: "Polaris",               period: "July 2025 – January 2026",  type: "Contract",   active: false },
  { role: "Software Developer", company: "Inzpect Technology",    period: "May 2025 – July 2025",      type: "Internship", active: false },
];

// ── Typed text hook ──────────────────────────────────────────────────────────
const EXP_DETAILS = {
  "Koruna Assist Pty Ltd": {
    scope: "Full-stack delivery for an AI broker portal built for Australian citizens.",
    work: [
      "Transferred to Koruna to continue building the AI Broker Portal.",
      "Worked on front end and back end features across the platform.",
      "Managed database-related work to support the system end to end.",
    ],
  },
  Polaris: {
    scope: "First remote job focused on improving a client broker system.",
    work: [
      "Enhanced the front end of the client's broker system.",
      "Improved the UI experience and helped refine the product flow.",
      "Delivered updates while working in a remote production environment.",
    ],
  },
  "Inzpect Technology": {
    scope: "Internship centered on mobile attendance and workflow automation.",
    work: [
      "Built a mobile attendance application using selfie-based verification.",
      "Automated image sending to the proper Telegram groups.",
      "Supported attendance capture and reporting for the company workflow.",
    ],
  },
};

function useTyped(words) {
  const [text, setText] = useState("");
  const [wi,   setWi]   = useState(0);
  const [ci,   setCi]   = useState(0);
  const [del,  setDel]  = useState(false);
  useEffect(() => {
    const word  = words[wi];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDel(true), 1800);
        else setCi(ci + 1);
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi((wi + 1) % words.length); setCi(0); }
        else setCi(ci - 1);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, wi, ci, del, words]);
  return text;
}

// ── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, from = "bottom", threshold = 0.12, style = {} }) {
  const [ref, vis] = useReveal(threshold);
  const origins = {
    bottom: "translateY(36px)",
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    fade:   "translateY(0)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translate(0,0)" : origins[from],
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [activeExp, setActiveExp] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const [skillsRef] = useReveal(0.2);
  const [statsRef,  statsVis]  = useReveal(0.15);

  const typed = useTyped(["Full-Stack Developer","Mobile Developer","Software Developer","Freelancer"]);
  const featuredProject = PROJECTS[activeProject];

  useEffect(() => { setTimeout(() => setLoading(false), 2500); }, []);

  useEffect(() => {
    const h = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <LoadingScreen loading={loading} darkMode={false} />
      <AnimatedBackground darkMode={false} />

      <div style={{ position:"relative", zIndex:1, fontFamily:"'Helvetica Neue',Arial,sans-serif", background:"transparent", color:"#111", overflowX:"hidden" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          ::-webkit-scrollbar { width:3px; }
          ::-webkit-scrollbar-thumb { background:#111; }
          a { text-decoration:none; color:inherit; }

          .nk-nav { position:fixed; top:0; left:0; right:0; z-index:100; transition:background 0.3s,box-shadow 0.3s; padding:0 40px; }
          .nk-nav.solid { background:rgba(255,255,255,0.92); backdrop-filter:blur(16px); box-shadow:0 1px 0 #e5e5e5; }
          .nk-nav-inner { display:flex; align-items:center; justify-content:space-between; height:60px; max-width:1400px; margin:0 auto; }
          .nk-logo { font-family:'Bebas Neue',sans-serif; font-size:26px; letter-spacing:0.05em; color:#111; }
          .nk-logo span { color:#e5002b; }
          .nk-links { display:flex; gap:32px; }
          .nk-links a { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#111; transition:color 0.15s; cursor:pointer; }
          .nk-links a:hover { color:#e5002b; }
          .nk-cta { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:10px 24px; background:#111; color:#fff; border:none; cursor:pointer; transition:background 0.15s,transform 0.1s; }
          .nk-cta:hover { background:#e5002b; transform:scale(1.02); }

          .btn-blk { display:inline-flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:14px 32px; background:#111; color:#fff; border:2px solid #111; cursor:pointer; transition:all 0.15s; }
          .btn-blk:hover { background:#e5002b; border-color:#e5002b; transform:translateY(-1px); }
          .btn-wht { display:inline-flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:14px 32px; background:#fff; color:#111; border:2px solid #111; cursor:pointer; transition:all 0.15s; }
          .btn-wht:hover { background:#111; color:#fff; transform:translateY(-1px); }
          .btn-red { display:inline-flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:14px 32px; background:#e5002b; color:#fff; border:2px solid #e5002b; cursor:pointer; transition:all 0.15s; }
          .btn-red:hover { background:#b80022; border-color:#b80022; }
          .btn-ghost { display:inline-flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:14px 32px; background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.2); cursor:pointer; transition:border-color 0.15s; }
          .btn-ghost:hover { border-color:#fff; }

          .sec-label { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#e5002b; margin-bottom:12px; }
          .sec-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,7vw,96px); line-height:0.92; letter-spacing:0.01em; color:#111; }

          /* STATS */
          .stats-section { padding:72px 60px; background:#fff; overflow:hidden; }
          .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; max-width:1280px; margin:0 auto; }
          .stat-card { padding:44px 36px; border-right:1px solid #e8e8e8; position:relative;
            opacity:0; transform:translateY(32px);
            transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
          .stat-card:last-child { border-right:none; }
          .stat-card.visible { opacity:1; transform:translateY(0); }
          .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#e8e8e8; transform:scaleX(0); transform-origin:left; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); }
          .stat-card.visible::before { transform:scaleX(1); }
          .stat-accent { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#e5002b; margin-bottom:16px; opacity:0; transition:opacity 0.4s 0.3s; }
          .stat-card.visible .stat-accent { opacity:1; }
          .stat-num { font-family:'Bebas Neue',sans-serif; font-size:clamp(56px,6vw,80px); line-height:1; color:#111; letter-spacing:0.01em; }
          .stat-num .suffix { color:#e5002b; }
          .stat-desc { font-family:'Barlow',sans-serif; font-size:13px; color:#888; font-weight:300; line-height:1.6; margin-top:10px; max-width:160px; }

          /* PROJECTS */
          .feat-panel {
            display:grid;
            grid-template-columns:1fr 1fr;
            border:1.5px solid #111;
            margin-bottom:0;
            background:#fff;
          }
          .feat-img-wrap {
            position:relative;
            overflow:hidden;
            min-height:340px;
            background:#111;
          }
          .feat-img {
            transition:transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease;
          }
          .feat-panel:hover .feat-img { transform:scale(1.04); filter:saturate(1.02); }
          .feat-overlay {
            position:absolute;
            inset:0;
            background:linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.62));
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            gap:10px;
            transition:opacity 0.25s;
            opacity:0;
            padding:24px;
          }
          .feat-panel:hover .feat-overlay { opacity:1; }
          .feat-meta {
            font-family:'Barlow Condensed',sans-serif;
            font-size:11px;
            font-weight:700;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:rgba(255,255,255,0.82);
          }
          .feat-copy {
            background:#f8f8f8;
            padding:48px 44px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            min-height:340px;
          }
          .feat-title {
            font-family:'Bebas Neue',sans-serif;
            font-size:40px;
            color:#111;
            line-height:1;
            margin-bottom:8px;
          }
          .feat-desc {
            font-family:'Barlow',sans-serif;
            font-size:14px;
            color:#666;
            line-height:1.8;
            margin-bottom:20px;
            font-weight:300;
          }
          .feat-tech {
            display:flex;
            flex-wrap:wrap;
            gap:6px;
          }
          .feat-actions {
            display:flex;
            gap:10px;
            margin-top:28px;
            flex-wrap:wrap;
          }
          .feat-preview {
            font-family:'Barlow Condensed',sans-serif;
            font-size:11px;
            font-weight:700;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:#999;
            margin-bottom:16px;
          }
          .proj-row {
            width:100%;
            appearance:none;
            display:grid;
            grid-template-columns:70px 1fr 160px 160px 120px;
            align-items:center;
            gap:24px;
            padding:20px 0;
            border-bottom:1px solid #e5e5e5;
            transition:background 0.18s ease, transform 0.18s ease, padding 0.18s ease, margin 0.18s ease;
            background:transparent;
            text-align:left;
            cursor:pointer;
            font:inherit;
          }
          .proj-row:hover,
          .proj-row.active {
            background:#f8f8f8;
            margin:0 -32px;
            padding:20px 32px;
          }
          .proj-row:focus-visible {
            outline:2px solid #e5002b;
            outline-offset:-2px;
          }
          .proj-thumb {
            position:relative;
            width:60px;
            height:44px;
            overflow:hidden;
            border:1px solid #e5e5e5;
            flex-shrink:0;
            transition:transform 0.2s ease, border-color 0.2s ease;
          }
          .proj-row:hover .proj-thumb,
          .proj-row.active .proj-thumb {
            transform:translateY(-2px);
            border-color:#111;
          }
          .proj-name { font-family:'Bebas Neue',sans-serif; font-size:clamp(20px,2.5vw,30px); color:#111; transition:color 0.15s; }
          .proj-row:hover .proj-name,
          .proj-row.active .proj-name { color:#e5002b; }
          .tech-chip { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; padding:3px 8px; background:#f0f0f0; color:#666; border:1px solid #e5e5e5; }

          /* SKILLS */
          .sk-grid { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; }
          .sk-card {
            position:relative;
            min-height:104px;
            padding:18px 18px 16px;
            border:1.5px solid #e8e8e8;
            background:linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
            overflow:hidden;
            transition:transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          }
          .sk-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:linear-gradient(120deg, transparent 0%, rgba(229,0,43,0.06) 45%, transparent 100%);
            transform:translateX(-120%);
            transition:transform 0.45s ease;
          }
          .sk-card:hover {
            transform:translateY(-4px);
            border-color:#111;
            box-shadow:0 18px 34px rgba(17,17,17,0.08);
            background:linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
          }
          .sk-card:hover::before { transform:translateX(120%); }
          .sk-card-head {
            display:flex;
            align-items:flex-start;
            justify-content:space-between;
            gap:14px;
            position:relative;
            z-index:1;
          }
          .sk-card-name {
            font-family:'Barlow Condensed',sans-serif;
            font-size:15px;
            font-weight:700;
            letter-spacing:0.08em;
            text-transform:uppercase;
            color:#111;
            line-height:1.1;
            max-width:190px;
          }
          .sk-card-meta {
            font-family:'Barlow Condensed',sans-serif;
            font-size:10px;
            font-weight:700;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:#aaa;
            margin-top:10px;
            transition:color 0.2s ease, transform 0.2s ease;
          }
          .sk-card:hover .sk-card-meta {
            color:#e5002b;
            transform:translateX(4px);
          }
          .sk-logos {
            display:flex;
            align-items:center;
            justify-content:flex-end;
            gap:8px;
            flex-wrap:wrap;
          }
          .sk-logo-chip {
            width:42px;
            height:42px;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#fff;
            border:1px solid #ededed;
            transition:transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
          }
          .sk-card:hover .sk-logo-chip {
            transform:translateY(-2px);
            border-color:#d7d7d7;
            background:#fcfcfc;
          }
          .sk-logo { width:21px; height:21px; object-fit:contain; display:block; }

          @media (max-width: 720px) {
            .sk-grid { grid-template-columns:1fr; }
          }

          /* EXPERIENCE */
          .exp-list { display:grid; gap:14px; }
          .exp-item {
            appearance:none;
            width:100%;
            padding:22px 22px 18px;
            border:1.5px solid #e5e5e5;
            background:#fff;
            display:grid;
            gap:16px;
            text-align:left;
            font:inherit;
            cursor:pointer;
            transition:transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          }
          .exp-item:hover,
          .exp-item.active {
            transform:translateY(-3px);
            border-color:#111;
            box-shadow:0 18px 34px rgba(17,17,17,0.08);
            background:#fcfcfc;
          }
          .exp-item:focus-visible {
            outline:2px solid #e5002b;
            outline-offset:3px;
          }
          .exp-top {
            display:grid;
            grid-template-columns:1fr auto;
            align-items:start;
            gap:24px;
          }
          .exp-co { font-family:'Bebas Neue',sans-serif; font-size:28px; color:#111; letter-spacing:0.02em; }
          .exp-role-txt { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#888; margin-top:4px; }
          .exp-period { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#aaa; text-align:right; }
          .exp-meta-row {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:16px;
            flex-wrap:wrap;
          }
          .exp-summary {
            font-family:'Barlow',sans-serif;
            font-size:13px;
            color:#666;
            line-height:1.7;
            font-weight:300;
            max-width:440px;
          }
          .exp-toggle {
            font-family:'Barlow Condensed',sans-serif;
            font-size:11px;
            font-weight:700;
            letter-spacing:0.16em;
            text-transform:uppercase;
            color:#e5002b;
            white-space:nowrap;
          }
          .exp-details {
            display:grid;
            grid-template-rows:0fr;
            transition:grid-template-rows 0.28s ease;
          }
          .exp-item.active .exp-details { grid-template-rows:1fr; }
          .exp-details-inner { overflow:hidden; }
          .exp-work-list {
            list-style:none;
            display:grid;
            gap:10px;
            padding-top:4px;
          }
          .exp-work-item {
            display:grid;
            grid-template-columns:14px 1fr;
            gap:10px;
            align-items:start;
          }
          .exp-work-dot {
            width:6px;
            height:6px;
            border-radius:50%;
            background:#e5002b;
            margin-top:8px;
          }
          .exp-work-text {
            font-family:'Barlow',sans-serif;
            font-size:13px;
            color:#555;
            line-height:1.75;
            font-weight:300;
          }
          .exp-badge { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; padding:3px 10px; background:#111; color:#fff; display:inline-block; }
          .exp-badge.live { background:#e5002b; }

          .caret { display:inline-block; width:3px; height:0.85em; background:#e5002b; vertical-align:text-bottom; margin-left:2px; animation:blink 1s step-end infinite; }
          @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

          .scroll-indicator { display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; opacity:0.5; transition:opacity 0.2s; }
          .scroll-indicator:hover { opacity:1; }
          .scroll-label { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#111; }
          .scroll-arrow { width:1px; height:48px; background:linear-gradient(to bottom, #111, transparent); position:relative; }
          .scroll-arrow::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent; border-top:6px solid #111; animation:arrowBounce 1.6s ease-in-out infinite; }
          @keyframes arrowBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }

          .contact-blk { background:#111; color:#fff; padding:80px 60px; position:relative; overflow:hidden; }
          .contact-blk::before { content:'EAT CODE REPEAT'; position:absolute; right:-20px; bottom:-40px; font-family:'Bebas Neue',sans-serif; font-size:180px; color:rgba(255,255,255,0.04); letter-spacing:0.05em; pointer-events:none; white-space:nowrap; line-height:1; }

          .menu-ov { position:fixed; inset:0; background:#fff; z-index:200; display:flex; flex-direction:column; transform:translateY(-100%); transition:transform 0.4s cubic-bezier(0.76,0,0.24,1); padding:80px 60px; }
          .menu-ov.open { transform:translateY(0); }
          .menu-close { position:absolute; top:20px; right:40px; font-family:'Bebas Neue',sans-serif; font-size:24px; cursor:pointer; color:#111; background:none; border:none; }
          .menu-item { font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,8vw,80px); line-height:1.05; color:#111; cursor:pointer; transition:color 0.15s; border-bottom:1px solid #e5e5e5; padding:12px 0; }
          .menu-item:hover { color:#e5002b; }

          /* PROFILE CARD */
          .profile-card { position:relative; border:1.5px solid #e8e8e8; background:#fff; }
          .profile-card-img { position:relative; width:100%; overflow:hidden; background:#f4f4f4; }
          .profile-card-img img { display:block !important; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1) !important; }
          .profile-card:hover .profile-card-img img { transform:scale(1.03) !important; }
          .profile-card-body { padding:20px 22px 22px; border-top:1px solid #e8e8e8; }
          .pc-status { display:inline-flex; align-items:center; gap:6px; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#666; }
          .pc-status-dot { width:6px; height:6px; border-radius:50%; background:#00a550; animation:pcPulse 2.2s ease-in-out infinite; flex-shrink:0; }
          @keyframes pcPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

          @media(max-width:900px){
            .stats-grid { grid-template-columns:repeat(2,1fr); }
            .stat-card { border-right:none; border-bottom:1px solid #e8e8e8; }
            .proj-row { grid-template-columns:60px 1fr 120px; }
            .proj-row .hide-sm { display:none !important; }
            .nk-links { display:none; }
            .hero-grid { grid-template-columns:1fr !important; }
            .about-grid { grid-template-columns:1fr !important; }
            .feat-panel { grid-template-columns:1fr !important; }
          }
          @media(max-width:600px){
            .stats-grid { grid-template-columns:1fr; }
            .stats-section { padding:52px 32px; }
            .contact-blk { padding:48px 32px; }
            .contact-blk::before { font-size:80px; }
          }
        `}</style>

        {/* ── NAV ── */}
        <nav className={`nk-nav${navSolid ? " solid" : ""}`}>
          <div className="nk-nav-inner">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ position:"relative", width:32, height:32, borderRadius:"50%", overflow:"hidden", border:"2px solid #111", flexShrink:0 }}>
                <Image src="/Profile.png" alt="Francis" fill sizes="32px" style={{ objectFit:"cover" }} />
              </div>
              <div className="nk-logo">FRANCIS<span>.</span></div>
            </div>
            <div className="nk-links">
              {["work","about","contact"].map(s => (
                <a key={s} onClick={() => scrollTo(s)}>{s}</a>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <button className="nk-cta" onClick={() => scrollTo("contact")}>Hire Me</button>
              <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:4, padding:8 }} aria-label="Menu">
                {[0,1,2].map(i => <div key={i} style={{ width:22, height:2, background:"#111" }} />)}
              </button>
            </div>
          </div>
        </nav>

        {/* ── MENU OVERLAY ── */}
        <div className={`menu-ov${menuOpen ? " open" : ""}`}>
          <button className="menu-close" onClick={() => setMenuOpen(false)}>✕ CLOSE</button>
          <div style={{ marginTop:40 }}>
            {["work","about","contact"].map(s => (
              <div key={s} className="menu-item" onClick={() => scrollTo(s)}>{s.toUpperCase()}</div>
            ))}
          </div>
          <div style={{ marginTop:"auto", display:"flex", gap:16, flexWrap:"wrap" }}>
            <a href="https://github.com/Francixxx" target="_blank" rel="noopener noreferrer" className="btn-wht" style={{ fontSize:11, padding:"10px 20px" }}>GitHub ↗</a>
            <a href="https://linkedin.com/in/francis-espiritu-4776562b1" target="_blank" rel="noopener noreferrer" className="btn-wht" style={{ fontSize:11, padding:"10px 20px" }}>LinkedIn ↗</a>
            <a href="mailto:francisdizonespiritu07@gmail.com" className="btn-blk" style={{ fontSize:11, padding:"10px 20px" }}>Email ↗</a>
          </div>
        </div>

        {/* ── HERO ── */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", background:"transparent", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"relative", zIndex:1, padding:"140px 60px 0" }}>

            <Reveal delay={0.1}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#00a550" }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#888" }}>Available for commissions</span>
              </div>
            </Reveal>

            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:52, alignItems:"flex-end" }}>
              <div>
                <Reveal delay={0.2}>
                  <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(72px,12vw,200px)", lineHeight:0.9, letterSpacing:"0.01em", color:"#111", marginBottom:0 }}>
                    FRANCIS<br /><span style={{ color:"#e5002b" }}>ESPIRITU</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.32}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(18px,2.5vw,28px)", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", color:"#555", margin:"24px 0 20px", minWidth:320 }}>
                    {typed}<span className="caret" />
                  </div>
                </Reveal>
                <Reveal delay={0.42}>
                  <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, color:"#777", maxWidth:480, lineHeight:1.8, fontWeight:300, marginBottom:32 }}>
                    Software developer building modern web & mobile experiences in the Philippines. Focused on React, Next.js & React Native. Open for commissions and capstone projects.
                  </p>
                </Reveal>
                <Reveal delay={0.52}>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    <a href="#contact" className="btn-blk">Get in touch →</a>
                    <a href="/Espiritu-Francis_resume.pdf" download className="btn-wht">Download CV ↓</a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.3} from="right">
                <div className="profile-card">

                  {/* Image */}
                  <div className="profile-card-img">
                    <Image
                      src="/Profile.png"
                      alt="Francis Espiritu"
                      width={380}
                      height={460}
                      style={{ width:"100%", height:"auto", objectFit:"cover", objectPosition:"center top" }}
                    />
                  </div>

                  {/* Body */}
                  <div className="profile-card-body">
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div className="exp-top">
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#111", letterSpacing:"0.03em", lineHeight:1 }}>
                          Francis Espiritu
                        </div>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:"#999", marginTop:5 }}>
                          Software Developer · Philippines
                        </div>
                      </div>
                      <div className="pc-status">
                        <div className="pc-status-dot" />
                        Open
                      </div>
                    </div>

                    <div style={{ height:"1px", background:"#f0f0f0", margin:"14px 0" }} />

                    <div style={{ display:"flex", gap:8 }}>
                      <a href="https://github.com/Francixxx" target="_blank" rel="noopener noreferrer"
                        style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"8px 0", background:"#111", color:"#fff", border:"1.5px solid #111", transition:"background 0.15s", textDecoration:"none" }}
                        onMouseEnter={e => e.currentTarget.style.background="#e5002b"}
                        onMouseLeave={e => e.currentTarget.style.background="#111"}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        GitHub
                      </a>
                      <a href="https://linkedin.com/in/francis-espiritu-4776562b1" target="_blank" rel="noopener noreferrer"
                        style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"8px 0", background:"#fff", color:"#111", border:"1.5px solid #e8e8e8", transition:"all 0.15s", textDecoration:"none" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor="#111"; e.currentTarget.style.background="#f8f8f8"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor="#e8e8e8"; e.currentTarget.style.background="#fff"; }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>

                </div>
              </Reveal>
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"center", padding:"52px 0 40px" }}>
            <div className="scroll-indicator" onClick={() => scrollTo("work")} aria-label="Scroll to work">
              <span className="scroll-label">Scroll</span>
              <div className="scroll-arrow" />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-section" ref={statsRef}>
          <div className="stats-grid">
            {[
              { accent:"Experience", num:"0.8", suffix:"+", unit:"Months", desc:"Months shipping real-world products professionally" },
              { accent:"Community",  num:"20",  suffix:"+", unit:"",  desc:"Developers reached across online communities" },
              { accent:"Projects",   num:"10",   suffix:"+",  unit:"",  desc:"End-to-end projects delivered across web & mobile" },
              { accent:"Companies",  num:"3",    suffix:"",   unit:"",  desc:"Companies I've contributed to as a developer" },
            ].map((s, i) => (
              <div key={i}
                className={`stat-card${statsVis ? " visible" : ""}`}
                style={{ transitionDelay: statsVis ? `${i * 0.12}s` : "0s" }}>
                <div className="stat-accent">{s.accent}</div>
                <div className="stat-num">
                  {s.num}<span className="suffix">{s.suffix}</span>
                  {s.unit && <span style={{ fontSize:"0.38em", color:"#bbb", marginLeft:4, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, letterSpacing:"0.1em" }}>{s.unit}</span>}
                </div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WORK ── */}
        <section id="work" style={{ padding:"96px 60px", background:"#fff" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:52, flexWrap:"wrap", gap:24 }}>
              <Reveal>
                <div>
                  <div className="sec-label">Portfolio</div>
                  <h2 className="sec-title">FEATURED<br />WORK</h2>
                </div>
              </Reveal>
              <Reveal delay={0.15} from="right">
                <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:14, color:"#888", maxWidth:320, lineHeight:1.8, fontWeight:300 }}>
                  A selection of projects spanning web, mobile, and systems development.
                </p>
              </Reveal>
            </div>

            <Reveal threshold={0.08}>
              <div className="feat-panel">
                <div className="feat-img-wrap">
                  <Image src={featuredProject.image} alt={featuredProject.title} fill sizes="600px" className="feat-img" style={{ objectFit:"cover" }} />
                  <div className="feat-overlay">
                    <div className="feat-meta">Selected Project {featuredProject.num}</div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <a href={featuredProject.live} target="_blank" rel="noopener noreferrer" className="btn-red" style={{ fontSize:11, padding:"10px 20px" }}>Live ↗</a>
                      <a href={featuredProject.repo} target="_blank" rel="noopener noreferrer" className="btn-wht" style={{ fontSize:11, padding:"10px 20px" }}>Source ↗</a>
                    </div>
                  </div>
                </div>
                <div className="feat-copy">
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:80, color:"#e5e5e5", lineHeight:1 }}>{featuredProject.num}</div>
                    <div className="feat-preview">Hover or tap a project below to preview it here</div>
                    <h3 className="feat-title">{featuredProject.title}</h3>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#e5002b", marginBottom:14 }}>{featuredProject.tag}</div>
                    <p className="feat-desc">{featuredProject.desc}</p>
                    <div className="feat-tech">
                      {featuredProject.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
                    </div>
                  </div>
                  <div className="feat-actions">
                    <a href={featuredProject.live} target="_blank" rel="noopener noreferrer" className="btn-blk" style={{ fontSize:11, padding:"10px 20px" }}>Live Demo ↗</a>
                    <a href={featuredProject.repo} target="_blank" rel="noopener noreferrer" className="btn-wht" style={{ fontSize:11, padding:"10px 20px" }}>Source ↗</a>
                  </div>
                </div>
              </div>
            </Reveal>

            <div style={{ borderLeft:"1.5px solid #111", borderRight:"1.5px solid #111", borderBottom:"1.5px solid #111", padding:"0 32px" }}>
              <Reveal threshold={0.05}>
                <div style={{ borderBottom:"1px solid #e5e5e5", padding:"16px 0" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"70px 1fr 160px 160px 120px", gap:24 }}>
                    {["#","Project","Stack","Year","Links"].map(h => (
                      <div key={h} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#aaa" }}>{h}</div>
                    ))}
                  </div>
                </div>
              </Reveal>
              {PROJECTS.map((p, i) => (
                <Reveal key={i} delay={i * 0.07} threshold={0.04}>
                  <div
                    role="button"
                    tabIndex={0}
                    className={`proj-row${activeProject === i ? " active" : ""}`}
                    onMouseEnter={() => setActiveProject(i)}
                    onFocus={() => setActiveProject(i)}
                    onClick={() => setActiveProject(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveProject(i);
                      }
                    }}
                    aria-pressed={activeProject === i}
                  >
                    <div className="proj-thumb">
                      <Image src={p.image} alt={p.title} fill sizes="60px" style={{ objectFit:"cover" }} />
                    </div>
                    <div>
                      <div className="proj-name">{p.title}</div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#aaa", marginTop:2 }}>{p.tag}</div>
                    </div>
                    <div className="hide-sm" style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {p.tech.slice(0,2).map(t => <span key={t} className="tech-chip">{t}</span>)}
                    </div>
                    <div className="hide-sm" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600, letterSpacing:"0.1em", color:"#888" }}>{p.year}</div>
                    <div style={{ display:"flex", gap:10 }}>
                      <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#e5002b", whiteSpace:"nowrap" }}>Live ↗</a>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#aaa", whiteSpace:"nowrap" }}>Repo</a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background:"#f8f8f8", padding:"96px 60px" }}>
          <div className="about-grid" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>

            <div>
              <Reveal>
                <div>
                  <div className="sec-label">About</div>
                  <h2 className="sec-title" style={{ marginBottom:32 }}>BUILD.<br />SHIP.<br />REPEAT.</h2>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, color:"#555", lineHeight:1.85, fontWeight:300, marginBottom:20 }}>
                  I&apos;m a full-stack web developer passionate about creating innovative web and mobile solutions that help businesses thrive in the digital age.
                </p>
                <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, color:"#555", lineHeight:1.85, fontWeight:300, marginBottom:36 }}>
                  Currently working as a Software Developer, I&apos;ve gained hands-on experience through internships and freelance projects. I love building scalable apps and writing clean, maintainable code.
                </p>
              </Reveal>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"#111" }}>
                {[
                  { e:"☕", t:"Coffee-powered",   s:"Espresso & curiosity" },
                  { e:"🚀", t:"Community builder", s:"200K+ developers"     },
                  { e:"⚡", t:"Always learning",   s:"Exploring new tech"   },
                  { e:"🇵🇭", t:"Based in PH",      s:"Jala-jala, Rizal"     },
                ].map((f, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.07} threshold={0.05}>
                    <div style={{ background:"#fff", padding:"20px", display:"flex", gap:14, alignItems:"flex-start" }}>
                      <span style={{ fontSize:20 }}>{f.e}</span>
                      <div>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#111", marginBottom:3 }}>{f.t}</div>
                        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:"#888", fontWeight:300 }}>{f.s}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <div style={{ marginBottom:52 }}>
                <Reveal from="right">
                  <div className="sec-label" style={{ marginBottom:20 }}>Experience</div>
                </Reveal>
                <div className="exp-list">
                  {EXP.map((j, i) => (
                    <Reveal key={i} delay={i * 0.1} from="right" threshold={0.05}>
                      <button
                        type="button"
                        className={`exp-item${activeExp === i ? " active" : ""}`}
                        onClick={() => setActiveExp(prev => prev === i ? -1 : i)}
                        aria-expanded={activeExp === i}
                      >
                        <div className="exp-top">
                          <div>
                            <div className="exp-co">{j.company}</div>
                            <div className="exp-role-txt">{j.role}</div>
                            <span className={`exp-badge${j.active ? " live" : ""}`}>{j.active ? "Active" : j.type}</span>
                          </div>
                          <div className="exp-period">
                            {j.period.split(" – ").map((d, di) => <div key={di}>{d}</div>)}
                          </div>
                        </div>

                        <div className="exp-meta-row">
                          <span className="exp-summary">{EXP_DETAILS[j.company]?.scope}</span>
                          <span className="exp-toggle">{activeExp === i ? "Hide details" : "View work"}</span>
                        </div>

                        <div className="exp-details">
                          <div className="exp-details-inner">
                            <ul className="exp-work-list">
                              {EXP_DETAILS[j.company]?.work?.map((item) => (
                                <li key={item} className="exp-work-item">
                                  <span className="exp-work-dot" />
                                  <span className="exp-work-text">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div ref={skillsRef}>
                <Reveal from="right">
                  <div className="sec-label" style={{ marginBottom:20 }}>Skills</div>
                </Reveal>
                <div className="sk-grid">
                  {SKILLS.map((sk, i) => (
                    <Reveal key={i} delay={i * 0.06} from="right" threshold={0.04}>
                      <div className="sk-card">
                        <div className="sk-card-head">
                          <div>
                            <div className="sk-card-name">{sk.name}</div>
                            <div className="sk-card-meta">Hover to explore</div>
                          </div>
                          <div className="sk-logos">
                            {sk.logos.map((logo) => (
                              <div key={logo.alt} className="sk-logo-chip" title={logo.alt}>
                                <Image
                                  className="sk-logo"
                                  src={logo.src}
                                  alt={logo.alt}
                                  width={28}
                                  height={28}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="contact-blk">
          <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
            <Reveal threshold={0.1}>
              <div className="sec-label" style={{ color:"#e5002b", marginBottom:16 }}>Contact</div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,9vw,140px)", lineHeight:0.9, color:"#fff", marginBottom:40, letterSpacing:"0.01em" }}>
                LET&apos;S BUILD<br /><span style={{ color:"#e5002b" }}>SOMETHING</span><br />REMARKABLE.
              </h2>
            </Reveal>
            <Reveal delay={0.18} threshold={0.1}>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, color:"rgba(255,255,255,0.55)", lineHeight:1.85, maxWidth:500, fontWeight:300, marginBottom:44 }}>
                Have a project in mind? Whether it&apos;s a startup idea, enterprise solution, or capstone project — my inbox is always open.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <a href="mailto:francisdizonespiritu07@gmail.com" className="btn-red">Email me ↗</a>
                <a href="https://linkedin.com/in/francis-espiritu-4776562b1" target="_blank" rel="noopener noreferrer" className="btn-ghost">LinkedIn ↗</a>
                <a href="https://github.com/Francixxx" target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ↗</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background:"#0a0a0a", padding:"24px 60px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ position:"relative", width:28, height:28, borderRadius:"50%", overflow:"hidden", border:"1.5px solid #333", flexShrink:0 }}>
              <Image src="/Profile.png" alt="Francis" fill sizes="28px" style={{ objectFit:"cover", opacity:0.7 }} />
            </div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#fff", letterSpacing:"0.05em" }}>
              FRANCIS<span style={{ color:"#e5002b" }}>.</span>
            </div>
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555" }}>
            © {new Date().getFullYear()} Francis Espiritu · Built in the Philippines
          </div>
          <div style={{ display:"flex", gap:20 }}>
            {[
              ["GitHub",   "https://github.com/Francixxx"],
              ["LinkedIn", "https://linkedin.com/in/francis-espiritu-4776562b1"],
              ["Email",    "mailto:francisdizonespiritu07@gmail.com"],
            ].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#555", transition:"color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#e5002b"}
                onMouseLeave={e => e.currentTarget.style.color = "#555"}
              >{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}


