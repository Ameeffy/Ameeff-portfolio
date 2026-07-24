import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const educationData = [
  {
    year: '2025 — Present',
    school: 'Bulacan State University',
    degree: 'Master of Science in Information Technology',
    description: 'Advanced study in full-stack development, research, systems analysis, and project management.',
    logo: '/R.jpg',
    current: true,
  },
  {
    year: '2021 — 2025',
    school: 'Western Mindanao State University',
    degree: 'Bachelor of Science in Information Technology',
    description: 'Focused on mobile and web development, database management, and applied software projects.',
    logo: '/wmsu.png',
  },
  {
    year: '2015 — 2021',
    school: 'Filipino Turkish Tolerance School',
    degree: 'Junior & Senior High School — HUMSS',
    description: 'Graduated with high honors and received an athletic award.',
    logo: '/turkish-school.jpg',
  },
  {
    year: '2012 — 2015',
    school: 'Bongao Adventist Elementary School',
    degree: 'Elementary Education',
    description: 'Silver medalist with excellence recognition and Best in Mathematics.',
    logo: '/adventist.png',
  },
  {
    year: '2008 — 2012',
    school: 'Notre Dame of Bongao',
    degree: 'Kindergarten & Elementary Education',
    description: 'Consistently recognized among the top students in class.',
    logo: '/notre-dame.jpg',
  },
];

export default function Education() {
  return (
    <section id="education" className="content-section section-shell">
      <SectionHeading
        eyebrow="Academic journey"
        title="Learning that keeps"
        accent="moving forward."
        description="A timeline of the institutions, disciplines, and experiences that continue to shape how I build and lead."
      />

      <div className="timeline">
        {educationData.map((item, index) => (
          <Reveal key={item.school} delay={index * 80} className="timeline-item">
            <div className="timeline-marker"><span /></div>
            <article className="timeline-card glass-card">
              <div className="timeline-logo"><img src={item.logo} alt={`${item.school} logo`} /></div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span>{item.year}</span>
                  {item.current && <em>Current</em>}
                </div>
                <h3>{item.school}</h3>
                <h4>{item.degree}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
