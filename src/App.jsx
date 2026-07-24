import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import {
  blogPosts,
  education,
  learningPrograms,
  memberships,
  projects,
  simplilearnCertificates,
  skills,
} from './data';

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
  return (
    <section id="blog" className="section-shell content-section">
      <SectionHeading kicker="Journal" title="Educational tour stories and reflections." description="A visual record of industry exposure, institutions, technology, culture, and the people and places that shaped the journey." />
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <Reveal className={`blog-card ${index === 0 ? 'blog-card--featured' : ''}`} delay={(index % 3) * 70} key={post.id}>
            <button onClick={() => setSelected(post)} aria-label={`Read ${post.title}`}>
              <img src={post.image} alt="" loading="lazy" />
              <div className="blog-overlay" />
              <div className="blog-content"><span>{post.label}</span><h3>{post.title}</h3><p>{post.excerpt}</p><b>Read reflection ↗</b></div>
            </button>
          </Reveal>
        ))}
      </div>
      {selected && (
        <Modal onClose={() => setSelected(null)} wide>
          <img className="modal-hero-image" src={selected.image} alt="" />
          <span className="kicker"><i />{selected.label}</span>
          <h2>{selected.title}</h2>
          <p className="modal-copy">{selected.excerpt} This journal entry preserves the experience as part of a broader journey in learning, professional exposure, and personal growth.</p>
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
  return (
    <section id="projects" className="section-shell content-section projects-section">
      <SectionHeading kicker="Selected work" title="Systems designed around real people and processes." description="All projects from the original portfolio are retained, with the latest TRAC system added and repository access handled through a dedicated private-project screen." />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal className={`project-card ${index < 2 ? 'project-card--wide' : ''}`} delay={(index % 3) * 70} key={project.id}>
            <div className="project-media"><img src={project.image} alt={`${project.title} interface`} loading="lazy" /><span>{project.type}</span></div>
            <div className="project-body"><div className="project-count">{String(index + 1).padStart(2, '0')}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><ProjectLink project={project} kind="live" /><ProjectLink project={project} kind="repo" /></div></div>
          </Reveal>
        ))}
      </div>
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
  const categories = useMemo(() => {
    const counts = {};
    learningPrograms.forEach((item) => { counts[item.eventType] = (counts[item.eventType] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);
  const max = Math.max(...categories.map(([, count]) => count));
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const types = ['All', ...new Set(learningPrograms.map((item) => item.eventType))];
  const visible = learningPrograms.filter((item) => (filter === 'All' || item.eventType === filter) && `${item.title} ${item.sponsor}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="dashboard-layout">
      <div className="dashboard-stats">
        <div className="metric metric--accent"><span>Programs attended</span><strong><CountUp value={learningPrograms.length} /></strong><small>July 2025 — March 2026</small></div>
        <div className="metric"><span>Total L&amp;D hours</span><strong><CountUp value={totalHours} suffix="h" /></strong><small>Verified professional development</small></div>
        <div className="metric"><span>Training programs</span><strong><CountUp value={learningPrograms.filter((x) => x.eventType === 'Training').length} /></strong><small>Supervisory + research ethics</small></div>
        <div className="metric"><span>Seminars attended</span><strong><CountUp value={learningPrograms.filter((x) => x.eventType === 'Seminar').length} /></strong><small>Gender and development</small></div>
      </div>
      <div className="dashboard-panels">
        <div className="glass-card chart-panel">
          <div className="panel-heading"><div><span>Attendance mix</span><h3>Program categories</h3></div><b>16 records</b></div>
          <div className="bar-chart">{categories.map(([name, count]) => <div className="bar-row" key={name}><span>{name}</span><div><i style={{ width: `${(count / max) * 100}%` }} /></div><b>{count}</b></div>)}</div>
        </div>
        <div className="glass-card split-panel">
          <div className="donut" style={{ '--percent': `${(learningPrograms.filter((x) => x.ldType === 'Technical').length / learningPrograms.length) * 100}%` }}><div><b>{learningPrograms.filter((x) => x.ldType === 'Technical').length}</b><span>Technical</span></div></div>
          <div><span className="panel-label">L&amp;D classification</span><h3>Strong technical-development focus</h3><p>The portfolio also includes managerial, supervisory, and sports-and-leadership development.</p></div>
        </div>
      </div>
      <div className="records-toolbar"><div className="filter-chips">{types.map((type) => <button className={filter === type ? 'active' : ''} onClick={() => setFilter(type)} key={type}>{type}</button>)}</div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or sponsor…" aria-label="Search learning programs" /></div>
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
  const gallery = learningPrograms.flatMap((program) => program.images.map((image, index) => ({ program, image, index })));
  return <div className="certificate-gallery">{gallery.map(({ program, image, index }, i) => <Reveal className="certificate-image-card" delay={(i % 4) * 50} key={`${program.id}-${image}`}><button onClick={() => onView(program, index)}><div className="certificate-frame"><img src={image} alt={`${program.shortTitle} certificate`} loading="lazy" /></div><div><span>{program.eventType}</span><h3>{program.shortTitle}</h3><p>{program.from} · {program.hours} hours</p></div></button></Reveal>)}</div>;
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
        <Reveal className="contact-copy"><span className="kicker"><i />Contact</span><h2>Let’s build something useful.</h2><p>For development work, institutional systems, research collaboration, speaking, training, or professional opportunities, send a message and your email application will open with everything prepared.</p><div className="contact-list"><a href="mailto:ameeffyadjarail@gmail.com"><span>EMAIL</span><b>ameeffyadjarail@gmail.com</b></a><a href="tel:+639285155692"><span>PHONE</span><b>+63 928 515 5692</b></a><div><span>BASE</span><b>Tawi-Tawi, Philippines</b></div></div><div className="social-row"><a href="https://www.facebook.com/Ameeffy" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.linkedin.com/in/ameeffy-adjarail-889477363/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/Ameeffy" target="_blank" rel="noreferrer">GitHub ↗</a></div></Reveal>
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
