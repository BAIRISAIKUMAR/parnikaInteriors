import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../api';
import './Admin.css';

const CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Exterior', 'Other'];

const emptyForm = {
  title: '',
  category: 'Living Room',
  price: '',
  description: '',
  images: '',
  featured: false,
};

// ─── Design Form ───────────────────────────────────────────────────────────────
const DesignForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images
          ? form.images.split(',').map((u) => u.trim()).filter(Boolean)
          : [],
      };
      await onSave(payload);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save design.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial?._id ? 'Edit Design' : 'Add New Design'}</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row-2">
            <div className="form-group">
              <label>Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} placeholder="Design title" />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Price (₹) *</label>
            <input name="price" type="number" required min="0" value={form.price} onChange={handleChange} placeholder="e.g. 85000" />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" required rows="3" value={form.description} onChange={handleChange} placeholder="Describe this design..." />
          </div>
          <div className="form-group">
            <label>Image URLs (comma-separated)</label>
            <input name="images" value={form.images} onChange={handleChange} placeholder="https://..., https://..." />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Mark as Featured
            </label>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Design'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Admin Page ───────────────────────────────────────────────────────────
const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('designs');
  const [designs, setDesigns] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null); // null = closed, {} = new, {...} = edit
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Redirect non-admins
  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/');
    if (!user) navigate('/login');
  }, [user, navigate]);

  const loadDesigns = async () => {
    try {
      const res = await getDesigns();
      setDesigns(res.data);
    } catch {
      setDesigns([]);
    }
  };

  const loadEnquiries = async () => {
    try {
      const res = await getEnquiries();
      setEnquiries(res.data);
    } catch {
      setEnquiries([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([loadDesigns(), loadEnquiries()]);
      setLoading(false);
    };
    load();
  }, []);

  // Design CRUD
  const handleSaveDesign = async (payload) => {
    if (formData?._id) {
      await updateDesign(formData._id, payload);
    } else {
      await createDesign(payload);
    }
    await loadDesigns();
    setFormData(null);
  };

  const handleDeleteDesign = async (id) => {
    await deleteDesign(id);
    setDesigns((prev) => prev.filter((d) => d._id !== id));
    setDeleteConfirm(null);
  };

  // Enquiry actions
  const handleStatusChange = async (id, status) => {
    await updateEnquiryStatus(id, status);
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status } : e))
    );
  };

  const handleDeleteEnquiry = async (id) => {
    await deleteEnquiry(id);
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
  };

  const stats = {
    designs: designs.length,
    enquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === 'new').length,
    featured: designs.filter((d) => d.featured).length,
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <span className="brand-pi">PI</span>
          <div>
            <p className="sidebar-title">Admin Panel</p>
            <p className="sidebar-user">{user.name}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={tab === 'designs' ? 'active' : ''} onClick={() => setTab('designs')}>
            🖼️ Designs
          </button>
          <button className={tab === 'enquiries' ? 'active' : ''} onClick={() => setTab('enquiries')}>
            📩 Enquiries
            {stats.newEnquiries > 0 && <span className="badge-dot">{stats.newEnquiries}</span>}
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Stats row */}
        <div className="admin-stats">
          {[
            { label: 'Total Designs', value: stats.designs, icon: '🖼️' },
            { label: 'Featured', value: stats.featured, icon: '⭐' },
            { label: 'Total Enquiries', value: stats.enquiries, icon: '📩' },
            { label: 'New Enquiries', value: stats.newEnquiries, icon: '🔔' },
          ].map((s) => (
            <div key={s.label} className="admin-stat-card">
              <span className="asc-icon">{s.icon}</span>
              <div>
                <p className="asc-value">{s.value}</p>
                <p className="asc-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Designs Tab */}
        {tab === 'designs' && (
          <div className="admin-section">
            <div className="section-head">
              <h2>Designs</h2>
              <button className="btn btn-primary" onClick={() => setFormData(emptyForm)}>
                + Add Design
              </button>
            </div>

            {loading ? (
              <div className="spinner"></div>
            ) : designs.length === 0 ? (
              <div className="empty-state">
                <p>🖼️</p>
                <p>No designs yet. Add your first one!</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designs.map((d) => (
                      <tr key={d._id}>
                        <td>
                          <div className="td-title">
                            {d.images?.[0] ? (
                              <img src={d.images[0]} alt={d.title} className="td-thumb" />
                            ) : (
                              <div className="td-thumb-placeholder">🏠</div>
                            )}
                            <span>{d.title}</span>
                          </div>
                        </td>
                        <td><span className="badge badge-gold">{d.category}</span></td>
                        <td className="td-price">₹{Number(d.price).toLocaleString('en-IN')}</td>
                        <td>{d.featured ? '⭐ Yes' : '—'}</td>
                        <td>
                          <div className="td-actions">
                            <button
                              className="btn-icon edit"
                              onClick={() => setFormData({ ...d, images: d.images?.join(', ') || '' })}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-icon delete"
                              onClick={() => setDeleteConfirm({ type: 'design', id: d._id, name: d.title })}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Enquiries Tab */}
        {tab === 'enquiries' && (
          <div className="admin-section">
            <div className="section-head">
              <h2>Enquiries</h2>
            </div>
            {loading ? (
              <div className="spinner"></div>
            ) : enquiries.length === 0 ? (
              <div className="empty-state">
                <p>📩</p>
                <p>No enquiries yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Design</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e._id}>
                        <td>
                          <div>
                            <p style={{ fontWeight: 600 }}>{e.name}</p>
                            {e.email && <p style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{e.email}</p>}
                          </div>
                        </td>
                        <td><a href={`tel:${e.phone}`}>{e.phone}</a></td>
                        <td className="td-msg">{e.message}</td>
                        <td>{e.designId?.title || '—'}</td>
                        <td>
                          <select
                            className="status-select"
                            value={e.status}
                            onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
                          {new Date(e.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td>
                          <button
                            className="btn-icon delete"
                            onClick={() => setDeleteConfirm({ type: 'enquiry', id: e._id, name: e.name })}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Design Form Modal */}
      {formData && (
        <DesignForm
          initial={formData}
          onSave={handleSaveDesign}
          onCancel={() => setFormData(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>? This cannot be undone.</p>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteConfirm.type === 'design'
                    ? handleDeleteDesign(deleteConfirm.id)
                    : handleDeleteEnquiry(deleteConfirm.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
