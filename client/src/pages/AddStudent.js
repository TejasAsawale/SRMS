// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CLASSES = [
//     "Class 1", "Class 2", "Class 3", "Class 4",
//     "Class 5", "Class 6", "Class 7", "Class 8",
//     "Class 9", "Class 10", "Class 11", "Class 12"
// ];

// // ─── Skeleton ─────────────────────────────────────────────────────────────────
// const AddStudentSkeleton = () => (
//     <div className="section-card">
//         <div className="section-header">
//             <div>
//                 <div className="skeleton skeleton-title" style={{ width: "40%" }} />
//                 <div className="skeleton skeleton-text" style={{ width: "60%", marginTop: 6 }} />
//             </div>
//             <div className="skeleton skeleton-btn" style={{ width: 120 }} />
//         </div>
//         <div className="form-section">
//             <div className="form-grid">
//                 {[1, 2, 3, 4, 5, 6].map(i => (
//                     <div className="form-group" key={i}>
//                         <div className="skeleton skeleton-label" style={{ width: "40%" }} />
//                         <div className="skeleton" style={{ height: 38, borderRadius: "var(--radius-sm)" }} />
//                     </div>
//                 ))}
//                 <div className="form-group full-width">
//                     <div className="skeleton skeleton-label" style={{ width: "30%" }} />
//                     <div className="skeleton" style={{ height: 38, borderRadius: "var(--radius-sm)" }} />
//                 </div>
//             </div>
//         </div>
//         <div className="form-actions">
//             <div className="skeleton skeleton-btn" style={{ width: 80 }} />
//             <div className="skeleton skeleton-btn" style={{ width: 160 }} />
//         </div>
//     </div>
// );

// // ─── Add Student ──────────────────────────────────────────────────────────────
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
//     const [loading, setLoading]   = useState(false);
//     const [initReady, setInitReady] = useState(false);
//     const [error, setError]       = useState("");

//     useEffect(() => {
//         if (editData) {
//             setFormData({
//                 StudentName:  editData.StudentName  || "",
//                 RollId:       editData.RollId       || "",
//                 StudentEmail: editData.StudentEmail || "",
//                 Password:     "",
//                 Gender:       editData.Gender       || "",
//                 DOB:          editData.DOB ? editData.DOB.split("T")[0] : "",
//                 ClassId:      editData.ClassId      || ""
//             });
//         }
//         // Small delay to show skeleton on first render
//         const t = setTimeout(() => setInitReady(true), 400);
//         return () => clearTimeout(t);
//     }, [editData]);

//     const handleChange = (e) => {
//         setError("");
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try {
//             if (editData) {
//                 const res = await axios.put(
//                     `http://localhost:5003/api/students/update/${editData._id}`,
//                     formData
//                 );
//                 if (res.data.success) {
//                     setEditingStudent(null);
//                     setActivePage("students");
//                 }
//             } else {
//                 const res = await axios.post(
//                     "http://localhost:5003/api/students/addStudent",
//                     formData
//                 );
//                 if (res.data.success) {
//                     setEditingStudent(null);
//                     setActivePage("students");
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Server error. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!initReady) return <AddStudentSkeleton />;

//     return (
//         <div className="section-card">
//             <div className="section-header">
//                 <div>
//                     <h3 className="section-title">
//                         {editData ? "Edit Student Details" : "New Student Admission"}
//                     </h3>
//                     <p className="section-meta">
//                         {editData
//                             ? "Update existing information for this student."
//                             : "Complete the form below to register a student."}
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
//                             {loading ? "Processing..." : editData ? "Update Student" : "Confirm & Register Student"}
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

const API = "http://localhost:5003/api";

const CLASS_OPTIONS = [
    "Class 1", "Class 2", "Class 3", "Class 4",
    "Class 5", "Class 6", "Class 7", "Class 8",
    "Class 9", "Class 10", "Class 11", "Class 12",
];

