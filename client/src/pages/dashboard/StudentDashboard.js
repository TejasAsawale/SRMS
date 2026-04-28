
// >>>>>>> a8f013c (update register functionality)
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HelpPage from '../../components/HelpPage';
// import '../../style/StudentDashboard.css';

// const StudentDashboard = ({ logout, userEmail }) => {
//     // 1. User Data (Simulated from registration)
//     const [userData, setUserData] = useState({
//         fullName: 'Anjali Rao',
//         email: userEmail || 'anjali.rao@example.com',
//         rollId: 'S4821',
//         class: 'General',
//         dob: '2005-06-15',
//         gender: 'Female',
//         profileImg: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' // Default image
//     });

//     const [activePage, setActivePage] = useState('overview');
//     const navigate = useNavigate();

//     // 2. Shared Subject Data
//     const subjects = [
//         { id: 1, name: 'Mathematics', marks: 95, total: 100, grade: 'A+' },
//         { id: 2, name: 'Science', marks: 88, total: 100, grade: 'A' },
//         { id: 3, name: 'English', marks: 76, total: 100, grade: 'B+' },
//         { id: 4, name: 'Social Studies', marks: 45, total: 100, grade: 'C' }, // Example lower marks
//         { id: 5, name: 'Computer Science', marks: 91, total: 100, grade: 'A+' },
//     ];

//     const totalMarks = subjects.reduce((acc, s) => acc + s.marks, 0);
//     const maxMarks = subjects.length * 100;
//     const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);
//     const isPassed = percentage >= 40;

//     const handleLogout = () => {
//         logout();
//         navigate('/', { replace: true });
//     };

// <<<<<<< HEAD
//     const handleProfileUpdate = (newData) => {
//         setUserData(newData);
// =======
//     const navItems = [
//         {
//             id: 'overview', label: 'Overview', icon: (
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <rect x="3" y="3" width="7" height="7" rx="1" />
//                     <rect x="14" y="3" width="7" height="7" rx="1" />
//                     <rect x="3" y="14" width="7" height="7" rx="1" />
//                     <rect x="14" y="14" width="7" height="7" rx="1" />
//                 </svg>
//             )
//         },
//         {
//             id: 'results', label: 'My Results', icon: (
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                     <polyline points="14 2 14 8 20 8" />
//                     <line x1="16" y1="13" x2="8" y2="13" />
//                     <line x1="16" y1="17" x2="8" y2="17" />
//                 </svg>
//             )
//         },
//         {
//             id: 'profile', label: 'Profile', icon: (
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                     <circle cx="12" cy="7" r="4" />
//                 </svg>
//             )
//         },
//         {
//             id: 'help', label: 'Help', icon: (
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <circle cx="12" cy="12" r="10" />
//                     <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
//                     <line x1="12" y1="17" x2="12.01" y2="17" />
//                 </svg>
//             )
//         },
//     ];

//     const pageTitles = {
//         overview: { title: 'My Dashboard',   breadcrumb: 'Student / Overview' },
//         results:  { title: 'My Results',     breadcrumb: 'Student / Results'  },
//         profile:  { title: 'My Profile',     breadcrumb: 'Student / Profile'  },
//         help:     { title: 'Help & Support', breadcrumb: 'Student / Help'     },
// >>>>>>> a9b231b (resolve pdf download issue)
//     };

//     const navItems = [
//         { id: 'overview', label: 'Overview', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
//         { id: 'results', label: 'My Results', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
//         { id: 'profile', label: 'Profile', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
//         { id: 'help', label: 'Help', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
//     ];

//     return (
//         <div className="admin-layout">
//             <aside className="sidebar">
//                 <div className="sidebar-header">
//                     <div className="sidebar-logo-mark">S</div>
//                     <span className="sidebar-brand-name">SRMS</span>
//                 </div>
//                 <nav className="menu-nav">
//                     <span className="section-label">Student Portal</span>
//                     {navItems.map(item => (
//                         <div key={item.id} className={`menu-link ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
//                             {item.icon}
//                             <span className="menu-text">{item.label}</span>
//                         </div>
//                     ))}
//                 </nav>
//                 <div className="sidebar-footer">
//                     <div className="logout-link" onClick={handleLogout}>
//                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
//                         <span>Logout</span>
//                     </div>
//                 </div>
//             </aside>

