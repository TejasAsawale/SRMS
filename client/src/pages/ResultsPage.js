// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:5003/api";

// const ResultsPage = () => {
//     const [activeTab, setActiveTab] = useState("view");
//     const [editData, setEditData] = useState(null);

//     const handleEditInitiate = (result) => {
//         setEditData(result);
//         setActiveTab("add");
//     };

//     return (
//         <div className="results-container">
//             <div className="content-header">
//                 <h1>Results Management</h1>
//                 <p>Declare, update, and manage student exam scores.</p>
//             </div>

//             <div className="tab-bar">
//                 <button
//                     className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
//                     onClick={() => { setActiveTab("view"); setEditData(null); }}
//                 >
//                     View Results
//                 </button>
//                 <button
//                     className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
//                     onClick={() => setActiveTab("add")}
//                 >
//                     {editData ? "Update Result" : "Declare Result"}
//                 </button>
//             </div>

//             {activeTab === "view" && <ViewResultsTab onEdit={handleEditInitiate} />}
//             {activeTab === "add" && (
//                 <AddResultTab 
//                     editData={editData} 
//                     onSuccess={() => { setEditData(null); setActiveTab("view"); }} 
//                 />
//             )}
//         </div>
//     );
// };

// const ViewResultsTab = ({ onEdit }) => {
//     const [allResults, setAllResults] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [searchRollId, setSearchRollId] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // const fetchData = async () => {
//     //     try {
//     //         setLoading(true);
//     //         const [studRes, subRes, resData] = await Promise.all([
//     //             axios.get(`${API}/students/get`),
//     //             axios.get(`${API}/subjects/get`),
//     //             axios.get(`${API}/results/all`)
//     //         ]);
            
//     //         setStudents(studRes.data);
//     //         setSubjects(subRes.data);
            
//     //         // Check if backend returned success and has the 'data' array
//     //         if (resData.data && resData.data.success) {
//     //             setAllResults(resData.data.data || []);
//     //         } else {
//     //             setAllResults([]);
//     //         }
//     //         setError("");
//     //     } catch (err) {
//     //         console.error("Fetch error:", err);
//     //         setError("Failed to fetch data. Check if server is running on port 5003.");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const fetchData = async () => {
//     try {
//         setLoading(true);
//         const [studRes, subRes, resData] = await Promise.all([
//             axios.get(`${API}/students/get`),
//             axios.get(`${API}/subjects/get`),
//             axios.get(`${API}/results/all`)
//         ]);
        
//         // Log this to your browser console (F12) to see the magic
//         console.log("Response from server:", resData.data);

//         setStudents(studRes.data);
//         setSubjects(subRes.data);

//         // FIX: Access the 'data' array inside the backend response
//         if (resData.data && resData.data.success === true) {
//             setAllResults(resData.data.data); // This targets the array you just pasted
//         }
        
//         setError("");
//     } catch (err) {
//         console.error("Frontend Fetch Error:", err);
//         setError("Failed to sync with API. Check CORS settings in backend.");
//     } finally {
//         setLoading(false);
//     }
// };

//     useEffect(() => { fetchData(); }, []);

//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this result permanently?")) return;
//         try {
//             await axios.delete(`${API}/results/delete/${id}`);
//             fetchData();
//         } catch (err) { 
//             alert(err.response?.data?.message || "Delete failed"); 
//         }
//     };

//     const getStudentName = (rollId) => students.find(s => s.RollId === rollId)?.StudentName || "Unknown Student";
//     const getSubjectName = (code) => subjects.find(s => s.SubjectCode === code)?.SubjectName || code;

//     const filteredResults = allResults.filter(r => 
//         r.RollId?.toLowerCase().includes(searchRollId.toLowerCase())
//     );

//     return (
//         <div className="section-card">
//             {error && <div className="alert alert-error">⚠ {error}</div>}
            
//             <div className="filter-bar">
//                 <input
//                     type="text"
//                     placeholder="Search by Roll ID..."
//                     value={searchRollId}
//                     onChange={(e) => setSearchRollId(e.target.value)}
//                 />
//             </div>

//             <div className="table-wrapper">
//                 <table className="data-table">
//                     <thead>
//                         <tr>
//                             <th>Student</th>
//                             <th>Roll ID</th>
//                             <th>Subject</th>
//                             <th>Marks</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             <tr><td colSpan="5">Loading results...</td></tr>
//                         ) : filteredResults.length > 0 ? (
//                             filteredResults.map((r) => (
//                                 <tr key={r._id}>
//                                     <td>{getStudentName(r.RollId)}</td>
//                                     <td>{r.RollId}</td>
//                                     <td>{getSubjectName(r.SubjectCode)}</td>
//                                     <td><strong>{r.Marks}</strong></td>
//                                     <td>
//                                         <button className="btn btn-sm" onClick={() => onEdit(r)}>Edit</button>
//                                         <button className="btn btn-sm btn-danger" style={{marginLeft: '8px'}} onClick={() => handleDelete(r._id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr><td colSpan="5">No results found.</td></tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const AddResultTab = ({ editData, onSuccess }) => {
//     const [students, setStudents] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({ RollId: "", SubjectCode: "", Marks: "" });

//     useEffect(() => {
//         const loadDropdowns = async () => {
//             try {
//                 const [st, sub] = await Promise.all([
//                     axios.get(`${API}/students/get`),
//                     axios.get(`${API}/subjects/get`)
//                 ]);
//                 setStudents(st.data);
//                 setSubjects(sub.data);
//             } catch (err) {
//                 console.error("Error loading dropdowns", err);
//             }
//         };
//         loadDropdowns();
        
//         if (editData) {
//             setFormData({ 
//                 RollId: editData.RollId, 
//                 SubjectCode: editData.SubjectCode, 
//                 Marks: editData.Marks 
//             });
//         }
//     }, [editData]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Prepare payload: Ensure Marks is a Number for the Backend
//         const payload = {
//             ...formData,
//             Marks: Number(formData.Marks)
//         };

//         try {
//             if (editData) {
//                 await axios.put(`${API}/results/update/${editData._id}`, payload);
//             } else {
//                 await axios.post(`${API}/results/addResult`, payload);
//             }
//             onSuccess();
//         } catch (err) { 
//             alert(err.response?.data?.message || "Operation failed. Check console."); 
//             console.error("Submission error:", err.response || err);
//         } finally { 
//             setLoading(false); 
//         }
//     };

//     return (
//         <div className="section-card">
//             <h3>{editData ? "Update Marks" : "Declare New Result"}</h3>
//             <form onSubmit={handleSubmit} className="form-grid">
//                 <div className="form-group">
//                     <label>Student</label>
//                     <select 
//                         value={formData.RollId} 
//                         disabled={!!editData} 
//                         onChange={e => setFormData({...formData, RollId: e.target.value})}
//                         required
//                     >
//                         <option value="">--Select Student--</option>
//                         {students.map(s => <option key={s._id} value={s.RollId}>{s.StudentName} ({s.RollId})</option>)}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>Subject</label>
//                     <select 
//                         value={formData.SubjectCode} 
//                         disabled={!!editData} 
//                         onChange={e => setFormData({...formData, SubjectCode: e.target.value})}
//                         required
//                     >
//                         <option value="">--Select Subject--</option>
//                         {subjects.map(s => <option key={s._id} value={s.SubjectCode}>{s.SubjectName}</option>)}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>Marks (0-100)</label>
//                     <input 
//                         type="number" 
//                         value={formData.Marks} 
//                         onChange={e => setFormData({...formData, Marks: e.target.value})} 
//                         required 
//                         min="0" 
//                         max="100" 
//                     />
//                 </div>
//                 <div style={{marginTop: '20px'}}>
//                     <button type="submit" className="btn btn-primary" disabled={loading}>
//                         {loading ? "Processing..." : "Save Result"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ResultsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5003/api";

const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [editData, setEditData] = useState(null);

    const handleEditInitiate = (result) => {
        setEditData(result);
        setActiveTab("add");
    };

    return (
        <div className="results-container">
            <div className="content-header">
                <h1>Results Management</h1>
                <p>Declare, update, and manage student exam scores.</p>
            </div>

            <div className="tab-bar">
                <button
                    className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
                    onClick={() => { setActiveTab("view"); setEditData(null); }}
                >
                    View Results
                </button>
                <button
                    className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
                    onClick={() => setActiveTab("add")}
                >
                    {editData ? "Update Result" : "Declare Result"}
                </button>
            </div>

            {activeTab === "view" && <ViewResultsTab onEdit={handleEditInitiate} />}
            {activeTab === "add" && (
                <AddResultTab
                    editData={editData}
                    onSuccess={() => { setEditData(null); setActiveTab("view"); }}
                />
            )}
        </div>
    );
};

