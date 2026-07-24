import { Link, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { blogData } from '../data/blogData';

export default function BlogDetail() {
  const { id } = useParams();
  const currentIndex = blogData.findIndex((post) => post.day === Number(id));
  const blog = blogData[currentIndex];
  const previous = currentIndex > 0 ? blogData[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

  if (!blog) {
    return (
      <main className="empty-state">
        <div className="empty-state-card glass-card">
          <h1>Story not found</h1>
          <p>The journal entry you opened is unavailable.</p>
          <Link className="button button--primary" to="/">Return home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-detail-page">
      <div className="blog-detail-nav-shell">
        <nav className="blog-detail-nav">
          <Link to="/"><ArrowBackRoundedIcon /> Back to portfolio</Link>
          <Link to="/" className="brand" aria-label="Portfolio home">
            <span className="brand-mark"><CodeRoundedIcon /></span>
          </Link>
        </nav>
      </div>

      <header className="blog-detail-hero blog-detail-shell">
        <span className="section-eyebrow">Educational tour · Day {String(blog.day).padStart(2, '0')}</span>
        <h1>{blog.title}</h1>
        <p>{blog.summary}</p>
      </header>

      <div className="blog-detail-shell">
        <div className="blog-detail-cover">
          <img src={blog.coverImage} alt={blog.title} />
        </div>

        <div className="blog-detail-content-grid">
          <article className="blog-article-copy">
            <p>{blog.content}</p>
            <h2 className="blog-gallery-heading">Photo gallery</h2>
            <div className="blog-gallery">
              {blog.images.map((image, index) => (
                <figure key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt || `${blog.title} photo ${index + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>

            <div className="blog-pagination">
              {previous ? <Link to={`/blog/${previous.day}`}>← Day {previous.day}: {previous.title}</Link> : <span />}
              {next && <Link to={`/blog/${next.day}`}>Day {next.day}: {next.title} →</Link>}
            </div>
          </article>

          <aside className="blog-sidebar">
            <h3>All journal entries</h3>
            <div className="blog-sidebar-list">
              {blogData.map((post) => (
                <Link key={post.day} to={`/blog/${post.day}`} className={post.day === blog.day ? 'active' : ''}>
                  <img src={post.coverImage} alt="" loading="lazy" />
                  <span>Day {post.day}<br />{post.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