//             <main className="main-content">
//                 <header className="top-navbar">
//                     <div className="navbar-left">
//                         <div className="page-title">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</div>
//                         <div className="page-breadcrumb">Student / {activePage}</div>
//                     </div>
//                     <div className="navbar-right">
//                         <div className="navbar-user-info">
//                             <div className="navbar-user-text">
//                                 <span className="navbar-user-name">{userData.fullName}</span>
//                                 <span className="navbar-email">{userData.email}</span>
//                             </div>
//                             <img src={userData.profileImg} alt="Profile" className="navbar-avatar" />
//                             <span className="navbar-badge">Student</span>
//                         </div>
//                     </div>
//                 </header>

//                 <div className="dashboard-content">
//                     {activePage === 'overview' && <OverviewPage subjects={subjects} percentage={percentage} isPassed={isPassed} />}
//                     {activePage === 'results' && <MyResultsPage userData={userData} subjects={subjects} stats={{ totalMarks, maxMarks, percentage, isPassed }} />}
//                     {activePage === 'profile' && <ProfilePage userData={userData} onUpdate={handleProfileUpdate} />}
//                     {activePage === 'help' && <HelpPage />}
//                 </div>
//             </main>
//         </div>
//     );
// };

// /* --- Overview Sub-component --- */
// const OverviewPage = ({ subjects, percentage, isPassed }) => {
//     return (
//         <>
//             <div className="content-header">
//                 <h1>Welcome back!</h1>
//                 <p>Academic performance at a glance.</p>
//             </div>
//             <div className="stats-grid">
//                 <div className="stat-card">
//                     <div className="stat-card-left">
//                         <div className="stat-label">Overall Score</div>
//                         <div className="stat-value">{percentage}%</div>
//                     </div>
//                     <div className="stat-icon-wrap icon-blue">📈</div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-card-left">
//                         <div className="stat-label">Status</div>
//                         <div className="stat-value" style={{ color: isPassed ? 'green' : 'red' }}>{isPassed ? 'PASS' : 'FAIL'}</div>
//                     </div>
//                     <div className="stat-icon-wrap icon-green">🎓</div>
//                 </div>
//             </div>
//             <div className="alert" style={{ backgroundColor: isPassed ? '#f0fdf4' : '#fef2f2' }}>
//                 {isPassed ? "🎉 Congratulations! You have passed this term." : "⚠️ Work harder! Try for a better result next time."}
//             </div>
//         </>
//     );
// };

// /* --- My Results Sub-component --- */
// const MyResultsPage = ({ userData, subjects, stats }) => {
//     const handleDownload = () => window.print();

//     return (
//         <>
//             <div className="content-header">
//                 <h1>Academic Transcript</h1>
//                 <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
//             </div>
//             <div className="section-card">
//                 <div className="form-section">
//                     <div className="result-details-grid">
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Student Name</div>
//                             <div className="result-detail-value">{userData.fullName}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Roll ID</div>
//                             <div className="result-detail-value">{userData.rollId}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Total Marks</div>
//                             <div className="result-detail-value">{stats.totalMarks} / {stats.maxMarks}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Percentage</div>
//                             <div className="result-detail-value">{stats.percentage}%</div>
//                         </div>
//                     </div>

//                     <table className="data-table" style={{ marginTop: '20px' }}>
//                         <thead>
//                             <tr><th>Subject</th><th>Marks</th><th>Grade</th></tr>
//                         </thead>
//                         <tbody>
//                             {subjects.map(s => (
//                                 <tr key={s.id}>
//                                     <td>{s.name}</td>
//                                     <td>{s.marks} / 100</td>
//                                     <td>{s.grade}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

