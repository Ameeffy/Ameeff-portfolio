import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, accent, description, align = 'left' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} {accent && <span>{accent}</span>}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
