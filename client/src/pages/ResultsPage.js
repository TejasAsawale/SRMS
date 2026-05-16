import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import '../style/ResultsPage.css';

const API = "http://localhost:5003/api";

const exportToCSV = (className, classStudents, classSubjects, allResults) => {
    const headers = ["Student Name", "Roll ID", ...classSubjects.map(s => s.SubjectName), "Obtained", "Total", "%", "Status"];
    const rows = classStudents.map(student => {
        const marks = classSubjects.map(sub => {
            const res = allResults.find(r => r.RollId === student.RollId && r.SubjectCode === sub.SubjectCode);
            return res ? Number(res.Marks) : 0;
        });
        const obtained = marks.reduce((sum, m) => sum + m, 0);
        const total = classSubjects.length * 100;
        const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        const passed = marks.every(m => m > 35) && obtained > 0;
        return [student.StudentName || "N/A", student.RollId, ...marks, obtained, total, `${percentage}%`, passed ? "Pass" : "Fail"];
    });
    const csvContent = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Results_${className}.csv`);
    link.click();
};

const exportToPDF = (className, classStudents, classSubjects, allResults) => {
    const rows = classStudents.map(student => {
        const subjectResults = classSubjects.map(sub => {
            const res = allResults.find(r => r.RollId === student.RollId && r.SubjectCode === sub.SubjectCode);
            return res ? Number(res.Marks) : null;
        });
        const obtained = subjectResults.reduce((sum, m) => sum + (m || 0), 0);
        const total = classSubjects.length * 100;
        const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        const passed = subjectResults.every(m => m !== null && m > 35) && obtained > 0;
        return { student, subjectResults, obtained, total, percentage, passed };
    });

    const html = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #1e2533; color: #fff; padding: 10px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #eee; }
                    .status-pass { color: green; font-weight: bold; }
                    .status-fail { color: red; font-weight: bold; }
                    h1 { color: #6b0f1a; }
                </style>
            </head>
            <body>
                <h1>Class Results — ${className}</h1>
                <p>Student Result Management | Annual Session 2025-26</p>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Roll ID</th>
                            ${classSubjects.map(s => `<th>${s.SubjectName}</th>`).join("")}
                            <th>Obtained</th>
                            <th>Total</th>
                            <th>%</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                <td>${row.student.StudentName || "N/A"}</td>
                                <td>${row.student.RollId}</td>
                                ${row.subjectResults.map(m => `<td>${m ?? "—"}</td>`).join("")}
                                <td>${row.obtained}</td>
                                <td>${row.total}</td>
                                <td>${row.percentage}%</td>
                                <td class="${row.passed ? 'status-pass' : 'status-fail'}">${row.passed ? 'Pass' : 'Fail'}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </body>
        </html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.onload = () => setTimeout(() => win.print(), 500);
};

const exportSinglePDF = (student, classSubjects, allResults) => {
    let overallFail = false;
    const subjectRows = classSubjects.map(sub => {
        const res = allResults.find(r => r.RollId === student.RollId && r.SubjectCode === sub.SubjectCode);
        const marks = res ? Number(res.Marks) : null;
        const isSubjectPassed = marks !== null && marks > 35;
        if (!isSubjectPassed) overallFail = true;
        return { name: sub.SubjectName, marks, passed: isSubjectPassed };
    });

    const obtained = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
    const total = classSubjects.length * 100;
    const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
    const resultStatus = overallFail ? "FAIL" : "PASS";

    const html = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #6b0f1a; color: #fff; padding: 10px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #eee; }
                    .status-pass { color: green; font-weight: bold; }
                    .status-fail { color: red; font-weight: bold; }
                    .badge { padding: 15px; border-radius: 8px; border: 2px solid; display: inline-block; text-align: center; min-width: 120px; }
                    .badge-pass { background: #f0fdf4; border-color: #86efac; color: #166534; }
                    .badge-fail { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
                    .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; }
                </style>
            </head>
            <body>
                <h1 style="color:#6b0f1a">Academic Progress Report</h1>
                <p>Student Result Management | Annual Session 2025-26</p>
                <p><strong>Name:</strong> ${student.StudentName || "N/A"} &nbsp;&nbsp;
                    <strong>Roll ID:</strong> ${student.RollId} &nbsp;&nbsp;
                    <strong>Class:</strong> ${student.ClassId || "N/A"}</p>
                <table>
                    <thead>
                        <tr><th>Subject</th><th>Max Marks</th><th>Obtained</th><th>Result</th></tr>
                    </thead>
                    <tbody>
                        ${subjectRows.map(r => `
                            <tr>
                                <td>${r.name}</td>
                                <td>100</td>
                                <td>${r.marks ?? "—"}</td>
                                <td class="${r.passed ? 'status-pass' : 'status-fail'}">${r.passed ? 'Pass' : 'Fail'}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="footer">
                    <div class="badge ${overallFail ? 'badge-fail' : 'badge-pass'}">
                        <div style="font-size:10px">FINAL RESULT</div>
                        <div style="font-size:22px;font-weight:800">${resultStatus}</div>
                    </div>
                    <div style="text-align:right">
                        <div><strong>Aggregate:</strong> ${obtained} / ${total}</div>
                        <div><strong>Percentage:</strong> ${percentage}%</div>
                    </div>
                </div>
            </body>
        </html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.onload = () => setTimeout(() => win.print(), 500);
};