// <<<<<<< HEAD
//                     <div className="alert" style={{ marginTop: '30px', border: '1px solid #ddd' }}>
//                         <strong>Note:</strong> {stats.isPassed ? "Congratulations! You have successfully passed this term. Keep up the great work!" : "Unfortunately, you did not meet the passing criteria. Better luck next time!"}
// =======
// /* =========================================================
//    PDF GENERATOR — same window.open + inline CSS approach
//    as admin ResultsPage exportSinglePDF
//    ========================================================= */
// const exportStudentPDF = (studentData) => {
//     const { name, rollId, classId, academicYear, examType, subjects } = studentData;

//     let overallFail = false;
//     const subjectRows = subjects.map(sub => {
//         const marks = sub.marks !== null && sub.marks !== undefined ? Number(sub.marks) : null;
//         const passed = marks !== null && marks > 35;
//         if (!passed) overallFail = true;
//         return { name: sub.name, marks, passed };
//     });

//     const obtained   = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
//     const total      = subjects.length * 100;
//     const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : '0.0';
//     const resultStatus = overallFail ? 'FAIL' : 'PASS';

//     const html = `
//         <html>
//             <head>
//                 <style>
//                     * { box-sizing: border-box; margin: 0; padding: 0; }
//                     body {
//                         font-family: 'Segoe UI', Arial, sans-serif;
//                         background: #f4f4f4;
//                         display: flex;
//                         justify-content: center;
//                         padding: 30px 0;
//                     }
//                     .report-card {
//                         background: #fff;
//                         width: 720px;
//                         border-radius: 8px;
//                         overflow: hidden;
//                         box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//                         padding-bottom: 30px;
//                     }
//                     .top-accent-bar {
//                         height: 10px;
//                         background: #6b0f1a;
//                     }
//                     .report-header {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: flex-start;
//                         padding: 28px 36px 18px;
//                         border-bottom: 2px solid #e8e0e0;
//                     }
//                     .school-branding h1 {
//                         font-size: 24px;
//                         font-weight: 800;
//                         color: #6b0f1a;
//                         text-transform: uppercase;
//                         letter-spacing: 0.5px;
//                     }
//                     .school-branding p {
//                         font-size: 13px;
//                         color: #555;
//                         margin-top: 5px;
//                     }
//                     .report-logo { font-size: 48px; line-height: 1; }
//                     .student-info-grid {
//                         display: grid;
//                         grid-template-columns: 1fr 1fr;
//                         gap: 12px 24px;
//                         margin: 24px 36px;
//                         padding: 18px 20px;
//                         background: #fdf8f8;
//                         border: 1px solid #e8dede;
//                         border-radius: 6px;
//                     }
//                     .info-item { font-size: 13.5px; color: #333; }
//                     .info-item strong { color: #1a1a1a; }
//                     .marks-table-professional {
//                         width: calc(100% - 72px);
//                         margin: 0 36px;
//                         border-collapse: collapse;
//                         font-size: 13.5px;
//                     }
//                     .marks-table-professional thead tr {
//                         background: #6b0f1a;
//                         color: #fff;
//                     }
//                     .marks-table-professional th {
//                         padding: 11px 16px;
//                         text-align: left;
//                         font-weight: 600;
//                         font-size: 12px;
//                         letter-spacing: 0.4px;
//                         text-transform: uppercase;
//                     }
//                     .marks-table-professional td {
//                         padding: 11px 16px;
//                         border-bottom: 1px solid #ede8e8;
//                         color: #222;
//                     }
//                     .marks-table-professional tbody tr:nth-child(even) td {
//                         background: #fdf9f9;
//                     }
//                     .status-pass { color: #166534; font-weight: 700; }
//                     .status-fail { color: #991b1b; font-weight: 700; }
//                     .report-footer-summary {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;
//                         margin: 28px 36px 0;
//                     }
//                     .final-result-badge {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                         justify-content: center;
//                         width: 160px;
//                         padding: 14px 20px;
//                         border-radius: 8px;
//                         border: 2px solid;
//                         gap: 4px;
//                     }
//                     .badge-pass { background: #f0fdf4; border-color: #86efac; color: #166534; }
//                     .badge-fail { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
//                     .final-result-badge .label {
//                         font-size: 10px;
//                         font-weight: 700;
//                         letter-spacing: 1px;
//                         text-transform: uppercase;
//                         opacity: 0.8;
//                     }
//                     .final-result-badge .value { font-size: 26px; font-weight: 800; }
//                     .final-result-badge .note  { font-size: 11px; font-style: italic; opacity: 0.75; }
//                     .score-summary { text-align: right; font-size: 14px; color: #222; line-height: 2; }
//                     .score-summary strong { font-weight: 700; }
//                     .signature-section {
//                         display: flex;
//                         justify-content: space-between;
//                         margin: 36px 36px 0;
//                         gap: 20px;
//                     }
//                     .sig-box {
//                         flex: 1;
//                         text-align: center;
//                         border-top: 1.5px solid #888;
//                         padding-top: 8px;
//                         font-size: 12px;
//                         color: #555;
//                     }
//                     @media print {
//                         body { background: #fff; padding: 0; }
//                         .report-card { box-shadow: none; border-radius: 0; }
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="report-card">
//                     <div class="top-accent-bar"></div>

//                     <div class="report-header">
//                         <div class="school-branding">
//                             <h1>Academic Progress Report</h1>
//                             <p>Global Public School | Annual Session ${academicYear || '2025-26'}</p>
//                         </div>
//                         <div class="report-logo">🎓</div>
//                     </div>

//                     <div class="student-info-grid">
//                         <div class="info-item"><strong>Student Name:</strong> ${name || 'N/A'}</div>
//                         <div class="info-item"><strong>Roll Number:</strong> ${rollId || 'N/A'}</div>
//                         <div class="info-item"><strong>Class:</strong> ${classId || 'N/A'}</div>
//                         <div class="info-item"><strong>Exam Type:</strong> ${examType || 'Final Assessment'}</div>
//                     </div>

//                     <table class="marks-table-professional">
//                         <thead>
//                             <tr>
//                                 <th>Subject Title</th>
//                                 <th>Max Marks</th>
//                                 <th>Obtained</th>
//                                 <th>Result</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${subjectRows.map(r => `
//                                 <tr>
//                                     <td>${r.name}</td>
//                                     <td>100</td>
//                                     <td>${r.marks ?? '—'}</td>
//                                     <td class="${r.passed ? 'status-pass' : 'status-fail'}">${r.passed ? 'Pass' : 'Fail'}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>

//                     <div class="report-footer-summary">
//                         <div class="final-result-badge ${overallFail ? 'badge-fail' : 'badge-pass'}">
//                             <span class="label">FINAL RESULT</span>
//                             <span class="value">${resultStatus}</span>
//                             <span class="note">${overallFail ? 'Try better next time!' : 'Congratulations!'}</span>
//                         </div>
//                         <div class="score-summary">
//                             <div><strong>Aggregate:</strong> ${obtained} / ${total}</div>
//                             <div><strong>Percentage:</strong> ${percentage}%</div>
//                         </div>
//                     </div>

//                     <div class="signature-section">
//                         <div class="sig-box">Class Teacher</div>
//                         <div class="sig-box">Parent / Guardian</div>
//                         <div class="sig-box">Principal</div>
//                     </div>
//                 </div>
//             </body>
//         </html>
//     `;

//     const win = window.open('', '_blank');
//     win.document.write(html);
//     win.document.close();
//     win.onload = () => setTimeout(() => win.print(), 500);
// };

// /* =========================================================
//    MY RESULTS PAGE
//    ========================================================= */
// const MyResultsPage = () => {
//     // Mock data — replace with real API fetch keyed on userEmail
//     const studentData = {
//         name:         'Rohan Sawant',
//         rollId:       'S101',
//         classId:      '10th Grade',
//         academicYear: '2025-26',
//         examType:     'Final Assessment',
//         totalMarks:   '575 / 800',
//         percentage:   '71.9%',
//         grade:        'B+',
//         result:       'Pass',
//         subjects: [
//             { name: 'Science',     marks: 68 },
//             { name: 'English',     marks: 72 },
//             { name: 'Marathi',     marks: 84 },
//             { name: 'History',     marks: 79 },
//             { name: 'Geography',   marks: 81 },
//             { name: 'Mathematics', marks: 35 },
//             { name: 'Hindi',       marks: 75 },
//             { name: 'Drawing',     marks: 81 },
//         ],
//     };

