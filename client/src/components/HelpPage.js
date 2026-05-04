import React, { useState } from 'react';
import '../style/StudentDashboard.css';

const HelpPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: 'How do I view my exam results?',
            a: "Go to My Results from the sidebar. You'll see subject-wise marks, grades, and overall performance for the current term. You can also download a PDF copy from that page."
        },
        {
            q: 'I see incorrect marks in my result. What should I do?',
            a: 'Email us at admin@srms.edu with your Roll ID, subject name, and the issue. The administration team typically responds within 2–3 working days.'
        },
        {
            q: 'How do I update my profile information?',
            a: 'Go to My Profile and click Edit Profile. Roll ID and Class are admin-controlled and cannot be changed here — email admin@srms.edu for those changes.'
        },
        {
            q: "Why can't I download my result PDF?",
            a: 'PDFs are available only after results are officially published. If the download still fails, try refreshing or a different browser. If it persists, email admin@srms.edu.'
        },
        {
            q: 'I forgot my password. How do I reset it?',
            a: "On the login page, click Forgot Password and enter your registered email. Check your spam folder if you don't receive it, or email admin@srms.edu."
        },
    ];

    return (
        <>
            <div className="content-header">
                <h1>Help & Support</h1>
                <p>Find answers to common questions or contact the administration directly.</p>
            </div>

            {/* FAQ Section */}
            <div className="section-card">
                <div className="section-header">
                    <div>
                        <h3 className="section-title">Frequently Asked Questions</h3>
                        <p className="section-meta">Common questions from students</p>
                    </div>
                </div>
                <div className="faq-list">
                    {faqs.map((item, i) => (
                        <div className="faq-item" key={i}>
                            <div
                                className="faq-question"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                {item.q}
                                <svg
                                    className={`faq-chevron ${openFaq === i ? 'open' : ''}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                            <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="section-card">
                <div className="section-header">
                    <div>
                        <h3 className="section-title">Still need help?</h3>
                        <p className="section-meta">Contact the administration directly</p>
                    </div>
                </div>
                <div className="help-contact-body">
                    <div className="help-contact-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <a href="mailto:admin@srms.edu">admin@srms.edu</a>
                    </div>
                    <div className="help-contact-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Monday – Friday, 9 AM to 5 PM</span>
                    </div>
                    <p className="help-contact-note">
                        Include your Roll ID and a clear description of the issue. Expect a response within 2–3 working days.
                    </p>
                </div>
            </div>
        </>
    );
};

export default HelpPage;
