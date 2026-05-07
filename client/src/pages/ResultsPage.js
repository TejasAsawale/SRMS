import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import '../style/ResultsPage.css';

const API = "http://localhost:5003/api";

// ─── EXPORT UTILITIES (Defined outside to prevent re-creation on render) ─────
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
        const obtained   = subjectResults.reduce((sum, m) => sum + (m || 0), 0);
        const total      = classSubjects.length * 100;
        const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        const passed     = subjectResults.every(m => m !== null && m > 35) && obtained > 0;
        return { student, subjectResults, obtained, total, percentage, passed };
    });

    const html = `
        <html>
            <body class="print-body">
                <div class="report-card">
                    <div class="top-accent-bar"></div>
                    <div class="report-header">
                        <div class="school-branding">
                            <h1>Class Results — ${className}</h1>
                            <p> Student Result Management | Annual Session 2025-26</p>
                        </div>
                        <div class="report-logo">🎓</div>
                    </div>
                    <table class="marks-table-professional">
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
                </div>
            </body>
        </html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => win.document.head.appendChild(s.cloneNode(true)));
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
            <body class="pdf-body">
                <div class="report-card">
                    <div class="top-accent-bar"></div>
                    <div class="report-header">
                        <div class="school-branding">
                            <h1>Academic Progress Report</h1>
                            <p>Student Result Management | Annual Session 2025-26</p>
                        </div>
                        <div class="report-logo">🎓</div>
                    </div>
                    <div class="student-info-grid">
                        <div class="info-item"><strong>Student Name:</strong> ${student.StudentName || "N/A"}</div>
                        <div class="info-item"><strong>Roll Number:</strong> ${student.RollId}</div>
                        <div class="info-item"><strong>Class:</strong> ${student.ClassId || "N/A"}</div>
                        <div class="info-item"><strong>Exam Type:</strong> Final Assessment</div>
                    </div>
                    <table class="marks-table-professional">
                        <thead>
                            <tr>
                                <th>Subject Title</th>
                                <th>Max Marks</th>
                                <th>Obtained</th>
                                <th>Result</th>
                            </tr>
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
                    <div class="report-footer-summary">
                        <div class="final-result-badge ${overallFail ? 'badge-fail' : 'badge-pass'}">
                            <span class="label">FINAL RESULT</span>
                            <span class="value">${resultStatus}</span>
                            <span class="note">${overallFail ? "Try better next time!" : "Congratulations!"}</span>
                        </div>
                        <div class="score-summary">
                            <div class="score-row"><strong>Aggregate:</strong> ${obtained} / ${total}</div>
                            <div class="score-row"><strong>Percentage:</strong> ${percentage}%</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => win.document.head.appendChild(s.cloneNode(true)));
    win.document.close();
    win.onload = () => setTimeout(() => win.print(), 500);
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
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
            setAllResults(resData.data?.data || resData.data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { 
        fetchData(); 
    }, [fetchData, refreshTrigger]);

    const handleDeleteClassResults = async (className) => {
        if (window.confirm(`Delete all results for ${className}?`)) {
            try {
                const classStuds = students.filter(s => s.ClassId === className);
                await Promise.all(classStuds.map(s => axios.delete(`${API}/results/deleteByRoll/${s.RollId}`)));
                setRefreshTrigger(prev => prev + 1);
            } catch (err) { alert("Failed to delete class results."); }
        }
    };

    const handleDeleteSingle = async (rollId, name) => {
        if (window.confirm(`Delete results for ${name}?`)) {
            try {
                await axios.delete(`${API}/results/deleteByRoll/${rollId}`);
                setRefreshTrigger(prev => prev + 1);
            } catch (err) { alert("Failed to delete student result."); }
        }
    };

    const filteredStudents = students.filter(s => {
        const matchesClass = selectedClass === "All Classes" || s.ClassId === selectedClass;
        const matchesSearch = 
            s.StudentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.RollId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.StudentEmail?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const hasSubjectsDefined = subjects.some(sub => sub.Class === s.ClassId);
        return matchesClass && matchesSearch && hasSubjectsDefined;
    });

    if (loading) return <div className="loading-container">Loading Results Data...</div>;

    return (
        <div className="results-container">
            <div className="content-header">
                <div className="header-text">
                    <h1>Results Management</h1>
                    <p>Manage and declare student exam scores by class.</p>
                </div>
                <div className="tab-bar">
                    <button className={`tab-btn ${activeTab === "view" ? "active" : ""}`} onClick={() => setActiveTab("view")}>View Results</button>
                    <button className={`tab-btn ${activeTab === "declare" ? "active" : ""}`} onClick={() => setActiveTab("declare")}>Declare Result</button>
                </div>
            </div>

            {activeTab === "view" && (
                <>
                    <div className="class-grid">
                        {classes.map(cls => (
                            <div className="class-card" key={cls._id}>
                                <button className="delete-card-btn" onClick={() => handleDeleteClassResults(cls.ClassName)} title="Delete Class Results">🗑️</button>
                                <div className="card-icon">{allResults.some(r => students.find(s => s.RollId === r.RollId)?.ClassId === cls.ClassName) ? "✅" : "📁"}</div>
                                <div className="class-name">{cls.ClassName}</div>
                                <div className="results-count">Results Declared</div>
                                <div className="card-actions" style={{marginTop: '10px', display: 'flex', gap: '5px'}}>
                                     <button className="btn btn-sm" onClick={() => exportToPDF(cls.ClassName, students.filter(s => s.ClassId === cls.ClassName), subjects.filter(sub => sub.Class === cls.ClassName), allResults)}>PDF</button>
                                     <button className="btn btn-sm" onClick={() => exportToCSV(cls.ClassName, students.filter(s => s.ClassId === cls.ClassName), subjects.filter(sub => sub.Class === cls.ClassName), allResults)}>CSV</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-card">
                        <div className="filter-bar">
                            <input 
                                className="search-input"
                                type="text" 
                                placeholder="Search by name, roll id, or email..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <select 
                                className="class-filter-select"
                                value={selectedClass} 
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="All Classes">All Classes</option>
                                {classes.map(c => <option key={c._id} value={c.ClassName}>{c.ClassName}</option>)}
                            </select>
                        </div>

                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>STUDENT</th>
                                        <th>ROLL ID</th>
                                        <th>CLASS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map(s => (
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
                                                    <button className="btn btn-sm" onClick={() => exportSinglePDF(s, subjects.filter(sub => sub.Class === s.ClassId), allResults)}>Report Card</button>
                                                    <button className="btn-delete-row" onClick={() => handleDeleteSingle(s.RollId, s.StudentName)}>Delete Result</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultsPage;