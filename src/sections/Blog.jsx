import { Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { blogData } from '../data/blogData';

export default function Blog() {
  const featuredPosts = blogData.slice(0, 3);

  return (
    <section id="blog" className="content-section section-shell">
      <SectionHeading
        eyebrow="Field notes"
        title="Stories beyond"
        accent="the code."
        description="A visual journal from my educational tour—technology, institutions, history, and the experiences behind the journey."
      />

      <div className="journal-grid">
        {featuredPosts.map((post, index) => (
          <Reveal key={post.day} delay={index * 90} className={`journal-card ${index === 0 ? 'journal-card--lead' : ''}`}>
            <Link to={`/blog/${post.day}`} className="journal-image-link" aria-label={`Read ${post.title}`}>
              <img src={post.coverImage} alt={post.title} loading="lazy" />
              <span className="journal-day">DAY {String(post.day).padStart(2, '0')}</span>
            </Link>
            <div className="journal-copy">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <Link to={`/blog/${post.day}`} className="text-link">Read the story <ArrowForwardRoundedIcon /></Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="journal-footer" delay={120}>
        <p>Nine days of learning, travel, and professional exposure.</p>
        <Link to="/blog/1" className="button button--ghost">Start from Day 1 <ArrowForwardRoundedIcon /></Link>
      </Reveal>
    </section>
  );
}
