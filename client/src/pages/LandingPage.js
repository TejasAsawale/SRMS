import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    
    // --- Logic: State Management ---
    const [scrolled, setScrolled] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactSent, setContactSent] = useState(false);

    // --- Logic: Scroll Effect for Navbar ---
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Logic: Smooth Scrolling ---
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Logic: Form Submission (Resolves Warning) ---
    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call your MERN API (axios.post)
        console.log("Form Data Submitted:", contactForm);
        setContactSent(true);
        setContactForm({ name: '', email: '', message: '' });
    };

    const faqs = [
        { q: "How do I view my results?", a: "Log in with your registered email and password. Your results will be displayed on your student dashboard under the Results section." },
        { q: "I forgot my password. What should I do?", a: "Contact your class administrator or school office. They can reset your credentials." },
        { q: "My results are not showing. Who should I contact?", a: "Results are published by your administrator. Contact your school admin directly." },
    ];

    return (
        <div className="lp-container">
            
            {/* ── Navbar ── */}
            <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
                <div className="lp-nav-brand">
                    <div className="lp-logo-square">S</div>
                    <span className="lp-brand-text">SRMS</span>
                </div>

                <div className="lp-nav-links">
                    {['Features', 'FAQ', 'Contact'].map(item => (
                        <button 
                            key={item} 
                            onClick={() => scrollTo(item.toLowerCase())} 
                            className="lp-link-btn"
                        >
                            {item}
                        </button>
                    ))}
                    <button onClick={() => navigate('/login')} className="lp-login-btn">
                        Log In
                    </button>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="lp-hero">
                <div className="lp-hero-content">
                    <div className="lp-hero-badge">Student Result Management System</div>
                    <h1 className="lp-hero-title">
                        Your Academic <br />
                        <span className="lp-text-orange">Journey,</span> Tracked.
                    </h1>
                    <p className="lp-hero-subtitle">
                        Access your results, track your progress, and stay informed — all in one secure platform.
                    </p>
                    <div className="lp-hero-btns">
                        <button onClick={() => navigate('/login')} className="lp-btn-primary">Get Started →</button>
                        <button onClick={() => scrollTo('features')} className="lp-btn-outline">Learn More</button>
                    </div>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section id="features" className="lp-features-section">
                <div className="lp-section-header">
                    <p className="lp-sub-tag">What We Offer</p>
                    <h2 className="lp-section-title">Everything you need.</h2>
                </div>
                <div className="lp-features-grid">
                    {[
                        { icon: '📊', title: 'Instant Results', desc: 'View your exam results the moment they are published.' },
                        { icon: '📚', title: 'Subject Tracking', desc: 'See all your enrolled subjects in one place.' },
                        { icon: '🔒', title: 'Secure Login', desc: 'Your data is protected with encrypted credentials.' },
                    ].map(f => (
                        <div key={f.title} className="lp-feature-card">
                            <div className="lp-feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FAQ Section ── */}
            <section id="faq" className="lp-faq-section">
                <div className="lp-faq-container">
                    <div className="lp-section-header">
                        <p className="lp-sub-tag">FAQ</p>
                        <h2 className="lp-section-title">Common questions.</h2>
                    </div>
                    <div className="lp-faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className="lp-faq-item">
                                <button 
                                    className="lp-faq-question" 
                                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                >
                                    <span>{faq.q}</span>
                                    <span className={`lp-faq-plus ${faqOpen === i ? 'lp-faq-rotate' : ''}`}>+</span>
                                </button>
                                {faqOpen === i && <p className="lp-faq-answer">{faq.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact Section (Warning Fix Integrated) ── */}
            <section id="contact" className="lp-contact-section">
                <div className="lp-contact-container">
                    <div className="lp-section-header">
                        <p className="lp-sub-tag">Get In Touch</p>
                        <h2 className="lp-section-title" style={{ color: '#fff' }}>Need help?</h2>
                    </div>

                    {contactSent ? (
                        <div className="lp-success-message">
                            <div className="lp-check-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>We'll get back to you shortly.</p>
                            <button onClick={() => setContactSent(false)} className="lp-btn-primary">Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="lp-contact-form">
                            <div className="lp-form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    value={contactForm.name} 
                                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>
                            <div className="lp-form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={contactForm.email} 
                                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                    placeholder="you@example.com" 
                                    required 
                                />
                            </div>
                            <div className="lp-form-group">
                                <label>Message</label>
                                <textarea 
                                    value={contactForm.message} 
                                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                    placeholder="How can we help?" 
                                    rows="5" 
                                    required 
                                />
                            </div>
                            <button type="submit" className="lp-btn-primary lp-w-100">Send Message</button>
                        </form>
                    )}
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="lp-footer">
                <p>© 2026 SRMS. All rights reserved.</p>
                <div className="lp-footer-links">
                    <button onClick={() => scrollTo('features')}>Features</button>
                    <button onClick={() => scrollTo('faq')}>FAQ</button>
                    <button onClick={() => navigate('/login')}>Log In</button>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;