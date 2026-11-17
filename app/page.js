"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "./data/projects";
import ThemeToggle from "./ThemeToggle";
import { ArrowUpRight, ArrowDown, Github, Linkedin, Menu, X, Download, MapPin } from "lucide-react";

const EXPERIENCE = [
  { company: "Koruna Assist Pty Ltd", period: "Jan 2026 — Present", type: "Contract", description: "Building an AI broker portal for Australian citizens, working across front-end features, back-end services, and database management.", current: true },
  { company: "Polaris", period: "Jul 2025 — Jan 2026", type: "Contract", description: "Improved a client broker system in a remote production environment, refining the interface, product flow, and front-end experience." },
  { company: "Inzpect Technology", period: "May 2025 — Jul 2025", type: "Internship", description: "Built a selfie-based mobile attendance app and automated image delivery to Telegram groups to support attendance capture and reporting." },
];
const STACK = [
  { label: "01 / Front end", title: "Interfaces that feel right.", tech: ["React", "Next.js", "JavaScript", "TypeScript", "HTML & CSS"] },
  { label: "02 / Back end", title: "Built on solid foundations.", tech: ["Node.js", "Express", "MySQL", "PHP", "Laravel"] },
  { label: "03 / Beyond the browser", title: "A little more possibility.", tech: ["React Native", "Expo", "Python", "C++", "IoT & RFID"] },
];
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Francixxx", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/francis-espiritu-4776562b1", icon: Linkedin },
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All projects");
  const [portraitShy, setPortraitShy] = useState(false);
  const [shyPortraitReady, setShyPortraitReady] = useState(false);
  const mainRef = useRef(null);
  useEffect(() => {
    if (!mainRef.current || !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = mainRef.current.querySelectorAll(
      ".hero-copy, .hero-visual, .section-heading, .project-toolbar, .project, .next-project, .about-grid > div:not(.skills-grid), .skill-group, .experience-intro, .experience-item, .contact-panel"
    );
    const reveal = element => {
      element.classList.add("is-revealed");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    elements.forEach(element => {
      if (element.classList.contains("is-revealed")) return;
      const siblings = Array.from(element.parentElement.children);
      const stagger = element.matches(".project, .skill-group")
        ? Math.min(siblings.indexOf(element) % 3, 2) * 70 : 0;
      element.style.setProperty("--reveal-delay", `${stagger}ms`);
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
    // Keyboard navigation should never focus content that is still hidden.
    const onFocus = event => {
      const element = event.target.closest(".scroll-reveal");
      if (element) reveal(element);
    };
    const main = mainRef.current;
    main.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      main.removeEventListener("focusin", onFocus);
      elements.forEach(element => {
        if (!element.classList.contains("is-revealed")) element.classList.remove("scroll-reveal");
      });
    };
  }, [filter]);
  const projects = PROJECTS.filter(project => filter === "All projects" || project.category === filter);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header"><div className="container nav-inner">
        <a className="wordmark" href="#home" aria-label="Francis, home"><Image className="wordmark-logo" src="/F.png" alt="" width={1366} height={768} priority /></a>
        <nav className={`navigation ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label="Main navigation">
          {[["Work", "work"], ["About", "about"], ["Experience", "experience"]].map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
        <div className="nav-actions"><ThemeToggle /><button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div></header>

      <main id="main" ref={mainRef}>
        <section className="hero container" id="home" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="hero-intro">Hey, I’m Francis <span aria-hidden="true">↗</span></p>
            <h1 id="hero-heading">Thoughtful code.<br />Real-world<br /><span className="highlight">possibilities.</span></h1>
            <p className="hero-description">A software developer turning ideas into thoughtful web and mobile experiences. Based in the Philippines, building for wherever you are.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDown size={17} /></a><a className="text-link" href="/Francis_Espiritu.pdf" download>Download CV <Download size={16} /></a></div>
          </div>
          <div className="hero-visual">
            <span className="portrait-annotation">the person behind the pixels</span>
            <button className={`portrait-frame${shyPortraitReady ? " is-ready" : ""}${portraitShy ? " is-shy" : ""}`} type="button" aria-label="Show Francis being camera-shy" aria-pressed={portraitShy} onClick={() => setPortraitShy(shy => !shy)}>
              <Image className="portrait-photo" src="/francis-profile.png" alt="Francis Espiritu wearing a cream barong" fill priority sizes="(max-width: 600px) 80vw, (max-width: 1000px) 40vw, 420px" />
              <Image className="portrait-shy" src="/francis-profile-shy.png" alt="" aria-hidden="true" fill loading="eager" onLoad={() => setShyPortraitReady(true)} sizes="(max-width: 600px) 80vw, (max-width: 1000px) 40vw, 420px" />
            </button>
            <div className="portrait-caption"><span>Francis Espiritu</span><span><MapPin size={13} /> Philippines</span></div>
          </div>
          <div className="hero-bottom"><span>FULL-STACK THINKING. HUMAN-FIRST BUILDING.</span><a href="#work">Scroll to discover <ArrowDown size={14} /></a></div>
        </section>

        <div className="stack-strip"><div className="container"><span>GOOD IDEAS, BUILT WITH</span><div>{[
          { name: "React", logo: "react" },
          { name: "Next.js", logo: "nextjs" },
          { name: "TypeScript", logo: "typescript" },
          { name: "Node.js", logo: "nodejs" },
          { name: "React Native", logo: "react" },
          { name: "MySQL", logo: "mysql" },
          { name: "Supabase", logo: "supabase" },
          { name: "JavaScript", logo: "javascript" },
          { name: "Java", logo: "java" },
          { name: "C#", logo: "csharp" },
        ].map(({ name, logo }) => <span className="stack-technology" key={name}><Image className={`stack-logo stack-logo-${logo}`} src={`/logos/${logo}.svg`} width={24} height={24} alt="" aria-hidden="true" />{name}</span>)}</div></div></div>

        <section className="section container" id="work" aria-labelledby="work-heading">
          <div className="section-heading"><div><p className="eyebrow"><span /> 01 — Selected work</p><h2 id="work-heading">A few things<br />I’ve put into the world<span className="mint-dot">.</span></h2></div><p>From the browser to your pocket.<br />Real projects, built to solve real problems.</p></div>
          <div className="project-toolbar"><div className="filters" role="group" aria-label="Filter projects">{["All projects", "Web", "Mobile", "Systems"].map(category => <button type="button" key={category} className={filter === category ? "selected" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}{category === "All projects" && <span>05</span>}</button>)}</div><span className="project-count" role="status">{String(projects.length).padStart(2, "0")} projects</span></div>
          <div className="project-grid">
            {projects.map(project => <article className="project" key={project.title}>
              <Link className={`project-image ${project.color}`} href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>
                <div className="project-browser"><div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{project.title.toLowerCase().replaceAll(" ", "")}</span></div><div className="project-screenshot"><Image src={project.image} alt={`${project.title} application preview`} fill sizes="(max-width: 600px) 90vw, 560px" /></div></div><span className="project-open"><ArrowUpRight size={22} /></span>
              </Link>
              <div className="project-meta"><span>{project.tag}</span><span>{project.year}</span></div>
              <div className="project-title-row"><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><Link className="source-link" href={`/projects/${project.slug}`} aria-label={`View ${project.title} details`}><ArrowUpRight size={19} /></Link></div>
              <p className="project-description">{project.desc}</p><div className="tech-tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
            </article>)}
            {filter === "All projects" && <a className="next-project" href="#contact"><span className="next-spark" aria-hidden="true">✳</span><p>There’s room for one more.</p><h3>Your idea.<br />Our next project.</h3><span className="text-link">Let’s make it happen <ArrowUpRight size={20} /></span></a>}
          </div>
          <a className="github-link text-link" href="https://github.com/Francixxx" target="_blank" rel="noopener noreferrer">More experiments on GitHub <ArrowUpRight size={16} /></a>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading"><div className="container about-grid">
          <div><p className="eyebrow"><span /> 02 — A little about me</p><h2 id="about-heading">Curious mind.<br />Builder at heart<span className="mint-dot">.</span></h2><div className="about-location"><MapPin size={16} /> Jala-jala, Rizal, Philippines</div></div>
          <div className="about-copy"><p className="large-copy">I like figuring out how things work.<br />Even more, I like making them work better.</p><p>I’m Francis, a full-stack developer who enjoys connecting the dots between a good idea and a useful product. I build web and mobile applications with a focus on clean interfaces and maintainable code.</p><p>From RFID systems to mobile attendance apps and broker platforms, I’ve worked across different problems and stacks. The common thread? Making everyday experiences a little simpler.</p><a href="/Francis_Espiritu.pdf" className="text-link" download>A little more about my journey <Download size={16} /></a></div>
          <div className="skills-grid">{STACK.map(item => <div className="skill-group" key={item.label}><p className="eyebrow">{item.label}</p><h3>{item.title}</h3><div className="tech-tags">{item.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div>)}</div>
        </div></section>

        <section className="section container experience-section" id="experience" aria-labelledby="experience-heading"><div className="experience-intro"><p className="eyebrow"><span /> 03 — The journey so far</p><h2 id="experience-heading">Learning by<br />building<span className="mint-dot">.</span></h2><p>Good people. Interesting challenges.<br />A little better with every project.</p><a className="text-link" href="/Francis_Espiritu.pdf" download>View my résumé <ArrowUpRight size={16} /></a></div><div className="experience-list">{EXPERIENCE.map((job, index) => <details className="experience-item" key={job.company} open={index === 0}><summary><span className={`experience-marker ${job.current ? "current" : ""}`} /><span className="job-title"><span className="job-period">{job.period}{job.current && <span className="current-label">Current</span>}</span><strong>{job.company}</strong><span>Software Developer <span className="job-divider">/</span> {job.type}</span></span><span className="expand-icon" aria-hidden="true">+</span></summary><p className="job-description">{job.description}</p></details>)}</div></section>

        <section className="contact-section container" id="contact" aria-labelledby="contact-heading"><div className="contact-panel"><div className="contact-top"><p className="eyebrow"><span /> HAVE SOMETHING IN MIND?</p></div><h2 id="contact-heading">Good things start<br />with a <span>hello.</span></h2><div className="contact-bottom"><p>A new idea, a capstone project, or your next big thing.<br />I’d love to hear what you’re thinking.</p><a className="button button-dark" href="mailto:francisdizonespiritu07@gmail.com">Let’s build something <ArrowUpRight size={19} /></a></div><a className="email-link" href="mailto:francisdizonespiritu07@gmail.com">francisdizonespiritu07@gmail.com <ArrowUpRight size={14} /></a></div></section>
      </main>

      <footer className="container footer"><a className="wordmark" href="#home" aria-label="Francis, home"><Image className="wordmark-logo" src="/F.png" alt="" width={1366} height={768} /></a><p>© {new Date().getFullYear()} Francis Espiritu.<br className="mobile-break" /> Made with care in the Philippines.</p><div className="footer-socials">{SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={16} /><span>{label}</span><ArrowUpRight size={13} /></a>)}<a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a></div></footer>
    </>
  );
}
