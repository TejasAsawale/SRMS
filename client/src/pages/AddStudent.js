// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CLASSES = [
//     "Class 1", "Class 2", "Class 3", "Class 4",
//     "Class 5", "Class 6", "Class 7", "Class 8",
//     "Class 9", "Class 10", "Class 11", "Class 12"
// ];

// const AddStudent = ({ setActivePage, editData, setEditingStudent }) => {
//     const [formData, setFormData] = useState({
//         StudentName: "",
//         RollId: "",
//         StudentEmail: "",
//         Password: "",
//         Gender: "",
//         DOB: "",
//         ClassId: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (editData) {
//             setFormData({
//                 StudentName: editData.StudentName || "",
//                 RollId: editData.RollId || "",
//                 StudentEmail: editData.StudentEmail || "",
//                 Password: "",
//                 Gender: editData.Gender || "",
//                 DOB: editData.DOB ? editData.DOB.split('T')[0] : "",
//                 ClassId: editData.ClassId || ""
//             });
//         }
//     }, [editData]);

//     const handleChange = (e) => {
//         setError('');
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//         if (editData) {
//             const res = await axios.put(`http://localhost:5003/api/students/update/${editData._id}`, formData);
//             if (res.data.success) {
//                 setEditingStudent(null);
//                 setActivePage("students");
//             }
//         } else {
//             const res = await axios.post("http://localhost:5003/api/students/addStudent", formData);
//             if (res.data.success) {
//                 setEditingStudent(null);
//                 setActivePage("students");
//             }
//         }
//     } catch (err) {
//         setError(err.response?.data?.message || "Server error. Please try again.");
//     } finally {
//         setLoading(false);
//     }
// };

//     return (
//         <div className="section-card">
//             <div className="section-header">
//                 <div>
//                     <h3 className="section-title">
//                         {editData ? "Edit Student Details" : "New Student Admission"}
//                     </h3>
//                     <p className="section-meta">
//                         {editData ? "Update existing information for this student." : "Complete the form below to register a student."}
//                     </p>
//                 </div>
//                 <button
//                     className="btn btn-sm"
//                     type="button"
//                     onClick={() => { setEditingStudent(null); setActivePage("students"); }}
//                 >
//                     ← Cancel & Return
//                 </button>
//             </div>

//             <div className="form-section">
//                 {error && (
//                     <div className="alert alert-error">
//                         <span>⚠</span> {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <div className="form-grid">
//                         <div className="form-group">
//                             <label>Full Name</label>
//                             <input
//                                 name="StudentName"
//                                 type="text"
//                                 value={formData.StudentName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Roll ID</label>
//                             <input
//                                 name="RollId"
//                                 type="text"
//                                 value={formData.RollId}
//                                 disabled={!!editData}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Email Address</label>
//                             <input
//                                 name="StudentEmail"
//                                 type="email"
//                                 value={formData.StudentEmail}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>System Password</label>
//                             <input
//                                 name="Password"
//                                 type="password"
//                                 value={formData.Password}
//                                 placeholder={editData ? "Leave blank to keep current" : "Create a password"}
//                                 onChange={handleChange}
//                                 required={!editData}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Gender</label>
//                             <select name="Gender" value={formData.Gender} onChange={handleChange} required>
//                                 <option value="">Select Gender</option>
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="Other">Other</option>
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label>Date of Birth</label>
//                             <input
//                                 name="DOB"
//                                 type="date"
//                                 value={formData.DOB}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group full-width">
//                             <label>Assigned Class</label>
//                             <select
//                                 name="ClassId"
//                                 value={formData.ClassId}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">-- Select Class --</option>
//                                 {CLASSES.map(c => (
//                                     <option key={c} value={c}>{c}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="form-actions">
//                         <button
//                             type="button"
//                             className="btn btn-cancel"
//                             onClick={() => { setEditingStudent(null); setActivePage("students"); }}
//                         >
//                             Cancel
//                         </button>
//                         <button type="submit" className="btn btn-primary" disabled={loading}>
//                             {loading ? 'Processing...' : (editData ? "Update Student" : "Confirm & Register Student")}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddStudent;

import React, { useState, useEffect } from "react";
import axios from "axios";

