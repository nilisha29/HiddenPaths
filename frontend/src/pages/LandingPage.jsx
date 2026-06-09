// import {
// 	FiArrowRight,
// 	FiCamera,
// 	FiCompass,
// 	FiGlobe,
// 	FiHeart,
// 	FiLayers,
// 	FiMail,
// 	FiMapPin,
// 	FiMenu,
// 	FiShield,
// 	FiStar,
// 	FiSun,
// 	FiUsers,
// } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
// import '../../App.css'
// import {
// 	navLinks,
// 	hero,
// 	featuredExperiences,
// 	intentCategories,
// 	steps,
// 	journalEntries,
// 	stats,
// } from '../../mockData'

// function LandingPage() {
// 	const navigate = useNavigate()

// 	return (
// 		<main className="page-shell">
// 			<header className="topbar">
// 				<a className="brand" href="#home" aria-label="HiddenPaths home">
// 					HiddenPaths
// 				</a>

// 				<nav className="nav-links" aria-label="Primary">
// 					{navLinks.map((link, index) => (
// 						<a
// 							key={link}
// 							className={index === 0 ? 'nav-link active' : 'nav-link'}
// 							href={`#${link.toLowerCase()}`}
// 						>
// 							{link}
// 						</a>
// 					))}
// 				</nav>

// 				<div className="auth-actions">
// 					<button type="button" className="auth-button ghost" onClick={() => navigate('/login')}>
// 						Login
// 					</button>
// 					<button type="button" className="auth-button primary" onClick={() => navigate('/register')}>
// 						Register
// 					</button>
// 					<button type="button" className="icon-button mobile-only" aria-label="Open menu">
// 						<FiMenu />
// 					</button>
// 				</div>
// 			</header>

// 			<section className="hero" id="home">
// 				<div className="hero-scene" aria-hidden="true">
// 					<span className="sun-glow" />
// 					<span className="mountain mountain-back mountain-one" />
// 					<span className="mountain mountain-back mountain-two" />
// 					<span className="mountain mountain-mid mountain-three" />
// 					<span className="mountain mountain-front mountain-four" />
// 					<span className="mountain mountain-front mountain-five" />
// 					<span className="valley-shadow" />
// 				</div>

// 				<div className="hero-content">
// 					<span className="hero-badge">{hero.badge}</span>

// 					<h1>
// 						{hero.title}
// 						<span className="accent-italic">{hero.accent}</span>
// 					</h1>

// 					<p className="hero-copy">{hero.subtitle}</p>

// 					<div className="search-bar" role="search">
// 						<div className="search-input-wrap">
// 							<FiMapPin />
// 							<input type="text" aria-label="Where to?" placeholder="Where to?" />
// 						</div>
// 						<button type="button" className="search-button">
// 							Find Magic
// 						</button>
// 					</div>

// 					<div className="tag-row" aria-label="Popular categories">
// 						{hero.tags.map((item) => (
// 							<span key={item} className="tag-pill">
// 								{item}
// 							</span>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			<section className="content-section light-section" id="explore">
// 				<div className="section-head split-head">
// 					<div>
// 						<p className="eyebrow">Popular Experiences</p>
// 						<p className="section-subtitle">Top-rated adventures loved by our community.</p>
// 					</div>

// 					<a className="view-all" href="#journal">
// 						View all <FiArrowRight />
// 					</a>
// 				</div>

// 				<div className="experience-grid">
// 					{featuredExperiences.map((experience) => (
// 						<article key={experience.id} className="experience-card">
// 							<div
// 								className="experience-media"
// 								style={{ backgroundImage: `url(${experience.image})` }}
// 							>
// 								<button type="button" className="favorite-button" aria-label={`Save ${experience.title}`}>
// 									<FiHeart />
// 								</button>
// 							</div>

// 							<div className="experience-body">
// 								<p className="rating-line">
// 									<FiStar /> {experience.rating} ({experience.reviews})
// 								</p>
// 								<h3>{experience.title}</h3>
// 								<p className="host-line">Hosted by {experience.host}</p>

