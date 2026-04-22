import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = "http://localhost:5003/api";

const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [editData, setEditData] = useState(null);

    // Helper to switch tabs and pass data for editing
    const handleEditInitiate = (data) => {
        setEditData(data);
        setActiveTab("add");
    };

    return (
        <div className="results-container">
            <div className="content-header">
                <h1>Results Management</h1>
                <p>Manage and declare student exam scores by class.</p>
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
                    {editData?._id ? "Update Result" : "Declare Result"}
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

// ─── View Results Tab (With Class Drill-down) ──────────────────────────────
const ViewResultsTab = ({ onEdit }) => {
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [allResults, setAllResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchRollId, setSearchRollId] = useState("");

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [classRes, studRes, subRes, resData] = await Promise.all([
                axios.get(`${API}/classes/get`),
                axios.get(`${API}/students/get`),
                axios.get(`${API}/subjects/all`),
                axios.get(`${API}/results/all`)
            ]);

            setClasses(classRes.data);
            setStudents(studRes.data);
            setSubjects(subRes.data);
            
            // Standardizing response format
            const resultsArray = resData.data?.data || resData.data || [];
            setAllResults(Array.isArray(resultsArray) ? resultsArray : []);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // --- VIEW 2: Results Table for Selected Class ---
    if (selectedClassId) {
        const classStudents = students.filter(s => s.ClassId === selectedClassId)
            .filter(s => s.RollId.toLowerCase().includes(searchRollId.toLowerCase()));
        
        const classSubjects = subjects.filter(sub => sub.ClassId === selectedClassId);

        // Map results for quick lookup: { RollId: { SubjectCode: resultObject } }
        const classResultsMap = allResults.reduce((acc, curr) => {
            if (!acc[curr.RollId]) acc[curr.RollId] = {};
            acc[curr.RollId][curr.SubjectCode] = curr;
            return acc;
        }, {});

        return (
            <div className="section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button className="btn btn-sm" onClick={() => setSelectedClassId(null)}>← Back to Classes</button>
                    <h3>Class: {selectedClassId}</h3>
                    <input 
                        type="text" 
                        placeholder="Search Roll ID..." 
                        value={searchRollId}
                        onChange={(e) => setSearchRollId(e.target.value)}
                        style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div className="table-wrapper" style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll ID</th>
                                {classSubjects.map(sub => <th key={sub.SubjectCode}>{sub.SubjectName}</th>)}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classStudents.map(student => (
                                <tr key={student.RollId}>
                                    <td>{student.StudentName}</td>
                                    <td>{student.RollId}</td>
                                    {classSubjects.map(sub => {
                                        const res = classResultsMap[student.RollId]?.[sub.SubjectCode];
                                        return (
                                            <td key={sub.SubjectCode}>
                                                {res ? <strong>{res.Marks}</strong> : <span style={{color: '#ccc'}}>-</span>}
                                            </td>
                                        );
                                    })}
                                    <td>
                                        <button 
                                            className="btn btn-sm" 
                                            onClick={() => {
                                                const firstRes = Object.values(classResultsMap[student.RollId] || {})[0];
                                                onEdit(firstRes || { RollId: student.RollId });
                                            }}
                                        >
                                            {classResultsMap[student.RollId] ? "Edit" : "Declare"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {classSubjects.length === 0 && (
                    <div style={{ marginTop: '15px', color: '#e67e22', fontWeight: 'bold' }}>
                        ⚠️ No subjects defined for this class. Results cannot be declared until subjects are added.
                    </div>
                )}
            </div>
        );
    }

    // --- VIEW 1: Class Selection Grid ---
    return (
        <div className="class-selection-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Select a Class</h3>
                <button onClick={fetchData} className="btn btn-sm">Refresh Counts</button>
            </div>
            {loading ? <p>Loading classes...</p> : (
                <div className="class-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {classes.map(cls => (
                        <div 
                            key={cls._id} 
                            className="section-card class-card" 
                            onClick={() => setSelectedClassId(cls.ClassName)}
                            style={{ textAlign: 'center', cursor: 'pointer', padding: '20px', border: '1px solid #eee' }}
                        >
                            <div style={{ fontSize: '24px' }}>{cls.totalResults > 0 ? "✅" : "📁"}</div>
                            <h4>{cls.ClassName}</h4>
                            <p style={{ fontSize: '13px', color: '#666' }}>{cls.totalResults || 0} Results Declared</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Add / Edit Result Tab ────────────────────────────────────────────────────
const AddResultTab = ({ editData, onSuccess }) => {
    const [students, setStudents] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [marksMap, setMarksMap] = useState({});
    const [selectedRollId, setSelectedRollId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [st, sub] = await Promise.all([
                    axios.get(`${API}/students/get`),
                    axios.get(`${API}/subjects/all`)
                ]);
                setStudents(st.data);
                setAllSubjects(sub.data);
            } catch (err) {
                setError("Error loading form data.");
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        if (editData) {
            setSelectedRollId(editData.RollId);
            if (editData.SubjectCode) {
                setMarksMap({ [editData.SubjectCode]: editData.Marks });
            }
        }
    }, [editData]);

    useEffect(() => {
        if (!selectedRollId) return setFilteredSubjects([]);
        const student = students.find(s => s.RollId === selectedRollId);
        if (student) {
            setFilteredSubjects(allSubjects.filter(sub => sub.ClassId === student.ClassId));
        }
    }, [selectedRollId, students, allSubjects]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (editData?._id) {
                // Update Single Subject
                await axios.put(`${API}/results/update/${editData._id}`, {
                    RollId: selectedRollId,
                    SubjectCode: editData.SubjectCode,
                    Marks: Number(marksMap[editData.SubjectCode])
                });
            } else {
                // Bulk Declare Subjects
                const entries = Object.entries(marksMap).filter(([_, v]) => v !== "");
                if (entries.length === 0) throw new Error("Please enter marks for at least one subject.");
                
                await Promise.all(entries.map(([SubjectCode, Marks]) => 
                    axios.post(`${API}/results/addResult`, { 
                        RollId: selectedRollId, 
                        SubjectCode, 
                        Marks: Number(Marks) 
                    })
                ));
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section-card">
            <h3>{editData?._id ? "Edit Marks" : "Declare Marks"}</h3>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>⚠ {error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label>Student</label>
                    <select 
                        value={selectedRollId} 
                        disabled={!!editData?._id}
                        onChange={(e) => setSelectedRollId(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Select Student --</option>
                        {students.map(s => (
                            <option key={s._id} value={s.RollId}>{s.StudentName} ({s.RollId})</option>
                        ))}
                    </select>
                </div>

                {filteredSubjects.length > 0 ? (
                    <div className="marks-input-area">
                        <label style={{ fontWeight: 'bold' }}>Enter Subject Marks:</label>
                        {filteredSubjects.map(sub => (
                            <div key={sub._id} style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px' }}>
                                <span style={{ width: '150px' }}>{sub.SubjectName}</span>
                                <input 
                                    type="number" 
                                    min="0" max="100"
                                    value={marksMap[sub.SubjectCode] || ""}
                                    onChange={(e) => setMarksMap({...marksMap, [sub.SubjectCode]: e.target.value})}
                                    style={{ width: '80px', padding: '5px' }}
                                />
                            </div>
                        ))}
                    </div>
                ) : selectedRollId && <p style={{color: 'orange'}}>No subjects available for this student's class.</p>}

                <div className="form-actions" style={{ marginTop: '25px' }}>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={loading || !selectedRollId || filteredSubjects.length === 0}
                    >
                        {loading ? "Saving..." : "Save Results"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResultsPage;