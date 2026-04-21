import React from 'react';
import './About.css';

const TEAM = [
  { name: 'Mohan Rao', role: 'Founder & Lead Designer', emoji: '👨‍🎨' },
  { name: 'Priya Sharma', role: 'Interior Architect', emoji: '👩‍💼' },
  { name: 'Ravi Kumar', role: '3D Visualization Expert', emoji: '🧑‍💻' },
];

const About = () => (
  <div className="about-page">
    {/* Page Header */}
    <section className="page-hero">
      <div className="container">
        <p className="section-eyebrow">Who We Are</p>
        <h1 className="section-title" style={{ color: '#fff' }}>About Parnika Interiors</h1>
        <div className="gold-line"></div>
      </div>
    </section>

    {/* Story */}
    <section className="section">
      <div className="container story-grid">
        <div>
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">A Decade of Transforming Homes</h2>
          <div className="gold-line"></div>
          <p>Founded in Borabanda, Hyderabad, Parnika Interiors has been redefining interior design across Andhra Pradesh and Telangana for over 10 years. We believe every home tells a story — and our mission is to help you tell yours beautifully.</p>
          <p>From budget-conscious makeovers to luxury full-home transformations, we bring the same level of passion, precision, and creativity to every project.</p>
          <p>Our team of certified designers work closely with clients to understand their lifestyle, preferences, and budget — delivering spaces that are not just beautiful but functional and lasting.</p>
        </div>
        <div className="story-image">
          <div className="image-placeholder">
            <span>🏠</span>
            <p>Borabanda, Hyderabad</p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section values-section">
      <div className="container">
        <p className="section-eyebrow">What Drives Us</p>
        <h2 className="section-title">Our Core Values</h2>
        <div className="gold-line"></div>
        <div className="values-grid">
          {[
            { icon: '🎨', title: 'Creativity', desc: 'We bring fresh ideas and bold concepts to every project.' },
            { icon: '⭐', title: 'Quality', desc: 'Premium materials and craftsmanship in every detail.' },
            { icon: '🤝', title: 'Trust', desc: 'Transparent communication and honest pricing always.' },
            { icon: '⏰', title: 'Timeliness', desc: 'Projects delivered on schedule — every time.' },
          ].map((v) => (
            <div key={v.title} className="value-card card">
              <span className="value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section">
      <div className="container">
        <p className="section-eyebrow">Meet the Team</p>
        <h2 className="section-title">Our Experts</h2>
        <div className="gold-line"></div>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="team-card card">
              <div className="team-avatar">{m.emoji}</div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
