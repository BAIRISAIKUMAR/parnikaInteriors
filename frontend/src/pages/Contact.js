import React, { useState } from 'react';
import { submitEnquiry } from '../api';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const waLink = 'https://wa.me/919959534928?text=Hello%20I%20am%20interested%20in%20your%20interior%20services';

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Get In Touch</span>
          <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact Us</h1>
          <div className="gold-line"></div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
            Reach out — we'd love to hear about your project.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2 className="section-title">Let's Talk</h2>
            <div className="gold-line"></div>
            <p style={{ color: 'var(--gray)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Have a project in mind? Fill out the form or reach us directly through the contact details below.
              We'll get back to you within 24 hours.
            </p>

            <div className="info-cards">
              {[
                { icon: '📍', title: 'Location', detail: 'Borabanda, Hyderabad, Telangana' },
                { icon: '📞', title: 'Phone', detail: '9959534928', href: 'tel:9959534928' },
                { icon: '✉️', title: 'Email', detail: 'mohanrao6172@gmail.com', href: 'mailto:mohanrao6172@gmail.com' },
                { icon: '🗺️', title: 'Service Area', detail: 'Andhra Pradesh & Telangana' },
              ].map((c) => (
                <div key={c.title} className="info-card">
                  <span className="info-icon">{c.icon}</span>
                  <div>
                    <p className="info-title">{c.title}</p>
                    {c.href ? (
                      <a href={c.href} className="info-detail">{c.detail}</a>
                    ) : (
                      <p className="info-detail">{c.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary wa-contact-btn">
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="contact-form-wrap card">
            <h3>Send Us a Message</h3>
            {success ? (
              <div className="success-box">
                <span>✅</span>
                <p>Thank you! Your enquiry has been submitted. We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Enter your full name" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="Your phone number" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" required rows="5" value={form.message} onChange={handleChange} placeholder="Tell us about your project — room type, size, style preferences, budget..." />
                </div>
                {error && <p className="error-msg">{error}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
