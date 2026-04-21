import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const waLink = 'https://wa.me/919959534928?text=Hello%20I%20am%20interested%20in%20your%20interior%20services';

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            {/* <span className="brand-pi">PI</span> */}
          <img src="https://res.cloudinary.com/dxmkq5in3/image/upload/v1776758019/logo_001_p76o1o.png" 
          alt="Parnika Interiors Logo" 
          className="logo"
          />
            <span>Parnika Interiors</span>
          </div>
          <p>Transforming spaces into beautiful, functional homes across Andhra Pradesh & Telangana.</p>
          <a href={waLink} target="_blank" rel="noreferrer" className="wa-btn">
            💬 Chat on WhatsApp
          </a>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {['/', '/about', '/services', '/designs', '/contact'].map((path, i) => {
              const labels = ['Home', 'About', 'Services', 'Designs', 'Contact'];
              return <li key={path}><Link to={path}>{labels[i]}</Link></li>;
            })}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>📍 Borabanda, Hyderabad</li>
            <li>📞 <a href="tel:9959534928">9959534928</a></li>
            <li>✉️ <a href="mailto:mohanrao6172@gmail.com">mohanrao6172@gmail.com</a></li>
            <li>🗺️ Serving AP & Telangana</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Parnika Interiors. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
