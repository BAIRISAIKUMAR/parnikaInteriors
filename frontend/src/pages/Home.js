import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const SERVICES = [
  { icon: '🛋️', title: 'Living Room Design', desc: 'Elegant and comfortable spaces where family memories are made.' },
  { icon: '🛏️', title: 'Bedroom Interiors', desc: 'Serene retreats crafted for rest, relaxation, and personal style.' },
  { icon: '🍳', title: 'Modular Kitchen', desc: 'Smart, functional kitchens that inspire culinary creativity.' },
  { icon: '🏢', title: 'Office Interiors', desc: 'Professional environments that boost productivity and brand image.' },
  { icon: '🚿', title: 'Bathroom Design', desc: 'Luxurious bathrooms combining comfort with contemporary aesthetics.' },
  { icon: '🏠', title: 'Full Home Design', desc: 'End-to-end interior solutions for your entire home.' },
];

const STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '10+', label: 'Years Experience' },
  { value: '2', label: 'States Served' },
  { value: '98%', label: 'Client Satisfaction' },
];

const Home = () => {
  const waLink = 'https://wa.me/919959534928?text=Hello%20I%20am%20interested%20in%20your%20interior%20services';

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <p className="hero-tag">✦ Premium Interior Design</p>
          <h1>Transform Your Space<br /><span className="gold-text">Into Art</span></h1>
          <p className="hero-sub">
            Crafting stunning, personalized interiors across Andhra Pradesh & Telangana.
            From concept to completion — we bring your dream home to life.
          </p>
          <div className="hero-actions">
            <Link to="/designs" className="btn btn-primary">View Our Designs</Link>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-outline">
              Get Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <div className="gold-line"></div>
          <p className="section-subtitle">Comprehensive interior design solutions tailored to your lifestyle and budget.</p>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us section">
        <div className="container why-grid">
          <div className="why-text">
            <p className="section-eyebrow">Why Choose Us</p>
            <h2 className="section-title">Parnika Interiors</h2>
            <div className="gold-line"></div>
            <p>With over a decade of experience, we have helped hundreds of families in Hyderabad, AP, and Telangana create homes they love. Our team of expert designers blend aesthetics with functionality to deliver spaces that truly reflect your personality.</p>
            <ul className="why-list">
              <li>✓ Certified and experienced design team</li>
              <li>✓ 3D visualization before execution</li>
              <li>✓ On-time project delivery</li>
              <li>✓ Post-project support and warranty</li>
              <li>✓ Transparent pricing — no hidden costs</li>
            </ul>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Learn More About Us</Link>
          </div>
          <div className="why-image">
            <div className="image-placeholder">
              <span>🏡</span>
              <p>Beautiful Interiors Await</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-content">
          <h2>Ready to Transform Your Home?</h2>
          <p>Contact us today for a free consultation. Serving Hyderabad, Andhra Pradesh & Telangana.</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
