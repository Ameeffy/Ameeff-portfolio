import { useState } from 'react';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const certificates = [
  ['Introduction to Cyber Security', 'https://simpli-web.app.link/e/yb5k8UJG6Sb'],
  ['Introduction to Data Science', 'https://simpli-web.app.link/e/esEcIYcG6Sb'],
  ['Machine Learning with R', 'https://simpli-web.app.link/e/eYslMJoG6Sb'],
  ['Full Stack Java Development', 'https://simpli-web.app.link/e/P1Li3oGG6Sb'],
  ['Python for Beginners', 'https://simpli-web.app.link/e/eqwHXMEG6Sb'],
  ['Introduction to SQL', 'https://simpli-web.app.link/e/gOEsxCHG6Sb'],
  ['ChatGPT for Cybersecurity', 'https://simpli-web.app.link/e/197CeR4F6Sb'],
  ['Front End Development', 'https://simpli-web.app.link/e/Gl39gVNG6Sb'],
  ['Introduction to Artificial Intelligence', 'https://simpli-web.app.link/e/IEeytQPG6Sb'],
  ['Introduction to Cloud Security', 'https://simpli-web.app.link/e/yTFDNgRG6Sb'],
  ['Deep Learning for Beginners', 'https://simpli-web.app.link/e/n6pJSBWG6Sb'],
  ['Python Libraries for Data Science', 'https://simpli-web.app.link/e/TVWVxUXG6Sb'],
  ['ReactJS for Beginners', 'https://simpli-web.app.link/e/Odgly9YG6Sb'],
  ['Azure Fundamentals', 'https://simpli-web.app.link/e/Z1Yxwl0G6Sb'],
  ['Artificial Intelligence Beginner’s Guide', 'https://simpli-web.app.link/e/TDQpLT1G6Sb'],
  ['Introduction to Data Visualization', 'https://simpli-web.app.link/e/ODTxWY4G6Sb'],
  ['Machine Learning Algorithms', 'https://simpli-web.app.link/e/mfCFlz6G6Sb'],
  ['Getting Started with Node.js', 'https://simpli-web.app.link/e/RzWv3O7G6Sb'],
  ['Data Structures and Algorithms', 'https://simpli-web.app.link/e/Revtqh9G6Sb'],
  ['Advanced Python', 'https://simpli-web.app.link/e/MmZRJUaH6Sb'],
  ['Introduction to Data Analytics', 'https://simpli-web.app.link/e/ZNtTP7bH6Sb'],
  ['Data Analytics Projects', 'https://simpli-web.app.link/e/1IynBsdH6Sb'],
  ['Cryptography for Beginners', 'https://simpli-web.app.link/e/0fMBRGhH6Sb'],
  ['Google Cloud Platform', 'https://simpli-web.app.link/e/NWqbWYiH6Sb'],
  ['Introduction to Data Mining', 'https://simpli-web.app.link/e/AfQQD6jH6Sb'],
  ['Ethical Hacking 101', 'https://simpli-web.app.link/e/4wMhW59L6Sb'],
  ['AI & ML Projects', 'https://simpli-web.app.link/e/PsH0anjh7Sb'],
  ['Introduction to Neural Networks', 'https://simpli-web.app.link/e/t4sc79mh7Sb'],
];

export default function Certificates() {
  const [expanded, setExpanded] = useState(false);
  const visibleCertificates = expanded ? certificates : certificates.slice(0, 8);

  return (
    <section id="certificates" className="content-section section-shell">
      <SectionHeading
        eyebrow="Continuous learning"
        title="Credentials that show"
        accent="consistent growth."
        description="Course completions across cybersecurity, artificial intelligence, data, cloud, frontend, and backend development."
      />

      <div className="certificate-grid">
        {visibleCertificates.map(([title, link], index) => (
          <Reveal key={title} delay={(index % 4) * 55} className="certificate-item glass-card">
            <div className="certificate-badge"><VerifiedRoundedIcon /></div>
            <div>
              <span className="certificate-provider">SIMPLILEARN</span>
              <h3>{title}</h3>
            </div>
            <a href={link} target="_blank" rel="noreferrer" aria-label={`View ${title} certificate`}>
              <ArrowOutwardRoundedIcon />
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="certificate-toggle-wrap">
        <button className="button button--ghost" type="button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show fewer certificates' : `View all ${certificates.length} certificates`}
          <ExpandMoreRoundedIcon className={expanded ? 'rotate-180' : ''} />
        </button>
      </Reveal>
    </section>
  );
}
