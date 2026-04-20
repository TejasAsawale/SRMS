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

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalClass, setModalClass] = useState("");
    const [editData, setEditData] = useState(null);

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
            console.error("Fetch error:", err);
            setError("Failed to fetch data. Check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDeleteSubject = async (id) => {
        if (!window.confirm("Delete this subject permanently?")) return;
        try {
            await axios.delete(`${API}/subjects/delete/${id}`);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const openAddModal = (classId) => {
        setEditData(null);
        setModalClass(classId);
        setModalOpen(true);
    };

    const openEditModal = (subject) => {
        setEditData(subject);
        setModalClass(subject.ClassId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditData(null);
        setModalClass("");
    };

    const handleModalSuccess = () => {
        closeModal();
        fetchData();
    };

    // Group subjects by class
    const subjectsByClass = CLASSES.reduce((acc, cls) => {
        const classSubjects = subjects.filter(s => s.ClassId === cls);
        const classStudents = students.filter(s => s.ClassId === cls);
        if (classSubjects.length > 0 || classStudents.length > 0) {
            acc[cls] = { subjects: classSubjects, students: classStudents };
        }
        return acc;
    }, {});

    const activeClasses = Object.keys(subjectsByClass);

    return (
        <div className="results-container">
            <div className="content-header">
                <h1>Subjects Management</h1>
                <p>Manage subjects and students for each class.</p>
            </div>

            {error && <div className="alert alert-error">⚠ {error}</div>}

            {/* ── Quick Add buttons for all classes ── */}
            <div className="section-card" style={{ marginBottom: "24px" }}>
                <div className="section-header">
                    <h3 className="section-title">Add Subject to a Class</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "12px 0" }}>
                    {CLASSES.map(cls => (
                        <button
                            key={cls}
                            className="btn btn-sm"
                            onClick={() => openAddModal(cls)}
                        >
                            + {cls}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Class Cards ── */}
            {loading ? (
                <div className="section-card">
                    <p className="table-status-msg">Loading...</p>
                </div>
            ) : activeClasses.length === 0 ? (
                <div className="section-card">
                    <p className="table-status-msg">No subjects added yet. Use the buttons above to get started.</p>
                </div>
            ) : (
                activeClasses.map(cls => {
                    const { subjects: clsSubjects, students: clsStudents } = subjectsByClass[cls];
                    return (
                        <div key={cls} className="section-card" style={{ marginBottom: "24px" }}>
                            {/* Card Header */}
                            <div className="section-header">
                                <div>
                                    <h3 className="section-title">{cls}</h3>
                                    <p className="section-meta">
                                        {clsSubjects.length} subject{clsSubjects.length !== 1 ? "s" : ""} &nbsp;·&nbsp;
                                        {clsStudents.length} student{clsStudents.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => openAddModal(cls)}
                                >
                                    + Add Subject
                                </button>
                            </div>

                            {/* Subjects Table */}
                            <div style={{ marginBottom: "16px" }}>
                                <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Subjects</p>
                                <div className="table-wrapper">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Subject Name</th>
                                                <th>Subject Code</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clsSubjects.length > 0 ? (
                                                clsSubjects.map(s => (
                                                    <tr key={s._id}>
                                                        <td><strong>{s.SubjectName}</strong></td>
                                                        <td>{s.SubjectCode}</td>
                                                        <td>
                                                            <div className="action-btns">
                                                                <button className="btn btn-sm" onClick={() => openEditModal(s)}>Edit</button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSubject(s._id)}>Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3" className="table-status-msg">No subjects added yet.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Students in this class */}
                            {clsStudents.length > 0 && (
                                <div>
                                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Enrolled Students</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {clsStudents.map(s => (
                                            <div key={s._id} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "6px 12px",
                                                background: "var(--bg-secondary, #f5f5f5)",
                                                borderRadius: "20px",
                                                fontSize: "13px"
                                            }}>
                                                <div className="avatar av-blue" style={{ width: "24px", height: "24px", fontSize: "10px" }}>
                                                    {s.StudentName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                                </div>
                                                <span>{s.StudentName}</span>
                                                <span style={{ color: "#888", fontSize: "11px" }}>{s.RollId}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}

            {/* ── Add/Edit Modal ── */}
            {modalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.5)", zIndex: 1000,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{
                        background: "var(--bg-primary, #fff)",
                        borderRadius: "12px", padding: "32px",
                        width: "100%", maxWidth: "480px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                            <h3 style={{ margin: 0 }}>
                                {editData ? `Edit Subject — ${modalClass}` : `Add Subject — ${modalClass}`}
                            </h3>
                            <button className="btn btn-sm" onClick={closeModal}>✕</button>
                        </div>

                        <SubjectForm
                            editData={editData}
                            classId={modalClass}
                            onSuccess={handleModalSuccess}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Subject Form (used inside modal) ────────────────────────────────────────
const SubjectForm = ({ editData, classId, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        SubjectName: "",
        SubjectCode: "",
        ClassId: classId
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                SubjectName: editData.SubjectName,
                SubjectCode: editData.SubjectCode,
                ClassId: editData.ClassId
            });
        } else {
            setFormData({ SubjectName: "", SubjectCode: "", ClassId: classId });
        }
    }, [editData, classId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.SubjectName.trim() || !formData.SubjectCode.trim()) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            if (editData) {
                await axios.put(`${API}/subjects/update/${editData._id}`, {
                    SubjectName: formData.SubjectName
                });
            } else {
                await axios.post(`${API}/subjects/add`, formData);
            }
            onSuccess();
        } catch (err) {
            const msg = err.response?.data?.message || "Operation failed.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-error" style={{ marginBottom: "16px" }}>⚠ {error}</div>}

            <div className="form-group" style={{ marginBottom: "16px" }}>
                <label>Class</label>
                <input type="text" value={classId} disabled style={{ background: "#f5f5f5" }} />
            </div>

            <div className="form-group" style={{ marginBottom: "16px" }}>
                <label>Subject Name</label>
                <input
                    type="text"
                    placeholder="e.g. Mathematics Part 1"
                    value={formData.SubjectName}
                    onChange={e => setFormData({ ...formData, SubjectName: e.target.value })}
                    required
                    autoFocus
                />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
                <label>Subject Code</label>
                <input
                    type="text"
                    placeholder="e.g. MATH-10-1"
                    value={formData.SubjectCode}
                    disabled={!!editData}
                    onChange={e => setFormData({ ...formData, SubjectCode: e.target.value })}
                    required
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Processing..." : editData ? "Update Subject" : "Add Subject"}
                </button>
            </div>
        </form>
    );
};

export default SubjectsPage;