const AddStudent = ({ setActivePage, editData, setEditingStudent }) => {
    const isEditing = !!editData;

    const [formData, setFormData] = useState({
        StudentName:  "",
        StudentEmail: "",
        Password:     "",
        Gender:       "Select",
        DOB:          "",
        ClassId:      "",
        Status:       1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (editData) {
            setFormData({
                StudentName:  editData.StudentName  || "",
                StudentEmail: editData.StudentEmail || "",
                Password:     "",
                Gender:       editData.Gender       || "Select",
                DOB:          editData.DOB          || "",
                ClassId:      editData.ClassId      || "",
                Status:       editData.Status       ?? 1,
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (formData.Gender === "Select") {
            setError("Please select a gender.");
            setLoading(false);
            return;
        }

        try {
            if (isEditing) {
                const payload = { ...formData };
                if (!payload.Password.trim()) delete payload.Password;
                await axios.put(`${API}/students/update/${editData._id}`, payload);
                setSuccess("Student updated successfully!");
                setTimeout(() => {
                    setEditingStudent(null);
                    setActivePage("students");
                }, 1200);
            } else {
                // Do NOT send RollId — backend auto-generates it
                await axios.post(`${API}/students/addStudent`, formData);
                setSuccess("Student added successfully! Roll ID auto-assigned.");
                setFormData({
                    StudentName:  "",
                    StudentEmail: "",
                    Password:     "",
                    Gender:       "Select",
                    DOB:          "",
                    ClassId:      "",
                    Status:       1,
                });
                setTimeout(() => setActivePage("students"), 1500);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingStudent?.(null);
        setActivePage("students");
    };

    return (
        <>
            <div className="content-header">
                <h1>{isEditing ? "Edit Student" : "Add New Student"}</h1>
                <p>
                    {isEditing
                        ? "Update the student's information below."
                        : "Fill in the details below. Roll ID will be auto-assigned based on class."}
                </p>
            </div>

            <div className="section-card">
                <div className="section-header">
                    <div>
                        <div className="section-title">
                            {isEditing ? "Student Information" : "Admission Form"}
                        </div>
                        <div className="section-meta">
                            {isEditing
                                ? `Editing: ${editData.StudentName} · Roll ID: ${editData.RollId}`
                                : "Roll ID is automatically generated when you select a class."}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        {error && (
                            <div className="alert alert-error" style={{ marginBottom: 18 }}>
                                ✕ {error}
                            </div>
                        )}
                        {success && (
                            <div className="alert alert-success" style={{ marginBottom: 18 }}>
                                ✓ {success}
                            </div>
                        )}

                        <div className="form-grid">
                            {/* Student Name */}
                            <div className="form-group">
                                <label>Student Name <span style={{ color: "#f87171" }}>*</span></label>
                                <input
                                    type="text"
                                    name="StudentName"
                                    placeholder="e.g. Abc Abc"
                                    value={formData.StudentName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label>Email Address <span style={{ color: "#f87171" }}>*</span></label>
                                <input
                                    type="email"
                                    name="StudentEmail"
                                    placeholder="e.g. abc@school.com"
                                    value={formData.StudentEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label>
                                    Password{" "}
                                    {isEditing ? (
                                        <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                                            (leave blank to keep current)
                                        </span>
                                    ) : (
                                        <span style={{ color: "#f87171" }}>*</span>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    name="Password"
                                    placeholder={isEditing ? "Leave blank to keep current" : "Set a password"}
                                    value={formData.Password}
                                    onChange={handleChange}
                                    required={!isEditing}
                                />
                            </div>

                            {/* Class — static list */}
                            <div className="form-group">
                                <label>Class <span style={{ color: "#f87171" }}>*</span></label>
                                <select
                                    name="ClassId"
                                    value={formData.ClassId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Select Class --</option>
                                    {CLASS_OPTIONS.map((cls) => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Gender */}
                            <div className="form-group">
                                <label>Gender <span style={{ color: "#f87171" }}>*</span></label>
                                <select
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Select">-- Select Gender --</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* DOB */}
                            <div className="form-group">
                                <label>Date of Birth <span style={{ color: "#f87171" }}>*</span></label>
                                <input
                                    type="date"
                                    name="DOB"
                                    value={formData.DOB}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Status — edit mode only */}
                            {isEditing && (
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="Status"
                                        value={formData.Status}
                                        onChange={handleChange}
                                    >
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>
                            )}

                            {/* Auto RollId preview — add mode only */}
                            {!isEditing && (
                                <div className="form-group">
                                    <label>Roll ID</label>
                                    <input
                                        type="text"
                                        value={
                                            formData.ClassId
                                                ? `Auto-assigned (${formData.ClassId}-001, 002…)`
                                                : "Select a class first"
                                        }
                                        disabled
                                        style={{ opacity: 0.5, fontStyle: "italic" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading
                                ? isEditing ? "Updating..." : "Adding..."
                                : isEditing ? "Update Student" : "Add Student"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddStudent;