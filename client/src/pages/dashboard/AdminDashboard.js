// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//     LayoutDashboard,
//     Users,
//     BookOpen,
//     FileText,
//     LogOut,
// } from "lucide-react";
// import AddStudent from "../AddStudent";
// import ResultsPage from "../ResultsPage";
// import "../../style/AdminDashboard.css";
// import SubjectsPage from "../SubjectsPage";

// const API = "http://localhost:5003/api";

// // ─── Navigation Config ────────────────────────────────────────────────────────
// const MANAGEMENT_CONFIG = {
//     dashboard: {
//         label: "Dashboard",
//         title: "Dashboard Overview",
//         breadcrumb: "Admin / Dashboard",
//         icon: <LayoutDashboard size={16} strokeWidth={1.8} />,
//         component: (props) => <DashboardPage {...props} />,
//     },
//     students: {
//         label: "Students",
//         title: "Students",
//         breadcrumb: "Admin / Students",
//         icon: <Users size={16} strokeWidth={1.8} />,
//         component: (props) => <StudentsPage {...props} />,
//     },
//     subjects: {
//         label: "Subjects",
//         title: "Subjects",
//         breadcrumb: "Admin / Subjects",
//         icon: <BookOpen size={16} strokeWidth={1.8} />,
//         component: (props) => <SubjectsPage {...props} />,
//     },
//     addStudent: {
//         label: "Add Student",
//         title: "Admission Form",
//         breadcrumb: "Admin / Students / Add",
//         icon: null,
//         component: (props) => <AddStudent {...props} />,
//     },
//     results: {
//         label: "Results",
//         title: "Results",
//         breadcrumb: "Admin / Results",
//         icon: <FileText size={16} strokeWidth={1.8} />,
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
//                         <LogOut size={16} strokeWidth={1.8} />
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

// // ─── Dashboard Skeleton ───────────────────────────────────────────────────────
// const DashboardSkeleton = () => (
//     <>
//         <div className="content-header">
//             <div className="skeleton skeleton-title" />
//             <div className="skeleton skeleton-text" style={{ width: "55%" }} />
//         </div>
//         <div className="stats-grid">
//             {[1, 2, 3].map(i => (
//                 <div className="stat-card" key={i}>
//                     <div className="stat-card-left">
//                         <div className="skeleton skeleton-label" />
//                         <div className="skeleton skeleton-stat" />
//                         <div className="skeleton skeleton-text" style={{ width: "70%" }} />
//                     </div>
//                     <div className="skeleton" style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", flexShrink: 0 }} />
//                 </div>
//             ))}
//         </div>
//     </>
// );

// // ─── Dashboard Page ───────────────────────────────────────────────────────────
// const DashboardPage = () => {
//     const [stats, setStats] = useState({ students: 0, results: 0, subjects: 0 });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const [studRes, resData, subRes] = await Promise.all([
//                     axios.get(`${API}/students/get`),
//                     axios.get(`${API}/results/all`),
//                     axios.get(`${API}/subjects/all`)
//                 ]);
//                 setStats({
//                     students: studRes.data.length,
//                     results: resData.data.success ? resData.data.data.length : 0,
//                     subjects: subRes.data.length
//                 });
//             } catch (err) {
//                 console.error("Stats fetch error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     const statCards = [
//         { label: "Total Students",    value: stats.students, delta: "Registered students", deltaClass: "", icon: "👤", iconClass: "icon-blue"   },
//         { label: "Total Subjects",    value: stats.subjects, delta: "Across all classes",  deltaClass: "", icon: "📚", iconClass: "icon-purple" },
//         { label: "Results Published", value: stats.results,  delta: "Declared results",    deltaClass: "", icon: "📊", iconClass: "icon-green"  },
//     ];

//     if (loading) return <DashboardSkeleton />;

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

