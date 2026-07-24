import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const highlights = [
  {
    icon: <WorkOutlineRoundedIcon />,
    value: '3+',
    label: 'Years building digital solutions',
  },
  {
    icon: <CodeRoundedIcon />,
    value: '9+',
    label: 'Web and mobile projects',
  },
  {
    icon: <SchoolRoundedIcon />,
    value: 'MSIT',
    label: 'Graduate studies in progress',
  },
  {
    icon: <HubRoundedIcon />,
    value: '360°',
    label: 'From interface to database',
  },
];

export default function About() {
  return (
    <section id="about" className="content-section section-shell">
      <SectionHeading
        eyebrow="About me"
        title="Developer by craft."
        accent="Problem-solver by nature."
        description="I connect design thinking, software engineering, and real institutional needs to build products people can actually use."
      />

      <div className="about-layout">
        <Reveal className="about-story glass-card">
          <span className="card-label">MY JOURNEY</span>
          <h3>Technology with purpose, not decoration.</h3>
          <p>
            I serve as an Executive Secretary at Tawi-Tawi Regional Agricultural College and teach in its BSIT program while continuing my Master of Science in Information Technology studies at Bulacan State University.
          </p>
          <p>
            My development work spans responsive web applications, mobile experiences, database systems, appointment platforms, payment solutions, and internal tools. I enjoy translating complex workflows into interfaces that feel simple and dependable.
          </p>
          <blockquote>
            “Indeed, with hardship comes ease.”
            <span>Qur’an 94:6</span>
          </blockquote>
        </Reveal>

        <div className="about-highlights">
          {highlights.map((item, index) => (
            <Reveal key={item.label} delay={index * 90} className="metric-card glass-card">
              <div className="metric-icon">{item.icon}</div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="principles-row" delay={120}>
        {['Build for clarity', 'Design for trust', 'Optimize for people', 'Keep learning'].map((principle, index) => (
          <div key={principle}><span>0{index + 1}</span>{principle}</div>
        ))}
      </Reveal>
    </section>
  );
}
