import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          {/* <span className="brand-pi">PI</span> */}
          <img src="https://res.cloudinary.com/dxmkq5in3/image/upload/v1776758019/logo_001_p76o1o.png" 
          alt="Parnika Interiors Logo" 
          className="logo"
          />
          <span className="brand-text">Parnika Interiors</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
          <span className={menuOpen ? 'bar open' : 'bar'}></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {['/', '/about', '/services', '/designs', '/contact'].map((path, i) => {
            const labels = ['Home', 'About', 'Services', 'Designs', 'Contact'];
            return (
              <li key={path}>
                <Link to={path} className={isActive(path)} onClick={() => setMenuOpen(false)}>
                  {labels[i]}
                </Link>
              </li>
            );
          })}

          {user ? (
            <>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin" className={`nav-admin ${isActive('/admin')}`} onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button className="btn btn-outline btn-sm"  onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};


export default Navbar;
