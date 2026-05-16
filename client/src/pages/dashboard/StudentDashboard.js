import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HelpPage from '../../components/HelpPage';
import '../../style/StudentDashboard.css';

const API = "http://localhost:5003/api";
const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

// pdf generator
const exportStudentPDF = (studentData, subjects, allResults) => {
    const { StudentName, RollId, ClassId } = studentData;

    let overallFail = false;
    const subjectRows = subjects.map(sub => {
        const res = allResults.find(r => r.RollId === RollId && r.SubjectCode === sub.SubjectCode);
        const marks = res ? Number(res.Marks) : null;
        const passed = marks !== null && marks > 35;
        if (!passed) overallFail = true;
        return { name: sub.SubjectName, marks, passed };
    });

    const obtained = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
    const total = subjects.length * 100;
    const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : '0.0';
    const resultStatus = overallFail ? 'FAIL' : 'PASS';

    const html = `
        <html>
            <head>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; padding: 30px 0; }
                    .report-card { background: #fff; width: 720px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); padding-bottom: 30px; }
                    .top-accent-bar { height: 10px; background: #6b0f1a; }
                    .report-header { display: flex; justify-content: space-between; padding: 28px 36px; border-bottom: 2px solid #e8e0e0; }
                    .school-branding h1 { font-size: 24px; color: #6b0f1a; text-transform: uppercase; }
                    .school-branding p { font-size: 13px; color: #555; margin-top: 5px; }
                    .student-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 36px; padding: 18px; background: #fdf8f8; border: 1px solid #e8dede; border-radius: 6px; }
                    .info-item { font-size: 13.5px; color: #333; }
                    .marks-table { width: calc(100% - 72px); margin: 0 36px; border-collapse: collapse; }
                    .marks-table thead tr { background: #6b0f1a; color: #fff; }
                    .marks-table th, .marks-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                    .status-pass { color: #166534; font-weight: bold; }
                    .status-fail { color: #991b1b; font-weight: bold; }
                    .footer-summary { display: flex; justify-content: space-between; align-items: center; margin: 28px 36px; }
                    .badge { padding: 15px; border-radius: 8px; border: 2px solid; text-align: center; min-width: 130px; }
                    .badge-pass { background: #f0fdf4; border-color: #86efac; color: #166534; }
                    .badge-fail { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
                    .signature-section { display: flex; justify-content: space-between; margin: 36px 36px 0; gap: 20px; }
                    .sig-box { flex: 1; text-align: center; border-top: 1.5px solid #888; padding-top: 8px; font-size: 12px; color: #555; }
                    @media print { body { background: #fff; } .report-card { box-shadow: none; } }
                </style>
            </head>
            <body>
                <div class="report-card">
                    <div class="top-accent-bar"></div>
                    <div class="report-header">
                        <div class="school-branding">
                            <h1>Academic Progress Report</h1>
                            <p>SRMS Portal | Annual Session 2025-26</p>
                        </div>
                        <div style="font-size: 40px;">🎓</div>
                    </div>
                    <div class="student-info-grid">
                        <div class="info-item"><strong>Name:</strong> ${StudentName || 'N/A'}</div>
                        <div class="info-item"><strong>Roll ID:</strong> ${RollId || 'N/A'}</div>
                        <div class="info-item"><strong>Class:</strong> ${ClassId || 'N/A'}</div>
                        <div class="info-item"><strong>Result:</strong> ${resultStatus}</div>
                    </div>
                    <table class="marks-table">
                        <thead>
                            <tr><th>Subject</th><th>Max Marks</th><th>Obtained</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            ${subjectRows.map(r => `
                                <tr>
                                    <td>${r.name}</td>
                                    <td>100</td>
                                    <td>${r.marks ?? '—'}</td>
                                    <td class="${r.passed ? 'status-pass' : 'status-fail'}">${r.passed ? 'Pass' : 'Fail'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer-summary">
                        <div class="badge ${overallFail ? 'badge-fail' : 'badge-pass'}">
                            <div style="font-size: 10px; font-weight: 700; letter-spacing: 1px;">FINAL RESULT</div>
                            <div style="font-size: 22px; font-weight: 800;">${resultStatus}</div>
                        </div>
                        <div style="text-align: right; font-size: 14px; line-height: 2;">
                            <div><strong>Aggregate:</strong> ${obtained} / ${total}</div>
                            <div><strong>Percentage:</strong> ${percentage}%</div>
                        </div>
                    </div>
                    <div class="signature-section">
                        <div class="sig-box">Class Teacher</div>
                        <div class="sig-box">Parent / Guardian</div>
                        <div class="sig-box">Principal</div>
                    </div>
                </div>
            </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.onload = () => setTimeout(() => win.print(), 500);
};

// Main dashboard
const StudentDashboard = ({ logout, userEmail }) => {
    const [studentData, setStudentData] = useState(null);
    const [subjects, setSubjects]       = useState([]);
    const [results, setResults]         = useState([]);
    const [profileImg, setProfileImg]   = useState(DEFAULT_AVATAR);
    const [activePage, setActivePage]   = useState('overview');
    const [loadingProfile, setLoadingProfile] = useState(true);
    const navigate = useNavigate();

    // Fetch real student data
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const email = userEmail || localStorage.getItem('userEmail');
                if (!email) return;

                const res = await axios.get(`${API}/students/byEmail/${encodeURIComponent(email)}`);
                if (res.data.success) {
                    const s = res.data.data;
                    setStudentData(s);

                    // Fetch subjects for this class
                    const subRes = await axios.get(`${API}/subjects/all`);
                    const classSubjects = subRes.data.filter(sub => {
                        const cls = sub.Class || sub.ClassName || sub.ClassId || sub.classId || '';
                        return cls === s.ClassId;
                    });
                    setSubjects(classSubjects);

                    // Fetch results for this student
                    const resData = await axios.get(`${API}/results/all`);
                    const allResults = resData.data?.data || resData.data || [];
                    const studentResults = allResults.filter(r => r.RollId === s.RollId);
                    setResults(studentResults);
                }
            } catch (err) {
                console.error("Failed to fetch student data:", err);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchStudent();
    }, [userEmail]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        logout();
        navigate('/', { replace: true });
    };

    const navItems = [
        {
            id: 'overview', label: 'Overview',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
        },
        {
            id: 'results', label: 'My Results',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
        },
        {
            id: 'profile', label: 'Profile',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        },
        {
            id: 'help', label: 'Help',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
        },
    ];

    if (loadingProfile) {
        return (
            <div className="admin-layout" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Loading your profile...</div>
            </div>
        );
    }

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
                        <div className="page-title">
                            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                        </div>
                        <div className="page-breadcrumb">Student / {activePage}</div>
                    </div>
                    <div className="navbar-right">
                        <div className="navbar-user-info" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="navbar-user-text" style={{ textAlign: 'right' }}>
                                <span className="navbar-user-name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#fff' }}>
                                    {studentData?.StudentName || localStorage.getItem('userName') || 'Student'}
                                </span>
                                <span className="navbar-email" style={{ fontSize: 12 }}>
                                    {studentData?.StudentEmail || userEmail}
                                </span>
                            </div>
                            <img
                                src={profileImg}
                                alt="Profile"
                                onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                                style={{
                                    width: 38, height: 38,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #e85d0a',
                                    flexShrink: 0,
                                }}
                            />
                            <span className="navbar-badge">Student</span>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {activePage === 'overview' && (
                        <OverviewPage studentData={studentData} subjects={subjects} results={results} />
                    )}
                    {activePage === 'results' && (
                        <MyResultsPage
                            studentData={studentData}
                            subjects={subjects}
                            results={results}
                            onDownload={() => exportStudentPDF(studentData, subjects, results)}
                        />
                    )}
                    {activePage === 'profile' && (
                        <ProfilePage
                            studentData={studentData}
                            profileImg={profileImg}
                            onImageChange={setProfileImg}
                        />
                    )}
                    {activePage === 'help' && <HelpPage />}
                </div>
            </main>
        </div>
    );
};