// 								<div className="experience-footer">
// 									<div className="price-block">
// 										<span>FROM</span>
// 										<strong>{experience.price}</strong>
// 										<small>/ person</small>
// 									</div>

// 									<button type="button" className="book-button">
// 										Book Now
// 									</button>
// 								</div>
// 							</div>
// 						</article>
// 					))}
// 				</div>
// 			</section>

// 			<section className="content-section intent-section">
// 				<div className="section-head centered-head">
// 					<h2>Find your path by intent</h2>
// 					<p>Simple categories for every kind of journey.</p>
// 				</div>

// 				<div className="intent-grid">
// 					{intentCategories.map(({ label, key }) => {
// 						const Icon = {
// 							adventure: FiCompass,
// 							cultural: FiLayers,
// 							culinary: FiSun,
// 							artisan: FiCamera,
// 							wellness: FiShield,
// 							history: FiGlobe,
// 						}[key]

// 						return (
// 							<article key={label} className="intent-card">
// 								<span className="intent-icon">{Icon ? <Icon /> : <FiCompass />}</span>
// 								<span className="intent-label">{label}</span>
// 							</article>
// 						)
// 					})}
// 				</div>
// 			</section>

// 			<section className="content-section community-section" id="about">
// 				<div className="community-copy">
// 					<p className="eyebrow muted">Community-powered discovery</p>
// 					<h2>Community-powered discovery</h2>
// 					<p>
// 						We believe the best travel stories are not found in guidebooks. They are lived through
// 						the eyes of the people who call this place home. HiddenPaths connects curious travelers
// 						with local guardians of tradition.
// 					</p>
// 					<button type="button" className="ghost-outline">
// 						Our Story
// 					</button>
// 				</div>

// 				<div className="stats-grid">
// 					{stats.map(({ value, label }) => (
// 						<article key={label} className="stat-card">
// 							<strong>{value}</strong>
// 							<span>{label}</span>
// 						</article>
// 					))}
// 				</div>
// 			</section>

// 			<section className="content-section steps-section">
// 				<div className="section-head centered-head">
// 					<h2>Your Path to Discovery</h2>
// 					<p>Simple steps toward an unforgettable journey.</p>
// 				</div>

// 				<div className="steps-grid">
// 					{steps.map((step, index) => (
// 						<article key={step.title} className="step-card">
// 							<span className="step-number">0{index + 1}</span>
// 							<span className="step-icon">
// 								{index === 0 && <FiUsers />}
// 								{index === 1 && <FiCompass />}
// 								{index === 2 && <FiShield />}
// 								{index === 3 && <FiHeart />}
// 							</span>
// 							<h3>{step.title}</h3>
// 							<p>{step.description}</p>
// 						</article>
// 					))}
// 				</div>
// 			</section>

// 			<section className="content-section journal-section" id="journal">
// 				<div className="section-head journal-head">
// 					<div>
// 						<p className="eyebrow muted">The Community</p>
// 						<h2>Journal Entries</h2>
// 					</div>
// 					<p className="journal-note">
// 						Words from those who have wandered with us, captured in the moments between the climbs.
// 					</p>
// 				</div>

// 				<div className="journal-grid">
// 					{journalEntries.map((entry, index) => (
// 						<article key={entry.name} className="journal-card">
// 							<div>
// 								<span className={`journal-avatar avatar-${index + 1}`} aria-hidden="true" />
// 								<div>
// 									<strong>{entry.name}</strong>
// 									<span>{entry.meta}</span>
// 								</div>
// 							</div>
// 							<p>{entry.quote}</p>
// 						</article>
// 					))}
// 				</div>
// 			</section>

// 			<footer className="site-footer">
// 				<div className="footer-brand">
// 					<h3>HiddenPaths</h3>
// 					<p>
// 						Authentic local experiences curated for the soulful traveler. Join us in preserving
// 						heritage through discovery.
// 					</p>
// 					<div className="social-row" aria-label="Social links">
// 						<a href="#home" aria-label="Website">
// 							<FiGlobe />
// 						</a>
// 						<a href="#home" aria-label="Instagram">
// 							<FiCamera />
// 						</a>
// 						<a href="#home" aria-label="Email">
// 							<FiMail />
// 						</a>
// 					</div>
// 				</div>

// 				<div className="footer-links">
// 					<h4>Explore</h4>
// 					<a href="#explore">Experiences</a>
// 					<a href="#explore">Local Hosts</a>
// 					<a href="#explore">Adventure Guide</a>
// 					<a href="#explore">Destinations</a>
// 				</div>

// 				<div className="footer-links">
// 					<h4>Company</h4>
// 					<a href="#about">Our Story</a>
// 					<a href="#about">Careers</a>
// 					<a href="#about">Privacy Policy</a>
// 					<a href="#about">Impact Report</a>
// 				</div>

// 				<div className="newsletter">
// 					<h4>The Journal</h4>
// 					<p>Receive monthly stories from the hidden paths of Nepal.</p>
// 					<div className="newsletter-form">
// 						<input type="email" aria-label="Your email address" placeholder="Your email address" />
// 						<button type="button">Subscribe</button>
// 					</div>
// 				</div>

// 				<div className="footer-bottom">
// 					<span>Copyright 2024 HiddenPaths. Made in Kathmandu.</span>
// 					<div>
// 						<a href="#home">Terms of Service</a>
// 						<a href="#home">Cookie Policy</a>
// 					</div>
// 				</div>
// 			</footer>
// 		</main>
// 	)
// }

// export default LandingPage






import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 1. Hero Full Screen Header Banner */}
      <div className="hero-container" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920')" }}>
        <nav className="navbar">
          <div className="logo">HiddenPaths</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Explore</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <button onClick={() => navigate('/login')} className="btn-login">Login</button>
            <button onClick={() => navigate('/register')} className="btn-register">Register</button>
          </div>
        </nav>

        <div className="hero-content">
          <span className="badge">Nepal's Local Discovery Platform</span>
          <h1 className="hero-title">Travel that touches <br /><span>the soul.</span></h1>
          <p className="hero-description">Step away from the tourist path and into the heart of local life. Handcrafted journeys designed by those who call Nepal home.</p>
          
          <div className="search-pill">
            <input type="text" placeholder="Where to?" />
            <button className="btn-search">Find Magic</button>
          </div>

          <div className="quick-tags">
            {['Food', 'Culture', 'Adventure', 'Nature', 'Masterclasses', 'Hidden Places'].map((tag, i) => (
              <span key={i} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
        <div></div>
      </div>

      {/* 2. Popular Experiences Section */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Popular Experiences</h2>
            <p className="section-subtitle">Top-rated adventures loved by our community</p>
          </div>
          <a href="#" className="see-all">See all &rarr;</a>
        </div>
        <div className="card-grid">
          {[
            { title: "Hidden Newari Street Food Tour", price: "2,500", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600" },
            { title: "Bhaktapur Pottery Workshop", price: "1,800", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600" },
            { title: "Secret Sunrise Hike", price: "1,200", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600" }
          ].map((item, idx) => (
            <div key={idx} className="exp-card">
              <img src={item.img} alt={item.title} className="card-img" />
              <div className="card-body">
                <span className="card-rating">★ 5.0 (48 reviews)</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-host">Hosted by Local Guide</p>
                <div className="card-footer">
                  <div>
                    <span className="price-label block" style={{fontSize:'0.65rem', color:'#a1a1aa'}}>From</span>
                    <span className="price-amount">NPR {item.price}</span><span style={{color:'#71717a', fontSize:'0.75rem'}}> / person</span>
                  </div>
                  <button className="btn-book">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Find Your Path By Intent */}
      <section className="bg-cream">
        <div className="section-wrapper">
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h2 className="section-title">Find your path by intent</h2>
          </div>
          <div className="intent-bar">
            {['Adventure', 'Culture', 'Culinary', 'Artisan', 'Wellness', 'History'].map((item, i) => (
              <div key={i} className="intent-box">
                <div className="intent-box-icon">✦</div>
                <div className="intent-box-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Community Powered Discovery Section */}
      <section className="bg-dark-charcoal">
        <div className="section-wrapper split-metrics">
          <div>
            <h2 className="section-title" style={{marginBottom:'1rem'}}>Community powered discovery</h2>
            <p style={{color:'#a1a1aa', fontSize:'0.9rem', lineHeight:'1.6'}}>We believe the best travel stories aren't found in guidebooks. They're lived through the eyes of the people who call this place home. HiddenPaths connects curious travelers with local guardians of tradition.</p>
            <button className="btn-story">Our Story</button>
          </div>
          <div className="metrics-grid">
            {[
              { num: "159", label: "Experiences" },
              { num: "84", label: "Hosts" },
              { num: "3.2k", label: "Travelers" },
              { num: "4.9", label: "Rating" }
            ].map((m, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-number">{m.num}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Roadmap */}
      <section className="section-wrapper">
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h2 className="section-title">Your Path to Discovery</h2>
          <p className="section-subtitle">Simple steps to a uniquely crafted journey.</p>
        </div>
        <div className="pipeline-grid">
          {[
            { title: "1. Discover", desc: "Browse through handcrafted local experiences near you." },
            { title: "2. Explore Details", desc: "Read authentic field notes, background history and profiles." },
            { title: "3. Book Instantly", desc: "Secure your reservation slot effortlessly through digital booking." },
            { title: "4. Live the Moment", desc: "Step out into reality and capture unforgettable human insights." }
          ].map((step, idx) => (
            <div key={idx} className="step-node">
              <div className="step-icon-circle">✓</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Journal Entries */}
      <section className="bg-cream">
        <div className="section-wrapper">
          <div className="section-header">
            <div>
              <span style={{color:'#A8441B', fontSize:'0.75rem', fontWeight:'600', textTransform:'uppercase'}}>The Community</span>
              <h2 className="section-title" style={{marginTop:'0.25rem'}}>Journal Entries</h2>
            </div>
            <p style={{maxWidth:'350px', fontSize:'0.8rem', color:'#71717a'}}>Read real journal fragments shared by our community travelers tracking deep local footprints.</p>
          </div>
          <div className="journal-grid">
            {[
              { name: "Rana B.", loc: "Newari Food Tour", text: "The taste of warm bara cooked over fire inside a small family courtyard in Patan was magic. This wasn't standard dining; it was community love." },
              { name: "Marcus T.", loc: "Pottery Workshop", text: "The ancient masters handle clay like water. Spending three hours trying to shape a small vessel taught me more about heritage than any book." },
              { name: "Sarah J.", loc: "Sunrise Hike", text: "We reached the ridge right as the fog parted over the valley. Our host made hot ginger tea. Best view of the Himalayas I have ever had." }
            ].map((j, i) => (
              <div key={i} className="journal-card">
                <div className="journal-card-header">
                  <div className="journal-avatar" style={{background:'#e4e4e7'}}></div>
                  <div>
                    <div className="journal-name">{j.name}</div>
                    <div className="journal-loc">{j.loc}</div>
                  </div>
                </div>
                <p className="journal-text">"{j.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Restored Footer */}
      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>HiddenPaths</h2>
            <p>Authentic, local experiences handcrafted for the mindful traveler interested in uncovering heritage throughout discovery journeys.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Experiences</a></li>
              <li><a href="#">Host a Local</a></li>
              <li><a href="#">Adventure Guide</a></li>
              <li><a href="#">Become a Host</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Support Terms</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>The Journal</h4>
            <p style={{color:'#a1a1aa', fontSize:'0.8rem', marginBottom:'1rem'}}>Receive monthly field notes directly from local hosts.</p>
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 HiddenPaths. Made with ❤️ in Nepal.</div>
          <div className="footer-bottom-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
