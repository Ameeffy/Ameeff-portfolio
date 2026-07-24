import { useEffect, useRef } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Reveal from '../components/Reveal';

const stack = ['React', 'Node.js', 'MySQL', 'React Native'];

export default function Hero() {
  const visualRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const move = (event) => {
      const rect = visual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
      visual.style.setProperty('--tilt-x', `${y}deg`);
      visual.style.setProperty('--tilt-y', `${x}deg`);
    };

    const reset = () => {
      visual.style.setProperty('--tilt-x', '0deg');
      visual.style.setProperty('--tilt-y', '0deg');
    };

    visual.addEventListener('pointermove', move);
    visual.addEventListener('pointerleave', reset);
    return () => {
      visual.removeEventListener('pointermove', move);
      visual.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <section id="home" className="hero-section section-shell">
      <div className="hero-orb hero-orb--one" />
      <div className="hero-orb hero-orb--two" />
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="availability-pill">
              <span className="status-dot" />
              Available for selected projects
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="hero-kicker">FULL-STACK &amp; MOBILE DEVELOPER</p>
            <h1 className="hero-title">
              Building digital products that feel <span>clear, fast, and human.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="hero-intro">
              I’m <strong>Ar-Ameeff M. Adjarail</strong>, a developer and educator creating responsive web platforms,
              mobile applications, and data-driven systems for real organizations.
            </p>
          </Reveal>

          <Reveal delay={220} className="hero-actions">
            <a className="button button--primary" href="#projects">
              Explore my work <ArrowOutwardRoundedIcon />
            </a>
            <a className="button button--ghost" href="#contact">
              Start a conversation
            </a>
          </Reveal>

          <Reveal delay={280} className="hero-meta-row">
            <div className="hero-location"><LocationOnRoundedIcon /> Philippines</div>
            <span className="meta-divider" />
            <div className="hero-socials">
              <a href="https://github.com/Ameeffy" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a href="https://www.linkedin.com/in/ameeffy-adjarail-889477363/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="hero-visual-wrap">
          <div ref={visualRef} className="hero-visual">
            <div className="portrait-card">
              <div className="portrait-topline">
                <span>AMEEFFY / PORTFOLIO</span>
                <AutoAwesomeRoundedIcon />
              </div>
              <div className="portrait-image-wrap">
                <img src="/profile.png" alt="Ar-Ameeff M. Adjarail" className="portrait-image" />
                <div className="portrait-glow" />
              </div>
              <div className="portrait-footer">
                <div>
                  <small>Current focus</small>
                  <strong>Useful systems, refined UI</strong>
                </div>
                <span className="portrait-index">01</span>
              </div>
            </div>

            <div className="floating-card floating-card--role">
              <span className="floating-icon">&lt;/&gt;</span>
              <div><small>Role</small><strong>Full-stack developer</strong></div>
            </div>

            <div className="floating-card floating-card--stack">
              <small>Core stack</small>
              <div className="stack-cloud">
                {stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[...stack, 'UI Engineering', 'Database Design', ...stack, 'UI Engineering', 'Database Design'].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