// OVERVIEW PAGE
const OverviewPage = ({ studentData, subjects, results }) => {
    const obtained = results.reduce((sum, r) => sum + Number(r.Marks || 0), 0);
    const total = subjects.length * 100;
    const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : null;
    const isPassed = percentage !== null && Number(percentage) >= 35 &&
        results.every(r => Number(r.Marks) > 35);
    const hasResults = results.length > 0;

    return (
        <>
            <div className="content-header">
                <h1>Welcome, {studentData?.StudentName || 'Student'}!</h1>
                <p>Academic performance at a glance.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-left">
                        <div className="stat-label">Roll ID</div>
                        <div className="stat-value" style={{ fontSize: 20 }}>
                            {studentData?.RollId || '—'}
                        </div>
                        <div className="stat-delta">{studentData?.ClassId || '—'}</div>
                    </div>
                    <div className="stat-icon-wrap icon-blue">🎫</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-left">
                        <div className="stat-label">Overall Score</div>
                        <div className="stat-value">
                            {hasResults ? `${percentage}%` : '—'}
                        </div>
                        <div className="stat-delta">
                            {hasResults ? `${obtained} / ${total} marks` : 'No results declared yet'}
                        </div>
                    </div>
                    <div className="stat-icon-wrap icon-amber">📈</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-left">
                        <div className="stat-label">Status</div>
                        <div className="stat-value" style={{ color: !hasResults ? 'rgba(255,255,255,0.4)' : isPassed ? '#4ade80' : '#f87171' }}>
                            {!hasResults ? '—' : isPassed ? 'PASS' : 'FAIL'}
                        </div>
                        <div className="stat-delta">
                            {!hasResults ? 'Awaiting results' : isPassed ? 'Congratulations!' : 'Keep working hard'}
                        </div>
                    </div>
                    <div className="stat-icon-wrap icon-green">🎓</div>
                </div>
            </div>

            {hasResults && (
                <div
                    className={`alert ${isPassed ? 'alert-success' : 'alert-error'}`}
                    style={{ marginTop: 8 }}
                >
                    {isPassed
                        ? '🎉 Congratulations! You have passed this term.'
                        : '⚠️ You did not pass this term. Please review your results with your teacher.'}
                </div>
            )}

            {!hasResults && (
                <div className="alert alert-warning" style={{ marginTop: 8 }}>
                    📋 Your results have not been declared yet. Check back later.
                </div>
            )}
        </>
    );
};

// MY RESULTS PAGE
const MyResultsPage = ({ studentData, subjects, results, onDownload }) => {
    const obtained = results.reduce((sum, r) => sum + Number(r.Marks || 0), 0);
    const total = subjects.length * 100;
    const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : '0.0';
    const hasResults = results.length > 0;

    return (
        <>
            <div className="content-header">
                <h1>My Results</h1>
                <p>Complete result card for the current term.</p>
            </div>

            <div className="section-card">
                <div className="section-header">
                    <div>
                        <div className="section-title">Academic Transcript</div>
                        <div className="section-meta">Issued by SRMS Administration · 2025-26</div>
                    </div>
                    {hasResults && (
                        <button className="btn btn-primary btn-sm" onClick={onDownload}>
                            Download PDF
                        </button>
                    )}
                </div>

                <div className="form-section">
                    {/* Student Info Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: 16,
                        marginBottom: 24,
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        {[
                            { label: 'Student Name', value: studentData?.StudentName },
                            { label: 'Roll ID',      value: studentData?.RollId },
                            { label: 'Class',        value: studentData?.ClassId },
                            { label: 'Total Marks',  value: hasResults ? `${obtained} / ${total}` : '—' },
                            { label: 'Percentage',   value: hasResults ? `${percentage}%` : '—' },
                            { label: 'Gender',       value: studentData?.Gender },
                        ].map(item => (
                            <div key={item.label}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                                    {item.label}
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                                    {item.value || '—'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Results Table */}
                    {!hasResults ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <p>No results declared yet for your class.</p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Max Marks</th>
                                        <th>Obtained</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((sub, i) => {
                                        const res = results.find(r => r.SubjectCode === sub.SubjectCode);
                                        const marks = res ? Number(res.Marks) : null;
                                        const passed = marks !== null && marks > 35;
                                        return (
                                            <tr key={i}>
                                                <td>{sub.SubjectName}</td>
                                                <td>100</td>
                                                <td>{marks ?? '—'}</td>
                                                <td>
                                                    {marks !== null ? (
                                                        <span className={`pill ${passed ? 'pill-pass' : 'pill-fail'}`}>
                                                            {passed ? 'Pass' : 'Fail'}
                                                        </span>
                                                    ) : '—'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// PROFILE PAGE
const ProfilePage = ({ studentData, profileImg, onImageChange }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (event) => onImageChange(event.target.result);
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const fields = [
        { label: 'Full Name',    value: studentData?.StudentName },
        { label: 'Email',        value: studentData?.StudentEmail },
        { label: 'Roll ID',      value: studentData?.RollId },
        { label: 'Class',        value: studentData?.ClassId },
        { label: 'Gender',       value: studentData?.Gender },
        { label: 'Date of Birth',value: studentData?.DOB },
    ];

    return (
        <>
            <div className="content-header">
                <h1>My Profile</h1>
                <p>Your registered information.</p>
            </div>

            <div className="section-card">
                <div className="section-header">
                    <div className="section-title">Account Details</div>
                    <span className={`pill ${studentData?.Status === 1 ? 'pill-active' : 'pill-inactive'}`}>
                        {studentData?.Status === 1 ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <div className="form-section">
                    {/* Avatar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            title="Click to change profile picture"
                            style={{
                                position: 'relative', width: 100, height: 100,
                                borderRadius: '50%', cursor: 'pointer',
                                border: '3px solid #e85d0a', overflow: 'hidden',
                            }}
                        >
                            <img
                                src={profileImg}
                                alt="Profile"
                                onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                            <div
                                style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(232,93,10,0.6)',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    opacity: 0, transition: 'opacity 0.2s',
                                    color: '#fff', fontSize: 11, fontWeight: 600, gap: 4,
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                                Change
                            </div>
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                            Click photo to upload a new picture
                        </p>
                    </div>

                    <div className="form-grid">
                        {fields.map(field => (
                            <div className="form-group" key={field.label}>
                                <label>{field.label}</label>
                                <input
                                    type="text"
                                    value={field.value || '—'}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>

                    <div className="alert alert-warning" style={{ marginTop: 20 }}>
                        ℹ️ Profile information can only be updated by the administrator.
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;