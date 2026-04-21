import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    icon: '🛋️',
    title: 'Living Room Design',
    desc: 'Create a stunning focal point for your home with our expert living room design service. We blend comfort, elegance, and your personal style to craft spaces you will love spending time in.',
    features: ['Custom furniture layout', 'Color consultation', 'Lighting design', 'Décor selection'],
    price: 'Starting ₹50,000',
  },
  {
    icon: '🛏️',
    title: 'Bedroom Interiors',
    desc: 'Your bedroom should be your sanctuary. We design peaceful, personalized spaces that help you unwind and recharge, combining warmth with thoughtful storage solutions.',
    features: ['Wardrobe design', 'Bed & upholstery selection', 'Soft furnishings', 'Ambient lighting'],
    price: 'Starting ₹40,000',
  },
  {
    icon: '🍳',
    title: 'Modular Kitchen',
    desc: 'Modern kitchens that maximize space, functionality and style. From L-shaped to U-shaped configurations, we design kitchens that make cooking a pleasure.',
    features: ['Cabinet design', 'Countertop selection', 'Appliance placement', 'Storage optimization'],
    price: 'Starting ₹75,000',
  },
  {
    icon: '🚿',
    title: 'Bathroom Design',
    desc: 'Transform your bathroom into a luxurious retreat. We combine premium fixtures, elegant tiles, and smart layouts to create bathrooms that feel like a personal spa.',
    features: ['Fixture selection', 'Tile design', 'Vanity design', 'Lighting & ventilation'],
    price: 'Starting ₹35,000',
  },
  {
    icon: '🏢',
    title: 'Office Interiors',
    desc: 'Productive, professional workspaces tailored to your brand identity. We design offices that inspire creativity, foster collaboration, and impress clients.',
    features: ['Space planning', 'Ergonomic furniture', 'Brand integration', 'Meeting rooms'],
    price: 'Starting ₹1,00,000',
  },
  {
    icon: '🏠',
    title: 'Full Home Design',
    desc: 'Complete end-to-end interior design for your entire home. One cohesive vision, executed flawlessly from entry to exit — the ultimate transformation.',
    features: ['All rooms covered', 'Single design vision', 'Project management', 'Post-delivery support'],
    price: 'Starting ₹3,00,000',
  },
];

const Services = () => (
  <div>
    <section className="page-hero">
      <div className="container">
        <span className="section-eyebrow">What We Do</span>
        <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Services</h1>
        <div className="gold-line"></div>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', marginTop: '0.5rem' }}>
          Comprehensive interior design solutions for every space and every budget.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="services-detail-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-detail-card card">
              <div className="sdc-header">
                <span className="sdc-icon">{s.icon}</span>
                <div>
                  <h3>{s.title}</h3>
                  <span className="sdc-price">{s.price}</span>
                </div>
              </div>
              <p>{s.desc}</p>
              <ul className="sdc-features">
                {s.features.map((f) => <li key={f}>✓ {f}</li>)}
              </ul>
              <Link to="/contact" className="btn btn-primary sdc-btn">Get a Quote</Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="section process-section">
      <div className="container">
        <p className="section-eyebrow">How We Work</p>
        <h2 className="section-title">Our Design Process</h2>
        <div className="gold-line"></div>
        <div className="process-grid">
          {[
            { step: '01', title: 'Consultation', desc: 'We discuss your vision, needs, and budget.' },
            { step: '02', title: 'Concept Design', desc: 'Our team creates mood boards and 3D concepts.' },
            { step: '03', title: 'Approval', desc: 'You review and approve the design plan.' },
            { step: '04', title: 'Execution', desc: 'We handle everything from procurement to installation.' },
            { step: '05', title: 'Handover', desc: 'Your dream space, delivered on time.' },
          ].map((p) => (
            <div key={p.step} className="process-step">
              <span className="step-num">{p.step}</span>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
