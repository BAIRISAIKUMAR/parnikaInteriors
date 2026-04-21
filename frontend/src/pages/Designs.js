import React, { useState, useEffect } from 'react';
import { getDesigns, submitEnquiry } from '../api';
import './Designs.css';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Exterior', 'Other'];

const PLACEHOLDER_DESIGNS = [
  { _id: 'p1', title: 'Modern Living Room', category: 'Living Room', price: 85000, description: 'A sleek, contemporary living space with accent lighting and custom furniture.', images: [] },
  { _id: 'p2', title: 'Luxury Master Bedroom', category: 'Bedroom', price: 70000, description: 'Elegant bedroom design with walk-in wardrobe and ambient lighting.', images: [] },
  { _id: 'p3', title: 'Modular Kitchen Setup', category: 'Kitchen', price: 1200000, description: 'L-shaped modular kitchen with granite countertops and premium fittings.', images: [] },
];

const DesignCard = ({ design, onEnquire }) => (
  <div className="design-card card">
    <div className="design-img">
      {design.images && design.images.length > 0 ? (
        <img src={design.images[0]} alt={design.title} />
      ) : (
        <div className="img-placeholder">🏠</div>
      )}
      <span className="design-category badge badge-gold">{design.category}</span>
    </div>
    <div className="design-info">
      <h3>{design.title}</h3>
      <p>{design.description}</p>
      <div className="design-footer">
        <span className="design-price">₹{Number(design.price).toLocaleString('en-IN')}</span>
        <button className="btn btn-primary btn-sm" onClick={() => onEnquire(design)}>Enquire</button>
      </div>
    </div>
  </div>
);

const EnquiryModal = ({ design, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry({ ...form, designId: design._id.startsWith('p') ? null : design._id });
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); }, 2000);
    } catch {
      setError('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Enquire About: {design.title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {success ? (
          <p className="success-msg" style={{ padding: '1.5rem' }}>✅ Enquiry sent! We'll contact you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email (optional)" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any specific requirements..." />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Submit Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await getDesigns(activeCategory !== 'All' ? activeCategory : null);
        setDesigns(res.data.length > 0 ? res.data : PLACEHOLDER_DESIGNS);
      } catch {
        setDesigns(PLACEHOLDER_DESIGNS);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, [activeCategory]);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow">Our Portfolio</span>
          <h1 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Design Gallery</h1>
          <div className="gold-line"></div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>Browse our handcrafted interior design projects.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter bar */}
          <div className="filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat); setLoading(true); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="designs-grid">
              {designs.map((d) => (
                <DesignCard key={d._id} design={d} onEnquire={setSelectedDesign} />
              ))}
            </div>
          )}

          {!loading && designs.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '3rem' }}>
              No designs found in this category yet.
            </p>
          )}
        </div>
      </section>

      {selectedDesign && (
        <EnquiryModal design={selectedDesign} onClose={() => setSelectedDesign(null)} />
      )}
    </div>
  );
};

export default Designs;
