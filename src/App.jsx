import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import {
  education,
  learningPrograms,
  memberships,
  projects,
  simplilearnCertificates,
  skills,
  researchProfiles,
} from './data';
import { blogData } from './blogData';

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Blog', 'blog'],
  ['Education', 'education'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Credentials', 'credentials'],
  ['Contact', 'contact'],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && node.classList.add('is-visible'),
      { threshold: options.threshold ?? 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options.threshold]);
  return ref;
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function CountUp({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reduced) {
        setDisplay(value);
        return;
      }
      const started = performance.now();
      const duration = 950;
      const frame = (now) => {
        const p = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, reduced]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function SectionHeading({ kicker, title, description, centered = false }) {
  return (
    <Reveal className={`section-heading ${centered ? 'section-heading--center' : ''}`}>
      <span className="kicker"><i />{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function ThemeButton({ theme, toggleTheme }) {
  return (
    <button className="icon-button theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '◐'}</span>
    </button>
  );
}

function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <button className="brand" onClick={() => go('home')} aria-label="Go to home">
          <span className="brand-mark">A</span>
          <span><b>AMEEFFY</b><small>PORTFOLIO</small></span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          <button className="icon-button menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function Hero() {
  const cardRef = useRef(null);
  const reduced = useReducedMotion();
  const handleMove = (event) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty('--rx', `${-y * 10}deg`);
    cardRef.current.style.setProperty('--ry', `${x * 13}deg`);
    cardRef.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="home" className="hero section-shell">
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <div className="status-pill"><span /> Available for meaningful digital projects</div>
          <h1>Building systems with <em>purpose, clarity,</em> and impact.</h1>
          <p className="hero-lead">I’m <strong>Ar-Ameeff M. Adjarail</strong> — an IT educator, institutional technology practitioner, and full-stack developer creating responsive web, mobile, data, and workflow solutions.</p>
          <div className="hero-actions">
            <button className="button button--primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Explore projects <span>↗</span></button>
            <button className="button button--ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start a conversation</button>
          </div>
          <div className="hero-meta">
            <span><b>10</b> featured systems</span>
            <span><b>47</b> learning credentials</span>
            <span><b>296</b> L&amp;D hours</span>
          </div>
        </Reveal>

        <Reveal className="portrait-stage" delay={120}>
          <div className="orbit orbit--one" /><div className="orbit orbit--two" />
          <div className="portrait-card" ref={cardRef} onMouseMove={handleMove} onMouseLeave={reset}>
            <div className="portrait-shine" />
            <img src="/assets/ameeffy-portrait.webp" alt="Ar-Ameeff M. Adjarail in formal attire" />
            <div className="portrait-label">
              <span>Ar-Ameeff M. Adjarail</span>
              <small>Developer · Educator · Research Practitioner</small>
            </div>
          </div>
          <div className="floating-badge floating-badge--one"><b>Full-stack</b><span>Web + Mobile</span></div>
          <div className="floating-badge floating-badge--two"><b>Institutional</b><span>Digital systems</span></div>
        </Reveal>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div>REACT <i>•</i> NODE.JS <i>•</i> MYSQL <i>•</i> RESEARCH <i>•</i> DATA VISUALIZATION <i>•</i> LEADERSHIP <i>•</i> MOBILE DEVELOPMENT <i>•</i> REACT <i>•</i> NODE.JS <i>•</i> MYSQL <i>•</i></div>
      </div>
    </section>
  );
}

function About() {
  const roles = [
    ['Executive Secretary', 'Office of the President, TRAC'],
    ['College Instructor I', 'Information Technology'],
    ['Dean of Student Affairs', 'Student development and institutional service'],
    ['Graduate Student', 'MS Information Technology, BulSU'],
  ];
  return (
    <section id="about" className="section-shell content-section">
      <SectionHeading kicker="About" title="Technology, education, and public service — connected." description="My work sits at the intersection of software development, higher education, research, and institutional leadership." />
      <div className="about-bento">
        <Reveal className="glass-card about-story">
          <span className="card-index">01 / PROFILE</span>
          <h3>I turn operational problems into clear digital experiences.</h3>
          <p>I develop systems that help people schedule services, manage transactions, issue verifiable documents, organize events, analyze records, and communicate more effectively. I care about both the technical logic behind a platform and the experience of the person using it.</p>
          <p>Alongside development, I teach information technology and contribute to institutional initiatives at Tawi-Tawi Regional Agricultural College while pursuing graduate studies in Information Technology.</p>
          <blockquote>“Indeed, with hardship comes ease.” <span>— Qur’an 94:6</span></blockquote>
        </Reveal>
        <div className="role-stack">
          {roles.map(([title, description], index) => (
            <Reveal className="glass-card role-card" delay={index * 80} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span><div><h4>{title}</h4><p>{description}</p></div>
            </Reveal>
          ))}
        </div>
        <Reveal className="glass-card about-focus">
          <span className="card-index">CURRENT FOCUS</span>
          <div className="focus-ring"><span>2026</span></div>
          <p>Advanced systems development, research publication, AI in education, institutional digital transformation, and professional growth.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Blog() {
  const [selected, setSelected] = useState(null);
  const [focusImage, setFocusImage] = useState(null);

  const openStory = (post) => {
    setSelected(post);
    setFocusImage(post.coverImage);
  };

  const moveStory = (direction) => {
    if (!selected) return;
    const nextIndex = (blogData.findIndex((post) => post.day === selected.day) + direction + blogData.length) % blogData.length;
    openStory(blogData[nextIndex]);
  };

  return (
    <section id="blog" className="section-shell content-section blog-section">
      <SectionHeading kicker="Journal" title="Every tour day, every story, every photo — restored." description="The complete educational-tour journal is preserved from Day 1 through Day 9, including the original detailed reflections, cover images, and six-photo galleries." />

      <div className="journal-overview glass-card">
        <div><span className="panel-label">Complete tour archive</span><h3>9 day-by-day stories</h3><p>Navigate chronologically or open any day to read the full reflection and browse its original sub-photos.</p></div>
        <div className="journal-quick-nav" aria-label="Journal day navigation">
          {blogData.map((post) => <button key={post.day} onClick={() => openStory(post)}>Day {post.day}</button>)}
        </div>
      </div>

      <div className="blog-grid blog-grid--complete">
        {blogData.map((post, index) => (
          <Reveal className={`blog-card ${index === 0 ? 'blog-card--featured' : ''}`} delay={(index % 3) * 70} key={post.day}>
            <button onClick={() => openStory(post)} aria-label={`Read Day ${post.day}: ${post.title}`}>
              <img src={post.coverImage} alt={`Day ${post.day}: ${post.title}`} loading="lazy" />
              <div className="blog-overlay" />
              <div className="blog-day-number">{String(post.day).padStart(2, '0')}</div>
              <div className="blog-content"><span>{post.sheesh || `Day ${post.day}`}</span><h3>{post.title}</h3><p>{post.summary}</p><b>Read full story · {post.images.length} photos ↗</b></div>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)} wide>
          <article className="journal-modal">
            <div className="journal-modal__media">
              <img src={focusImage || selected.coverImage} alt={`${selected.title} selected view`} />
              <div className="journal-photo-count">Day {selected.day} · {selected.images.length} original photos</div>
            </div>
            <div className="journal-modal__content">
              <div className="journal-modal__eyebrow"><span>EDUCATIONAL TOUR JOURNAL</span><b>DAY {String(selected.day).padStart(2, '0')} / {String(blogData.length).padStart(2, '0')}</b></div>
              <h2>{selected.title}</h2>
              <p className="journal-summary">{selected.summary}</p>
              <p className="journal-story">{selected.content}</p>
              <div className="journal-gallery-heading"><div><span>Original gallery</span><h3>Moments from Day {selected.day}</h3></div><small>Select any image to enlarge it above.</small></div>
              <div className="journal-gallery">
                {selected.images.map((image, index) => (
                  <button className={focusImage === image.src ? 'active' : ''} onClick={() => setFocusImage(image.src)} key={`${selected.day}-${image.src}`}>
                    <img src={image.src} alt={image.alt || `Day ${selected.day} photo ${index + 1}`} loading="lazy" />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
              <div className="journal-day-strip">
                {blogData.map((post) => <button className={post.day === selected.day ? 'active' : ''} onClick={() => openStory(post)} key={post.day}>{post.day}</button>)}
              </div>
              <div className="journal-navigation">
                <button onClick={() => moveStory(-1)}>← Previous day</button>
                <span>Navigate Day 1 through Day {blogData.length}</span>
                <button onClick={() => moveStory(1)}>Next day →</button>
              </div>
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell content-section">
      <SectionHeading kicker="Education" title="A continuing academic journey." description="From foundational learning to graduate education, each stage has strengthened my technical, research, communication, and leadership capabilities." />
      <div className="timeline">
        {education.map((item, index) => (
          <Reveal className="timeline-item" delay={index * 70} key={item.school}>
            <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="glass-card timeline-card">
              <img src={item.logo} alt={`${item.school} logo`} loading="lazy" />
              <div><span className="timeline-period">{item.period}</span><h3>{item.school}</h3><h4>{item.degree}</h4><p>{item.note}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell content-section">
      <SectionHeading kicker="Capabilities" title="A practical toolkit for building and leading." description="Technical skills are paired with documentation, analysis, coordination, research, and the ability to understand real institutional needs." />
      <div className="skills-grid">
        {skills.map((group, index) => (
          <Reveal className="glass-card skill-card" delay={index * 80} key={group.group}>
            <div className="skill-number">0{index + 1}</div><h3>{group.group}</h3>
            <div className="skill-cloud">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </Reveal>
        ))}
      </div>
      <Reveal className="skills-strip">
        <span>Information Technology &amp; Computer Literacy</span><span>Data Analysis &amp; Visualization</span><span>Document Preparation &amp; Presentation</span><span>Mobile &amp; Web Application Development</span><span>Database Management</span>
      </Reveal>
    </section>
  );
}

function ProjectLink({ project, kind }) {
  if (kind === 'repo') return <Link className="project-link" to={`/private-repository?project=${encodeURIComponent(project.title)}`}>Private GitHub <span>↗</span></Link>;
  if (project.live.startsWith('/')) return <Link className="project-link" to={project.live}>View project <span>↗</span></Link>;
  return <a className="project-link" href={project.live} target="_blank" rel="noreferrer">View project <span>↗</span></a>;
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const types = ['All', ...new Set(projects.map((project) => project.type))];
  const visible = filter === 'All' ? projects : projects.filter((project) => project.type === filter);
  const activeDemos = projects.filter((project) => !project.live.startsWith('/')).length;
  const technologies = Object.entries(projects.reduce((all, project) => {
    project.technologies.forEach((technology) => { all[technology] = (all[technology] || 0) + 1; });
    return all;
  }, {})).sort((a, b) => b[1] - a[1]);
  const maxTechnology = technologies[0]?.[1] || 1;
  const institutional = projects.filter((project) => /TRAC|WMSU|CCS/i.test(project.title)).length;

  return (
    <section id="projects" className="section-shell content-section projects-section">
      <SectionHeading kicker="Selected work" title="A complete, organized systems portfolio." description="Every original project is retained. Interfaces now share a consistent landscape presentation, while analytics summarize scope, technologies, deployment status, and institutional impact." />

      <div className="project-dashboard">
        <div className="project-metrics">
          <div className="project-metric project-metric--accent"><span>Total projects</span><strong><CountUp value={projects.length} /></strong><small>Web, mobile, data, and institutional systems</small></div>
          <div className="project-metric"><span>Public live demos</span><strong><CountUp value={activeDemos} /></strong><small>Currently linked deployments</small></div>
          <div className="project-metric"><span>Institutional systems</span><strong><CountUp value={institutional} /></strong><small>Built around real campus workflows</small></div>
          <div className="project-metric"><span>Technology entries</span><strong><CountUp value={new Set(projects.flatMap((project) => project.technologies)).size} /></strong><small>Across the complete portfolio</small></div>
        </div>
        <div className="project-analytics-grid">
          <div className="glass-card project-chart-panel"><div className="panel-heading"><div><span>Technology analytics</span><h3>Most-used tools</h3></div><b>{technologies.length} technologies</b></div><div className="project-tech-bars">{technologies.slice(0, 8).map(([name, count]) => <div key={name}><span>{name}</span><i><b style={{ width: `${(count / maxTechnology) * 100}%` }} /></i><strong>{count}</strong></div>)}</div></div>
          <div className="glass-card project-scope-panel"><span className="panel-label">Portfolio composition</span><h3>Real systems, not template exercises.</h3><p>The collection includes payment, healthcare scheduling, food commerce, lost-and-found services, campus navigation, productivity, API discovery, appointments, and QR-verifiable event certification.</p><div>{types.filter((type) => type !== 'All').map((type) => <span key={type}>{type}</span>)}</div></div>
        </div>
      </div>

      <div className="project-toolbar"><div><span>{visible.length}</span> projects shown</div><div className="filter-chips">{types.map((type) => <button className={filter === type ? 'active' : ''} onClick={() => setFilter(type)} key={type}>{type}</button>)}</div></div>

      <div className="projects-grid projects-grid--uniform">
        {visible.map((project, index) => (
          <Reveal className="project-card project-card--uniform" delay={(index % 3) * 70} key={project.id}>
            <div className="project-media project-media--landscape"><img src={project.image} alt={`${project.title} interface`} loading="lazy" /><span>{project.type}</span><div className="project-image-index">{String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0')}</div></div>
            <div className="project-body"><div className="project-count">PROJECT / {String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0')}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><button className="project-link project-details-button" onClick={() => setSelected(project)}>Project details <span>↗</span></button><ProjectLink project={project} kind="live" /><ProjectLink project={project} kind="repo" /></div></div>
          </Reveal>
        ))}
      </div>

      {selected && <Modal onClose={() => setSelected(null)} wide><div className="project-detail"><div className="project-detail__image"><img src={selected.image} alt={`${selected.title} interface preview`} /><span>{selected.type}</span></div><div className="project-detail__content"><span className="kicker"><i />Portfolio system</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="project-detail__facts"><div><span>Role</span><b>Full-stack / system development</b></div><div><span>Repository</span><b>Private source access</b></div><div><span>Interface</span><b>Responsive web or mobile experience</b></div><div><span>Focus</span><b>Real workflow and user needs</b></div></div><h3>Core technology</h3><div className="tech-list">{selected.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-actions"><ProjectLink project={selected} kind="live" /><ProjectLink project={selected} kind="repo" /></div></div></div></Modal>}
    </section>
  );
}

function Modal({ children, onClose, wide = false }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key); };
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-panel ${wide ? 'modal-panel--wide' : ''}`} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>{children}
      </div>
    </div>
  );
}

function CredentialDashboard({ onView }) {
  const totalHours = learningPrograms.reduce((sum, item) => sum + item.hours, 0);
  const proofCount = learningPrograms.reduce((sum, item) => sum + item.images.length, 0);
  const technicalHours = learningPrograms.filter((item) => item.ldType === 'Technical').reduce((sum, item) => sum + item.hours, 0);
  const sponsors = new Set(learningPrograms.map((item) => item.sponsor)).size;
  const totalCredentials = proofCount + simplilearnCertificates.length;
  const categories = useMemo(() => {
    const counts = {};
    learningPrograms.forEach((item) => { counts[item.eventType] = (counts[item.eventType] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);
  const classifications = useMemo(() => {
    const totals = {};
    learningPrograms.forEach((item) => { totals[item.ldType] = (totals[item.ldType] || 0) + item.hours; });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, []);
  const monthlyHours = useMemo(() => {
    const totals = {};
    learningPrograms.forEach((item) => {
      const [, month, year] = item.from.split(' ');
      const key = `${month} ${year}`;
      totals[key] = (totals[key] || 0) + item.hours;
    });
    return Object.entries(totals);
  }, []);
  const max = Math.max(...categories.map(([, count]) => count));
  const monthMax = Math.max(...monthlyHours.map(([, hours]) => hours));
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const types = ['All', ...new Set(learningPrograms.map((item) => item.eventType))];
  const visible = learningPrograms.filter((item) => (filter === 'All' || item.eventType === filter) && `${item.title} ${item.sponsor}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="dashboard-layout">
      <div className="dashboard-stats dashboard-stats--extended">
        <div className="metric metric--accent"><span>Total credentials</span><strong><CountUp value={totalCredentials} /></strong><small>{proofCount} uploaded proofs + {simplilearnCertificates.length} e-certificates</small></div>
        <div className="metric"><span>L&amp;D programs</span><strong><CountUp value={learningPrograms.length} /></strong><small>July 2025 — March 2026</small></div>
        <div className="metric"><span>Total L&amp;D hours</span><strong><CountUp value={totalHours} suffix="h" /></strong><small>{Math.round(totalHours / learningPrograms.length)} average hours per program</small></div>
        <div className="metric"><span>Uploaded proofs</span><strong><CountUp value={proofCount} /></strong><small>Certificates of appearance and participation</small></div>
        <div className="metric"><span>Technical hours</span><strong><CountUp value={technicalHours} suffix="h" /></strong><small>Primary professional-development classification</small></div>
        <div className="metric"><span>Event categories</span><strong><CountUp value={categories.length} /></strong><small>Conventions, summits, training, forums, and more</small></div>
        <div className="metric"><span>Sponsoring bodies</span><strong><CountUp value={sponsors} /></strong><small>Institutional and professional partners</small></div>
        <div className="metric"><span>Active memberships</span><strong><CountUp value={memberships.length} /></strong><small>CODEC Region IX and PHILARM</small></div>
      </div>

      <div className="credential-insight-strip">
        <div><span>Most frequent category</span><strong>{categories[0]?.[0]}</strong><small>{categories[0]?.[1]} recorded programs</small></div>
        <div><span>Longest single programs</span><strong>40 hours</strong><small>MASTS Games and Supervisory Development</small></div>
        <div><span>Learning coverage</span><strong>9 months</strong><small>Continuous development across 2025–2026</small></div>
        <div><span>Credential mix</span><strong>{proofCount} + {simplilearnCertificates.length}</strong><small>Formal proofs and digital learning</small></div>
      </div>

      <div className="dashboard-panels dashboard-panels--triple">
        <div className="glass-card chart-panel">
          <div className="panel-heading"><div><span>Attendance mix</span><h3>Program categories</h3></div><b>{learningPrograms.length} records</b></div>
          <div className="bar-chart">{categories.map(([name, count]) => <div className="bar-row" key={name}><span>{name}</span><div><i style={{ width: `${(count / max) * 100}%` }} /></div><b>{count}</b></div>)}</div>
        </div>
        <div className="glass-card chart-panel">
          <div className="panel-heading"><div><span>Timeline analytics</span><h3>Hours by month</h3></div><b>{totalHours} total</b></div>
          <div className="monthly-chart">{monthlyHours.map(([month, hours]) => <div key={month}><i><b style={{ height: `${Math.max(12, (hours / monthMax) * 100)}%` }} /></i><strong>{hours}h</strong><span>{month}</span></div>)}</div>
        </div>
        <div className="glass-card classification-panel">
          <span className="panel-label">Classification hours</span><h3>Professional-development balance</h3>
          <div className="classification-list">{classifications.map(([name, hours]) => <div key={name}><div><span>{name}</span><b>{hours} hours</b></div><i><b style={{ width: `${(hours / totalHours) * 100}%` }} /></i></div>)}</div>
        </div>
      </div>

      <div className="records-toolbar"><div className="filter-chips">{types.map((type) => <button className={filter === type ? 'active' : ''} onClick={() => setFilter(type)} key={type}>{type}</button>)}</div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or sponsor…" aria-label="Search learning programs" /></div>
      <div className="records-summary"><span>Showing <b>{visible.length}</b> of {learningPrograms.length} programs</span><span><b>{visible.reduce((sum, item) => sum + item.hours, 0)}</b> filtered hours</span></div>
      <div className="records-list">
        {visible.map((item, index) => (
          <Reveal className="record-card" delay={(index % 4) * 45} key={item.id}>
            <div className="record-date"><strong>{item.from.split(' ')[0]}</strong><span>{item.from.split(' ')[1]} {item.from.split(' ')[2]}</span></div>
            <div className="record-main"><div className="record-tags"><span>{item.eventType}</span><span>{item.ldType}</span></div><h3>{item.shortTitle}</h3><p>{item.sponsor}</p><small>{item.from} — {item.to}</small></div>
            <div className="record-hours"><strong>{item.hours}</strong><span>hours</span></div>
            <button className="record-view" disabled={!item.images.length} onClick={() => item.images.length && onView(item, 0)}>{item.images.length ? `View ${item.images.length > 1 ? `${item.images.length} proofs` : 'certificate'}` : 'No image uploaded'}</button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function CertificateGallery({ onView }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const gallery = learningPrograms.flatMap((program) => program.images.map((image, index) => ({ program, image, index })));
  const types = ['All', ...new Set(gallery.map(({ program }) => program.eventType))];
  const visible = gallery.filter(({ program }) => (filter === 'All' || program.eventType === filter) && `${program.shortTitle} ${program.sponsor}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="certificate-gallery-wrap"><div className="certificate-gallery-hero"><div><span>Verified visual archive</span><h3>{gallery.length} uploaded credential proofs</h3><p>Certificates of appearance, participation, completion, coaching, conferences, conventions, summits, training, workshops, and institutional development.</p></div><strong><CountUp value={gallery.length} /><small>IMAGES</small></strong></div><div className="certificate-gallery-tools"><div className="filter-chips">{types.map((type) => <button className={filter === type ? 'active' : ''} onClick={() => setFilter(type)} key={type}>{type}</button>)}</div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search certificates…" /></div><div className="certificate-gallery">{visible.map(({ program, image, index }, i) => <Reveal className="certificate-image-card" delay={(i % 4) * 50} key={`${program.id}-${image}`}><button onClick={() => onView(program, index)}><div className="certificate-frame"><img src={image} alt={`${program.shortTitle} certificate`} loading="lazy" /><span className="certificate-proof-number">{String(i + 1).padStart(2, '0')}</span></div><div><span>{program.eventType} · {program.ldType}</span><h3>{program.shortTitle}</h3><p>{program.from} · {program.hours} hours</p><small>{program.sponsor}</small></div></button></Reveal>)}</div>{!visible.length && <div className="empty-state">No certificate matches the selected filter.</div>}</div>;
}

function Simplilearn() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const pages = Math.ceil(simplilearnCertificates.length / pageSize);
  const items = simplilearnCertificates.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div>
      <div className="simplilearn-intro"><div><span>Digital learning archive</span><h3>Simpli learn</h3><p>Twenty-eight e-certificates covering cybersecurity, data science, AI, cloud, programming, analytics, and modern development.</p></div><strong><CountUp value={simplilearnCertificates.length} /><small>E-certificates</small></strong></div>
      <div className="ecert-grid">{items.map((certificate, index) => <Reveal className="ecert-card" delay={(index % 4) * 55} key={certificate.id}><div className="ecert-top"><span>SIMPLI LEARN</span><b>#{String(certificate.id).padStart(2, '0')}</b></div><div className="ecert-seal">A</div><p>Certificate of completion</p><h3>{certificate.title}</h3><small>Continuous professional learning</small><a href={certificate.link} target="_blank" rel="noreferrer">Verify e-certificate ↗</a></Reveal>)}</div>
      <div className="pagination"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>← Previous</button><span>Page {page} of {pages}</span><button disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next →</button></div>
    </div>
  );
}

function Memberships({ onViewImage }) {
  return <div className="membership-grid">{memberships.map((membership, index) => <Reveal className="glass-card membership-card" delay={index * 80} key={membership.short}><button className="membership-image" onClick={() => onViewImage(membership)}><img src={membership.image} alt={`${membership.short} membership proof`} /></button><div><span>{membership.status}</span><h3>{membership.name}</h3><p>{membership.description}</p><strong>{membership.validity}</strong><button className="text-button" onClick={() => onViewImage(membership)}>View membership proof ↗</button></div></Reveal>)}</div>;
}

function Credentials() {
  const [tab, setTab] = useState('dashboard');
  const [viewer, setViewer] = useState(null);
  const [membershipView, setMembershipView] = useState(null);
  const openProgram = (program, index) => setViewer({ program, index });
  const tabs = [['dashboard', 'L&D Dashboard'], ['gallery', 'Certificate Gallery'], ['simplilearn', 'Simpli learn'], ['memberships', 'Memberships']];
  return (
    <section id="credentials" className="section-shell content-section credentials-section">
      <SectionHeading kicker="Credentials" title="Learning, development, and professional memberships." description="An interactive record of L&D interventions, uploaded certificates, e-learning credentials, attendance analytics, and professional association memberships." />
      <div className="credential-tabs" role="tablist">{tabs.map(([id, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)} role="tab" aria-selected={tab === id}>{label}</button>)}</div>
      {tab === 'dashboard' && <CredentialDashboard onView={openProgram} />}
      {tab === 'gallery' && <CertificateGallery onView={openProgram} />}
      {tab === 'simplilearn' && <Simplilearn />}
      {tab === 'memberships' && <Memberships onViewImage={setMembershipView} />}
      {viewer && <Modal onClose={() => setViewer(null)} wide><div className="certificate-viewer"><img src={viewer.program.images[viewer.index]} alt={`${viewer.program.shortTitle} certificate`} /><div className="viewer-details"><span>{viewer.program.eventType} · {viewer.program.ldType}</span><h2>{viewer.program.shortTitle}</h2><p>{viewer.program.title}</p><dl><div><dt>Attendance</dt><dd>{viewer.program.from} — {viewer.program.to}</dd></div><div><dt>Duration</dt><dd>{viewer.program.hours} hours</dd></div><div><dt>Conducted / sponsored by</dt><dd>{viewer.program.sponsor}</dd></div></dl>{viewer.program.images.length > 1 && <div className="viewer-thumbs">{viewer.program.images.map((image, index) => <button className={viewer.index === index ? 'active' : ''} onClick={() => setViewer({ ...viewer, index })} key={image}><img src={image} alt="" /></button>)}</div>}</div></div></Modal>}
      {membershipView && <Modal onClose={() => setMembershipView(null)} wide><div className="membership-view"><img src={membershipView.image} alt={`${membershipView.short} membership proof`} /><div><span className="kicker"><i />Professional membership</span><h2>{membershipView.name}</h2><p>{membershipView.description}</p><strong>{membershipView.validity}</strong></div></div></Modal>}
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !form.message.trim()) {
      setError('Please enter your name, a valid email address, and a message.');
      return;
    }
    setError('');
    const subject = form.subject.trim() || `Portfolio inquiry from ${form.name}`;
    const body = `Hello Ameeffy,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
    window.location.href = `mailto:ameeffyadjarail@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="contact" className="section-shell content-section contact-section">
      <div className="contact-grid">
        <Reveal className="contact-copy"><span className="kicker"><i />Contact</span><h2>Let’s build something useful.</h2><p>For development work, institutional systems, research collaboration, speaking, training, or professional opportunities, send a message and your email application will open with everything prepared.</p><div className="contact-list"><a href="mailto:ameeffyadjarail@gmail.com"><span>EMAIL</span><b>ameeffyadjarail@gmail.com</b></a><a href="tel:+639285155692"><span>PHONE</span><b>+63 928 515 5692</b></a><div><span>BASE</span><b>Tawi-Tawi, Philippines</b></div></div><div className="social-row"><a href="https://www.facebook.com/Ameeffy" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.linkedin.com/in/ameeffy-adjarail-889477363/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.facebook.com/Ameeffy" target="_blank" rel="noreferrer">GitHub ↗</a></div><div className="research-profile-panel"><div className="research-profile-heading"><span>Research identity</span><h3>Academic profiles and identifiers</h3></div><div className="research-profile-grid">{researchProfiles.map((profile) => profile.href ? <a href={profile.href} target="_blank" rel="noreferrer" key={profile.name}><span>{profile.name}</span><b>{profile.handle}</b><small>{profile.status}</small><i>↗</i></a> : <div className="profile-coming-soon" key={profile.name}><span>{profile.name}</span><b>{profile.handle}</b><small>{profile.status}</small><i>SOON</i></div>)}</div></div></Reveal>
        <Reveal className="glass-card contact-form-card" delay={100}><form onSubmit={submit}><div className="form-row"><label><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></label><label><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label></div><label><span>Subject</span><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Project or collaboration" /></label><label><span>Message</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me what you have in mind…" rows="7" /></label>{error && <p className="form-error">{error}</p>}<button className="button button--primary" type="submit">Prepare email <span>↗</span></button><small>This form does not pretend to send a message. It opens your email application with the message prepared.</small></form></Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return <footer><div className="section-shell"><div className="brand"><span className="brand-mark">A</span><span><b>AMEEFFY</b><small>PORTFOLIO</small></span></div><p>Designed and developed for clarity, access, and continuous growth.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></div></footer>;
}

function Home({ theme, toggleTheme }) {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const timer = window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(timer);
  }, [location.hash]);
  return <><ScrollProgress /><Header theme={theme} toggleTheme={toggleTheme} /><main><Hero /><About /><Blog /><Education /><Skills /><Projects /><Credentials /><Contact /></main><Footer /></>;
}

function PrivateRepository({ theme, toggleTheme }) {
  const [params] = useSearchParams();
  const project = params.get('project') || 'This project';
  return <div className="standalone-page"><div className="standalone-top"><Link className="brand" to="/"><span className="brand-mark">A</span><span><b>AMEEFFY</b><small>PORTFOLIO</small></span></Link><ThemeButton theme={theme} toggleTheme={toggleTheme} /></div><div className="private-card"><div className="lock-visual"><span>⌁</span><i /><i /><i /></div><span className="kicker"><i />Private repository</span><h1>GitHub source is not publicly available.</h1><p>The repository for <strong>{project}</strong> is private to protect institutional data, credentials, configurations, and unpublished source code.</p><div className="private-note"><b>Need a technical review?</b><span>Contact Ameeffy to request a guided demonstration, architecture discussion, or approved source-code review.</span></div><div className="hero-actions"><a className="button button--primary" href={`mailto:ameeffyadjarail@gmail.com?subject=${encodeURIComponent(`Request to review: ${project}`)}`}>Contact Ameeffy <span>↗</span></a><Link className="button button--ghost" to="/#projects">Return to portfolio</Link></div></div></div>;
}

function DemoUnavailable({ theme, toggleTheme }) {
  return <div className="standalone-page"><div className="standalone-top"><Link className="brand" to="/"><span className="brand-mark">A</span><span><b>AMEEFFY</b><small>PORTFOLIO</small></span></Link><ThemeButton theme={theme} toggleTheme={toggleTheme} /></div><div className="private-card"><div className="lock-visual demo-visual"><span>↗</span><i /><i /><i /></div><span className="kicker"><i />Project archive</span><h1>The public live demo is currently unavailable.</h1><p>The project remains part of the portfolio, but its former hosting service, database, or deployment is no longer active.</p><div className="hero-actions"><a className="button button--primary" href="mailto:ameeffyadjarail@gmail.com?subject=Project demonstration request">Request a demonstration <span>↗</span></a><Link className="button button--ghost" to="/#projects">Return to projects</Link></div></div></div>;
}

function PortfolioApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ameeffy-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('ameeffy-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((value) => value === 'dark' ? 'light' : 'dark');
  return <Routes><Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} /><Route path="/private-repository" element={<PrivateRepository theme={theme} toggleTheme={toggleTheme} />} /><Route path="/livedemoexpired" element={<DemoUnavailable theme={theme} toggleTheme={toggleTheme} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}

export default function App() {
  return <BrowserRouter><PortfolioApp /></BrowserRouter>;
}
