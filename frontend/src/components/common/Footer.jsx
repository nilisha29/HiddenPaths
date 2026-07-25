import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-logo">HiddenPaths</h3>
          <p className="footer-text">
            Authentic local experiences curated for the soulful traveler. Join us in
            preserving heritage through discovery.
          </p>
          <div className="footer-socials">
            <a href="https://hiddenpaths.example.com" target="_blank" rel="noreferrer" aria-label="Website">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="mailto:hello@hiddenpaths.com" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/explore">Experiences</Link></li>
            <li><Link to="/explore">Local Hosts</Link></li>
            <li><Link to="/about">Adventure Guide</Link></li>
            <li><Link to="/explore">Destinations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Careers</Link></li>
            <li><Link to="/about">Privacy Policy</Link></li>
            <li><Link to="/about">Impact Report</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">The Journal</h4>
          <p className="footer-text">Receive monthly stories from the hidden paths of Nepal.</p>
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" className="footer-input" />
            <button className="btn btn-primary btn-block">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} HiddenPaths. Made with ❤️ in Kathmandu.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Terms of Service</Link>
            <Link to="/about">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
