// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddStudent from "../AddStudent";
// import ResultsPage from "../ResultsPage";
// import "../../style/AdminDashboard.css";

// const API = "http://localhost:5003/api";

// // ─── Navigation Config ────────────────────────────────────────────────────────
// const MANAGEMENT_CONFIG = {
//     dashboard: {
//         label: "Dashboard",
//         title: "Dashboard Overview",
//         breadcrumb: "Admin / Dashboard",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <rect x="3" y="3" width="7" height="7" rx="1" />
//                 <rect x="14" y="3" width="7" height="7" rx="1" />
//                 <rect x="3" y="14" width="7" height="7" rx="1" />
//                 <rect x="14" y="14" width="7" height="7" rx="1" />
//             </svg>
//         ),
//         component: (props) => <DashboardPage {...props} />,
//     },
//     students: {
//         label: "Students",
//         title: "Students",
//         breadcrumb: "Admin / Students",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                 <circle cx="9" cy="7" r="4" />
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//             </svg>
//         ),
//         component: (props) => <StudentsPage {...props} />,
//     },
//     addStudent: {
//         label: "Add Student",
//         title: "Admission Form",
//         breadcrumb: "Admin / Students / Add",
//         icon: null, // hidden from sidebar
//         component: (props) => <AddStudent {...props} />,
//     },
//     results: {
//         label: "Results",
//         title: "Results",
//         breadcrumb: "Admin / Results",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                 <polyline points="14 2 14 8 20 8" />
//                 <line x1="16" y1="13" x2="8" y2="13" />
//                 <line x1="16" y1="17" x2="8" y2="17" />
//             </svg>
//         ),
//         component: (props) => <ResultsPage {...props} />,
//     },
// };

// // ─── Admin Dashboard Shell ────────────────────────────────────────────────────
// const AdminDashboard = ({ logout, userEmail }) => {
//     const [activePage, setActivePage] = useState("dashboard");
//     const [editingStudent, setEditingStudent] = useState(null);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate("/", { replace: true });
//     };

//     const currentPage = MANAGEMENT_CONFIG[activePage];
//     const ActiveComponent = currentPage.component;

//     return (
//         <div className="admin-layout">
//             <aside className="sidebar">
//                 <div className="sidebar-header">
//                     <div className="sidebar-logo-mark">S</div>
//                     <span className="sidebar-brand-name">SRMS ADMIN</span>
//                 </div>

//                 <nav className="menu-nav">
//                     <span className="section-label">Main Menu</span>
//                     {Object.keys(MANAGEMENT_CONFIG)
//                         .filter(key => key !== "addStudent")
//                         .map((key) => (
//                             <div
//                                 key={key}
//                                 className={`menu-link ${activePage === key ? "active" : ""}`}
//                                 onClick={() => {
//                                     setActivePage(key);
//                                     setEditingStudent(null);
//                                 }}
//                             >
//                                 {MANAGEMENT_CONFIG[key].icon}
//                                 <span className="menu-text">{MANAGEMENT_CONFIG[key].label}</span>
//                             </div>
//                         ))}
//                 </nav>

//                 <div className="sidebar-footer">
//                     <div className="logout-link" onClick={handleLogout}>
//                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                             <polyline points="16 17 21 12 16 7" />
//                             <line x1="21" y1="12" x2="9" y2="12" />
//                         </svg>
//                         <span>Logout</span>
//                     </div>
//                 </div>
//             </aside>

//             <main className="main-content">
//                 <header className="top-navbar">
//                     <div className="navbar-left">
//                         <div className="page-title">
//                             {editingStudent ? "Edit Student" : currentPage.title}
//                         </div>
//                         <div className="page-breadcrumb">
//                             {editingStudent ? "Admin / Students / Edit" : currentPage.breadcrumb}
//                         </div>
//                     </div>
//                     <div className="navbar-right">
//                         <span className="navbar-badge">Administrator</span>
//                         <span className="navbar-email">{userEmail}</span>
//                     </div>
//                 </header>

//                 <div className="dashboard-content">
//                     <ActiveComponent
//                         setActivePage={setActivePage}
//                         editData={editingStudent}
//                         setEditingStudent={setEditingStudent}
//                     />
//                 </div>
//             </main>
//         </div>
//     );
// };

