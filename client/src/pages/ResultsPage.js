import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = "http://localhost:5003/api";

// ─── PDF Generator ────────────────────────────────────────────────────────────
const generatePDF = (className, students, subjects, resultsMap) => {
    const rows = students.map(student => {
        const subjectResults = subjects.map(sub => {
            const res = resultsMap[student.RollId]?.[sub.SubjectCode];
            return res ? Number(res.Marks) : null;
        });
        const obtained = subjectResults.reduce((sum, m) => sum + (m || 0), 0);
        const total = subjects.length * 100;
        const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        return { student, subjectResults, obtained, total, percentage };
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Result - ${className}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1a1a2e; background: #fff; }
  .header { text-align: center; margin-bottom: 32px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px; }
  .header h1 { font-size: 26px; font-weight: 800; color: #e74c3c; letter-spacing: 2px; }
  .header h2 { font-size: 18px; font-weight: 600; margin-top: 6px; color: #333; }
  .header p { font-size: 13px; color: #888; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #1a1a2e; color: #fff; padding: 10px 12px; text-align: center; font-weight: 600; letter-spacing: 0.5px; }
  th:first-child, th:nth-child(2) { text-align: left; }
  td { padding: 9px 12px; border-bottom: 1px solid #eee; text-align: center; }
  td:first-child, td:nth-child(2) { text-align: left; }
  tr:nth-child(even) td { background: #f9f9f9; }
  .obtained { font-weight: 700; color: #2563eb; }
  .percentage { font-weight: 800; color: #e74c3c; }
  .pass { color: #16a34a; }
  .fail { color: #dc2626; }
  .footer { margin-top: 40px; font-size: 12px; color: #aaa; text-align: right; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <h1>SRMS — Student Result Management</h1>
  <h2>${className} — Examination Results</h2>
  <p>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
</div>
<table>
  <thead>
    <tr>
      <th>Student Name</th>
      <th>Roll ID</th>
      ${subjects.map(s => `<th>${s.SubjectName}<br/><span style="font-weight:400;font-size:11px">/100</span></th>`).join("")}
      <th>Obtained</th>
      <th>Total</th>
      <th>%</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    ${rows.map(({ student, subjectResults, obtained, total, percentage }) => {
        const passed = subjectResults.every(m => m === null || m >= 35) && obtained > 0;
        return `
        <tr>
          <td>${student.StudentName}</td>
          <td>${student.RollId}</td>
          ${subjectResults.map(m => `<td>${m !== null ? m : "<span style='color:#ccc'>—</span>"}</td>`).join("")}
          <td class="obtained">${obtained}</td>
          <td>${total}</td>
          <td class="percentage">${percentage}%</td>
          <td class="${passed ? "pass" : "fail"}">${obtained === 0 ? "Pending" : passed ? "Pass" : "Fail"}</td>
        </tr>`;
    }).join("")}
  </tbody>
</table>
<div class="footer">SRMS Admin Portal &bull; Confidential</div>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
};

// ─── CSV Generator ────────────────────────────────────────────────────────────
const generateCSV = (className, students, subjects, resultsMap) => {
    const headers = ["Student Name", "Roll ID", ...subjects.map(s => s.SubjectName + " (/100)"), "Obtained Marks", "Total Marks", "Percentage", "Status"];
    const rows = students.map(student => {
        const subjectMarks = subjects.map(sub => {
            const res = resultsMap[student.RollId]?.[sub.SubjectCode];
            return res ? Number(res.Marks) : "";
        });
        const obtained = subjectMarks.reduce((sum, m) => sum + (m || 0), 0);
        const total = subjects.length * 100;
        const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        const passed = subjectMarks.every(m => m === "" || m >= 35) && obtained > 0;
        const status = obtained === 0 ? "Pending" : passed ? "Pass" : "Fail";
        return [student.StudentName, student.RollId, ...subjectMarks, obtained, total, `${percentage}%`, status];
    });

    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${className.replace(/\s+/g, "_")}_Results.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

// ─── Per-Student PDF Generator ───────────────────────────────────────────────
const generateStudentPDF = (student, subjects, resultsMap) => {
    const subjectRows = subjects.map(sub => {
        const res = resultsMap[student.RollId]?.[sub.SubjectCode];
        const marks = res ? Number(res.Marks) : null;
        const passed = marks !== null && marks >= 35;
        return { subjectName: sub.SubjectName, subjectCode: sub.SubjectCode, marks, passed };
    });

    const obtained = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
    const total = subjects.length * 100;
    const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
    const overallPassed = subjectRows.every(r => r.marks === null || r.marks >= 35) && obtained > 0;

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Marksheet - ${student.StudentName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; padding: 50px; color: #1a1a2e; background: #fff; max-width: 700px; margin: 0 auto; }
  .header { text-align: center; margin-bottom: 30px; }
  .header h1 { font-size: 22px; font-weight: 800; color: #e74c3c; letter-spacing: 2px; border-bottom: 3px solid #e74c3c; padding-bottom: 12px; }
  .header h2 { font-size: 15px; margin-top: 10px; color: #555; font-weight: 500; }
  .student-info { display: flex; justify-content: space-between; background: #f8f9ff; border: 1px solid #e0e7ff; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; font-size: 13px; }
  .student-info div { display: flex; flex-direction: column; gap: 4px; }
  .student-info span { color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
  .student-info strong { font-size: 14px; color: #1a1a2e; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
  th { background: #1a1a2e; color: #fff; padding: 10px 14px; text-align: left; font-weight: 600; }
  th:last-child, th:nth-child(2) { text-align: center; }
  td { padding: 10px 14px; border-bottom: 1px solid #eee; }
  td:nth-child(2), td:last-child { text-align: center; }
  tr:nth-child(even) td { background: #fafafa; }
  .pass-badge { background: #dcfce7; color: #16a34a; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
  .fail-badge { background: #fee2e2; color: #dc2626; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
  .pending-badge { background: #fef9c3; color: #92400e; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
  .summary { display: flex; gap: 0; border: 1px solid #e0e7ff; border-radius: 10px; overflow: hidden; margin-bottom: 24px; }
  .summary-item { flex: 1; padding: 16px; text-align: center; border-right: 1px solid #e0e7ff; }
  .summary-item:last-child { border-right: none; }
  .summary-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .summary-value { font-size: 22px; font-weight: 800; }
  .result-banner { text-align: center; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px; }
  .result-pass { background: #dcfce7; color: #16a34a; }
  .result-fail { background: #fee2e2; color: #dc2626; }
  .result-pending { background: #fef9c3; color: #92400e; }
  .footer { font-size: 11px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
  @media print { body { padding: 30px; } }
</style>
</head>
<body>
  <div class="header">
    <h1>SRMS — Student Result Marksheet</h1>
    <h2>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</h2>
  </div>

  <div class="student-info">
    <div><span>Student Name</span><strong>${student.StudentName}</strong></div>
    <div><span>Roll ID</span><strong>${student.RollId}</strong></div>
    <div><span>Class</span><strong>${student.ClassId || "—"}</strong></div>
    <div><span>Email</span><strong>${student.StudentEmail || "—"}</strong></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Subject</th>
        <th>Marks Obtained (/100)</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${subjectRows.map(r => `
        <tr>
          <td>${r.subjectName}</td>
          <td>${r.marks !== null ? `<strong>${r.marks}</strong>` : "<span style='color:#ccc'>Not Declared</span>"}</td>
          <td>${r.marks === null ? '<span class="pending-badge">Pending</span>' : r.passed ? '<span class="pass-badge">Pass</span>' : '<span class="fail-badge">Fail</span>'}</td>
        </tr>`).join("")}
    </tbody>
  </table>

  <div class="summary">
    <div class="summary-item">
      <div class="summary-label">Obtained</div>
      <div class="summary-value" style="color:#2563eb">${obtained}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Total</div>
      <div class="summary-value" style="color:#333">${total}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Percentage</div>
      <div class="summary-value" style="color:#e74c3c">${percentage}%</div>
    </div>
  </div>

  <div class="result-banner ${obtained === 0 ? "result-pending" : overallPassed ? "result-pass" : "result-fail"}">
    ${obtained === 0 ? "⏳ RESULT PENDING" : overallPassed ? "✅ RESULT: PASS" : "❌ RESULT: FAIL"}
  </div>

  <div class="footer">SRMS Admin Portal &bull; Confidential &bull; ${student.StudentName} &bull; ${student.RollId}</div>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
};

// ─── Download Buttons Component ───────────────────────────────────────────────
const DownloadButtons = ({ onClick, small = false }) => (
    <div style={{ display: "flex", gap: "8px" }}>
        <button
            className={`btn ${small ? "btn-sm" : ""}`}
            onClick={(e) => { e.stopPropagation(); onClick("pdf"); }}
            style={{
                background: "#e74c3c", color: "#fff", border: "none",
                borderRadius: "6px", padding: small ? "4px 10px" : "7px 14px",
                fontSize: small ? "11px" : "12px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: "4px"
            }}
        >
            📄 PDF
        </button>
        <button
            className={`btn ${small ? "btn-sm" : ""}`}
            onClick={(e) => { e.stopPropagation(); onClick("csv"); }}
            style={{
                background: "#16a34a", color: "#fff", border: "none",
                borderRadius: "6px", padding: small ? "4px 10px" : "7px 14px",
                fontSize: small ? "11px" : "12px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: "4px"
            }}
        >
            📊 CSV
        </button>
    </div>
);

// ─── Results Page ─────────────────────────────────────────────────────────────
const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [editData, setEditData] = useState(null);

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

// ─── View Results Tab ─────────────────────────────────────────────────────────
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
            const resultsArray = resData.data?.data || resData.data || [];
            setAllResults(Array.isArray(resultsArray) ? resultsArray : []);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Build results map and helpers
    const buildResultsMap = (results) =>
        results.reduce((acc, curr) => {
            if (!acc[curr.RollId]) acc[curr.RollId] = {};
            acc[curr.RollId][curr.SubjectCode] = curr;
            return acc;
        }, {});

    const handleClassDownload = (cls, type) => {
        const classStudents = students.filter(s => s.ClassId === cls.ClassName);
        const classSubjects = subjects.filter(s => s.ClassId === cls.ClassName);
        const resultsMap = buildResultsMap(allResults);
        if (classStudents.length === 0 || classSubjects.length === 0) {
            alert("No students or subjects found for this class.");
            return;
        }
        if (type === "pdf") generatePDF(cls.ClassName, classStudents, classSubjects, resultsMap);
        else generateCSV(cls.ClassName, classStudents, classSubjects, resultsMap);
    };

    // ── Drill-down view ──
    if (selectedClassId) {
        const classStudents = students
            .filter(s => s.ClassId === selectedClassId)
            .filter(s => s.RollId.toLowerCase().includes(searchRollId.toLowerCase()));
        const classSubjects = subjects.filter(sub => sub.ClassId === selectedClassId);
        const classResultsMap = buildResultsMap(allResults);

        const handleDrillDownload = (type) => {
            const allClassStudents = students.filter(s => s.ClassId === selectedClassId);
            if (type === "pdf") generatePDF(selectedClassId, allClassStudents, classSubjects, classResultsMap);
            else generateCSV(selectedClassId, allClassStudents, classSubjects, classResultsMap);
        };

        return (
            <div className="section-card">
                {/* Header Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                    <button className="btn btn-sm" onClick={() => setSelectedClassId(null)}>← Back to Classes</button>
                    <h3 style={{ margin: 0 }}>Class: {selectedClassId}</h3>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                        <input
                            type="text"
                            placeholder="Search Roll ID..."
                            value={searchRollId}
                            onChange={(e) => setSearchRollId(e.target.value)}
                            style={{ padding: "5px 10px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                        <DownloadButtons onClick={handleDrillDownload} small />
                    </div>
                </div>

                <div className="table-wrapper" style={{ overflowX: "auto" }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll ID</th>
                                {classSubjects.map(sub => (
                                    <th key={sub.SubjectCode}>{sub.SubjectName}<br /><span style={{ fontWeight: 400, fontSize: "11px" }}>/100</span></th>
                                ))}
                                <th>Obtained</th>
                                <th>Total</th>
                                <th>%</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classStudents.map(student => {
                                const subjectMarks = classSubjects.map(sub => {
                                    const res = classResultsMap[student.RollId]?.[sub.SubjectCode];
                                    return res ? Number(res.Marks) : null;
                                });
                                const obtained = subjectMarks.reduce((sum, m) => sum + (m || 0), 0);
                                const total = classSubjects.length * 100;
                                const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";

                                return (
                                    <tr key={student.RollId}>
                                        <td>{student.StudentName}</td>
                                        <td>{student.RollId}</td>
                                        {classSubjects.map(sub => {
                                            const res = classResultsMap[student.RollId]?.[sub.SubjectCode];
                                            return (
                                                <td key={sub.SubjectCode}>
                                                    {res ? <strong>{res.Marks}</strong> : <span style={{ color: "#ccc" }}>—</span>}
                                                </td>
                                            );
                                        })}
                                        <td><strong style={{ color: "#2563eb" }}>{obtained}</strong></td>
                                        <td style={{ color: "#888" }}>{total}</td>
                                        <td><strong style={{ color: obtained === 0 ? "#ccc" : "#e74c3c" }}>{percentage}%</strong></td>
                                        <td>
                                            <div style={{ display: "flex", gap: "6px" }}>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => {
                                                        const firstRes = Object.values(classResultsMap[student.RollId] || {})[0];
                                                        onEdit(firstRes || { RollId: student.RollId });
                                                    }}
                                                >
                                                    {classResultsMap[student.RollId] ? "Edit" : "Declare"}
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    title="Download student marksheet"
                                                    onClick={() => generateStudentPDF(student, classSubjects, classResultsMap)}
                                                    style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
                                                >
                                                    📄
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {classSubjects.length === 0 && (
                    <div style={{ marginTop: "15px", color: "#e67e22", fontWeight: "bold" }}>
                        ⚠️ No subjects defined for this class. Results cannot be declared until subjects are added.
                    </div>
                )}
            </div>
        );
    }

    // ── Class Cards ──
    return (
        <div className="class-selection-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3>Select a Class</h3>
                <button onClick={fetchData} className="btn btn-sm">Refresh</button>
            </div>
            {loading ? <p>Loading classes...</p> : (
                <div className="class-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                    {classes.map(cls => {
                        const classResults = allResults.filter(r => {
                            const student = students.find(s => s.RollId === r.RollId);
                            return student?.ClassId === cls.ClassName;
                        });
                        const hasResults = classResults.length > 0;

                        return (
                            <div
                                key={cls._id}
                                className="section-card class-card"
                                style={{ padding: "20px", border: "1px solid #eee", borderRadius: "10px", cursor: "pointer" }}
                            >
                                {/* Clickable area */}
                                <div onClick={() => setSelectedClassId(cls.ClassName)} style={{ textAlign: "center", marginBottom: "14px" }}>
                                    <div style={{ fontSize: "24px" }}>{hasResults ? "✅" : "📁"}</div>
                                    <h4 style={{ margin: "8px 0 4px" }}>{cls.ClassName}</h4>
                                    <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{classResults.length} Results Declared</p>
                                </div>

                                {/* Download buttons */}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <DownloadButtons onClick={(type) => handleClassDownload(cls, type)} small />
                                </div>
                            </div>
                        );
                    })}
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

    // Summary calculations
    const totalMarks = filteredSubjects.length * 100;
    const obtainedMarks = Object.values(marksMap).reduce((sum, v) => sum + (Number(v) || 0), 0);
    const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(1) : "0.0";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (editData?._id) {
                await axios.put(`${API}/results/update/${editData._id}`, {
                    RollId: selectedRollId,
                    SubjectCode: editData.SubjectCode,
                    Marks: Number(marksMap[editData.SubjectCode])
                });
            } else {
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
            {error && <div style={{ color: "red", marginBottom: "15px" }}>⚠ {error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label>Student</label>
                    <select
                        value={selectedRollId}
                        disabled={!!editData?._id}
                        onChange={(e) => setSelectedRollId(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">-- Select Student --</option>
                        {students.map(s => (
                            <option key={s._id} value={s.RollId}>{s.StudentName} ({s.RollId})</option>
                        ))}
                    </select>
                </div>

                {filteredSubjects.length > 0 ? (
                    <>
                        <div className="marks-input-area">
                            <label style={{ fontWeight: "bold" }}>Enter Subject Marks:</label>
                            {filteredSubjects.map(sub => (
                                <div key={sub._id} style={{ display: "flex", gap: "15px", alignItems: "center", marginTop: "10px" }}>
                                    <span style={{ width: "150px" }}>{sub.SubjectName}</span>
                                    <input
                                        type="number"
                                        min="0" max="100"
                                        value={marksMap[sub.SubjectCode] || ""}
                                        onChange={(e) => setMarksMap({ ...marksMap, [sub.SubjectCode]: e.target.value })}
                                        style={{ width: "80px", padding: "5px" }}
                                    />
                                    <span style={{ color: "#888", fontSize: "12px" }}>/100</span>
                                </div>
                            ))}
                        </div>

                        {/* Summary Box */}
                        <div style={{
                            marginTop: "20px", padding: "14px 18px",
                            background: "#f0f4ff", borderRadius: "8px",
                            border: "1px solid #c7d7fc",
                            display: "flex", gap: "32px", flexWrap: "wrap"
                        }}>
                            <div>
                                <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>OBTAINED</div>
                                <div style={{ fontWeight: 700, fontSize: "18px", color: "#2563eb" }}>{obtainedMarks}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>TOTAL</div>
                                <div style={{ fontWeight: 700, fontSize: "18px", color: "#333" }}>{totalMarks}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>PERCENTAGE</div>
                                <div style={{ fontWeight: 700, fontSize: "18px", color: "#e74c3c" }}>{percentage}%</div>
                            </div>
                        </div>
                    </>
                ) : selectedRollId && (
                    <p style={{ color: "orange" }}>No subjects available for this student's class.</p>
                )}

                <div className="form-actions" style={{ marginTop: "25px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !selectedRollId || filteredSubjects.length === 0}
                    >
                        {loading ? "Saving..." : "Save Results"}
                    </button>
                    {selectedRollId && filteredSubjects.length > 0 && (
                        <button
                            type="button"
                            className="btn btn-sm"
                            title="Download this student's marksheet as PDF"
                            style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 14px", fontWeight: 600, cursor: "pointer" }}
                            onClick={() => {
                                const student = students.find(s => s.RollId === selectedRollId);
                                if (!student) return;
                                const previewMap = { [selectedRollId]: {} };
                                filteredSubjects.forEach(sub => {
                                    if (marksMap[sub.SubjectCode] !== undefined && marksMap[sub.SubjectCode] !== "") {
                                        previewMap[selectedRollId][sub.SubjectCode] = { Marks: marksMap[sub.SubjectCode] };
                                    }
                                });
                                generateStudentPDF(student, filteredSubjects, previewMap);
                            }}
                        >
                            📄 Download Marksheet
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ResultsPage;
