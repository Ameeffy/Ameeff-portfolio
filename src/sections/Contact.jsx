import { useState } from 'react';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.message.trim()) nextErrors.message = 'Please write a short message.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const subject = form.subject.trim() || `Portfolio inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:ameeffyadjarail@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="content-section section-shell contact-section">
      <SectionHeading
        eyebrow="Let’s connect"
        title="Have an idea worth"
        accent="building well?"
        description="Tell me about your project, system, collaboration, or opportunity. Your message will open in your default email application."
      />

      <div className="contact-layout">
        <Reveal className="contact-panel glass-card">
          <div>
            <span className="card-label">CONTACT DETAILS</span>
            <h3>Let’s turn the next challenge into a useful product.</h3>
            <p>I’m open to development projects, research collaborations, institutional systems, and professional opportunities.</p>
          </div>

          <div className="contact-list">
            <a href="mailto:ameeffyadjarail@gmail.com">
              <span><EmailRoundedIcon /></span>
              <div><small>Email</small><strong>ameeffyadjarail@gmail.com</strong></div>
            </a>
            <a href="tel:+639285155692">
              <span><PhoneRoundedIcon /></span>
              <div><small>Phone</small><strong>+63 928 515 5692</strong></div>
            </a>
            <div>
              <span><LocationOnRoundedIcon /></span>
              <div><small>Based in</small><strong>Philippines</strong></div>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://github.com/Ameeffy" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/ameeffy-adjarail-889477363/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://www.facebook.com/Ameeffy" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://www.instagram.com/ameeffy" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </Reveal>

        <Reveal className="contact-form-card glass-card" delay={100}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <label>
                <span>Name</span>
                <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" value={form.subject} onChange={updateField} placeholder="What would you like to build?" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" value={form.message} onChange={updateField} rows="6" placeholder="Share the goal, current challenge, and what success should look like." />
              {errors.message && <small className="field-error">{errors.message}</small>}
            </label>
            <button className="button button--primary form-submit" type="submit">
              Prepare email <SendRoundedIcon />
            </button>
          </form>
        </Reveal>
      </div>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Ar-Ameeff M. Adjarail. Designed and built with purpose.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  );
}
