import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import ThemeToggle from "../../ThemeToggle";
import { PROJECTS } from "../../data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find(project => project.slug === slug);
  if (!project) return { title: "Project not found | Francis Espiritu" };
  return { title: `${project.title} | Francis Espiritu`, description: project.desc, openGraph: { title: `${project.title} | Francis Espiritu`, description: project.desc, type: "website" } };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find(project => project.slug === slug);
  if (!project) notFound();

  return (
    <>
      <a className="skip-link" href="#project-main">Skip to content</a>
      <header className="site-header"><div className="container nav-inner">
        <Link className="wordmark" href="/" aria-label="Francis, home"><Image className="wordmark-logo" src="/F.png" alt="" width={1366} height={768} /></Link>
        <div className="project-header-actions"><Link className="text-link" href="/#work"><ArrowLeft size={16} /> All projects</Link><ThemeToggle /></div>
      </div></header>
      <main className="container project-detail" id="project-main">
        <p className="eyebrow"><span /> {project.category} / {project.year}</p>
        <h1>{project.title}</h1>
        <p className="project-detail-intro">{project.desc}</p>
        <div className={`project-detail-preview ${project.color}`}>
          <Image src={project.image} alt={`${project.title} application preview`} fill priority sizes="(max-width: 600px) 90vw, 1180px" />
        </div>
        <div className="project-detail-grid">
          <section aria-labelledby="overview-heading">
            <p className="eyebrow">About the project</p>
            <h2 id="overview-heading">{project.tag}</h2>
            <p className="project-overview">{project.overview}</p>
            <h3>Key features</h3>
            <ul className="project-features">{project.highlights.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </section>
          <aside className="project-facts" aria-label="Project information">
            <h3>Built with</h3>
            <div className="tech-tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="project-detail-links">
              <a className="button button-dark" href={project.live} target="_blank" rel="noopener noreferrer">{project.category === "Mobile" ? "View on Google Play" : "Visit live project"}<ArrowUpRight size={17} /></a>
              <a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer"><Github size={17} /> View source code <ArrowUpRight size={15} /></a>
            </div>
          </aside>
        </div>
        <Link className="text-link project-return" href="/#work"><ArrowLeft size={16} /> Back to all projects</Link>
      </main>
    </>
  );
}