// // ─── Dashboard Page ───────────────────────────────────────────────────────────
// const DashboardPage = () => {
//     const [stats, setStats] = useState({ students: 0, results: 0 });

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const [studRes] = await Promise.all([
//                     axios.get(`${API}/students/get`),
//                 ]);
//                 setStats(prev => ({ ...prev, students: studRes.data.length }));
//             } catch (err) {
//                 console.error("Stats fetch error:", err);
//             }
//         };
//         fetchStats();
//     }, []);

//     const statCards = [
//         { label: "Total Students",    value: stats.students, delta: "Registered students", deltaClass: "", icon: "👤", iconClass: "icon-blue"  },
//         { label: "Results Published", value: stats.results,  delta: "Declared results",    deltaClass: "", icon: "📊", iconClass: "icon-green" },
//     ];

//     return (
//         <>
//             <div className="content-header">
//                 <h1>Welcome back, Admin</h1>
//                 <p>Here's what's happening with your system today.</p>
//             </div>

//             <div className="stats-grid">
//                 {statCards.map(card => (
//                     <div className="stat-card" key={card.label}>
//                         <div className="stat-card-left">
//                             <div className="stat-label">{card.label}</div>
//                             <div className="stat-value">{card.value}</div>
//                             <div className={`stat-delta ${card.deltaClass}`}>{card.delta}</div>
//                         </div>
//                         <div className={`stat-icon-wrap ${card.iconClass}`}>{card.icon}</div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// // ─── Students Page ────────────────────────────────────────────────────────────
// const StudentsPage = ({ setActivePage, setEditingStudent }) => {
//     const [students, setStudents]         = useState([]);
//     const [searchTerm, setSearchTerm]     = useState("");
//     const [selectedClass, setSelectedClass] = useState("All Classes");
//     const [loading, setLoading]           = useState(true);

//     const fetchStudents = async () => {
//         try {
//             const res = await axios.get(`${API}/students/get`);
//             setStudents(res.data);
//         } catch (error) {
//             console.error("Fetch error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchStudents(); }, []);

//     const handleDelete = async (id, name) => {
//         if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//             try {
//                 await axios.delete(`${API}/students/delete/${id}`);
//                 fetchStudents();
//             } catch (error) {
//                 alert("Delete failed: " + error.message);
//             }
//         }
//     };

//     const handleEdit = (student) => {
//         setEditingStudent(student);
//         setActivePage("addStudent");
//     };

//     const availableClasses = [...new Set(students.map(s => s.ClassId).filter(Boolean))];

//     const getAvatar = (name) =>
//         name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "??";

//     const filteredStudents = students.filter(s => {
//         const search = searchTerm.toLowerCase();
//         const matchesSearch = (
//             s.StudentName?.toLowerCase().includes(search) ||
//             s.StudentEmail?.toLowerCase().includes(search) ||
//             s.RollId?.toLowerCase().includes(search)
//         );
//         const matchesClass = selectedClass === "All Classes" || s.ClassId === selectedClass;
//         return matchesSearch && matchesClass;
//     });

//     return (
//         <>
//             <div className="content-header">
//                 <h1>Students</h1>
//                 <p>Manage all registered students.</p>
//             </div>
//             <div className="section-card">
//                 <div className="section-header">
//                     <h3 className="section-title">All Students</h3>
//                     <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => { setEditingStudent(null); setActivePage("addStudent"); }}
//                     >
//                         + Add Student
//                     </button>
//                 </div>
//                 <div className="form-section">
//                     <div className="filter-bar">
//                         <input
//                             type="text"
//                             placeholder="Search by name, email, or roll id..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <select
//                             value={selectedClass}
//                             onChange={(e) => setSelectedClass(e.target.value)}
//                         >
//                             <option value="All Classes">All Classes</option>
//                             {availableClasses.map((cls, i) => (
//                                 <option key={i} value={cls}>{cls}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="table-wrapper">
//                         <table className="data-table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Roll ID</th>
//                                     <th>Class</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr><td colSpan="5" className="table-status-msg">Loading...</td></tr>
//                                 ) : filteredStudents.length > 0 ? (
//                                     filteredStudents.map(s => (
//                                         <tr key={s._id}>
//                                             <td>
//                                                 <div className="student-cell">
//                                                     <div className="avatar av-blue">{getAvatar(s.StudentName)}</div>
//                                                     <div>
//                                                         <div className="student-name">{s.StudentName}</div>
//                                                         <div className="student-id">{s.StudentEmail}</div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td>{s.RollId}</td>
//                                             <td>{s.ClassId || "General"}</td>
//                                             <td>
//                                                 <span className={`pill ${s.Status === 1 ? "pill-active" : "pill-inactive"}`}>
//                                                     {s.Status === 1 ? "Active" : "Inactive"}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <div className="action-btns">
//                                                     <button className="btn btn-sm" onClick={() => handleEdit(s)}>Edit</button>
//                                                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id, s.StudentName)}>Delete</button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr><td colSpan="5" className="table-status-msg">No students found.</td></tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddStudent from "../AddStudent";
import ResultsPage from "../ResultsPage";
import "../../style/AdminDashboard.css";
import SubjectsPage from "../SubjectsPage";

const API = "http://localhost:5003/api";

// ─── Navigation Config ────────────────────────────────────────────────────────
const MANAGEMENT_CONFIG = {
    dashboard: {
        label: "Dashboard",
        title: "Dashboard Overview",
        breadcrumb: "Admin / Dashboard",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        component: (props) => <DashboardPage {...props} />,
    },
    students: {
        label: "Students",
        title: "Students",
        breadcrumb: "Admin / Students",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        component: (props) => <StudentsPage {...props} />,
    },
    subjects: {
        label: "Subjects",
        title: "Subjects",
        breadcrumb: "Admin / Subjects",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
        component: (props) => <SubjectsPage {...props} />,
    },
    addStudent: {
        label: "Add Student",
        title: "Admission Form",
        breadcrumb: "Admin / Students / Add",
        icon: null,
        component: (props) => <AddStudent {...props} />,
    },
    results: {
        label: "Results",
        title: "Results",
        breadcrumb: "Admin / Results",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        component: (props) => <ResultsPage {...props} />,
    },
};

// ─── Admin Dashboard Shell ────────────────────────────────────────────────────
const AdminDashboard = ({ logout, userEmail }) => {
    const [activePage, setActivePage] = useState("dashboard");
    const [editingStudent, setEditingStudent] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const currentPage = MANAGEMENT_CONFIG[activePage];
    const ActiveComponent = currentPage.component;

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo-mark">S</div>
                    <span className="sidebar-brand-name">SRMS ADMIN</span>
                </div>

                <nav className="menu-nav">
                    <span className="section-label">Main Menu</span>
                    {Object.keys(MANAGEMENT_CONFIG)
                        .filter(key => key !== "addStudent")
                        .map((key) => (
                            <div
                                key={key}
                                className={`menu-link ${activePage === key ? "active" : ""}`}
                                onClick={() => {
                                    setActivePage(key);
                                    setEditingStudent(null);
                                }}
                            >
                                {MANAGEMENT_CONFIG[key].icon}
                                <span className="menu-text">{MANAGEMENT_CONFIG[key].label}</span>
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
                            {editingStudent ? "Edit Student" : currentPage.title}
                        </div>
                        <div className="page-breadcrumb">
                            {editingStudent ? "Admin / Students / Edit" : currentPage.breadcrumb}
                        </div>
                    </div>
                    <div className="navbar-right">
                        <span className="navbar-badge">Administrator</span>
                        <span className="navbar-email">{userEmail}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    <ActiveComponent
                        setActivePage={setActivePage}
                        editData={editingStudent}
                        setEditingStudent={setEditingStudent}
                    />
                </div>
            </main>
        </div>
    );
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const DashboardPage = () => {
    const [stats, setStats] = useState({ students: 0, results: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studRes, resData] = await Promise.all([
                    axios.get(`${API}/students/get`),
                    axios.get(`${API}/results/all`)
                ]);
                setStats({
                    students: studRes.data.length,
                    results: resData.data.success ? resData.data.data.length : 0
                });
            } catch (err) {
                console.error("Stats fetch error:", err);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Students", value: stats.students, delta: "Registered students", deltaClass: "", icon: "👤", iconClass: "icon-blue" },
        { label: "Results Published", value: stats.results, delta: "Declared results", deltaClass: "", icon: "📊", iconClass: "icon-green" },
    ];

    return (
        <>
            <div className="content-header">
                <h1>Welcome back, Admin</h1>
                <p>Here's what's happening with your system today.</p>
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
        </>
    );
};

// ─── Students Page ────────────────────────────────────────────────────────────
const StudentsPage = ({ setActivePage, setEditingStudent }) => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API}/students/get`);
            setStudents(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await axios.delete(`${API}/students/delete/${id}`);
                fetchStudents();
            } catch (error) {
                alert("Delete failed: " + error.message);
            }
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setActivePage("addStudent");
    };

    const availableClasses = [...new Set(students.map(s => s.ClassId).filter(Boolean))];

    const getAvatar = (name) =>
        name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "??";

    const filteredStudents = students.filter(s => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = (
            s.StudentName?.toLowerCase().includes(search) ||
            s.StudentEmail?.toLowerCase().includes(search) ||
            s.RollId?.toLowerCase().includes(search)
        );
        const matchesClass = selectedClass === "All Classes" || s.ClassId === selectedClass;
        return matchesSearch && matchesClass;
    });

    return (
        <>
            <div className="content-header">
                <h1>Students</h1>
                <p>Manage all registered students.</p>
            </div>
            <div className="section-card">
                <div className="section-header">
                    <h3 className="section-title">All Students</h3>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => { setEditingStudent(null); setActivePage("addStudent"); }}
                    >
                        + Add Student
                    </button>
                </div>
                <div className="form-section">
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder="Search by name, email, or roll id..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="All Classes">All Classes</option>
                            {availableClasses.map((cls, i) => (
                                <option key={i} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll ID</th>
                                    <th>Class</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="table-status-msg">Loading...</td></tr>
                                ) : filteredStudents.length > 0 ? (
                                    filteredStudents.map(s => (
                                        <tr key={s._id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="avatar av-blue">{getAvatar(s.StudentName)}</div>
                                                    <div>
                                                        <div className="student-name">{s.StudentName}</div>
                                                        <div className="student-id">{s.StudentEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{s.RollId}</td>
                                            <td>{s.ClassId || "General"}</td>
                                            <td>
                                                <span className={`pill ${s.Status === 1 ? "pill-active" : "pill-inactive"}`}>
                                                    {s.Status === 1 ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="btn btn-sm" onClick={() => handleEdit(s)}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id, s.StudentName)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="table-status-msg">No students found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;