// // ─── Students Skeleton ────────────────────────────────────────────────────────
// const StudentsSkeleton = () => (
//     <div className="section-card">
//         <div className="section-header">
//             <div className="skeleton skeleton-title" style={{ width: "20%" }} />
//             <div className="skeleton skeleton-btn" />
//         </div>
//         <div className="form-section">
//             <div className="filter-bar">
//                 <div className="skeleton" style={{ height: 36, flex: 1, borderRadius: "var(--radius-sm)" }} />
//                 <div className="skeleton" style={{ height: 36, width: 140, borderRadius: "var(--radius-sm)" }} />
//             </div>
//             <div className="table-wrapper">
//                 <table className="data-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Roll ID</th>
//                             <th>Class</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {[1, 2, 3, 4, 5].map(i => (
//                             <tr key={i}>
//                                 <td>
//                                     <div className="student-cell">
//                                         <div className="skeleton skeleton-avatar" />
//                                         <div style={{ flex: 1 }}>
//                                             <div className="skeleton skeleton-text" style={{ width: "60%" }} />
//                                             <div className="skeleton skeleton-text" style={{ width: "80%", marginBottom: 0 }} />
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td><div className="skeleton skeleton-text" style={{ width: "50%" }} /></td>
//                                 <td><div className="skeleton skeleton-text" style={{ width: "40%" }} /></td>
//                                 <td><div className="skeleton skeleton-btn" style={{ width: 60 }} /></td>
//                                 <td>
//                                     <div style={{ display: "flex", gap: 6 }}>
//                                         <div className="skeleton skeleton-btn" style={{ width: 50 }} />
//                                         <div className="skeleton skeleton-btn" style={{ width: 60 }} />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
// );

// // ─── Students Page ────────────────────────────────────────────────────────────
// const StudentsPage = ({ setActivePage, setEditingStudent }) => {
//     const [students, setStudents]           = useState([]);
//     const [searchTerm, setSearchTerm]       = useState("");
//     const [selectedClass, setSelectedClass] = useState("All Classes");
//     const [loading, setLoading]             = useState(true);

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

//     if (loading) return <StudentsSkeleton />;

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
//                                 {filteredStudents.length > 0 ? (
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
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    LogOut,
} from "lucide-react";
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
        icon: <LayoutDashboard size={16} strokeWidth={1.8} />,
        component: (props) => <DashboardPage {...props} />,
    },
    students: {
        label: "Students",
        title: "Students",
        breadcrumb: "Admin / Students",
        icon: <Users size={16} strokeWidth={1.8} />,
        component: (props) => <StudentsPage {...props} />,
    },
    subjects: {
        label: "Subjects",
        title: "Subjects",
        breadcrumb: "Admin / Subjects",
        icon: <BookOpen size={16} strokeWidth={1.8} />,
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
        icon: <FileText size={16} strokeWidth={1.8} />,
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
                        <LogOut size={16} strokeWidth={1.8} />
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

// ─── Dashboard Skeleton ───────────────────────────────────────────────────────
const DashboardSkeleton = () => (
    <>
        <div className="content-header">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" style={{ width: "55%" }} />
        </div>
        <div className="stats-grid">
            {[1, 2, 3].map(i => (
                <div className="stat-card" key={i}>
                    <div className="stat-card-left">
                        <div className="skeleton skeleton-label" />
                        <div className="skeleton skeleton-stat" />
                        <div className="skeleton skeleton-text" style={{ width: "70%" }} />
                    </div>
                    <div className="skeleton" style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", flexShrink: 0 }} />
                </div>
            ))}
        </div>
    </>
);

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const DashboardPage = () => {
    const [stats, setStats] = useState({ students: 0, results: 0, subjects: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studRes, resData, subRes] = await Promise.all([
                    axios.get(`${API}/students/get`),
                    axios.get(`${API}/results/all`),
                    axios.get(`${API}/subjects/all`)
                ]);

                // Count only unique students who have declared results
                const allResults = resData.data.success ? resData.data.data : [];
                const uniqueStudentsWithResults = new Set(
                    allResults.map(r => r.StudentId || r.studentId || r._id)
                ).size;

                setStats({
                    students: studRes.data.length,
                    results: uniqueStudentsWithResults,
                    subjects: subRes.data.length
                });
            } catch (err) {
                console.error("Stats fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: "Total Students",
            value: stats.students,
            delta: "Registered in the system",
            icon: <Users size={28} strokeWidth={1.6} />,
            accent: "#e85d0a",
            bg: "linear-gradient(135deg, #1e1e3a 0%, #2a1a0e 100%)",
            border: "rgba(232,93,10,0.35)",
            iconBg: "rgba(232,93,10,0.18)",
            iconColor: "#e85d0a",
        },
        {
            label: "Total Subjects",
            value: stats.subjects,
            delta: "Across all classes",
            icon: <BookOpen size={28} strokeWidth={1.6} />,
            accent: "#6366f1",
            bg: "linear-gradient(135deg, #1e1e3a 0%, #1a1a2e 100%)",
            border: "rgba(99,102,241,0.35)",
            iconBg: "rgba(99,102,241,0.18)",
            iconColor: "#818cf8",
        },
        {
            label: "Results Declared",
            value: stats.results,
            delta: "Students with published results",
            icon: <FileText size={28} strokeWidth={1.6} />,
            accent: "#10b981",
            bg: "linear-gradient(135deg, #1e1e3a 0%, #0d2018 100%)",
            border: "rgba(16,185,129,0.35)",
            iconBg: "rgba(16,185,129,0.18)",
            iconColor: "#34d399",
        },
    ];

    if (loading) return <DashboardSkeleton />;

    return (
        <>
            <div className="content-header">
                <h1>Welcome back, Admin</h1>
                <p>Here's what's happening with your system today.</p>
            </div>
            <div className="stats-grid-full">
                {statCards.map(card => (
                    <div
                        className="stat-card-full"
                        key={card.label}
                        style={{
                            background: card.bg,
                            border: `1px solid ${card.border}`,
                        }}
                    >
                        {/* Glow orb */}
                        <div
                            className="stat-card-glow"
                            style={{ background: card.accent }}
                        />
                        <div className="stat-card-body">
                            <div
                                className="stat-icon-box"
                                style={{ background: card.iconBg, color: card.iconColor }}
                            >
                                {card.icon}
                            </div>
                            <div className="stat-card-info">
                                <div
                                    className="stat-card-value"
                                    style={{ color: card.accent }}
                                >
                                    {card.value}
                                </div>
                                <div className="stat-card-label">{card.label}</div>
                                <div className="stat-card-delta">{card.delta}</div>
                            </div>
                        </div>
                        <div
                            className="stat-card-bar"
                            style={{ background: card.accent }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

// ─── Students Skeleton ────────────────────────────────────────────────────────
const StudentsSkeleton = () => (
    <div className="section-card">
        <div className="section-header">
            <div className="skeleton skeleton-title" style={{ width: "20%" }} />
            <div className="skeleton skeleton-btn" />
        </div>
        <div className="form-section">
            <div className="filter-bar">
                <div className="skeleton" style={{ height: 36, flex: 1, borderRadius: "var(--radius-sm)" }} />
                <div className="skeleton" style={{ height: 36, width: 140, borderRadius: "var(--radius-sm)" }} />
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
                        {[1, 2, 3, 4, 5].map(i => (
                            <tr key={i}>
                                <td>
                                    <div className="student-cell">
                                        <div className="skeleton skeleton-avatar" />
                                        <div style={{ flex: 1 }}>
                                            <div className="skeleton skeleton-text" style={{ width: "60%" }} />
                                            <div className="skeleton skeleton-text" style={{ width: "80%", marginBottom: 0 }} />
                                        </div>
                                    </div>
                                </td>
                                <td><div className="skeleton skeleton-text" style={{ width: "50%" }} /></td>
                                <td><div className="skeleton skeleton-text" style={{ width: "40%" }} /></td>
                                <td><div className="skeleton skeleton-btn" style={{ width: 60 }} /></td>
                                <td>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <div className="skeleton skeleton-btn" style={{ width: 50 }} />
                                        <div className="skeleton skeleton-btn" style={{ width: 60 }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// ─── Students Page ────────────────────────────────────────────────────────────
const StudentsPage = ({ setActivePage, setEditingStudent }) => {
    const [students, setStudents]           = useState([]);
    const [searchTerm, setSearchTerm]       = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");
    const [loading, setLoading]             = useState(true);

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

    if (loading) return <StudentsSkeleton />;

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
                                {filteredStudents.length > 0 ? (
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