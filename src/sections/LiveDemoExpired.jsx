import { Link } from 'react-router-dom';

export default function LiveDemoExpired() {
  return (
    <main className="empty-state">
      <div className="empty-state-card glass-card">
        <span className="section-eyebrow">Project status</span>
        <h1>Live demo currently unavailable</h1>
        <p>The original hosted demo has expired, but the project remains part of my development portfolio.</p>
        <Link className="button button--primary" to="/#projects">Return to projects</Link>
      </div>
    </main>
  );
}