// MAIN COMPONENT 

const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");

    const [classes, setClasses] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Declare form state
    const [formClass, setFormClass] = useState("");
    const [formStudent, setFormStudent] = useState("");
    const [marksInput, setMarksInput] = useState({});

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [classRes, studRes, subRes, resData] = await Promise.all([
                axios.get(`${API}/classes/get`),
                axios.get(`${API}/students/get`),
                axios.get(`${API}/subjects/all`),
                axios.get(`${API}/results/all?t=${new Date().getTime()}`),
            ]);
            setClasses(classRes.data);
            setStudents(studRes.data);
            setSubjects(subRes.data);
            console.log("SUBJECTS API RESPONSE (first item):", subRes.data?.[0]);
            console.log("CLASSES API RESPONSE (first item):", classRes.data?.[0]);
            console.log("STUDENTS API RESPONSE (first item):", studRes.data?.[0]);
            setAllResults(resData.data?.data || resData.data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData, refreshTrigger]);

    const handleDeleteClassResults = async (className) => {
        if (!window.confirm(`Delete ALL results for ${className}? This cannot be undone.`)) return;
        try {
            const classStudents = students.filter(s => s.ClassId === className);
            if (classStudents.length === 0) { alert("No students found in this class."); return; }
            const studentRollIds = classStudents.map(s => s.RollId);
            const toDelete = allResults.filter(r => studentRollIds.includes(r.RollId));
            if (toDelete.length === 0) { alert("No declared results found for this class."); return; }
            await Promise.all(toDelete.map(r => axios.delete(`${API}/results/delete/${r._id}`)));
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error(err);
            alert("Failed to delete class results.");
        }
    };

    // Delete single student results 
    const handleDeleteSingle = async (rollId, name) => {
        if (!window.confirm(`Delete results for ${name}?`)) return;
        try {
            const toDelete = allResults.filter(r => r.RollId === rollId);
            if (toDelete.length === 0) { alert("No results found for this student."); return; }
            await Promise.all(toDelete.map(r => axios.delete(`${API}/results/delete/${r._id}`)));
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error(err);
            alert("Failed to delete student result.");
        }
    };

    // Declare results submit 
    const handleDeclareSubmit = async (e) => {
        e.preventDefault();
        try {
            const payloads = declareSubjects.map(sub => {
                const code = sub.SubjectCode || sub.subjectCode || sub._id || sub.SubjectId || sub.code;
                return {
                    RollId: formStudent,
                    SubjectCode: code,
                    Marks: Number(marksInput[code] || 0),
                };
            });
            console.log("Submitting payloads:", payloads);
            await Promise.all(payloads.map(p => axios.post(`${API}/results/addResult`, p)));
            alert("Results saved successfully!");
            setMarksInput({});
            setFormStudent("");
            setFormClass("");
            setRefreshTrigger(p => p + 1);
            setActiveTab("view");
        } catch (err) {
            const msg = err?.response?.data?.message || err?.response?.data || err.message || "Unknown error";
            console.error("Save error:", err?.response || err);
            alert(`Error saving results: ${msg}`);
        }
    };

    const getSubjectClass = (sub) => sub.Class || sub.ClassName || sub.ClassId || sub.classId || "";
    const getClassName = (cls) => cls.ClassName || cls.name || cls.Name || cls.ClassId || cls.classId || "";

    const studentClassIds = [...new Set(students.map(s => s.ClassId).filter(Boolean))];
    const subjectClassIds = new Set(subjects.map(sub => getSubjectClass(sub)).filter(Boolean));
    const activeClassNames = studentClassIds.filter(cid => subjectClassIds.has(cid));

    const activeClasses = activeClassNames.map(name => {
        const found = classes.find(cls => getClassName(cls) === name);
        return found ? { ...found, ClassName: name } : { ClassName: name, _id: name };
    });

    // View Results table — only students who HAVE results declared
    const filteredStudents = students.filter(s => {
        const hasMarks = allResults.some(r => r.RollId === s.RollId);
        const matchesClass = selectedClass === "All Classes" || s.ClassId === selectedClass;
        const matchesSearch =
            s.StudentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.RollId?.toLowerCase().includes(searchQuery.toLowerCase());
        return hasMarks && matchesClass && matchesSearch;
    });

    // Declare form — all students in chosen class (not just those with results)
    const declareStudents = students.filter(s => s.ClassId === formClass);
    const declareSubjects = subjects.filter(sub => getSubjectClass(sub) === formClass);

    if (loading) return <div className="results-container">Loading Academic Records...</div>;

    return (
        <div className="results-container">
            <div className="content-header">
                <h1>Results Management</h1>
                <p>Monitor student performance and generate academic reports.</p>
            </div>

            <div className="tab-bar">
                <button
                    className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
                    onClick={() => setActiveTab("view")}
                >
                    View Results
                </button>
                <button
                    className={`tab-btn ${activeTab === "declare" ? "active" : ""}`}
                    onClick={() => setActiveTab("declare")}
                >
                    Declare Result
                </button>
            </div>

            {/* ── VIEW TAB ── */}
            {activeTab === "view" && (
                <>
                    {/* Class Cards — only classes with enrolled students */}
                    <div className="class-grid">
                        {activeClasses.map(cls => {
                            const classStudents = students.filter(s => s.ClassId === cls.ClassName);
                            const classSubjects = subjects.filter(sub => getSubjectClass(sub) === cls.ClassName);
                            const hasResults = allResults.some(r =>
                                classStudents.find(s => s.RollId === r.RollId)
                            );
                            return (
                                <div className="class-card" key={cls._id}>
                                    <button
                                        className="delete-card-btn"
                                        onClick={() => handleDeleteClassResults(cls.ClassName)}
                                        title={`Delete all results for ${cls.ClassName}`}
                                    >
                                        🗑️
                                    </button>
                                    <div className="card-icon">{hasResults ? "✅" : "📁"}</div>
                                    <div className="class-name">{cls.ClassName}</div>
                                    <div className="card-actions">
                                        <button
                                            className="btn-outline"
                                            onClick={() => exportToPDF(cls.ClassName, classStudents, classSubjects, allResults)}
                                        >
                                            PDF
                                        </button>
                                        <button
                                            className="btn-outline"
                                            onClick={() => exportToCSV(cls.ClassName, classStudents, classSubjects, allResults)}
                                        >
                                            CSV
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Students Table */}
                    <div className="section-card">
                        <div className="filter-bar">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search by name or roll ID..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <select
                                className="class-filter-select"
                                value={selectedClass}
                                onChange={e => setSelectedClass(e.target.value)}
                            >
                                <option value="All Classes">All Classes</option>
                                {activeClasses.map(c => (
                                    <option key={c._id} value={c.ClassName}>{c.ClassName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>STUDENT NAME</th>
                                        <th>ROLL ID</th>
                                        <th>CLASS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                                                No results found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStudents.map(s => (
                                            <tr key={s._id}>
                                                <td>
                                                    <div className="student-info">
                                                        <span className="student-name">{s.StudentName}</span>
                                                        <span className="student-email">{s.StudentEmail}</span>
                                                    </div>
                                                </td>
                                                <td>{s.RollId}</td>
                                                <td>{s.ClassId}</td>
                                                <td>
                                                    <div className="action-btns">
                                                        <button
                                                            className="btn-report"
                                                            onClick={() => exportSinglePDF(
                                                                s,
                                                                subjects.filter(sub => getSubjectClass(sub) === s.ClassId),
                                                                allResults
                                                            )}
                                                        >
                                                            Report Card
                                                        </button>
                                                        <button
                                                            className="btn-delete-row"
                                                            onClick={() => handleDeleteSingle(s.RollId, s.StudentName)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* ── DECLARE TAB ── */}
            {activeTab === "declare" && (
                <div className="section-card" style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div className="section-header">
                        <div>
                            <div className="section-title">Declare Student Result</div>
                            <div className="section-meta">Select a class and student, then enter marks for each subject.</div>
                        </div>
                    </div>

                    <form onSubmit={handleDeclareSubmit} style={{ padding: "24px" }}>
                        {/* Row: Class + Student */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                            <div className="form-group">
                                <label>Select Class</label>
                                <select
                                    style={{ padding: "9px 12px", border: "1px solid #e8ecf0", borderRadius: "6px", fontSize: "13.5px", fontFamily: "inherit", width: "100%", outline: "none", background: "#fff" }}
                                    value={formClass}
                                    onChange={e => { setFormClass(e.target.value); setFormStudent(""); setMarksInput({}); }}
                                    required
                                >
                                    <option value="">-- Choose Class --</option>
                                    {activeClasses.map(c => (
                                        <option key={c._id} value={c.ClassName}>{c.ClassName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Select Student</label>
                                <select
                                    style={{ padding: "9px 12px", border: "1px solid #e8ecf0", borderRadius: "6px", fontSize: "13.5px", fontFamily: "inherit", width: "100%", outline: "none", background: "#fff", color: formClass ? "inherit" : "#94a3b8" }}
                                    value={formStudent}
                                    onChange={e => { setFormStudent(e.target.value); setMarksInput({}); }}
                                    required
                                    disabled={!formClass}
                                >
                                    <option value="">-- Choose Student --</option>
                                    {declareStudents.map(s => (
                                        <option key={s._id} value={s.RollId}>{s.StudentName} ({s.RollId})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Marks Table */}
                        {formStudent && declareSubjects.length > 0 && (
                            <>
                                <div style={{ marginBottom: "12px", fontWeight: 600, fontSize: "13px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                    Enter Marks (out of 100)
                                </div>
                                <div style={{ border: "1px solid #e8ecf0", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
                                    {/* Table Header */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 80px", background: "#f8fafc", padding: "10px 16px", borderBottom: "1px solid #e8ecf0", fontSize: "11.5px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                        <span>Subject</span>
                                        <span>Marks Obtained</span>
                                        <span style={{ textAlign: "center" }}>/ 100</span>
                                    </div>

                                    {declareSubjects.map((sub, idx) => {
                                        const code = sub.SubjectCode || sub.subjectCode || sub._id || sub.SubjectId || sub.code;
                                        const val = marksInput[code] || "";
                                        const num = Number(val);
                                        const isValid = val === "" || (num >= 0 && num <= 100);
                                        const statusColor = val === "" ? "#94a3b8" : num >= 35 ? "#166534" : "#991b1b";
                                        return (
                                            <div
                                                key={code}
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 180px 80px",
                                                    alignItems: "center",
                                                    padding: "12px 16px",
                                                    borderBottom: idx < declareSubjects.length - 1 ? "1px solid #f1f5f9" : "none",
                                                    background: idx % 2 === 0 ? "#fff" : "#fafbfc",
                                                }}
                                            >
                                                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1a202c" }}>
                                                    {sub.SubjectName}
                                                </span>
                                                <div>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        placeholder="Enter marks"
                                                        value={val}
                                                        onChange={e => setMarksInput({ ...marksInput, [code]: e.target.value })}
                                                        required
                                                        style={{
                                                            width: "140px",
                                                            padding: "7px 12px",
                                                            border: `1px solid ${isValid ? "#e8ecf0" : "#fca5a5"}`,
                                                            borderRadius: "6px",
                                                            fontSize: "14px",
                                                            fontFamily: "inherit",
                                                            outline: "none",
                                                            background: "#fff",
                                                            textAlign: "center",
                                                        }}
                                                    />
                                                </div>
                                                <span style={{ textAlign: "center", fontSize: "12px", fontWeight: 600, color: statusColor }}>
                                                    {val === "" ? "—" : num >= 35 ? "Pass" : "Fail"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        background: "#2d3748",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        letterSpacing: "0.3px",
                                        transition: "background 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "#1a202c"}
                                    onMouseLeave={e => e.currentTarget.style.background = "#2d3748"}
                                >
                                    Save Academic Records
                                </button>
                            </>
                        )}

                        {formClass && declareSubjects.length === 0 && (
                            <div className="alert alert-warning" style={{ margin: "24px" }}>
                                ⚠️ Please assign subjects first before declaring results for this class.
                            </div>
                        )}

                    </form>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;