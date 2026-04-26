import React from 'react'
import { Globe, Send, Camera, Share2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-main">
      <style>{`
        .footer-main {
          background: #0f172a;
          color: #f8fafc;
          padding: 5rem 2rem 2rem;
          font-family: inherit;
        }

        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.5fr;
          gap: 4rem;
        }

        .footer-brand-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .footer-logo span {
          color: #3b82f6;
        }

        .footer-description {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 320px;
          font-weight: 500;
        }

        .footer-socials {
          display: flex;
          gap: 0.8rem;
          margin-top: 0.5rem;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          display: grid;
          place-items: center;
          color: #94a3b8;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .social-link:hover {
          background: #3b82f6;
          color: #fff;
          transform: translateY(-4px);
          border-color: #3b82f6;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .footer-title {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links a:hover {
          color: #3b82f6;
          transform: translateX(4px);
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.1);
          display: grid;
          place-items: center;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .contact-text {
          font-size: 0.92rem;
          color: #94a3b8;
          font-weight: 500;
          line-height: 1.4;
        }

        .footer-bottom {
          max-width: 1300px;
          margin: 0 auto;
          margin-top: 5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .legal-links {
          display: flex;
          gap: 2rem;
        }

        .legal-links a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: 0.2s;
        }

        .legal-links a:hover {
          color: #fff;
        }

        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }

        @media (max-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="footer-brand-section">
          <div className="footer-logo">Fleet<span>Manager</span></div>
          <p className="footer-description">
            Advanced fleet management solutions for modern logistics. Streamlining your operations with precision tracking and real-time insights.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link"><Globe size={18} /></a>
            <a href="#" className="social-link"><Send size={18} /></a>
            <a href="#" className="social-link"><Camera size={18} /></a>
            <a href="#" className="social-link"><Share2 size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/trips">Trip Records</a></li>
            <li><a href="/drivers">Driver Fleet</a></li>
            <li><a href="/vehicles">Vehicle List</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Support Ticket</a></li>
            <li><a href="#">API Docs <ExternalLink size={12} /></a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Contact Us</h4>
          <div className="contact-item">
            <div className="contact-icon"><MapPin size={16} /></div>
            <div className="contact-text">123 Logistics Way, Tech Park,<br />Kochi, Kerala, 682030</div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Phone size={16} /></div>
            <div className="contact-text">+91 484 234 5678<br />Mon - Sat (9am - 6pm)</div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Mail size={16} /></div>
            <div className="contact-text">support@fleetmanager.com<br />info@fleetmanager.com</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} FleetManager Pro. All rights reserved.
        </div>
        <div className="legal-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer