import {
	FiArrowRight,
	FiCamera,
	FiCompass,
	FiGlobe,
	FiHeart,
	FiLayers,
	FiMail,
	FiMapPin,
	FiMenu,
	FiShield,
	FiStar,
	FiSun,
	FiUsers,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import {
	navLinks,
	hero,
	featuredExperiences,
	intentCategories,
	steps,
	journalEntries,
	stats,
} from '../../mockData'

function LandingPage() {
	const navigate = useNavigate()

	return (
		<main className="page-shell">
			<header className="topbar">
				<a className="brand" href="#home" aria-label="HiddenPaths home">
					HiddenPaths
				</a>

				<nav className="nav-links" aria-label="Primary">
					{navLinks.map((link, index) => (
						<a
							key={link}
							className={index === 0 ? 'nav-link active' : 'nav-link'}
							href={`#${link.toLowerCase()}`}
						>
							{link}
						</a>
					))}
				</nav>

				<div className="auth-actions">
					<button type="button" className="auth-button ghost" onClick={() => navigate('/login')}>
						Login
					</button>
					<button type="button" className="auth-button primary" onClick={() => navigate('/register')}>
						Register
					</button>
					<button type="button" className="icon-button mobile-only" aria-label="Open menu">
						<FiMenu />
					</button>
				</div>
			</header>

			<section className="hero" id="home">
				<div className="hero-scene" aria-hidden="true">
					<span className="sun-glow" />
					<span className="mountain mountain-back mountain-one" />
					<span className="mountain mountain-back mountain-two" />
					<span className="mountain mountain-mid mountain-three" />
					<span className="mountain mountain-front mountain-four" />
					<span className="mountain mountain-front mountain-five" />
					<span className="valley-shadow" />
				</div>

				<div className="hero-content">
					<span className="hero-badge">{hero.badge}</span>

					<h1>
						{hero.title}
						<span className="accent-italic">{hero.accent}</span>
					</h1>

					<p className="hero-copy">{hero.subtitle}</p>

					<div className="search-bar" role="search">
						<div className="search-input-wrap">
							<FiMapPin />
							<input type="text" aria-label="Where to?" placeholder="Where to?" />
						</div>
						<button type="button" className="search-button">
							Find Magic
						</button>
					</div>

					<div className="tag-row" aria-label="Popular categories">
						{hero.tags.map((item) => (
							<span key={item} className="tag-pill">
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="content-section light-section" id="explore">
				<div className="section-head split-head">
					<div>
						<p className="eyebrow">Popular Experiences</p>
						<p className="section-subtitle">Top-rated adventures loved by our community.</p>
					</div>

					<a className="view-all" href="#journal">
						View all <FiArrowRight />
					</a>
				</div>

				<div className="experience-grid">
					{featuredExperiences.map((experience) => (
						<article key={experience.id} className="experience-card">
							<div
								className="experience-media"
								style={{ backgroundImage: `url(${experience.image})` }}
							>
								<button type="button" className="favorite-button" aria-label={`Save ${experience.title}`}>
									<FiHeart />
								</button>
							</div>

							<div className="experience-body">
								<p className="rating-line">
									<FiStar /> {experience.rating} ({experience.reviews})
								</p>
								<h3>{experience.title}</h3>
								<p className="host-line">Hosted by {experience.host}</p>

								<div className="experience-footer">
									<div className="price-block">
										<span>FROM</span>
										<strong>{experience.price}</strong>
										<small>/ person</small>
									</div>

									<button type="button" className="book-button">
										Book Now
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="content-section intent-section">
				<div className="section-head centered-head">
					<h2>Find your path by intent</h2>
					<p>Simple categories for every kind of journey.</p>
				</div>

				<div className="intent-grid">
					{intentCategories.map(({ label, key }) => {
						const Icon = {
							adventure: FiCompass,
							cultural: FiLayers,
							culinary: FiSun,
							artisan: FiCamera,
							wellness: FiShield,
							history: FiGlobe,
						}[key]

						return (
							<article key={label} className="intent-card">
								<span className="intent-icon">{Icon ? <Icon /> : <FiCompass />}</span>
								<span className="intent-label">{label}</span>
							</article>
						)
					})}
				</div>
			</section>

			<section className="content-section community-section" id="about">
				<div className="community-copy">
					<p className="eyebrow muted">Community-powered discovery</p>
					<h2>Community-powered discovery</h2>
					<p>
						We believe the best travel stories are not found in guidebooks. They are lived through
						the eyes of the people who call this place home. HiddenPaths connects curious travelers
						with local guardians of tradition.
					</p>
					<button type="button" className="ghost-outline">
						Our Story
					</button>
				</div>

				<div className="stats-grid">
					{stats.map(({ value, label }) => (
						<article key={label} className="stat-card">
							<strong>{value}</strong>
							<span>{label}</span>
						</article>
					))}
				</div>
			</section>

			<section className="content-section steps-section">
				<div className="section-head centered-head">
					<h2>Your Path to Discovery</h2>
					<p>Simple steps toward an unforgettable journey.</p>
				</div>

				<div className="steps-grid">
					{steps.map((step, index) => (
						<article key={step.title} className="step-card">
							<span className="step-number">0{index + 1}</span>
							<span className="step-icon">
								{index === 0 && <FiUsers />}
								{index === 1 && <FiCompass />}
								{index === 2 && <FiShield />}
								{index === 3 && <FiHeart />}
							</span>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className="content-section journal-section" id="journal">
				<div className="section-head journal-head">
					<div>
						<p className="eyebrow muted">The Community</p>
						<h2>Journal Entries</h2>
					</div>
					<p className="journal-note">
						Words from those who have wandered with us, captured in the moments between the climbs.
					</p>
				</div>

				<div className="journal-grid">
					{journalEntries.map((entry, index) => (
						<article key={entry.name} className="journal-card">
							<div>
								<span className={`journal-avatar avatar-${index + 1}`} aria-hidden="true" />
								<div>
									<strong>{entry.name}</strong>
									<span>{entry.meta}</span>
								</div>
							</div>
							<p>{entry.quote}</p>
						</article>
					))}
				</div>
			</section>

			<footer className="site-footer">
				<div className="footer-brand">
					<h3>HiddenPaths</h3>
					<p>
						Authentic local experiences curated for the soulful traveler. Join us in preserving
						heritage through discovery.
					</p>
					<div className="social-row" aria-label="Social links">
						<a href="#home" aria-label="Website">
							<FiGlobe />
						</a>
						<a href="#home" aria-label="Instagram">
							<FiCamera />
						</a>
						<a href="#home" aria-label="Email">
							<FiMail />
						</a>
					</div>
				</div>

				<div className="footer-links">
					<h4>Explore</h4>
					<a href="#explore">Experiences</a>
					<a href="#explore">Local Hosts</a>
					<a href="#explore">Adventure Guide</a>
					<a href="#explore">Destinations</a>
				</div>

				<div className="footer-links">
					<h4>Company</h4>
					<a href="#about">Our Story</a>
					<a href="#about">Careers</a>
					<a href="#about">Privacy Policy</a>
					<a href="#about">Impact Report</a>
				</div>

				<div className="newsletter">
					<h4>The Journal</h4>
					<p>Receive monthly stories from the hidden paths of Nepal.</p>
					<div className="newsletter-form">
						<input type="email" aria-label="Your email address" placeholder="Your email address" />
						<button type="button">Subscribe</button>
					</div>
				</div>

				<div className="footer-bottom">
					<span>Copyright 2024 HiddenPaths. Made in Kathmandu.</span>
					<div>
						<a href="#home">Terms of Service</a>
						<a href="#home">Cookie Policy</a>
					</div>
				</div>
			</footer>
		</main>
	)
}

export default LandingPage
