import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const projects = [
  {
    id: '01',
    name: 'TRAC Appointment & Certificate System',
    desc: 'An institutional platform for appointments, event management, QR-verified certificates, role-based portals, reporting, and audit logs.',
    image: '/project-img/Work7.png',
    tech: ['Node.js', 'MySQL', 'Tailwind CSS'],
    liveLink: null,
    githubLink: 'https://github.com/Ameeffy',
    featured: true,
  },
  {
    id: '02',
    name: 'CCS Payment Transactions — Web',
    desc: 'A secure web-based payment and transaction platform designed for the College of Computer Studies.',
    image: '/project-img/work0.png',
    tech: ['Node.js', 'MySQL', 'Bootstrap'],
    liveLink: 'https://finalccspayment.onrender.com/',
    githubLink: 'https://github.com/Ameeffy/finalCCSPAYMENT',
    featured: true,
  },
  {
    id: '03',
    name: 'CCS Payment Transactions — Mobile',
    desc: 'A React Native mobile application connected to the CCS payment backend for convenient transaction access.',
    image: '/project-img/work2.jpg',
    tech: ['React Native', 'Expo', 'REST API'],
    liveLink: 'https://expo.dev/accounts/ameeffy/projects/ccspayment/builds/7d83470e-f38d-4676-9b12-cb1e644f6da0',
    githubLink: 'https://github.com/Ameeffy/mobileccspayment',
  },
  {
    id: '04',
    name: 'WMSU Dental Clinic Appointment System',
    desc: 'A full-stack clinic scheduling platform built to simplify appointments and administrative workflows.',
    image: '/project-img/work3.png',
    tech: ['Django', 'Chart.js', 'Bootstrap'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy',
  },
  {
    id: '05',
    name: 'Goodys Food E-commerce Platform',
    desc: 'An online food ordering and management system with customer-facing and administrative workflows.',
    image: '/project-img/work4.png',
    tech: ['PHP', 'MySQL', 'Chart.js'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy/goodysfood',
  },
  {
    id: '06',
    name: 'WMSU Lost & Found',
    desc: 'A web platform for reporting, organizing, and tracking lost and found items within the university.',
    image: '/project-img/work5.png',
    tech: ['Django', 'SQLite', 'Bootstrap'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy/djangolostandfoundapp',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="content-section section-shell">
      <SectionHeading
        eyebrow="Selected work"
        title="Systems designed around"
        accent="real-world workflows."
        description="A selection of platforms I developed across institutional operations, payments, mobile access, and service delivery."
      />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            delay={(index % 3) * 80}
            className={`project-card glass-card ${project.featured ? 'project-card--featured' : ''}`}
          >
            <div className="project-image-wrap">
              <img src={project.image} alt={`${project.name} interface`} loading="lazy" />
              <div className="project-image-shade" />
              <span className="project-number">{project.id}</span>
            </div>
            <div className="project-body">
              <div className="project-tags">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <div className="project-actions">
                <a href={project.githubLink} target="_blank" rel="noreferrer"><GitHubIcon /> Source</a>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target={project.liveLink.startsWith('/') ? undefined : '_blank'}
                    rel={project.liveLink.startsWith('/') ? undefined : 'noreferrer'}
                  >
                    View project <ArrowOutwardRoundedIcon />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
