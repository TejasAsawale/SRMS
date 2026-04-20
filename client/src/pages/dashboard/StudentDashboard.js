import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/StudentDashboard.css';

const StudentDashboard = ({ logout, userEmail }) => {
    const [activePage, setActivePage] = useState('overview');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const navItems = [
        {
            id: 'overview', label: 'Overview', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
            )
        },
        {
            id: 'results', label: 'My Results', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            )
        },
        {
            id: 'profile', label: 'Profile', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
    ];

    const pageTitles = {
        overview: { title: 'My Dashboard', breadcrumb: 'Student / Overview' },
        results:  { title: 'My Results',   breadcrumb: 'Student / Results'  },
        profile:  { title: 'My Profile',   breadcrumb: 'Student / Profile'  },
    };

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo-mark">S</div>
                    <span className="sidebar-brand-name">SRMS</span>
                </div>

                <nav className="menu-nav">
                    <span className="section-label">Student Portal</span>
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`menu-link ${activePage === item.id ? 'active' : ''}`}
                            onClick={() => setActivePage(item.id)}
                        >
                            {item.icon}
                            <span className="menu-text">{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="logout-link" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Logout</span>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-navbar">
                    <div className="navbar-left">
                        <div className="page-title">{pageTitles[activePage].title}</div>
                        <div className="page-breadcrumb">{pageTitles[activePage].breadcrumb}</div>
                    </div>
                    <div className="navbar-right">
                        <span className="navbar-badge">Student</span>
                        <span className="navbar-email">{userEmail}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    {activePage === 'overview' && <OverviewPage />}
                    {activePage === 'results'  && <MyResultsPage />}
                    {activePage === 'profile'  && <ProfilePage userEmail={userEmail} />}
                </div>
            </main>
        </div>
    );
};

const OverviewPage = () => {
    const statCards = [
        { label: 'Overall Score',  value: '82%',  delta: '↑ 4% from last term',  deltaClass: 'up', icon: '📈', iconClass: 'icon-green' },
        { label: 'Subjects',       value: '6',    delta: 'All results available', deltaClass: 'up', icon: '📚', iconClass: 'icon-blue'  },
        { label: 'Best Subject',   value: 'Math', delta: 'Score: 95',             deltaClass: 'up', icon: '🏆', iconClass: 'icon-amber' },
        { label: 'Result Status',  value: 'Pass', delta: 'Congratulations!',      deltaClass: 'up', icon: '🎓', iconClass: 'icon-rose'  },
    ];

    const subjects = [
        { subject: 'Mathematics',      marks: 95, total: 100, grade: 'A+' },
        { subject: 'Science',          marks: 88, total: 100, grade: 'A'  },
        { subject: 'English',          marks: 76, total: 100, grade: 'B+' },
        { subject: 'Social Studies',   marks: 70, total: 100, grade: 'B'  },
        { subject: 'Computer Science', marks: 91, total: 100, grade: 'A+' },
        { subject: 'Hindi',            marks: 65, total: 100, grade: 'C+' },
    ];

    const getScoreClass = (marks) => marks >= 80 ? 'score-high' : marks >= 60 ? 'score-mid' : 'score-low';
    const getFillClass  = (marks) => marks >= 80 ? 'fill-high'  : marks >= 60 ? 'fill-mid'  : 'fill-low';

    return (
        <>
            <div className="content-header">
                <h1>Welcome back!</h1>
                <p>Here's a summary of your academic progress.</p>
            </div>

            <div className="stats-grid">
                {statCards.map(card => (
                    <div className="stat-card" key={card.label}>
                        <div className="stat-card-left">
                            <div className="stat-label">{card.label}</div>
                            <div className="stat-value">{card.value}</div>
                            <div className={`stat-delta ${card.deltaClass}`}>{card.delta}</div>
                        </div>
                        <div className={`stat-icon-wrap ${card.iconClass}`}>{card.icon}</div>
                    </div>
                ))}
            </div>

            <div className="section-card">
                <div className="section-header">
                    <div>
                        <h3 className="section-title">Academic Summary</h3>
                        <p className="section-meta">Your subject-wise performance</p>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Marks Obtained</th>
                                <th>Total</th>
                                <th>Grade</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(row => (
                                <tr key={row.subject}>
                                    <td><strong>{row.subject}</strong></td>
                                    <td>
                                        <div className="score-cell">
                                            <span className={`score-value ${getScoreClass(row.marks)}`}>{row.marks}</span>
                                            <div className="progress-bar">
                                                <div
                                                    className={`progress-fill ${getFillClass(row.marks)}`}
                                                    style={{ width: `${row.marks}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{row.total}</td>
                                    <td><strong>{row.grade}</strong></td>
                                    <td><span className="pill pill-pass">Pass</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const MyResultsPage = () => {
    const details = [
        ['Student Name', 'Anjali Rao'],
        ['Roll ID', 'S4821'],
        ['Class', 'General'],
        ['Academic Year', '2025–26'],
        ['Total Marks', '485 / 600'],
        ['Percentage', '80.8%'],
        ['Grade', 'A'],
        ['Result', 'PASS'],
    ];

    return (
        <>
            <div className="content-header">
                <h1>My Results</h1>
                <p>Complete result card for the current term.</p>
            </div>
            <div className="section-card">
                <div className="section-header">
                    <div>
                        <h3 className="section-title">Term Result — 2025–26</h3>
                        <p className="section-meta">Issued by SRMS Administration</p>
                    </div>
                    <button className="btn btn-primary btn-sm">Download PDF</button>
                </div>
                <div className="form-section">
                    <div className="result-details-grid">
                        {details.map(([label, val]) => (
                            <div className="result-detail-item" key={label}>
                                <div className="result-detail-label">{label}</div>
                                <div className="result-detail-value">{val}</div>
                            </div>
                        ))}
                    </div>
                    <div className="alert alert-success">
                        <span>✓</span> You have successfully passed this term. Keep up the great work!
                    </div>
                </div>
            </div>
        </>
    );
};

const ProfilePage = ({ userEmail }) => {
    const fields = [
        { label: 'Full Name',      value: 'Anjali Rao',                    name: 'fullName' },
        { label: 'Email Address',  value: userEmail || 'student@srms.com', name: 'email'    },
        { label: 'Roll ID',        value: 'S4821',                         name: 'rollId'   },
        { label: 'Class',          value: 'General',                       name: 'class'    },
        { label: 'Date of Birth',  value: '2000-01-01',                    name: 'dob'      },
        { label: 'Gender',         value: 'Other',                         name: 'gender'   },
    ];

    return (
        <>
            <div className="content-header">
                <h1>My Profile</h1>
                <p>Your registered account details.</p>
            </div>
            <div className="section-card">
                <div className="section-header">
                    <h3 className="section-title">Account Information</h3>
                    <button className="btn btn-sm">Edit Profile</button>
                </div>
                <div className="form-section">
                    <div className="form-grid">
                        {fields.map(field => (
                            <div className="form-group" key={field.name}>
                                <label>{field.label}</label>
                                <input
                                    type="text"
                                    defaultValue={field.value}
                                    disabled
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn">Cancel</button>
                    <button className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
