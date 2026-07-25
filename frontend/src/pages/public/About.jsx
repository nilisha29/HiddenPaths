import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import "../../styles/about.css";

const VALUES = [
  {
    icon: "🤝",
    title: "Authenticity First",
    text: "Every experience is hosted by a real local — no scripted tours, no middlemen. You learn from the people who actually live the craft.",
  },
  {
    icon: "🌱",
    title: "Community Impact",
    text: "The majority of what you pay goes directly to your host and their community, not a corporate booking fee.",
  },
  {
    icon: "🛡️",
    title: "Trust & Safety",
    text: "Every guide is verified before their experiences go live, and every booking is protected through HiddenPaths.",
  },
  {
    icon: "🧭",
    title: "Slow Travel",
    text: "We favor depth over ticking boxes — fewer stops, more connection, and stories worth telling long after the trip ends.",
  },
];

const STEPS = [
  { year: "2022", text: "HiddenPaths started as a small directory of Kathmandu Valley artisans." },
  { year: "2023", text: "Expanded to trekking guides across the Khumbu and Annapurna regions." },
  { year: "2024", text: "Reached 80+ verified local hosts and 3,000+ travelers across Nepal." },
];

const About = () => (
  <Layout>
    <section className="about-hero">
      <div className="container about-hero-inner">
        <span className="eyebrow" style={{ color: "var(--color-gold-light)" }}>Our Story</span>
        <h1 className="about-hero-title">Preserving heritage, one journey at a time.</h1>
        <p className="about-hero-text">
          HiddenPaths connects curious travelers with verified local guides across Nepal —
          away from the well-trodden trail and into the homes, kitchens, workshops, and
          villages where Nepal's living traditions are kept alive.
        </p>
      </div>
    </section>

    <section className="page-section container">
      <div className="about-mission">
        <div>
          <h2>Why we started</h2>
          <p className="detail-description" style={{ marginBottom: 16 }}>
            Too much of travel in Nepal happens at a distance — a photo from a bus window,
            a souvenir bought from a stranger. We built HiddenPaths so that travelers could
            step inside the story instead: learning pottery from a third-generation
            Prajapati artisan, trekking with a Sherpa guide who grew up on that exact trail,
            cooking with spices grown a valley away.
          </p>
          <p className="detail-description">
            Every booking directly supports a local host and the community around them,
            and every host is verified by our team before their experiences go live.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80"
          alt="Local artisan at work"
          className="about-mission-image"
        />
      </div>
    </section>

    <section className="about-values-section">
      <div className="container">
        <h2 className="text-center" style={{ marginBottom: 40 }}>What guides everything we build</h2>
        <div className="grid grid-4">
          {VALUES.map((v) => (
            <div key={v.title} className="card about-value-card">
              <span className="about-value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p className="text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="page-section container">
      <h2 className="text-center" style={{ marginBottom: 40 }}>Our journey so far</h2>
      <div className="about-timeline">
        {STEPS.map((s) => (
          <div key={s.year} className="about-timeline-item">
            <span className="about-timeline-year">{s.year}</span>
            <p className="text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="about-cta">
      <div className="container text-center">
        <h2 style={{ color: "var(--color-cream-light)", marginBottom: 12 }}>
          Ready to find your own hidden path?
        </h2>
        <p style={{ color: "rgba(246,239,226,0.75)", marginBottom: 28 }}>
          Browse experiences hosted by verified local guides across Nepal.
        </p>
        <Link to="/explore" className="btn btn-primary">Explore Experiences</Link>
      </div>
    </section>
  </Layout>
);

export default About;