// ─── View Results Tab ─────────────────────────────────────────────────────────
const ViewResultsTab = ({ onEdit }) => {
    const [allResults, setAllResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchRollId, setSearchRollId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const [studRes, subRes, resData] = await Promise.all([
                axios.get(`${API}/students/get`),
                axios.get(`${API}/subjects/all`),
                axios.get(`${API}/results/all`)
            ]);

            setStudents(studRes.data);
            setSubjects(subRes.data);

            if (resData.data && resData.data.success === true) {
                setAllResults(resData.data.data);
            } else {
                setAllResults([]);
            }

            setError("");
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch data. Check if server is running on port 5003.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this result permanently?")) return;
        try {
            await axios.delete(`${API}/results/delete/${id}`);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const getStudentName = (rollId) =>
        students.find(s => s.RollId === rollId)?.StudentName || "Unknown Student";

    const getSubjectName = (code) =>
        subjects.find(s => s.SubjectCode === code)?.SubjectName || code;

    const getStudentClass = (rollId) =>
        students.find(s => s.RollId === rollId)?.ClassId || "";

    const filteredResults = allResults.filter(r =>
        r.RollId?.toLowerCase().includes(searchRollId.toLowerCase())
    );

    return (
        <div className="section-card">
            {error && <div className="alert alert-error">⚠ {error}</div>}

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by Roll ID..."
                    value={searchRollId}
                    onChange={(e) => setSearchRollId(e.target.value)}
                />
                {searchRollId && (
                    <button className="btn btn-sm" onClick={() => setSearchRollId("")}>Clear</button>
                )}
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Roll ID</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="table-status-msg">Loading results...</td></tr>
                        ) : filteredResults.length > 0 ? (
                            filteredResults.map((r) => (
                                <tr key={r._id}>
                                    <td>{getStudentName(r.RollId)}</td>
                                    <td>{r.RollId}</td>
                                    <td>{getStudentClass(r.RollId)}</td>
                                    <td>{getSubjectName(r.SubjectCode)}</td>
                                    <td><strong>{r.Marks}</strong></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn btn-sm" onClick={() => onEdit(r)}>Edit</button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(r._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="table-status-msg">No results found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─── Add / Edit Result Tab ────────────────────────────────────────────────────
const AddResultTab = ({ editData, onSuccess }) => {
    const [students, setStudents] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ RollId: "", SubjectCode: "", Marks: "" });

    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [st, sub] = await Promise.all([
                    axios.get(`${API}/students/get`),
                    axios.get(`${API}/subjects/all`)
                ]);
                setStudents(st.data);
                setAllSubjects(sub.data);
            } catch (err) {
                console.error("Error loading dropdowns", err);
                setError("Failed to load students or subjects.");
            }
        };
        loadDropdowns();

        if (editData) {
            setFormData({
                RollId: editData.RollId,
                SubjectCode: editData.SubjectCode,
                Marks: editData.Marks
            });
        } else {
            setFormData({ RollId: "", SubjectCode: "", Marks: "" });
        }
    }, [editData]);

    // Filter subjects when student changes
    useEffect(() => {
        if (!formData.RollId) {
            setFilteredSubjects([]);
            return;
        }
        const selectedStudent = students.find(s => s.RollId === formData.RollId);
        if (selectedStudent?.ClassId) {
            const classSubjects = allSubjects.filter(s => s.ClassId === selectedStudent.ClassId);
            setFilteredSubjects(classSubjects);
        } else {
            setFilteredSubjects(allSubjects);
        }
    }, [formData.RollId, students, allSubjects]);

    const handleStudentChange = (e) => {
        // Reset subject when student changes
        setFormData({ ...formData, RollId: e.target.value, SubjectCode: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const marks = Number(formData.Marks);
        if (isNaN(marks) || marks < 0 || marks > 100) {
            setError("Marks must be a number between 0 and 100.");
            return;
        }

        setLoading(true);
        const payload = { ...formData, Marks: marks };

        try {
            if (editData) {
                await axios.put(`${API}/results/update/${editData._id}`, payload);
            } else {
                await axios.post(`${API}/results/addResult`, payload);
            }
            onSuccess();
        } catch (err) {
            const msg = err.response?.data?.message || "Operation failed. Check console.";
            setError(msg);
            console.error("Submission error:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const selectedStudent = students.find(s => s.RollId === formData.RollId);

    return (
        <div className="section-card">
            <h3>{editData ? "Update Marks" : "Declare New Result"}</h3>

            {error && <div className="alert alert-error">⚠ {error}</div>}

            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                    <label>Student</label>
                    <select
                        value={formData.RollId}
                        disabled={!!editData}
                        onChange={handleStudentChange}
                        required
                    >
                        <option value="">-- Select Student --</option>
                        {students.map(s => (
                            <option key={s._id} value={s.RollId}>
                                {s.StudentName} ({s.RollId})
                            </option>
                        ))}
                    </select>
                    {selectedStudent?.ClassId && (
                        <small style={{ color: "#888", marginTop: "4px", display: "block" }}>
                            Class: {selectedStudent.ClassId}
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label>Subject</label>
                    <select
                        value={formData.SubjectCode}
                        disabled={!!editData}
                        onChange={e => setFormData({ ...formData, SubjectCode: e.target.value })}
                        required
                    >
                        <option value="">
                            {!formData.RollId
                                ? "-- Select Student First --"
                                : filteredSubjects.length === 0
                                    ? "-- No Subjects for this Class --"
                                    : "-- Select Subject --"}
                        </option>
                        {filteredSubjects.map(s => (
                            <option key={s._id} value={s.SubjectCode}>
                                {s.SubjectName} ({s.SubjectCode})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Marks (0–100)</label>
                    <input
                        type="number"
                        value={formData.Marks}
                        onChange={e => setFormData({ ...formData, Marks: e.target.value })}
                        required
                        min="0"
                        max="100"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Processing..." : editData ? "Update Result" : "Save Result"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResultsPage;