//     return (
//         <>
//             <div className="content-header">
//                 <h1>My Results</h1>
//                 <p>Complete result card for the current term.</p>
//             </div>

//             <div className="section-card">
//                 <div className="section-header">
//                     <div>
//                         <h3 className="section-title">Term Result — {studentData.academicYear}</h3>
//                         <p className="section-meta">Issued by SRMS Administration</p>
//                     </div>
//                     <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => exportStudentPDF(studentData)}
//                     >
//                         Download PDF
//                     </button>
//                 </div>

//                 <div className="form-section">
//                     <div className="result-details-grid">
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Student Name</div>
//                             <div className="result-detail-value">{studentData.name}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Roll ID</div>
//                             <div className="result-detail-value">{studentData.rollId}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Class</div>
//                             <div className="result-detail-value">{studentData.classId}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Total Marks</div>
//                             <div className="result-detail-value">{studentData.totalMarks}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Percentage</div>
//                             <div className="result-detail-value">{studentData.percentage}</div>
//                         </div>
//                         <div className="result-detail-item">
//                             <div className="result-detail-label">Grade</div>
//                             <div className="result-detail-value">{studentData.grade}</div>
//                         </div>
//                     </div>

//                     <div className="table-wrapper" style={{ marginTop: '20px' }}>
//                         <table className="data-table">
//                             <thead>
//                                 <tr>
//                                     <th>Subject</th>
//                                     <th>Max Marks</th>
//                                     <th>Obtained</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {studentData.subjects.map((sub, i) => {
//                                     const passed = sub.marks > 35;
//                                     return (
//                                         <tr key={i}>
//                                             <td>{sub.name}</td>
//                                             <td>100</td>
//                                             <td>{sub.marks}</td>
//                                             <td>
//                                                 <span className={`pill ${passed ? 'pill-pass' : 'pill-fail'}`}>
//                                                     {passed ? 'Pass' : 'Fail'}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className={`alert ${studentData.result === 'Pass' ? 'alert-success' : 'alert-error'}`} style={{ marginTop: '20px' }}>
//                         <span>{studentData.result === 'Pass' ? '✓' : '✗'}</span>
//                         {studentData.result === 'Pass'
//                             ? ' You have successfully passed this term. Keep up the great work!'
//                             : ' You did not pass this term. Please review your results with your teacher.'}
// >>>>>>> a9b231b (resolve pdf download issue)
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// <<<<<<< HEAD
// /* --- Profile Sub-component --- */
// const ProfilePage = ({ userData, onUpdate }) => {
// =======
// /* =========================================================
//    PROFILE PAGE
//    ========================================================= */
// const ProfilePage = ({ userEmail }) => {
//     const initialFields = {
//         fullName: '',
//         email:    userEmail || 'student@srms.com',
//         rollId:   '',
//         class:    '',
//         dob:      '2000-01-01',
//         gender:   '',
//     };

// >>>>>>> a9b231b (resolve pdf download issue)
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(userData);

//     const handleSave = () => {
// <<<<<<< HEAD
//         onUpdate(formData);
// =======
//         setSaved(formData);
// >>>>>>> a9b231b (resolve pdf download issue)
//         setIsEditing(false);
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => setFormData({ ...formData, profileImg: reader.result });
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div className="section-card">
//             <div className="section-header">
//                 <h3 className="section-title">Account Details</h3>
//                 <button className="btn btn-sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
//                     {isEditing ? 'Save Changes' : 'Edit Profile'}
//                 </button>
//             </div>
//             <div className="form-section">
//                 <div style={{ marginBottom: '20px', textAlign: 'center' }}>
//                     <img src={formData.profileImg} alt="Profile" className="navbar-avatar" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
//                     {isEditing && <input type="file" onChange={handleImageChange} style={{ display: 'block', margin: '0 auto', fontSize: '12px' }} />}
//                 </div>
//                 <div className="form-grid">
//                     <div className="form-group">
//                         <label>Full Name</label>
//                         <input type="text" value={formData.fullName} disabled={!isEditing} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
//                     </div>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input type="email" value={formData.email} disabled={!isEditing} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//                     </div>
//                     <div className="form-group"><label>Roll ID</label><input type="text" value={formData.rollId} disabled /></div>
//                     <div className="form-group"><label>Class</label><input type="text" value={formData.class} disabled /></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HelpPage from '../../components/HelpPage';
import '../../style/StudentDashboard.css';

/* =========================================================
   PDF GENERATOR — Styled Academic Report
   ========================================================= */
const exportStudentPDF = (studentData) => {
    const { fullName, rollId, class: classId, subjects, percentage, totalMarks, maxMarks } = studentData;

    let overallFail = false;
    const subjectRows = subjects.map(sub => {
        const marks = Number(sub.marks);
        const passed = marks >= 35;
        if (!passed) overallFail = true;
        return { ...sub, passed };
    });

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
                    .student-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 36px; padding: 18px; background: #fdf8f8; border: 1px solid #e8dede; }
                    .marks-table { width: calc(100% - 72px); margin: 0 36px; border-collapse: collapse; }
                    .marks-table thead { background: #6b0f1a; color: #fff; }
                    .marks-table th, .marks-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                    .status-pass { color: green; font-weight: bold; }
                    .status-fail { color: red; font-weight: bold; }
                    .footer-summary { display: flex; justify-content: space-between; margin: 28px 36px; }
                    .badge { padding: 15px; border-radius: 8px; border: 2px solid; text-align: center; width: 150px; }
                    .badge-pass { background: #f0fdf4; border-color: #86efac; color: #166534; }
                    .badge-fail { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
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
                        <div><strong>Name:</strong> ${fullName}</div>
                        <div><strong>Roll ID:</strong> ${rollId}</div>
                        <div><strong>Class:</strong> ${classId}</div>
                        <div><strong>Result:</strong> ${resultStatus}</div>
                    </div>
                    <table class="marks-table">
                        <thead>
                            <tr><th>Subject</th><th>Max</th><th>Obtained</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            ${subjectRows.map(r => `
                                <tr>
                                    <td>${r.name}</td>
                                    <td>100</td>
                                    <td>${r.marks}</td>
                                    <td class="${r.passed ? 'status-pass' : 'status-fail'}">${r.passed ? 'Pass' : 'Fail'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer-summary">
                        <div class="badge ${overallFail ? 'badge-fail' : 'badge-pass'}">
                            <div style="font-size: 10px;">FINAL RESULT</div>
                            <div style="font-size: 20px; font-weight: 800;">${resultStatus}</div>
                        </div>
                        <div style="text-align: right;">
                            <div><strong>Aggregate:</strong> ${totalMarks} / ${maxMarks}</div>
                            <div><strong>Percentage:</strong> ${percentage}%</div>
                        </div>
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

/* --- Main Dashboard Component --- */
const StudentDashboard = ({ logout, userEmail }) => {
    const [userData, setUserData] = useState({
        fullName: 'Anjali Rao',
        email: userEmail || 'anjali.rao@example.com',
        rollId: 'S4821',
        class: 'General',
        dob: '2005-06-15',
        gender: 'Female',
        profileImg: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    });

    const [activePage, setActivePage] = useState('overview');
    const navigate = useNavigate();

    const subjects = [
        { id: 1, name: 'Mathematics', marks: 95, total: 100, grade: 'A+' },
        { id: 2, name: 'Science', marks: 88, total: 100, grade: 'A' },
        { id: 3, name: 'English', marks: 76, total: 100, grade: 'B+' },
        { id: 4, name: 'Social Studies', marks: 45, total: 100, grade: 'C' },
        { id: 5, name: 'Computer Science', marks: 91, total: 100, grade: 'A+' },
    ];

    const totalMarks = subjects.reduce((acc, s) => acc + s.marks, 0);
    const maxMarks = subjects.length * 100;
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);
    const isPassed = percentage >= 40;

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const handleProfileUpdate = (newData) => {
        setUserData(newData);
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
        { id: 'results', label: 'My Results', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
        { id: 'profile', label: 'Profile', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
        { id: 'help', label: 'Help', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
    ];

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
                        <div key={item.id} className={`menu-link ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
                            {item.icon}
                            <span className="menu-text">{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="logout-link" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        <span>Logout</span>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-navbar">
                    <div className="navbar-left">
                        <div className="page-title">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</div>
                        <div className="page-breadcrumb">Student / {activePage}</div>
                    </div>
                    <div className="navbar-right">
                        <div className="navbar-user-info">
                            <div className="navbar-user-text">
                                <span className="navbar-user-name">{userData.fullName}</span>
                                <span className="navbar-email">{userData.email}</span>
                            </div>
                            <img src={userData.profileImg} alt="Profile" className="navbar-avatar" />
                            <span className="navbar-badge">Student</span>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {activePage === 'overview' && <OverviewPage subjects={subjects} percentage={percentage} isPassed={isPassed} />}
                    {activePage === 'results' && <MyResultsPage userData={userData} subjects={subjects} stats={{ totalMarks, maxMarks, percentage, isPassed }} />}
                    {activePage === 'profile' && <ProfilePage userData={userData} onUpdate={handleProfileUpdate} />}
                    {activePage === 'help' && <HelpPage />}
                </div>
            </main>
        </div>
    );
};

/* --- Sub-components (Overview, Results, Profile) --- */

const OverviewPage = ({ percentage, isPassed }) => (
    <>
        <div className="content-header">
            <h1>Welcome back!</h1>
            <p>Academic performance at a glance.</p>
        </div>
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-card-left">
                    <div className="stat-label">Overall Score</div>
                    <div className="stat-value">{percentage}%</div>
                </div>
                <div className="stat-icon-wrap">📈</div>
            </div>
            <div className="stat-card">
                <div className="stat-card-left">
                    <div className="stat-label">Status</div>
                    <div className="stat-value" style={{ color: isPassed ? 'green' : 'red' }}>{isPassed ? 'PASS' : 'FAIL'}</div>
                </div>
                <div className="stat-icon-wrap">🎓</div>
            </div>
        </div>
        <div className="alert" style={{ backgroundColor: isPassed ? '#f0fdf4' : '#fef2f2', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
            {isPassed ? "🎉 Congratulations! You have passed this term." : "⚠️ Work harder! Try for a better result next time."}
        </div>
    </>
);

const MyResultsPage = ({ userData, subjects, stats }) => (
    <>
        <div className="content-header">
            <h1>Academic Transcript</h1>
            <button className="btn btn-primary" onClick={() => exportStudentPDF({ ...userData, subjects, ...stats })}>
                Download PDF
            </button>
        </div>
        <div className="section-card">
            <div className="result-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
                <div className="result-detail-item"><strong>Student Name:</strong> <div>{userData.fullName}</div></div>
                <div className="result-detail-item"><strong>Roll ID:</strong> <div>{userData.rollId}</div></div>
                <div className="result-detail-item"><strong>Total Marks:</strong> <div>{stats.totalMarks} / {stats.maxMarks}</div></div>
                <div className="result-detail-item"><strong>Percentage:</strong> <div>{stats.percentage}%</div></div>
            </div>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Marks</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>{s.name}</td>
                            <td style={{ padding: '12px' }}>{s.marks} / 100</td>
                            <td style={{ padding: '12px' }}>{s.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

const ProfilePage = ({ userData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userData);

    const handleSave = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    return (
        <div className="section-card" style={{ padding: '20px' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 className="section-title">Account Details</h3>
                <button className="btn btn-sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                    <input style={{ width: '100%', padding: '8px' }} type="text" value={formData.fullName} disabled={!isEditing} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input style={{ width: '100%', padding: '8px' }} type="email" value={formData.email} disabled={!isEditing} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px' }}>Roll ID</label>
                    <input style={{ width: '100%', padding: '8px', backgroundColor: '#f0f0f0' }} type="text" value={formData.rollId} disabled />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px' }}>Class</label>
                    <input style={{ width: '100%', padding: '8px', backgroundColor: '#f0f0f0' }} type="text" value={formData.class} disabled />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;