const CLASSES = [
    "Class 1", "Class 2", "Class 3", "Class 4",
    "Class 5", "Class 6", "Class 7", "Class 8",
    "Class 9", "Class 10", "Class 11", "Class 12"
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const AddStudentSkeleton = () => (
    <div className="section-card">
        <div className="section-header">
            <div>
                <div className="skeleton skeleton-title" style={{ width: "40%" }} />
                <div className="skeleton skeleton-text" style={{ width: "60%", marginTop: 6 }} />
            </div>
            <div className="skeleton skeleton-btn" style={{ width: 120 }} />
        </div>
        <div className="form-section">
            <div className="form-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div className="form-group" key={i}>
                        <div className="skeleton skeleton-label" style={{ width: "40%" }} />
                        <div className="skeleton" style={{ height: 38, borderRadius: "var(--radius-sm)" }} />
                    </div>
                ))}
                <div className="form-group full-width">
                    <div className="skeleton skeleton-label" style={{ width: "30%" }} />
                    <div className="skeleton" style={{ height: 38, borderRadius: "var(--radius-sm)" }} />
                </div>
            </div>
        </div>
        <div className="form-actions">
            <div className="skeleton skeleton-btn" style={{ width: 80 }} />
            <div className="skeleton skeleton-btn" style={{ width: 160 }} />
        </div>
    </div>
);

// ─── Add Student ──────────────────────────────────────────────────────────────
const AddStudent = ({ setActivePage, editData, setEditingStudent }) => {
    const [formData, setFormData] = useState({
        StudentName: "",
        RollId: "",
        StudentEmail: "",
        Password: "",
        Gender: "",
        DOB: "",
        ClassId: ""
    });
    const [loading, setLoading]   = useState(false);
    const [initReady, setInitReady] = useState(false);
    const [error, setError]       = useState("");

    useEffect(() => {
        if (editData) {
            setFormData({
                StudentName:  editData.StudentName  || "",
                RollId:       editData.RollId       || "",
                StudentEmail: editData.StudentEmail || "",
                Password:     "",
                Gender:       editData.Gender       || "",
                DOB:          editData.DOB ? editData.DOB.split("T")[0] : "",
                ClassId:      editData.ClassId      || ""
            });
        }
        // Small delay to show skeleton on first render
        const t = setTimeout(() => setInitReady(true), 400);
        return () => clearTimeout(t);
    }, [editData]);

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (editData) {
                const res = await axios.put(
                    `http://localhost:5003/api/students/update/${editData._id}`,
                    formData
                );
                if (res.data.success) {
                    setEditingStudent(null);
                    setActivePage("students");
                }
            } else {
                const res = await axios.post(
                    "http://localhost:5003/api/students/addStudent",
                    formData
                );
                if (res.data.success) {
                    setEditingStudent(null);
                    setActivePage("students");
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!initReady) return <AddStudentSkeleton />;

    return (
        <div className="section-card">
            <div className="section-header">
                <div>
                    <h3 className="section-title">
                        {editData ? "Edit Student Details" : "New Student Admission"}
                    </h3>
                    <p className="section-meta">
                        {editData
                            ? "Update existing information for this student."
                            : "Complete the form below to register a student."}
                    </p>
                </div>
                <button
                    className="btn btn-sm"
                    type="button"
                    onClick={() => { setEditingStudent(null); setActivePage("students"); }}
                >
                    ← Cancel & Return
                </button>
            </div>

            <div className="form-section">
                {error && (
                    <div className="alert alert-error">
                        <span>⚠</span> {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                name="StudentName"
                                type="text"
                                value={formData.StudentName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Roll ID</label>
                            <input
                                name="RollId"
                                type="text"
                                value={formData.RollId}
                                disabled={!!editData}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                name="StudentEmail"
                                type="email"
                                value={formData.StudentEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>System Password</label>
                            <input
                                name="Password"
                                type="password"
                                value={formData.Password}
                                placeholder={editData ? "Leave blank to keep current" : "Create a password"}
                                onChange={handleChange}
                                required={!editData}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="Gender" value={formData.Gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                name="DOB"
                                type="date"
                                value={formData.DOB}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Assigned Class</label>
                            <select
                                name="ClassId"
                                value={formData.ClassId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Class --</option>
                                {CLASSES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={() => { setEditingStudent(null); setActivePage("students"); }}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Processing..." : editData ? "Update Student" : "Confirm & Register Student"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;