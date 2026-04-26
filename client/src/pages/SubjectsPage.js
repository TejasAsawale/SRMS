// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:5003/api";

// const CLASSES = [
//     "Class 1", "Class 2", "Class 3", "Class 4",
//     "Class 5", "Class 6", "Class 7", "Class 8",
//     "Class 9", "Class 10", "Class 11", "Class 12"
// ];

// const SubjectsPage = () => {
//     const [subjects, setSubjects] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Class subject modal
//     const [classModal, setClassModal] = useState(false);
//     const [classModalData, setClassModalData] = useState(null); // { classId, editSubject }

//     // Student subject modal
//     const [studentModal, setStudentModal] = useState(false);
//     const [studentModalData, setStudentModalData] = useState(null); // student object

//     // Student table filter
//     const [selectedClass, setSelectedClass] = useState("All");
//     const [search, setSearch] = useState("");

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const [subRes, studRes] = await Promise.all([
//                 axios.get(`${API}/subjects/all`),
//                 axios.get(`${API}/students/get`)
//             ]);
//             setSubjects(subRes.data);
//             setStudents(studRes.data);
//             setError("");
//         } catch (err) {
//             setError("Failed to fetch data. Check if server is running.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchData(); }, []);

//     // ── Class card actions ──
//     const openClassModal = (classId, editSubject = null) => {
//         setClassModalData({ classId, editSubject });
//         setClassModal(true);
//     };

//     const closeClassModal = () => {
//         setClassModal(false);
//         setClassModalData(null);
//     };

//     // const handleDeleteSubject = async (id) => {
//     //     if (!window.confirm("Delete this subject permanently?")) return;
//     //     try {
//     //         await axios.delete(`${API}/subjects/delete/${id}`);
//     //         fetchData();
//     //     } catch (err) {
//     //         alert(err.response?.data?.message || "Delete failed");
//     //     }
//     // }; 

//     // ── Student subject actions ──
//     const openStudentModal = (student) => {
//         setStudentModalData(student);
//         setStudentModal(true);
//     };

//     const closeStudentModal = () => {
//         setStudentModal(false);
//         setStudentModalData(null);
//     };

//     // ── Derived data ──
//     const getClassSubjects = (classId) => subjects.filter(s => s.ClassId === classId);

//     const filteredStudents = students.filter(s => {
//         const hasSubjects = s.Subjects && s.Subjects.length > 0;
//         const matchClass = selectedClass === "All" || s.ClassId === selectedClass;
//         const matchSearch =
//             s.StudentName?.toLowerCase().includes(search.toLowerCase()) ||
//             s.RollId?.toLowerCase().includes(search.toLowerCase()) ||
//             s.StudentEmail?.toLowerCase().includes(search.toLowerCase());
//         return hasSubjects && matchClass && matchSearch;
//     });

//     const getAvatar = (name) =>
//         name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";

//     return (
//         <div className="results-container">
//             <div className="content-header">
//                 <h1>Subjects Management</h1>
//                 <p>Manage class subjects and student subject assignments.</p>
//             </div>

//             {error && <div className="alert alert-error">⚠ {error}</div>}

//             {/* ── 12 Class Cards ── */}
//             <div className="section-card" style={{ marginBottom: "24px" }}>
//                 <div className="section-header" style={{ marginBottom: "16px" }}>
//                     <h3 className="section-title">Class Subjects</h3>
//                     <p className="section-meta">Click Edit to manage subjects for each class</p>
//                 </div>

//                 {/* Row 1: Class 1-6 */}
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "12px" }}>
//                     {CLASSES.slice(0, 6).map(cls => (
//                         <ClassCard
//                             key={cls}
//                             cls={cls}
//                             subjects={getClassSubjects(cls)}
//                             onEdit={() => openClassModal(cls)}
//                         />
//                     ))}
//                 </div>

//                 {/* Row 2: Class 7-12 */}
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }}>
//                     {CLASSES.slice(6, 12).map(cls => (
//                         <ClassCard
//                             key={cls}
//                             cls={cls}
//                             subjects={getClassSubjects(cls)}
//                             onEdit={() => openClassModal(cls)}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* ── Students Table ── */}
//             <div className="section-card">
//                 <div className="section-header">
//                     <h3 className="section-title">Students & Subject Assignment</h3>
//                     <p className="section-meta">{filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} shown</p>
//                 </div>

//                 <div className="filter-bar">
//                     <input
//                         type="text"
//                         placeholder="Search by name, roll id, or email..."
//                         value={search}
//                         onChange={e => setSearch(e.target.value)}
//                     />
//                     <select
//                         value={selectedClass}
//                         onChange={e => setSelectedClass(e.target.value)}
//                     >
//                         <option value="All">All Classes</option>
//                         {CLASSES.map(c => (
//                             <option key={c} value={c}>{c}</option>
//                         ))}
//                     </select>
//                     {search && (
//                         <button className="btn btn-sm" onClick={() => setSearch("")}>Clear</button>
//                     )}
//                 </div>

//                 <div className="table-wrapper">
//                     <table className="data-table">
//                         <thead>
//                             <tr>
//                                 <th>Student</th>
//                                 <th>Roll ID</th>
//                                 <th>Class</th>
//                                 <th>Subjects Assigned</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr><td colSpan="5" className="table-status-msg">Loading...</td></tr>
//                             ) : filteredStudents.length > 0 ? (
//                                 filteredStudents.map(s => {
//                                     const classSubjects = getClassSubjects(s.ClassId);
//                                     const assignedSubjects = s.Subjects || [];
//                                     return (
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
//                                             <td>{s.ClassId || "—"}</td>
//                                             <td>
//                                                 {assignedSubjects.length > 0 ? (
//                                                     <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//                                                         {assignedSubjects.map(code => {
//                                                             const sub = subjects.find(su => su.SubjectCode === code);
//                                                             return (
//                                                                 <span key={code} style={{
//                                                                     padding: "2px 8px",
//                                                                     background: "var(--accent-light, #e8f4ff)",
//                                                                     borderRadius: "12px",
//                                                                     fontSize: "11px",
//                                                                     color: "var(--accent, #2563eb)"
//                                                                 }}>
//                                                                     {sub ? sub.SubjectName : code}
//                                                                 </span>
//                                                             );
//                                                         })}
//                                                     </div>
//                                                 ) : (
//                                                     <span style={{ color: "#aaa", fontSize: "12px" }}>
//                                                         {classSubjects.length === 0
//                                                             ? "No subjects in this class"
//                                                             : "None assigned"}
//                                                     </span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     className="btn btn-sm"
//                                                     onClick={() => openStudentModal(s)}
//                                                     disabled={classSubjects.length === 0}
//                                                     title={classSubjects.length === 0 ? "Add subjects to this class first" : "Edit subjects"}
//                                                 >
//                                                     Edit Subjects
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             ) : (
//                                 <tr><td colSpan="5" className="table-status-msg">No students found.</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* ── Class Subject Modal ── */}
//             {classModal && classModalData && (
//                 <Modal title={`Manage Subjects — ${classModalData.classId}`} onClose={closeClassModal}>
//                     <ClassSubjectManager
//                         classId={classModalData.classId}
//                         subjects={getClassSubjects(classModalData.classId)}
//                         onSuccess={() => { fetchData(); }}
//                         onClose={closeClassModal}
//                     />
//                 </Modal>
//             )}

//             {/* ── Student Subject Modal ── */}
//             {studentModal && studentModalData && (
//                 <Modal title={`Edit Subjects — ${studentModalData.StudentName}`} onClose={closeStudentModal}>
//                     <StudentSubjectManager
//                         student={studentModalData}
//                         classSubjects={getClassSubjects(studentModalData.ClassId)}
//                         onSuccess={() => { fetchData(); closeStudentModal(); }}
//                         onCancel={closeStudentModal}
//                     />
//                 </Modal>
//             )}
//         </div>
//     );
// };

// // ─── Class Card ───────────────────────────────────────────────────────────────
// const ClassCard = ({ cls, subjects, onEdit }) => (
//     <div style={{
//         border: "1px solid var(--border, #e5e7eb)",
//         borderRadius: "10px",
//         padding: "14px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "8px",
//         background: "var(--bg-primary, #fff)"
//     }}>
//         <div style={{ fontWeight: 700, fontSize: "13px" }}>{cls}</div>
//         <div style={{ fontSize: "12px", color: "#888" }}>
//             {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
//         </div>
//         <button className="btn btn-sm" style={{ width: "100%", marginTop: "4px" }} onClick={onEdit}>
//             Edit
//         </button>
//     </div>
// );

// // ─── Modal Wrapper ────────────────────────────────────────────────────────────
// const Modal = ({ title, onClose, children }) => (
//     <div style={{
//         position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
//         background: "rgba(0,0,0,0.5)", zIndex: 1000,
//         display: "flex", alignItems: "center", justifyContent: "center"
//     }}>
//         <div style={{
//             background: "var(--bg-primary, #fff)",
//             borderRadius: "12px", padding: "32px",
//             width: "100%", maxWidth: "520px",
//             maxHeight: "85vh", overflowY: "auto",
//             boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
//         }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
//                 <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>
//                 <button className="btn btn-sm" onClick={onClose}>✕</button>
//             </div>
//             {children}
//         </div>
//     </div>
// );

// // ─── Class Subject Manager (inside modal) ─────────────────────────────────────
// const ClassSubjectManager = ({ classId, subjects, onSuccess, onClose }) => {
//     const [showForm, setShowForm] = useState(false);
//     const [editSubject, setEditSubject] = useState(null);
//     const [formData, setFormData] = useState({ SubjectName: "", SubjectCode: "" });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleEdit = (subject) => {
//         setEditSubject(subject);
//         setFormData({ SubjectName: subject.SubjectName, SubjectCode: subject.SubjectCode });
//         setShowForm(true);
//     };

//     const handleAdd = () => {
//         setEditSubject(null);
//         setFormData({ SubjectName: "", SubjectCode: "" });
//         setShowForm(true);
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this subject?")) return;
//         try {
//             await axios.delete(`${API}/subjects/delete/${id}`);
//             onSuccess();
//         } catch (err) {
//             alert(err.response?.data?.message || "Delete failed");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         if (!formData.SubjectName.trim() || !formData.SubjectCode.trim()) {
//             setError("All fields are required.");
//             return;
//         }
//         setLoading(true);
//         try {
//             if (editSubject) {
//                 await axios.put(`${API}/subjects/update/${editSubject._id}`, { SubjectName: formData.SubjectName });
//             } else {
//                 await axios.post(`${API}/subjects/add`, { ...formData, ClassId: classId });
//             }
//             onSuccess();
//             setShowForm(false);
//             setFormData({ SubjectName: "", SubjectCode: "" });
//             setEditSubject(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "Operation failed.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             {/* Existing subjects list */}
//             {subjects.length > 0 ? (
//                 <div style={{ marginBottom: "16px" }}>
//                     {subjects.map(s => (
//                         <div key={s._id} style={{
//                             display: "flex", justifyContent: "space-between",
//                             alignItems: "center", padding: "10px 12px",
//                             border: "1px solid var(--border, #e5e7eb)",
//                             borderRadius: "8px", marginBottom: "8px"
//                         }}>
//                             <div>
//                                 <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.SubjectName}</div>
//                                 <div style={{ fontSize: "12px", color: "#888" }}>{s.SubjectCode}</div>
//                             </div>
//                             <div className="action-btns">
//                                 <button className="btn btn-sm" onClick={() => handleEdit(s)}>Edit</button>
//                                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "16px" }}>No subjects added yet.</p>
//             )}

//             {/* Add/Edit form */}
//             {showForm ? (
//                 <form onSubmit={handleSubmit}>
//                     {error && <div className="alert alert-error" style={{ marginBottom: "12px" }}>⚠ {error}</div>}
//                     <div className="form-group" style={{ marginBottom: "12px" }}>
//                         <label>Subject Name</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Mathematics"
//                             value={formData.SubjectName}
//                             onChange={e => setFormData({ ...formData, SubjectName: e.target.value })}
//                             required autoFocus
//                         />
//                     </div>
//                     <div className="form-group" style={{ marginBottom: "16px" }}>
//                         <label>Subject Code</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. MATH-10"
//                             value={formData.SubjectCode}
//                             disabled={!!editSubject}
//                             onChange={e => setFormData({ ...formData, SubjectCode: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <div className="form-actions">
//                         <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
//                         <button type="submit" className="btn btn-primary" disabled={loading}>
//                             {loading ? "Saving..." : editSubject ? "Update" : "Add Subject"}
//                         </button>
//                     </div>
//                 </form>
//             ) : (
//                 <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleAdd}>
//                     + Add New Subject
//                 </button>
//             )}
//         </div>
//     );
// };

// // ─── Student Subject Manager (inside modal) ───────────────────────────────────
// const StudentSubjectManager = ({ student, classSubjects, onSuccess, onCancel }) => {
//     const [selected, setSelected] = useState(student.Subjects || []);
//     const [customCode, setCustomCode] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [addingCustom, setAddingCustom] = useState(false);

//     const toggleSubject = (code) => {
//         setSelected(prev =>
//             prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
//         );
//     };

//     const handleAddCustom = () => {
//         if (!customCode.trim()) {
//             setError("Subject code is required.");
//             return;
//         }
//         if (selected.includes(customCode.trim())) {
//             setError("Subject already added.");
//             return;
//         }
//         setSelected(prev => [...prev, customCode.trim()]);
//         setCustomCode("");
//         setAddingCustom(false);
//         setError("");
//     };

//     const handleSave = async () => {
//         setError("");
//         setLoading(true);
//         try {
//             await axios.put(`${API}/students/updateSubjects/${student._id}`, {
//                 Subjects: selected
//             });
//             onSuccess();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to update subjects.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
//                 Class: <strong>{student.ClassId}</strong> — select subjects from the list below.
//             </p>

//             {error && <div className="alert alert-error" style={{ marginBottom: "12px" }}>⚠ {error}</div>}

//             {/* Class subjects as checkboxes */}
//             <div style={{ marginBottom: "16px" }}>
//                 {classSubjects.map(s => (
//                     <label key={s._id} style={{
//                         display: "flex", alignItems: "center", gap: "10px",
//                         padding: "10px 12px", marginBottom: "8px",
//                         border: `1px solid ${selected.includes(s.SubjectCode) ? "var(--accent, #2563eb)" : "var(--border, #e5e7eb)"}`,
//                         borderRadius: "8px", cursor: "pointer",
//                         background: selected.includes(s.SubjectCode) ? "var(--accent-light, #eff6ff)" : "transparent"
//                     }}>
//                         <input
//                             type="checkbox"
//                             checked={selected.includes(s.SubjectCode)}
//                             onChange={() => toggleSubject(s.SubjectCode)}
//                         />
//                         <div>
//                             <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.SubjectName}</div>
//                             <div style={{ fontSize: "12px", color: "#888" }}>{s.SubjectCode}</div>
//                         </div>
//                     </label>
//                 ))}
//             </div>

//             {/* Custom subject option */}
//             {addingCustom ? (
//                 <div style={{ border: "1px dashed #ccc", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
//                     <div className="form-group" style={{ marginBottom: "8px" }}>
//                         <label>Subject Code</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. EXTRA-101"
//                             value={customCode}
//                             onChange={e => setCustomCode(e.target.value)}
//                             autoFocus
//                         />
//                     </div>
//                     <div className="form-actions">
//                         <button className="btn btn-sm" onClick={() => setAddingCustom(false)}>Cancel</button>
//                         <button className="btn btn-sm btn-primary" onClick={handleAddCustom}>Add</button>
//                     </div>
//                 </div>
//             ) : (
//                 <button
//                     className="btn btn-sm"
//                     style={{ width: "100%", marginBottom: "16px" }}
//                     onClick={() => setAddingCustom(true)}
//                 >
//                     + Add Custom Subject
//                 </button>
//             )}

//             <div className="form-actions">
//                 <button className="btn" onClick={onCancel}>Cancel</button>
//                 <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
//                     {loading ? "Saving..." : "Save Subjects"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SubjectsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5003/api";

const CLASSES = [
    "Class 1", "Class 2", "Class 3", "Class 4",
    "Class 5", "Class 6", "Class 7", "Class 8",
    "Class 9", "Class 10", "Class 11", "Class 12"
];

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Class subject modal
    const [classModal, setClassModal] = useState(false);
    const [classModalData, setClassModalData] = useState(null); // { classId, editSubject }

    // Student subject modal
    const [studentModal, setStudentModal] = useState(false);
    const [studentModalData, setStudentModalData] = useState(null); // student object

    // Student table filter
    const [selectedClass, setSelectedClass] = useState("All");
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const [subRes, studRes] = await Promise.all([
                axios.get(`${API}/subjects/all`),
                axios.get(`${API}/students/get`)
            ]);
            setSubjects(subRes.data);
            setStudents(studRes.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch data. Check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // ── Class card actions ──
    const openClassModal = (classId, editSubject = null) => {
        setClassModalData({ classId, editSubject });
        setClassModal(true);
    };

    const closeClassModal = () => {
        setClassModal(false);
        setClassModalData(null);
    };

    // ── Student subject actions ──
    const openStudentModal = (student) => {
        setStudentModalData(student);
        setStudentModal(true);
    };

    const closeStudentModal = () => {
        setStudentModal(false);
        setStudentModalData(null);
    };

    // ── Derived data ──
    const getClassSubjects = (classId) => subjects.filter(s => s.ClassId === classId);

    const filteredStudents = students.filter(s => {
        // Updated logic to ensure "All" shows everyone regardless of subject status
        const matchClass = selectedClass === "All" || s.ClassId === selectedClass;
        const matchSearch =
            (s.StudentName?.toLowerCase().includes(search.toLowerCase()) ||
            s.RollId?.toLowerCase().includes(search.toLowerCase()) ||
            s.StudentEmail?.toLowerCase().includes(search.toLowerCase()));
        
        return matchClass && matchSearch;
    });

    const getAvatar = (name) =>
        name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";

    return (
        <div className="results-container">
            <div className="content-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div>
                        <h1>Subjects Management</h1>
                        <p>Manage class subjects and student subject assignments.</p>
                    </div>
                    {/* NEW: Assign Subject Button */}
                    <button className="btn btn-primary" onClick={() => openClassModal("Class 1")}>
                        + Assign Subject
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-error">⚠ {error}</div>}

            {/* ── 12 Class Cards ── */}
            <div className="section-card" style={{ marginBottom: "24px" }}>
                <div className="section-header" style={{ marginBottom: "16px" }}>
                    <h3 className="section-title">Class Subjects</h3>
                    <p className="section-meta">Click Edit to manage subjects for each class</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
                    {CLASSES.map(cls => (
                        <ClassCard
                            key={cls}
                            cls={cls}
                            subjects={getClassSubjects(cls)}
                            onEdit={() => openClassModal(cls)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Students Table ── */}
            <div className="section-card">
                <div className="section-header">
                    <h3 className="section-title">Students & Subject Assignment</h3>
                    <p className="section-meta">{filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} shown</p>
                </div>

                <div className="filter-bar">
                    <input
                        type="text"
                        placeholder="Search by name, roll id, or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                    >
                        <option value="All">All Classes</option>
                        {CLASSES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {search && (
                        <button className="btn btn-sm" onClick={() => setSearch("")}>Clear</button>
                    )}
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Roll ID</th>
                                <th>Class</th>
                                <th>Subjects Assigned</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="table-status-msg">Loading...</td></tr>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map(s => {
                                    const classSubjects = getClassSubjects(s.ClassId);
                                    const assignedSubjects = s.Subjects || [];
                                    return (
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
                                            <td>{s.ClassId || "—"}</td>
                                            <td>
                                                {assignedSubjects.length > 0 ? (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                                        {assignedSubjects.map(code => {
                                                            const sub = subjects.find(su => su.SubjectCode === code);
                                                            return (
                                                                <span key={code} className="pill pill-info" style={{ fontSize: '10px' }}>
                                                                    {sub ? sub.SubjectName : code}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span style={{ color: "#aaa", fontSize: "12px" }}>
                                                        {classSubjects.length === 0
                                                            ? "No subjects in this class"
                                                            : "None assigned"}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => openStudentModal(s)}
                                                    disabled={classSubjects.length === 0}
                                                    title={classSubjects.length === 0 ? "Add subjects to this class first" : "Edit subjects"}
                                                >
                                                    Edit Subjects
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="5" className="table-status-msg">No students found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Class Subject Modal ── */}
            {classModal && classModalData && (
                <Modal title={`Manage Subjects — ${classModalData.classId}`} onClose={closeClassModal}>
                    <ClassSubjectManager
                        classId={classModalData.classId}
                        subjects={getClassSubjects(classModalData.classId)}
                        onSuccess={() => { fetchData(); }}
                        onClose={closeClassModal}
                    />
                </Modal>
            )}

            {/* ── Student Subject Modal ── */}
            {studentModal && studentModalData && (
                <Modal title={`Edit Subjects — ${studentModalData.StudentName}`} onClose={closeStudentModal}>
                    <StudentSubjectManager
                        student={studentModalData}
                        classSubjects={getClassSubjects(studentModalData.ClassId)}
                        onSuccess={() => { fetchData(); closeStudentModal(); }}
                        onCancel={closeStudentModal}
                    />
                </Modal>
            )}
        </div>
    );
};

// ─── Class Card ───────────────────────────────────────────────────────────────
const ClassCard = ({ cls, subjects, onEdit }) => (
    <div style={{
        border: "1px solid var(--border, #e5e7eb)",
        borderRadius: "10px",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        background: "var(--bg-primary, #fff)"
    }}>
        <div style={{ fontWeight: 700, fontSize: "13px" }}>{cls}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>
            {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
        </div>
        <button className="btn btn-sm" style={{ width: "100%", marginTop: "4px" }} onClick={onEdit}>
            Edit
        </button>
    </div>
);

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
    <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center"
    }}>
        <div style={{
            background: "var(--bg-primary, #fff)",
            borderRadius: "12px", padding: "32px",
            width: "100%", maxWidth: "520px",
            maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>
                <button className="btn btn-sm" onClick={onClose}>✕</button>
            </div>
            {children}
        </div>
    </div>
);

// ─── Class Subject Manager (inside modal) ─────────────────────────────────────
const ClassSubjectManager = ({ classId, subjects, onSuccess, onClose }) => {
    const [showForm, setShowForm] = useState(false);
    const [editSubject, setEditSubject] = useState(null);
    const [formData, setFormData] = useState({ SubjectName: "", SubjectCode: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEdit = (subject) => {
        setEditSubject(subject);
        setFormData({ SubjectName: subject.SubjectName, SubjectCode: subject.SubjectCode });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditSubject(null);
        setFormData({ SubjectName: "", SubjectCode: "" });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this subject?")) return;
        try {
            await axios.delete(`${API}/subjects/delete/${id}`);
            onSuccess();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!formData.SubjectName.trim() || !formData.SubjectCode.trim()) {
            setError("All fields are required.");
            return;
        }
        setLoading(true);
        try {
            if (editSubject) {
                await axios.put(`${API}/subjects/update/${editSubject._id}`, { SubjectName: formData.SubjectName });
            } else {
                await axios.post(`${API}/subjects/add`, { ...formData, ClassId: classId });
            }
            onSuccess();
            setShowForm(false);
            setFormData({ SubjectName: "", SubjectCode: "" });
            setEditSubject(null);
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {subjects.length > 0 ? (
                <div style={{ marginBottom: "16px" }}>
                    {subjects.map(s => (
                        <div key={s._id} style={{
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center", padding: "10px 12px",
                            border: "1px solid var(--border, #e5e7eb)",
                            borderRadius: "8px", marginBottom: "8px"
                        }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.SubjectName}</div>
                                <div style={{ fontSize: "12px", color: "#888" }}>{s.SubjectCode}</div>
                            </div>
                            <div className="action-btns">
                                <button className="btn btn-sm" onClick={() => handleEdit(s)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "16px" }}>No subjects added yet.</p>
            )}

            {showForm ? (
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-error" style={{ marginBottom: "12px" }}>⚠ {error}</div>}
                    <div className="form-group" style={{ marginBottom: "12px" }}>
                        <label>Subject Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Mathematics"
                            value={formData.SubjectName}
                            onChange={e => setFormData({ ...formData, SubjectName: e.target.value })}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: "16px" }}>
                        <label>Subject Code</label>
                        <input
                            type="text"
                            placeholder="e.g. MATH-10"
                            value={formData.SubjectCode}
                            disabled={!!editSubject}
                            onChange={e => setFormData({ ...formData, SubjectCode: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Saving..." : editSubject ? "Update" : "Add Subject"}
                        </button>
                    </div>
                </form>
            ) : (
                <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleAdd}>
                    + Add New Subject
                </button>
            )}
        </div>
    );
};

// ─── Student Subject Manager (inside modal) ───────────────────────────────────
const StudentSubjectManager = ({ student, classSubjects, onSuccess, onCancel }) => {
    const [selected, setSelected] = useState(student.Subjects || []);
    const [customCode, setCustomCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addingCustom, setAddingCustom] = useState(false);

    const toggleSubject = (code) => {
        setSelected(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    const handleAddCustom = () => {
        if (!customCode.trim()) {
            setError("Subject code is required.");
            return;
        }
        if (selected.includes(customCode.trim())) {
            setError("Subject already added.");
            return;
        }
        setSelected(prev => [...prev, customCode.trim()]);
        setCustomCode("");
        setAddingCustom(false);
        setError("");
    };

    const handleSave = async () => {
        setError("");
        setLoading(true);
        try {
            await axios.put(`${API}/students/updateSubjects/${student._id}`, {
                Subjects: selected
            });
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update subjects.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                Class: <strong>{student.ClassId}</strong> — select subjects from the list below.
            </p>

            {error && <div className="alert alert-error" style={{ marginBottom: "12px" }}>⚠ {error}</div>}

            <div style={{ marginBottom: "16px" }}>
                {classSubjects.map(s => (
                    <label key={s._id} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 12px", marginBottom: "8px",
                        border: `1px solid ${selected.includes(s.SubjectCode) ? "var(--accent, #2563eb)" : "var(--border, #e5e7eb)"}`,
                        borderRadius: "8px", cursor: "pointer",
                        background: selected.includes(s.SubjectCode) ? "var(--accent-light, #eff6ff)" : "transparent"
                    }}>
                        <input
                            type="checkbox"
                            checked={selected.includes(s.SubjectCode)}
                            onChange={() => toggleSubject(s.SubjectCode)}
                        />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.SubjectName}</div>
                            <div style={{ fontSize: "12px", color: "#888" }}>{s.SubjectCode}</div>
                        </div>
                    </label>
                ))}
            </div>

            {addingCustom ? (
                <div style={{ border: "1px dashed #ccc", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
                    <div className="form-group" style={{ marginBottom: "8px" }}>
                        <label>Subject Code</label>
                        <input
                            type="text"
                            placeholder="e.g. EXTRA-101"
                            value={customCode}
                            onChange={e => setCustomCode(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="form-actions">
                        <button className="btn btn-sm" onClick={() => setAddingCustom(false)}>Cancel</button>
                        <button className="btn btn-sm btn-primary" onClick={handleAddCustom}>Add</button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-sm"
                    style={{ width: "100%", marginBottom: "16px" }}
                    onClick={() => setAddingCustom(true)}
                >
                    + Add Custom Subject
                </button>
            )}

            <div className="form-actions">
                <button className="btn" onClick={onCancel}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Subjects"}
                </button>
            </div>
        </div>
    );
};

export default SubjectsPage;