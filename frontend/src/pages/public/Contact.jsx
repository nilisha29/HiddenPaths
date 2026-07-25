import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import MapView from "../../components/common/MapView";
import contactService from "../../services/contactService";
import { useToast } from "../../context/ToastContext";
import "../../styles/contact.css";

const CONTACT_CARDS = [
  {
    icon: "✉️",
    title: "Email Us",
    text: "hello@hiddenpaths.com",
    href: "mailto:hello@hiddenpaths.com",
  },
  {
    icon: "📞",
    title: "Call Us",
    text: "+977 1-234-5678",
    href: "tel:+97712345678",
  },
  {
    icon: "📍",
    title: "Visit Us",
    text: "Thamel, Kathmandu, Nepal",
    href: null,
  },
];

const Contact = () => {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await contactService.send(form);
      setStatus("sent");
      toast.success("Message sent — we'll reply within a day or two.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      const msg = err.response?.data?.message || "Could not send your message. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <Layout>
      <section className="contact-hero">
        <div className="container text-center">
          <span className="eyebrow" style={{ color: "var(--color-gold-light)" }}>Get in Touch</span>
          <h1 className="contact-hero-title">We'd love to hear from you</h1>
          <p className="contact-hero-text">
            Questions about a booking, becoming a host, or just want to say namaste? Reach out.
          </p>
        </div>
      </section>

      <div className="container page-section">
        <div className="contact-cards-row">
          {CONTACT_CARDS.map((c) => (
            <div key={c.title} className="card contact-card">
              <span className="contact-card-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              {c.href ? (
                <a href={c.href} className="auth-inline-link">{c.text}</a>
              ) : (
                <p className="text-muted">{c.text}</p>
              )}
            </div>
          ))}
        </div>

        <div className="contact-layout">
          <form onSubmit={handleSubmit} className="card contact-form">
            <h2 style={{ marginBottom: 20 }}>Send us a message</h2>

            {status === "sent" && (
              <div className="form-success">Thanks for reaching out — we'll reply within a day or two.</div>
            )}
            {status === "error" && <div className="form-error">{error}</div>}

            <div className="booking-form-row">
              <div className="field-group">
                <label className="field-label">Your Name</label>
                <input name="name" required value={form.name} onChange={handleChange} className="input-field" />
              </div>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" />
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="General Inquiry" />
            </div>
            <div className="field-group">
              <label className="field-label">Message</label>
              <textarea name="message" required rows={5} value={form.message} onChange={handleChange} className="textarea-field" />
            </div>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="contact-map-wrap">
            <h3 style={{ marginBottom: 16 }}>Find us in Kathmandu</h3>
            <MapView latitude={27.715} longitude={85.31} label="HiddenPaths HQ — Thamel, Kathmandu" height={320} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
