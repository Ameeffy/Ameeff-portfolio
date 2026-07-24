import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const skillGroups = [
  {
    title: 'Frontend engineering',
    icon: <CodeRoundedIcon />,
    description: 'Responsive interfaces with strong visual hierarchy, accessibility, and reusable components.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Material UI', 'Tailwind CSS'],
  },
  {
    title: 'Backend & data',
    icon: <StorageRoundedIcon />,
    description: 'Reliable APIs, authentication flows, relational databases, and server-side business logic.',
    skills: ['Node.js', 'Express', 'MySQL', 'PHP', 'Django', 'REST APIs'],
  },
  {
    title: 'Mobile development',
    icon: <PhoneIphoneRoundedIcon />,
    description: 'Cross-platform mobile experiences connected to real backend services and data.',
    skills: ['React Native', 'Expo', 'Android', 'Mobile UI', 'API Integration'],
  },
  {
    title: 'Product & workflow',
    icon: <DesignServicesRoundedIcon />,
    description: 'From requirements and wireframes to Git workflows, deployment, iteration, and support.',
    skills: ['Figma', 'Git', 'GitHub', 'Render', 'UI/UX', 'System Analysis'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="content-section section-shell">
      <SectionHeading
        eyebrow="Capabilities"
        title="A practical stack for"
        accent="end-to-end delivery."
        description="I work across the full product lifecycle—interface, logic, data, deployment, and continuous improvement."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 90} className="skill-card glass-card">
            <div className="skill-card-top">
              <span className="skill-card-icon">{group.icon}</span>
              <span className="skill-card-index">0{index + 1}</span>
            </div>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="skill-tags">
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="toolbelt glass-card" delay={140}>
        <span className="card-label">CURRENT TOOLBELT</span>
        <div className="toolbelt-track">
          {['VS Code', 'GitHub', 'Postman', 'phpMyAdmin', 'XAMPP', 'Figma', 'Render', 'Expo Go'].map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
