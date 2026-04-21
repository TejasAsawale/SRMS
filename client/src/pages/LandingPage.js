// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LandingPage = () => {
//     const navigate = useNavigate();
//     const [scrolled, setScrolled] = useState(false);
//     const [faqOpen, setFaqOpen] = useState(null);
//     const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
//     const [contactSent, setContactSent] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const faqs = [
//         { q: "How do I view my results?", a: "Log in with your registered email and password. Your results will be displayed on your student dashboard under the Results section." },
//         { q: "I forgot my password. What should I do?", a: "Contact your class administrator or school office. They can reset your credentials through the admin panel." },
//         { q: "My results are not showing. Who should I contact?", a: "Results are published by your administrator. If you believe results should be available, please contact your school admin directly." },
//         { q: "How do I register as a new student?", a: "Click the Register button on the login page. Fill in your details. Your admin will assign your class and subjects after registration." },
//         { q: "Can I change my registered email?", a: "Email changes must be done by the administrator. Contact your school office with a valid reason and they will update it." },
//         { q: "Which subjects will I see on my dashboard?", a: "You will see subjects assigned to your class by the administrator. If a subject is missing, notify your admin." },
//     ];

//     const handleContactSubmit = (e) => {
//         e.preventDefault();
//         setContactSent(true);
//         setContactForm({ name: '', email: '', message: '' });
//     };

//     const scrollTo = (id) => {
//         document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//     };

//     return (
//         <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", overflowX: 'hidden' }}>

