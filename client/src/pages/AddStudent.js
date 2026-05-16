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