//             {/* ── Navbar ── */}
//             <nav style={{
//                 position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//                 background: scrolled ? '#d4500a' : '#e85d0a',
//                 boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
//                 transition: 'all 0.3s ease',
//                 padding: '0 40px',
//                 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                 height: '64px'
//             }}>
//                 {/* Logo */}
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     <div style={{
//                         width: '38px', height: '38px', background: '#1a1a2e',
//                         borderRadius: '8px', display: 'flex', alignItems: 'center',
//                         justifyContent: 'center', color: '#e85d0a',
//                         fontWeight: 800, fontSize: '18px', letterSpacing: '-1px'
//                     }}>S</div>
//                     <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px', letterSpacing: '0.5px' }}>SRMS</span>
//                 </div>

//                 {/* Nav links */}
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
//                     {['Features', 'FAQ', 'Contact'].map(item => (
//                         <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{
//                             background: 'none', border: 'none', color: 'rgba(255,255,255,0.9)',
//                             fontSize: '14px', fontWeight: 500, cursor: 'pointer',
//                             letterSpacing: '0.3px', padding: '4px 0',
//                             borderBottom: '1px solid transparent',
//                             transition: 'all 0.2s',
//                             fontFamily: 'inherit'
//                         }}
//                             onMouseEnter={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
//                             onMouseLeave={e => e.target.style.borderBottomColor = 'transparent'}
//                         >{item}</button>
//                     ))}
//                     <button onClick={() => navigate('/login')} style={{
//                         background: 'transparent', border: '1.5px solid rgba(255,255,255,0.7)',
//                         color: '#fff', padding: '8px 20px', borderRadius: '6px',
//                         fontSize: '14px', fontWeight: 600, cursor: 'pointer',
//                         transition: 'all 0.2s', fontFamily: 'inherit'
//                     }}
//                         onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.15)'; }}
//                         onMouseLeave={e => { e.target.style.background = 'transparent'; }}
//                     >Log In</button>
//                 </div>
//             </nav>

//             {/* ── Hero Section (Dark) ── */}
//             <section style={{
//                 background: '#1a1a2e',
//                 minHeight: '100vh',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 padding: '100px 40px 80px',
//                 position: 'relative', overflow: 'hidden'
//             }}>
//                 {/* Background geometric pattern */}
//                 <div style={{
//                     position: 'absolute', inset: 0, opacity: 0.04,
//                     backgroundImage: 'radial-gradient(circle, #e85d0a 1px, transparent 1px)',
//                     backgroundSize: '40px 40px'
//                 }} />
//                 {/* Orange glow */}
//                 <div style={{
//                     position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
//                     width: '600px', height: '300px',
//                     background: 'radial-gradient(ellipse, rgba(232,93,10,0.15) 0%, transparent 70%)',
//                     pointerEvents: 'none'
//                 }} />

//                 <div style={{ textAlign: 'center', maxWidth: '760px', position: 'relative', zIndex: 1 }}>
//                     <div style={{
//                         display: 'inline-block', background: 'rgba(232,93,10,0.15)',
//                         border: '1px solid rgba(232,93,10,0.3)', borderRadius: '20px',
//                         padding: '6px 16px', marginBottom: '28px'
//                     }}>
//                         <span style={{ color: '#e85d0a', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
//                             Student Result Management System
//                         </span>
//                     </div>

//                     <h1 style={{
//                         color: '#ffffff', fontSize: '62px', fontWeight: 800,
//                         lineHeight: 1.1, margin: '0 0 24px',
//                         letterSpacing: '-2px'
//                     }}>
//                         Your Academic<br />
//                         <span style={{ color: '#e85d0a' }}>Journey,</span> Tracked.
//                     </h1>

//                     <p style={{
//                         color: 'rgba(255,255,255,0.6)', fontSize: '18px',
//                         lineHeight: 1.7, margin: '0 0 40px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto'
//                     }}>
//                         Access your results, track your progress, and stay informed — all in one secure platform built for students and educators.
//                     </p>

//                     <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
//                         <button onClick={() => navigate('/login')} style={{
//                             background: '#e85d0a', color: '#fff', border: 'none',
//                             padding: '14px 36px', borderRadius: '8px', fontSize: '16px',
//                             fontWeight: 700, cursor: 'pointer', letterSpacing: '0.3px',
//                             transition: 'all 0.2s', fontFamily: 'inherit',
//                             boxShadow: '0 4px 20px rgba(232,93,10,0.4)'
//                         }}
//                             onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
//                             onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
//                         >
//                             Get Started →
//                         </button>
//                         <button onClick={() => scrollTo('features')} style={{
//                             background: 'transparent', color: 'rgba(255,255,255,0.8)',
//                             border: '1.5px solid rgba(255,255,255,0.2)',
//                             padding: '14px 36px', borderRadius: '8px', fontSize: '16px',
//                             fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
//                             transition: 'all 0.2s'
//                         }}
//                             onMouseEnter={e => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
//                             onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
//                         >
//                             Learn More
//                         </button>
//                     </div>

//                     {/* Stats row */}
//                     <div style={{
//                         display: 'flex', justifyContent: 'center', gap: '48px',
//                         marginTop: '64px', paddingTop: '40px',
//                         borderTop: '1px solid rgba(255,255,255,0.08)'
//                     }}>
//                         {[
//                             { value: '100%', label: 'Secure Access' },
//                             { value: 'Real-time', label: 'Result Updates' },
//                             { value: '24/7', label: 'Availability' }
//                         ].map(stat => (
//                             <div key={stat.label} style={{ textAlign: 'center' }}>
//                                 <div style={{ color: '#e85d0a', fontSize: '28px', fontWeight: 800 }}>{stat.value}</div>
//                                 <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── Features Section (White) ── */}
//             <section id="features" style={{
//                 background: '#ffffff', padding: '96px 40px'
//             }}>
//                 <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//                     <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//                         <p style={{ color: '#e85d0a', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>What We Offer</p>
//                         <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#1a1a2e', margin: 0, letterSpacing: '-1px' }}>
//                             Everything you need,<br />nothing you don't.
//                         </h2>
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
//                         {[
//                             { icon: '📊', title: 'Instant Results', desc: 'View your exam results the moment they are published by your administrator. No waiting, no confusion.' },
//                             { icon: '📚', title: 'Subject Tracking', desc: 'See all your enrolled subjects in one place. Know exactly what you are studying and how you are performing.' },
//                             { icon: '🔒', title: 'Secure Login', desc: 'Your data is protected with encrypted credentials. Only you can access your personal academic record.' },
//                             { icon: '🏫', title: 'Class Management', desc: 'Organized by class and standard. Your dashboard shows only what is relevant to your academic year.' },
//                             { icon: '📋', title: 'Result History', desc: 'All declared results are stored and accessible anytime. Track your academic progress over time.' },
//                             { icon: '⚡', title: 'Fast & Reliable', desc: 'Built for speed. Access your dashboard and results instantly from any device, any browser.' },
//                         ].map(f => (
//                             <div key={f.title} style={{
//                                 padding: '32px', borderRadius: '12px',
//                                 border: '1px solid #f0f0f0',
//                                 transition: 'all 0.2s',
//                                 cursor: 'default'
//                             }}
//                                 onMouseEnter={e => {
//                                     e.currentTarget.style.borderColor = '#e85d0a';
//                                     e.currentTarget.style.boxShadow = '0 8px 30px rgba(232,93,10,0.1)';
//                                     e.currentTarget.style.transform = 'translateY(-4px)';
//                                 }}
//                                 onMouseLeave={e => {
//                                     e.currentTarget.style.borderColor = '#f0f0f0';
//                                     e.currentTarget.style.boxShadow = 'none';
//                                     e.currentTarget.style.transform = 'translateY(0)';
//                                 }}
//                             >
//                                 <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
//                                 <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 10px' }}>{f.title}</h3>
//                                 <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── How It Works Section (Dark) ── */}
//             <section style={{ background: '#1a1a2e', padding: '96px 40px' }}>
//                 <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
//                     <p style={{ color: '#e85d0a', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Simple Process</p>
//                     <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#fff', margin: '0 0 64px', letterSpacing: '-1px' }}>
//                         Up and running in minutes.
//                     </h2>

//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
//                         {[
//                             { step: '01', title: 'Register', desc: 'Create your account with your name, email and password on the login page.' },
//                             { step: '02', title: 'Get Assigned', desc: 'Your administrator assigns your class and subjects after verifying your details.' },
//                             { step: '03', title: 'Track Results', desc: 'Log in anytime to view your published results and academic progress.' },
//                         ].map(s => (
//                             <div key={s.step} style={{ textAlign: 'center' }}>
//                                 <div style={{
//                                     width: '64px', height: '64px', borderRadius: '50%',
//                                     border: '2px solid #e85d0a',
//                                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                     margin: '0 auto 20px',
//                                     color: '#e85d0a', fontSize: '18px', fontWeight: 800
//                                 }}>{s.step}</div>
//                                 <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 12px' }}>{s.title}</h3>
//                                 <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── FAQ Section (White) ── */}
//             <section id="faq" style={{ background: '#fff', padding: '96px 40px' }}>
//                 <div style={{ maxWidth: '720px', margin: '0 auto' }}>
//                     <div style={{ textAlign: 'center', marginBottom: '56px' }}>
//                         <p style={{ color: '#e85d0a', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>FAQ</p>
//                         <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#1a1a2e', margin: 0, letterSpacing: '-1px' }}>
//                             Common questions.
//                         </h2>
//                     </div>

//                     <div>
//                         {faqs.map((faq, i) => (
//                             <div key={i} style={{
//                                 borderBottom: '1px solid #f0f0f0',
//                                 overflow: 'hidden'
//                             }}>
//                                 <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
//                                     width: '100%', background: 'none', border: 'none',
//                                     padding: '20px 0', display: 'flex',
//                                     justifyContent: 'space-between', alignItems: 'center',
//                                     cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit'
//                                 }}>
//                                     <span style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', paddingRight: '16px' }}>{faq.q}</span>
//                                     <span style={{
//                                         color: '#e85d0a', fontSize: '20px', fontWeight: 400,
//                                         transition: 'transform 0.2s', flexShrink: 0,
//                                         transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0)'
//                                     }}>+</span>
//                                 </button>
//                                 {faqOpen === i && (
//                                     <p style={{
//                                         color: '#666', fontSize: '15px', lineHeight: 1.7,
//                                         margin: '0 0 20px', paddingRight: '32px'
//                                     }}>{faq.a}</p>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* ── Contact Section (Dark) ── */}
//             <section id="contact" style={{ background: '#1a1a2e', padding: '96px 40px' }}>
//                 <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//                     <div style={{ textAlign: 'center', marginBottom: '48px' }}>
//                         <p style={{ color: '#e85d0a', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Get In Touch</p>
//                         <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-1px' }}>
//                             Need help?
//                         </h2>
//                         <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>
//                             Send us a message and your administrator will get back to you.
//                         </p>
//                     </div>

//                     {contactSent ? (
//                         <div style={{
//                             background: 'rgba(232,93,10,0.1)', border: '1px solid rgba(232,93,10,0.3)',
//                             borderRadius: '12px', padding: '32px', textAlign: 'center'
//                         }}>
//                             <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
//                             <h3 style={{ color: '#fff', margin: '0 0 8px' }}>Message Sent!</h3>
//                             <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>We'll get back to you shortly.</p>
//                             <button onClick={() => setContactSent(false)} style={{
//                                 marginTop: '20px', background: '#e85d0a', color: '#fff',
//                                 border: 'none', padding: '10px 24px', borderRadius: '6px',
//                                 cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600
//                             }}>Send Another</button>
//                         </div>
//                     ) : (
//                         <form onSubmit={handleContactSubmit}>
//                             {[
//                                 { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
//                                 { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
//                             ].map(field => (
//                                 <div key={field.name} style={{ marginBottom: '20px' }}>
//                                     <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>
//                                         {field.label}
//                                     </label>
//                                     <input
//                                         type={field.type}
//                                         placeholder={field.placeholder}
//                                         value={contactForm[field.name]}
//                                         onChange={e => setContactForm({ ...contactForm, [field.name]: e.target.value })}
//                                         required
//                                         style={{
//                                             width: '100%', padding: '12px 16px', borderRadius: '8px',
//                                             border: '1px solid rgba(255,255,255,0.1)',
//                                             background: 'rgba(255,255,255,0.06)', color: '#fff',
//                                             fontSize: '15px', outline: 'none', boxSizing: 'border-box',
//                                             fontFamily: 'inherit'
//                                         }}
//                                     />
//                                 </div>
//                             ))}
//                             <div style={{ marginBottom: '28px' }}>
//                                 <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
//                                     Message
//                                 </label>
//                                 <textarea
//                                     placeholder="Describe your issue or question..."
//                                     value={contactForm.message}
//                                     onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
//                                     required
//                                     rows={5}
//                                     style={{
//                                         width: '100%', padding: '12px 16px', borderRadius: '8px',
//                                         border: '1px solid rgba(255,255,255,0.1)',
//                                         background: 'rgba(255,255,255,0.06)', color: '#fff',
//                                         fontSize: '15px', outline: 'none', resize: 'vertical',
//                                         boxSizing: 'border-box', fontFamily: 'inherit'
//                                     }}
//                                 />
//                             </div>
//                             <button type="submit" style={{
//                                 width: '100%', background: '#e85d0a', color: '#fff',
//                                 border: 'none', padding: '14px', borderRadius: '8px',
//                                 fontSize: '16px', fontWeight: 700, cursor: 'pointer',
//                                 fontFamily: 'inherit', letterSpacing: '0.3px',
//                                 transition: 'all 0.2s',
//                                 boxShadow: '0 4px 20px rgba(232,93,10,0.3)'
//                             }}
//                                 onMouseEnter={e => e.target.style.background = '#c94f08'}
//                                 onMouseLeave={e => e.target.style.background = '#e85d0a'}
//                             >
//                                 Send Message
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </section>

//             {/* ── Footer ── */}
//             <footer style={{
//                 background: '#111122', padding: '32px 40px',
//                 display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//                 flexWrap: 'wrap', gap: '16px'
//             }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <div style={{
//                         width: '28px', height: '28px', background: '#e85d0a',
//                         borderRadius: '6px', display: 'flex', alignItems: 'center',
//                         justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '13px'
//                     }}>S</div>
//                     <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>© 2026 SRMS. All rights reserved.</span>
//                 </div>
//                 <div style={{ display: 'flex', gap: '24px' }}>
//                     {['Features', 'FAQ', 'Contact'].map(item => (
//                         <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{
//                             background: 'none', border: 'none',
//                             color: 'rgba(255,255,255,0.4)', fontSize: '13px',
//                             cursor: 'pointer', fontFamily: 'inherit',
//                             transition: 'color 0.2s'
//                         }}
//                             onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
//                             onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
//                         >{item}</button>
//                     ))}
//                     <button onClick={() => navigate('/login')} style={{
//                         background: 'none', border: 'none',
//                         color: '#e85d0a', fontSize: '13px',
//                         cursor: 'pointer', fontFamily: 'inherit'
//                     }}>Log In</button>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;

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