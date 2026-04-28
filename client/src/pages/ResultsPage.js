// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const API = "http://localhost:5003/api";

// // ─── PDF Generator ────────────────────────────────────────────────────────────
// const generatePDF = (className, students, subjects, resultsMap) => {
<<<<<<< HEAD
//     const rows = students.map(student => {
//         const subjectResults = subjects.map(sub => {
=======
//     const rows = students.map((student) => {
//         const subjectResults = subjects.map((sub) => {
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             const res = resultsMap[student.RollId]?.[sub.SubjectCode];
//             return res ? Number(res.Marks) : null;
//         });
//         const obtained = subjectResults.reduce((sum, m) => sum + (m || 0), 0);
//         const total = subjects.length * 100;
<<<<<<< HEAD
//         const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
=======
//         const percentage =
//             total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//         return { student, subjectResults, obtained, total, percentage };
//     });

//     const html = `
<<<<<<< HEAD
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="UTF-8"/>
// <title>Result - ${className}</title>
// <style>
//   * { margin: 0; padding: 0; box-sizing: border-box; }
//   body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1a1a2e; background: #fff; }
//   .header { text-align: center; margin-bottom: 32px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px; }
//   .header h1 { font-size: 26px; font-weight: 800; color: #e74c3c; letter-spacing: 2px; }
//   .header h2 { font-size: 18px; font-weight: 600; margin-top: 6px; color: #333; }
//   .header p { font-size: 13px; color: #888; margin-top: 4px; }
//   table { width: 100%; border-collapse: collapse; font-size: 13px; }
//   th { background: #1a1a2e; color: #fff; padding: 10px 12px; text-align: center; font-weight: 600; letter-spacing: 0.5px; }
//   th:first-child, th:nth-child(2) { text-align: left; }
//   td { padding: 9px 12px; border-bottom: 1px solid #eee; text-align: center; }
//   td:first-child, td:nth-child(2) { text-align: left; }
//   tr:nth-child(even) td { background: #f9f9f9; }
//   .obtained { font-weight: 700; color: #2563eb; }
//   .percentage { font-weight: 800; color: #e74c3c; }
//   .pass { color: #16a34a; }
//   .fail { color: #dc2626; }
//   .footer { margin-top: 40px; font-size: 12px; color: #aaa; text-align: right; }
//   @media print { body { padding: 20px; } }
// </style>
// </head>
// <body>
=======
// <!DOCTYPE html><html><head><meta charset="UTF-8"/>
// <title>Result - ${className}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',sans-serif;padding:40px;color:#1a1a2e;background:#fff}
//   .header{text-align:center;margin-bottom:32px;border-bottom:3px solid #e74c3c;padding-bottom:20px}
//   .header h1{font-size:26px;font-weight:800;color:#e74c3c;letter-spacing:2px}
//   .header h2{font-size:18px;font-weight:600;margin-top:6px;color:#333}
//   .header p{font-size:13px;color:#888;margin-top:4px}
//   table{width:100%;border-collapse:collapse;font-size:13px}
//   th{background:#1a1a2e;color:#fff;padding:10px 12px;text-align:center;font-weight:600;letter-spacing:.5px}
//   th:first-child,th:nth-child(2){text-align:left}
//   td{padding:9px 12px;border-bottom:1px solid #eee;text-align:center}
//   td:first-child,td:nth-child(2){text-align:left}
//   tr:nth-child(even) td{background:#f9f9f9}
//   .obtained{font-weight:700;color:#2563eb}
//   .percentage{font-weight:800;color:#e74c3c}
//   .pass{color:#16a34a}.fail{color:#dc2626}
//   .footer{margin-top:40px;font-size:12px;color:#aaa;text-align:right}
//   @media print{body{padding:20px}}
// </style></head><body>
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
// <div class="header">
//   <h1>SRMS — Student Result Management</h1>
//   <h2>${className} — Examination Results</h2>
//   <p>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
// </div>
<<<<<<< HEAD
// <table>
//   <thead>
//     <tr>
//       <th>Student Name</th>
//       <th>Roll ID</th>
//       ${subjects.map(s => `<th>${s.SubjectName}<br/><span style="font-weight:400;font-size:11px">/100</span></th>`).join("")}
//       <th>Obtained</th>
//       <th>Total</th>
//       <th>%</th>
//       <th>Status</th>
//     </tr>
//   </thead>
//   <tbody>
//     ${rows.map(({ student, subjectResults, obtained, total, percentage }) => {
//         const passed = subjectResults.every(m => m === null || m >= 35) && obtained > 0;
//         return `
//         <tr>
//           <td>${student.StudentName}</td>
//           <td>${student.RollId}</td>
//           ${subjectResults.map(m => `<td>${m !== null ? m : "<span style='color:#ccc'>—</span>"}</td>`).join("")}
//           <td class="obtained">${obtained}</td>
//           <td>${total}</td>
//           <td class="percentage">${percentage}%</td>
//           <td class="${passed ? "pass" : "fail"}">${obtained === 0 ? "Pending" : passed ? "Pass" : "Fail"}</td>
//         </tr>`;
//     }).join("")}
//   </tbody>
// </table>
// <div class="footer">SRMS Admin Portal &bull; Confidential</div>
// </body>
// </html>`;
=======
// <table><thead><tr>
//   <th>Student Name</th><th>Roll ID</th>
//   ${subjects.map((s) => `<th>${s.SubjectName}<br/><span style="font-weight:400;font-size:11px">/100</span></th>`).join("")}
//   <th>Obtained</th><th>Total</th><th>%</th><th>Status</th>
// </tr></thead><tbody>
// ${rows
//             .map(({ student, subjectResults, obtained, total, percentage }) => {
//                 const passed =
//                     subjectResults.every((m) => m === null || m >= 35) && obtained > 0;
//                 return `<tr>
//       <td>${student.StudentName}</td><td>${student.RollId}</td>
//       ${subjectResults.map((m) => `<td>${m !== null ? m : "<span style='color:#ccc'>—</span>"}</td>`).join("")}
//       <td class="obtained">${obtained}</td><td>${total}</td>
//       <td class="percentage">${percentage}%</td>
//       <td class="${passed ? "pass" : "fail"}">${obtained === 0 ? "Pending" : passed ? "Pass" : "Fail"}</td>
//     </tr>`;
//             })
//             .join("")}
// </tbody></table>
// <div class="footer">SRMS Admin Portal &bull; Confidential</div>
// </body></html>`;
>>>>>>> 756f1b8 (Update theme for admin management dashboard)

//     const win = window.open("", "_blank");
//     win.document.write(html);
//     win.document.close();
//     win.print();
// };

// // ─── CSV Generator ────────────────────────────────────────────────────────────
// const generateCSV = (className, students, subjects, resultsMap) => {
<<<<<<< HEAD
//     const headers = ["Student Name", "Roll ID", ...subjects.map(s => s.SubjectName + " (/100)"), "Obtained Marks", "Total Marks", "Percentage", "Status"];
//     const rows = students.map(student => {
//         const subjectMarks = subjects.map(sub => {
=======
//     const headers = [
//         "Student Name",
//         "Roll ID",
//         ...subjects.map((s) => s.SubjectName + " (/100)"),
//         "Obtained Marks",
//         "Total Marks",
//         "Percentage",
//         "Status",
//     ];
//     const rows = students.map((student) => {
//         const subjectMarks = subjects.map((sub) => {
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             const res = resultsMap[student.RollId]?.[sub.SubjectCode];
//             return res ? Number(res.Marks) : "";
//         });
//         const obtained = subjectMarks.reduce((sum, m) => sum + (m || 0), 0);
//         const total = subjects.length * 100;
<<<<<<< HEAD
//         const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
//         const passed = subjectMarks.every(m => m === "" || m >= 35) && obtained > 0;
//         const status = obtained === 0 ? "Pending" : passed ? "Pass" : "Fail";
//         return [student.StudentName, student.RollId, ...subjectMarks, obtained, total, `${percentage}%`, status];
//     });

//     const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
=======
//         const percentage =
//             total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
//         const passed =
//             subjectMarks.every((m) => m === "" || m >= 35) && obtained > 0;
//         const status = obtained === 0 ? "Pending" : passed ? "Pass" : "Fail";
//         return [
//             student.StudentName,
//             student.RollId,
//             ...subjectMarks,
//             obtained,
//             total,
//             `${percentage}%`,
//             status,
//         ];
//     });
//     const csv = [headers, ...rows]
//         .map((r) => r.map((v) => `"${v}"`).join(","))
//         .join("\n");
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${className.replace(/\s+/g, "_")}_Results.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
// };

// // ─── Per-Student PDF Generator ───────────────────────────────────────────────
// const generateStudentPDF = (student, subjects, resultsMap) => {
<<<<<<< HEAD
//     const subjectRows = subjects.map(sub => {
//         const res = resultsMap[student.RollId]?.[sub.SubjectCode];
//         const marks = res ? Number(res.Marks) : null;
//         const passed = marks !== null && marks >= 35;
//         return { subjectName: sub.SubjectName, subjectCode: sub.SubjectCode, marks, passed };
//     });

//     const obtained = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
//     const total = subjects.length * 100;
//     const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
//     const overallPassed = subjectRows.every(r => r.marks === null || r.marks >= 35) && obtained > 0;

//     const html = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="UTF-8"/>
// <title>Marksheet - ${student.StudentName}</title>
// <style>
//   * { margin: 0; padding: 0; box-sizing: border-box; }
//   body { font-family: 'Segoe UI', sans-serif; padding: 50px; color: #1a1a2e; background: #fff; max-width: 700px; margin: 0 auto; }
//   .header { text-align: center; margin-bottom: 30px; }
//   .header h1 { font-size: 22px; font-weight: 800; color: #e74c3c; letter-spacing: 2px; border-bottom: 3px solid #e74c3c; padding-bottom: 12px; }
//   .header h2 { font-size: 15px; margin-top: 10px; color: #555; font-weight: 500; }
//   .student-info { display: flex; justify-content: space-between; background: #f8f9ff; border: 1px solid #e0e7ff; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; font-size: 13px; }
//   .student-info div { display: flex; flex-direction: column; gap: 4px; }
//   .student-info span { color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
//   .student-info strong { font-size: 14px; color: #1a1a2e; }
//   table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
//   th { background: #1a1a2e; color: #fff; padding: 10px 14px; text-align: left; font-weight: 600; }
//   th:last-child, th:nth-child(2) { text-align: center; }
//   td { padding: 10px 14px; border-bottom: 1px solid #eee; }
//   td:nth-child(2), td:last-child { text-align: center; }
//   tr:nth-child(even) td { background: #fafafa; }
//   .pass-badge { background: #dcfce7; color: #16a34a; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
//   .fail-badge { background: #fee2e2; color: #dc2626; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
//   .pending-badge { background: #fef9c3; color: #92400e; padding: 2px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
//   .summary { display: flex; gap: 0; border: 1px solid #e0e7ff; border-radius: 10px; overflow: hidden; margin-bottom: 24px; }
//   .summary-item { flex: 1; padding: 16px; text-align: center; border-right: 1px solid #e0e7ff; }
//   .summary-item:last-child { border-right: none; }
//   .summary-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
//   .summary-value { font-size: 22px; font-weight: 800; }
//   .result-banner { text-align: center; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px; }
//   .result-pass { background: #dcfce7; color: #16a34a; }
//   .result-fail { background: #fee2e2; color: #dc2626; }
//   .result-pending { background: #fef9c3; color: #92400e; }
//   .footer { font-size: 11px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
//   @media print { body { padding: 30px; } }
// </style>
// </head>
// <body>
=======
//     const subjectRows = subjects.map((sub) => {
//         const res = resultsMap[student.RollId]?.[sub.SubjectCode];
//         const marks = res ? Number(res.Marks) : null;
//         const passed = marks !== null && marks >= 35;
//         return {
//             subjectName: sub.SubjectName,
//             subjectCode: sub.SubjectCode,
//             marks,
//             passed,
//         };
//     });
//     const obtained = subjectRows.reduce((sum, r) => sum + (r.marks || 0), 0);
//     const total = subjects.length * 100;
//     const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
//     const overallPassed =
//         subjectRows.every((r) => r.marks === null || r.marks >= 35) && obtained > 0;

//     const html = `
// <!DOCTYPE html><html><head><meta charset="UTF-8"/>
// <title>Marksheet - ${student.StudentName}</title>
// <style>
//   *{margin:0;padding:0;box-sizing:border-box}
//   body{font-family:'Segoe UI',sans-serif;padding:50px;color:#1a1a2e;background:#fff;max-width:700px;margin:0 auto}
//   .header{text-align:center;margin-bottom:30px}
//   .header h1{font-size:22px;font-weight:800;color:#e74c3c;letter-spacing:2px;border-bottom:3px solid #e74c3c;padding-bottom:12px}
//   .header h2{font-size:15px;margin-top:10px;color:#555;font-weight:500}
//   .student-info{display:flex;justify-content:space-between;background:#f8f9ff;border:1px solid #e0e7ff;border-radius:8px;padding:16px 20px;margin-bottom:24px;font-size:13px}
//   .student-info div{display:flex;flex-direction:column;gap:4px}
//   .student-info span{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
//   .student-info strong{font-size:14px;color:#1a1a2e}
//   table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px}
//   th{background:#1a1a2e;color:#fff;padding:10px 14px;text-align:left;font-weight:600}
//   th:last-child,th:nth-child(2){text-align:center}
//   td{padding:10px 14px;border-bottom:1px solid #eee}
//   td:nth-child(2),td:last-child{text-align:center}
//   tr:nth-child(even) td{background:#fafafa}
//   .pass-badge{background:#dcfce7;color:#16a34a;padding:2px 10px;border-radius:20px;font-weight:600;font-size:12px}
//   .fail-badge{background:#fee2e2;color:#dc2626;padding:2px 10px;border-radius:20px;font-weight:600;font-size:12px}
//   .pending-badge{background:#fef9c3;color:#92400e;padding:2px 10px;border-radius:20px;font-weight:600;font-size:12px}
//   .summary{display:flex;gap:0;border:1px solid #e0e7ff;border-radius:10px;overflow:hidden;margin-bottom:24px}
//   .summary-item{flex:1;padding:16px;text-align:center;border-right:1px solid #e0e7ff}
//   .summary-item:last-child{border-right:none}
//   .summary-label{font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
//   .summary-value{font-size:22px;font-weight:800}
//   .result-banner{text-align:center;padding:14px;border-radius:8px;font-size:16px;font-weight:700;letter-spacing:1px;margin-bottom:24px}
//   .result-pass{background:#dcfce7;color:#16a34a}
//   .result-fail{background:#fee2e2;color:#dc2626}
//   .result-pending{background:#fef9c3;color:#92400e}
//   .footer{font-size:11px;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:16px}
//   @media print{body{padding:30px}}
// </style></head><body>
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//   <div class="header">
//     <h1>SRMS — Student Result Marksheet</h1>
//     <h2>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</h2>
//   </div>
<<<<<<< HEAD

=======
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//   <div class="student-info">
//     <div><span>Student Name</span><strong>${student.StudentName}</strong></div>
//     <div><span>Roll ID</span><strong>${student.RollId}</strong></div>
//     <div><span>Class</span><strong>${student.ClassId || "—"}</strong></div>
//     <div><span>Email</span><strong>${student.StudentEmail || "—"}</strong></div>
//   </div>
<<<<<<< HEAD

//   <table>
//     <thead>
//       <tr>
//         <th>Subject</th>
//         <th>Marks Obtained (/100)</th>
//         <th>Status</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${subjectRows.map(r => `
//         <tr>
//           <td>${r.subjectName}</td>
//           <td>${r.marks !== null ? `<strong>${r.marks}</strong>` : "<span style='color:#ccc'>Not Declared</span>"}</td>
//           <td>${r.marks === null ? '<span class="pending-badge">Pending</span>' : r.passed ? '<span class="pass-badge">Pass</span>' : '<span class="fail-badge">Fail</span>'}</td>
//         </tr>`).join("")}
//     </tbody>
//   </table>

//   <div class="summary">
//     <div class="summary-item">
//       <div class="summary-label">Obtained</div>
//       <div class="summary-value" style="color:#2563eb">${obtained}</div>
//     </div>
//     <div class="summary-item">
//       <div class="summary-label">Total</div>
//       <div class="summary-value" style="color:#333">${total}</div>
//     </div>
//     <div class="summary-item">
//       <div class="summary-label">Percentage</div>
//       <div class="summary-value" style="color:#e74c3c">${percentage}%</div>
//     </div>
//   </div>

//   <div class="result-banner ${obtained === 0 ? "result-pending" : overallPassed ? "result-pass" : "result-fail"}">
//     ${obtained === 0 ? "⏳ RESULT PENDING" : overallPassed ? "✅ RESULT: PASS" : "❌ RESULT: FAIL"}
//   </div>

//   <div class="footer">SRMS Admin Portal &bull; Confidential &bull; ${student.StudentName} &bull; ${student.RollId}</div>
// </body>
// </html>`;
=======
//   <table><thead><tr>
//     <th>Subject</th><th>Marks Obtained (/100)</th><th>Status</th>
//   </tr></thead><tbody>
//   ${subjectRows
//             .map(
//                 (r) => `<tr>
//     <td>${r.subjectName}</td>
//     <td>${r.marks !== null ? `<strong>${r.marks}</strong>` : "<span style='color:#ccc'>Not Declared</span>"}</td>
//     <td>${r.marks === null ? '<span class="pending-badge">Pending</span>' : r.passed ? '<span class="pass-badge">Pass</span>' : '<span class="fail-badge">Fail</span>'}</td>
//   </tr>`,
//             )
//             .join("")}
//   </tbody></table>
//   <div class="summary">
//     <div class="summary-item"><div class="summary-label">Obtained</div><div class="summary-value" style="color:#2563eb">${obtained}</div></div>
//     <div class="summary-item"><div class="summary-label">Total</div><div class="summary-value" style="color:#333">${total}</div></div>
//     <div class="summary-item"><div class="summary-label">Percentage</div><div class="summary-value" style="color:#e74c3c">${percentage}%</div></div>
//   </div>
//   <div class="result-banner ${obtained === 0 ? "result-pending" : overallPassed ? "result-pass" : "result-fail"}">
//     ${obtained === 0 ? "⏳ RESULT PENDING" : overallPassed ? "✅ RESULT: PASS" : "❌ RESULT: FAIL"}
//   </div>
//   <div class="footer">SRMS Admin Portal &bull; Confidential &bull; ${student.StudentName} &bull; ${student.RollId}</div>
// </body></html>`;
>>>>>>> 756f1b8 (Update theme for admin management dashboard)

//     const win = window.open("", "_blank");
//     win.document.write(html);
//     win.document.close();
//     win.print();
// };

<<<<<<< HEAD
// // ─── Download Buttons Component ───────────────────────────────────────────────
=======
// // ─── Download Buttons ─────────────────────────────────────────────────────────
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
// const DownloadButtons = ({ onClick, small = false }) => (
//     <div style={{ display: "flex", gap: "8px" }}>
//         <button
//             className={`btn ${small ? "btn-sm" : ""}`}
<<<<<<< HEAD
//             onClick={(e) => { e.stopPropagation(); onClick("pdf"); }}
//             style={{
//                 background: "#e74c3c", color: "#fff", border: "none",
//                 borderRadius: "6px", padding: small ? "4px 10px" : "7px 14px",
//                 fontSize: small ? "11px" : "12px", fontWeight: 600, cursor: "pointer",
//                 display: "flex", alignItems: "center", gap: "4px"
=======
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onClick("pdf");
//             }}
//             style={{
//                 background: "#e74c3c",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 padding: small ? "4px 10px" : "7px 14px",
//                 fontSize: small ? "11px" : "12px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             }}
//         >
//             📄 PDF
//         </button>
//         <button
//             className={`btn ${small ? "btn-sm" : ""}`}
<<<<<<< HEAD
//             onClick={(e) => { e.stopPropagation(); onClick("csv"); }}
//             style={{
//                 background: "#16a34a", color: "#fff", border: "none",
//                 borderRadius: "6px", padding: small ? "4px 10px" : "7px 14px",
//                 fontSize: small ? "11px" : "12px", fontWeight: 600, cursor: "pointer",
//                 display: "flex", alignItems: "center", gap: "4px"
=======
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onClick("csv");
//             }}
//             style={{
//                 background: "#16a34a",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 padding: small ? "4px 10px" : "7px 14px",
//                 fontSize: small ? "11px" : "12px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             }}
//         >
//             📊 CSV
//         </button>
//     </div>
// );

<<<<<<< HEAD
=======
// // ─── Skeletons ────────────────────────────────────────────────────────────────
// const ClassCardsSkeleton = () => (
//     <div
//         style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//             gap: "20px",
//         }}
//     >
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div className="section-card" key={i} style={{ padding: "20px" }}>
//                 <div
//                     className="skeleton"
//                     style={{
//                         width: 36,
//                         height: 36,
//                         borderRadius: "50%",
//                         margin: "0 auto 10px",
//                     }}
//                 />
//                 <div
//                     className="skeleton skeleton-text"
//                     style={{ width: "60%", margin: "0 auto 6px" }}
//                 />
//                 <div
//                     className="skeleton skeleton-text"
//                     style={{ width: "40%", margin: "0 auto 14px" }}
//                 />
//                 <div className="skeleton skeleton-btn" style={{ width: "100%" }} />
//             </div>
//         ))}
//     </div>
// );

// const DrilldownTableSkeleton = ({ colCount = 6 }) => (
//     <table className="data-table">
//         <tbody>
//             {[1, 2, 3, 4, 5].map((i) => (
//                 <tr key={i}>
//                     <td>
//                         <div className="skeleton skeleton-text" style={{ width: "80%" }} />
//                     </td>
//                     <td>
//                         <div className="skeleton skeleton-text" style={{ width: "60%" }} />
//                     </td>
//                     {Array.from({ length: colCount }).map((_, j) => (
//                         <td key={j}>
//                             <div
//                                 className="skeleton skeleton-text"
//                                 style={{ width: "40%" }}
//                             />
//                         </td>
//                     ))}
//                     <td>
//                         <div style={{ display: "flex", gap: 6 }}>
//                             <div className="skeleton skeleton-btn" style={{ width: 55 }} />
//                             <div className="skeleton skeleton-btn" style={{ width: 32 }} />
//                         </div>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// );

// const AddResultSkeleton = () => (
//     <div className="section-card" style={{ padding: "24px" }}>
//         <div
//             className="skeleton skeleton-title"
//             style={{ width: "30%", marginBottom: 20 }}
//         />
//         <div className="form-group" style={{ marginBottom: 20 }}>
//             <div
//                 className="skeleton skeleton-label"
//                 style={{ width: "20%", marginBottom: 8 }}
//             />
//             <div
//                 className="skeleton"
//                 style={{ height: 38, borderRadius: "var(--radius-sm)" }}
//             />
//         </div>
//         {[1, 2, 3].map((i) => (
//             <div
//                 key={i}
//                 style={{
//                     display: "flex",
//                     gap: 15,
//                     alignItems: "center",
//                     marginBottom: 12,
//                 }}
//             >
//                 <div className="skeleton skeleton-text" style={{ width: 150 }} />
//                 <div
//                     className="skeleton"
//                     style={{ width: 80, height: 34, borderRadius: "var(--radius-sm)" }}
//                 />
//                 <div className="skeleton skeleton-text" style={{ width: 30 }} />
//             </div>
//         ))}
//         <div className="form-actions" style={{ marginTop: 25 }}>
//             <div className="skeleton skeleton-btn" style={{ width: 120 }} />
//         </div>
//     </div>
// );

>>>>>>> 756f1b8 (Update theme for admin management dashboard)
// // ─── Results Page ─────────────────────────────────────────────────────────────
// const ResultsPage = () => {
//     const [activeTab, setActiveTab] = useState("view");
//     const [editData, setEditData] = useState(null);

//     const handleEditInitiate = (data) => {
//         setEditData(data);
//         setActiveTab("add");
//     };

//     return (
//         <div className="results-container">
//             <div className="content-header">
//                 <h1>Results Management</h1>
//                 <p>Manage and declare student exam scores by class.</p>
//             </div>
<<<<<<< HEAD

//             <div className="tab-bar">
//                 <button
//                     className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
//                     onClick={() => { setActiveTab("view"); setEditData(null); }}
=======
//             <div className="tab-bar">
//                 <button
//                     className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
//                     onClick={() => {
//                         setActiveTab("view");
//                         setEditData(null);
//                     }}
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                 >
//                     View Results
//                 </button>
//                 <button
//                     className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
//                     onClick={() => setActiveTab("add")}
//                 >
//                     {editData?._id ? "Update Result" : "Declare Result"}
//                 </button>
//             </div>
<<<<<<< HEAD

=======
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             {activeTab === "view" && <ViewResultsTab onEdit={handleEditInitiate} />}
//             {activeTab === "add" && (
//                 <AddResultTab
//                     editData={editData}
<<<<<<< HEAD
//                     onSuccess={() => { setEditData(null); setActiveTab("view"); }}
=======
//                     onSuccess={() => {
//                         setEditData(null);
//                         setActiveTab("view");
//                     }}
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                 />
//             )}
//         </div>
//     );
// };

// // ─── View Results Tab ─────────────────────────────────────────────────────────
// const ViewResultsTab = ({ onEdit }) => {
//     const [classes, setClasses] = useState([]);
//     const [selectedClassId, setSelectedClassId] = useState(null);
//     const [allResults, setAllResults] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchRollId, setSearchRollId] = useState("");

//     const fetchData = useCallback(async () => {
//         try {
//             setLoading(true);
//             const [classRes, studRes, subRes, resData] = await Promise.all([
//                 axios.get(`${API}/classes/get`),
//                 axios.get(`${API}/students/get`),
//                 axios.get(`${API}/subjects/all`),
<<<<<<< HEAD
//                 axios.get(`${API}/results/all`)
=======
//                 axios.get(`${API}/results/all`),
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             ]);
//             setClasses(classRes.data);
//             setStudents(studRes.data);
//             setSubjects(subRes.data);
//             const resultsArray = resData.data?.data || resData.data || [];
//             setAllResults(Array.isArray(resultsArray) ? resultsArray : []);
//         } catch (err) {
//             console.error("Fetch error", err);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

<<<<<<< HEAD
//     useEffect(() => { fetchData(); }, [fetchData]);

//     // Build results map and helpers
=======
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//     const buildResultsMap = (results) =>
//         results.reduce((acc, curr) => {
//             if (!acc[curr.RollId]) acc[curr.RollId] = {};
//             acc[curr.RollId][curr.SubjectCode] = curr;
//             return acc;
//         }, {});

//     const handleClassDownload = (cls, type) => {
<<<<<<< HEAD
//         const classStudents = students.filter(s => s.ClassId === cls.ClassName);
//         const classSubjects = subjects.filter(s => s.ClassId === cls.ClassName);
=======
//         const classStudents = students.filter((s) => s.ClassId === cls.ClassName);
//         const classSubjects = subjects.filter((s) => s.ClassId === cls.ClassName);
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//         const resultsMap = buildResultsMap(allResults);
//         if (classStudents.length === 0 || classSubjects.length === 0) {
//             alert("No students or subjects found for this class.");
//             return;
//         }
<<<<<<< HEAD
//         if (type === "pdf") generatePDF(cls.ClassName, classStudents, classSubjects, resultsMap);
=======
//         if (type === "pdf")
//             generatePDF(cls.ClassName, classStudents, classSubjects, resultsMap);
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//         else generateCSV(cls.ClassName, classStudents, classSubjects, resultsMap);
//     };

//     // ── Drill-down view ──
//     if (selectedClassId) {
//         const classStudents = students
<<<<<<< HEAD
//             .filter(s => s.ClassId === selectedClassId)
//             .filter(s => s.RollId.toLowerCase().includes(searchRollId.toLowerCase()));
//         const classSubjects = subjects.filter(sub => sub.ClassId === selectedClassId);
//         const classResultsMap = buildResultsMap(allResults);

//         const handleDrillDownload = (type) => {
//             const allClassStudents = students.filter(s => s.ClassId === selectedClassId);
//             if (type === "pdf") generatePDF(selectedClassId, allClassStudents, classSubjects, classResultsMap);
//             else generateCSV(selectedClassId, allClassStudents, classSubjects, classResultsMap);
=======
//             .filter((s) => s.ClassId === selectedClassId)
//             .filter((s) =>
//                 s.RollId.toLowerCase().includes(searchRollId.toLowerCase()),
//             );
//         const classSubjects = subjects.filter(
//             (sub) => sub.ClassId === selectedClassId,
//         );
//         const classResultsMap = buildResultsMap(allResults);

//         const handleDrillDownload = (type) => {
//             const allClassStudents = students.filter(
//                 (s) => s.ClassId === selectedClassId,
//             );
//             if (type === "pdf")
//                 generatePDF(
//                     selectedClassId,
//                     allClassStudents,
//                     classSubjects,
//                     classResultsMap,
//                 );
//             else
//                 generateCSV(
//                     selectedClassId,
//                     allClassStudents,
//                     classSubjects,
//                     classResultsMap,
//                 );
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//         };

//         return (
//             <div className="section-card">
<<<<<<< HEAD
//                 {/* Header Row */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
//                     <button className="btn btn-sm" onClick={() => setSelectedClassId(null)}>← Back to Classes</button>
//                     <h3 style={{ margin: 0 }}>Class: {selectedClassId}</h3>
//                     <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
=======
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         marginBottom: "20px",
//                         flexWrap: "wrap",
//                         gap: "10px",
//                         padding: "20px 20px 0",
//                     }}
//                 >
//                     <button
//                         className="btn btn-sm"
//                         onClick={() => setSelectedClassId(null)}
//                     >
//                         ← Back to Classes
//                     </button>
//                     <h3 style={{ margin: 0 }}>Class: {selectedClassId}</h3>
//                     <div
//                         style={{
//                             display: "flex",
//                             gap: "10px",
//                             alignItems: "center",
//                             flexWrap: "wrap",
//                         }}
//                     >
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                         <input
//                             type="text"
//                             placeholder="Search Roll ID..."
//                             value={searchRollId}
//                             onChange={(e) => setSearchRollId(e.target.value)}
<<<<<<< HEAD
//                             style={{ padding: "5px 10px", borderRadius: "4px", border: "1px solid #ddd" }}
=======
//                             style={{
//                                 padding: "5px 10px",
//                                 borderRadius: "4px",
//                                 border: "1px solid var(--border)",
//                                 background: "rgba(255,255,255,0.05)",
//                                 color: "var(--text-primary)",
//                             }}
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                         />
//                         <DownloadButtons onClick={handleDrillDownload} small />
//                     </div>
//                 </div>
<<<<<<< HEAD

//                 <div className="table-wrapper" style={{ overflowX: "auto" }}>
//                     <table className="data-table">
//                         <thead>
//                             <tr>
//                                 <th>Student Name</th>
//                                 <th>Roll ID</th>
//                                 {classSubjects.map(sub => (
//                                     <th key={sub.SubjectCode}>{sub.SubjectName}<br /><span style={{ fontWeight: 400, fontSize: "11px" }}>/100</span></th>
//                                 ))}
//                                 <th>Obtained</th>
//                                 <th>Total</th>
//                                 <th>%</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {classStudents.map(student => {
//                                 const subjectMarks = classSubjects.map(sub => {
//                                     const res = classResultsMap[student.RollId]?.[sub.SubjectCode];
//                                     return res ? Number(res.Marks) : null;
//                                 });
//                                 const obtained = subjectMarks.reduce((sum, m) => sum + (m || 0), 0);
//                                 const total = classSubjects.length * 100;
//                                 const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";

//                                 return (
//                                     <tr key={student.RollId}>
//                                         <td>{student.StudentName}</td>
//                                         <td>{student.RollId}</td>
//                                         {classSubjects.map(sub => {
//                                             const res = classResultsMap[student.RollId]?.[sub.SubjectCode];
//                                             return (
//                                                 <td key={sub.SubjectCode}>
//                                                     {res ? <strong>{res.Marks}</strong> : <span style={{ color: "#ccc" }}>—</span>}
//                                                 </td>
//                                             );
//                                         })}
//                                         <td><strong style={{ color: "#2563eb" }}>{obtained}</strong></td>
//                                         <td style={{ color: "#888" }}>{total}</td>
//                                         <td><strong style={{ color: obtained === 0 ? "#ccc" : "#e74c3c" }}>{percentage}%</strong></td>
//                                         <td>
//                                             <div style={{ display: "flex", gap: "6px" }}>
//                                                 <button
//                                                     className="btn btn-sm"
//                                                     onClick={() => {
//                                                         const firstRes = Object.values(classResultsMap[student.RollId] || {})[0];
//                                                         onEdit(firstRes || { RollId: student.RollId });
//                                                     }}
//                                                 >
//                                                     {classResultsMap[student.RollId] ? "Edit" : "Declare"}
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-sm"
//                                                     title="Download student marksheet"
//                                                     onClick={() => generateStudentPDF(student, classSubjects, classResultsMap)}
//                                                     style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
//                                                 >
//                                                     📄
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {classSubjects.length === 0 && (
//                     <div style={{ marginTop: "15px", color: "#e67e22", fontWeight: "bold" }}>
//                         ⚠️ No subjects defined for this class. Results cannot be declared until subjects are added.
=======
//                 <div className="table-wrapper">
//                     {loading ? (
//                         <DrilldownTableSkeleton colCount={classSubjects.length || 3} />
//                     ) : (
//                         <table className="data-table">
//                             <thead>
//                                 <tr>
//                                     <th>Student Name</th>
//                                     <th>Roll ID</th>
//                                     {classSubjects.map((sub) => (
//                                         <th key={sub.SubjectCode}>
//                                             {sub.SubjectName}
//                                             <br />
//                                             <span style={{ fontWeight: 400, fontSize: "11px" }}>
//                                                 /100
//                                             </span>
//                                         </th>
//                                     ))}
//                                     <th>Obtained</th>
//                                     <th>Total</th>
//                                     <th>%</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {classStudents.map((student) => {
//                                     const subjectMarks = classSubjects.map((sub) => {
//                                         const res =
//                                             classResultsMap[student.RollId]?.[sub.SubjectCode];
//                                         return res ? Number(res.Marks) : null;
//                                     });
//                                     const obtained = subjectMarks.reduce(
//                                         (sum, m) => sum + (m || 0),
//                                         0,
//                                     );
//                                     const total = classSubjects.length * 100;
//                                     const percentage =
//                                         total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
//                                     return (
//                                         <tr key={student.RollId}>
//                                             <td>{student.StudentName}</td>
//                                             <td>{student.RollId}</td>
//                                             {classSubjects.map((sub) => {
//                                                 const res =
//                                                     classResultsMap[student.RollId]?.[sub.SubjectCode];
//                                                 return (
//                                                     <td key={sub.SubjectCode}>
//                                                         {res ? (
//                                                             <strong>{res.Marks}</strong>
//                                                         ) : (
//                                                             <span style={{ color: "#ccc" }}>—</span>
//                                                         )}
//                                                     </td>
//                                                 );
//                                             })}
//                                             <td>
//                                                 <strong style={{ color: "#2563eb" }}>{obtained}</strong>
//                                             </td>
//                                             <td style={{ color: "#888" }}>{total}</td>
//                                             <td>
//                                                 <strong
//                                                     style={{ color: obtained === 0 ? "#ccc" : "#e74c3c" }}
//                                                 >
//                                                     {percentage}%
//                                                 </strong>
//                                             </td>
//                                             <td>
//                                                 <div style={{ display: "flex", gap: "6px" }}>
//                                                     <button
//                                                         className="btn btn-sm"
//                                                         onClick={() => {
//                                                             const firstRes = Object.values(
//                                                                 classResultsMap[student.RollId] || {},
//                                                             )[0];
//                                                             onEdit(firstRes || { RollId: student.RollId });
//                                                         }}
//                                                     >
//                                                         {classResultsMap[student.RollId]
//                                                             ? "Edit"
//                                                             : "Declare"}
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-sm"
//                                                         onClick={() =>
//                                                             generateStudentPDF(
//                                                                 student,
//                                                                 classSubjects,
//                                                                 classResultsMap,
//                                                             )
//                                                         }
//                                                         style={{
//                                                             background: "#e74c3c",
//                                                             color: "#fff",
//                                                             border: "none",
//                                                             borderRadius: "6px",
//                                                             cursor: "pointer",
//                                                             fontWeight: 600,
//                                                         }}
//                                                     >
//                                                         📄
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//                 {!loading && classSubjects.length === 0 && (
//                     <div
//                         style={{
//                             padding: "16px 20px",
//                             color: "#e67e22",
//                             fontWeight: "bold",
//                         }}
//                     >
//                         ⚠️ No subjects defined for this class. Results cannot be declared
//                         until subjects are added.
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     // ── Class Cards ──
//     return (
//         <div className="class-selection-container">
<<<<<<< HEAD
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//                 <h3>Select a Class</h3>
//                 <button onClick={fetchData} className="btn btn-sm">Refresh</button>
//             </div>
//             {loading ? <p>Loading classes...</p> : (
//                 <div className="class-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
//                     {classes.map(cls => {
//                         const classResults = allResults.filter(r => {
//                             const student = students.find(s => s.RollId === r.RollId);
//                             return student?.ClassId === cls.ClassName;
//                         });
//                         const hasResults = classResults.length > 0;

//                         return (
//                             <div
//                                 key={cls._id}
//                                 className="section-card class-card"
//                                 style={{ padding: "20px", border: "1px solid #eee", borderRadius: "10px", cursor: "pointer" }}
//                             >
//                                 {/* Clickable area */}
//                                 <div onClick={() => setSelectedClassId(cls.ClassName)} style={{ textAlign: "center", marginBottom: "14px" }}>
//                                     <div style={{ fontSize: "24px" }}>{hasResults ? "✅" : "📁"}</div>
//                                     <h4 style={{ margin: "8px 0 4px" }}>{cls.ClassName}</h4>
//                                     <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{classResults.length} Results Declared</p>
//                                 </div>

//                                 {/* Download buttons */}
//                                 <div style={{ display: "flex", justifyContent: "center" }}>
//                                     <DownloadButtons onClick={(type) => handleClassDownload(cls, type)} small />
=======
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "20px",
//                 }}
//             >
//                 <h3>Select a Class</h3>
//                 <button onClick={fetchData} className="btn btn-sm">
//                     Refresh
//                 </button>
//             </div>
//             {loading ? (
//                 <ClassCardsSkeleton />
//             ) : (
//                 <div
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//                         gap: "20px",
//                     }}
//                 >
//                     {classes.map((cls) => {
//                         const classResults = allResults.filter((r) => {
//                             const student = students.find((s) => s.RollId === r.RollId);
//                             return student?.ClassId === cls.ClassName;
//                         });
//                         const hasResults = classResults.length > 0;
//                         return (
//                             <div
//                                 key={cls._id}
//                                 className="section-card"
//                                 style={{ padding: "20px", cursor: "pointer" }}
//                             >
//                                 <div
//                                     onClick={() => setSelectedClassId(cls.ClassName)}
//                                     style={{ textAlign: "center", marginBottom: "14px" }}
//                                 >
//                                     <div style={{ fontSize: "24px" }}>
//                                         {hasResults ? "✅" : "📁"}
//                                     </div>
//                                     <h4 style={{ margin: "8px 0 4px" }}>{cls.ClassName}</h4>
//                                     <p
//                                         style={{
//                                             fontSize: "13px",
//                                             color: "var(--text-muted)",
//                                             margin: 0,
//                                         }}
//                                     >
//                                         {classResults.length} Results Declared
//                                     </p>
//                                 </div>
//                                 <div style={{ display: "flex", justifyContent: "center" }}>
//                                     <DownloadButtons
//                                         onClick={(type) => handleClassDownload(cls, type)}
//                                         small
//                                     />
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// // ─── Add / Edit Result Tab ────────────────────────────────────────────────────
// const AddResultTab = ({ editData, onSuccess }) => {
//     const [students, setStudents] = useState([]);
//     const [allSubjects, setAllSubjects] = useState([]);
//     const [filteredSubjects, setFilteredSubjects] = useState([]);
//     const [marksMap, setMarksMap] = useState({});
//     const [selectedRollId, setSelectedRollId] = useState("");
//     const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
//     const [initLoading, setInitLoading] = useState(true);
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const loadInitialData = async () => {
//             try {
//                 const [st, sub] = await Promise.all([
//                     axios.get(`${API}/students/get`),
<<<<<<< HEAD
//                     axios.get(`${API}/subjects/all`)
=======
//                     axios.get(`${API}/subjects/all`),
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                 ]);
//                 setStudents(st.data);
//                 setAllSubjects(sub.data);
//             } catch (err) {
//                 setError("Error loading form data.");
<<<<<<< HEAD
=======
//             } finally {
//                 setInitLoading(false);
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//             }
//         };
//         loadInitialData();
//     }, []);

//     useEffect(() => {
//         if (editData) {
//             setSelectedRollId(editData.RollId);
//             if (editData.SubjectCode) {
//                 setMarksMap({ [editData.SubjectCode]: editData.Marks });
//             }
//         }
//     }, [editData]);

//     useEffect(() => {
//         if (!selectedRollId) return setFilteredSubjects([]);
<<<<<<< HEAD
//         const student = students.find(s => s.RollId === selectedRollId);
//         if (student) {
//             setFilteredSubjects(allSubjects.filter(sub => sub.ClassId === student.ClassId));
//         }
//     }, [selectedRollId, students, allSubjects]);

//     // Summary calculations
//     const totalMarks = filteredSubjects.length * 100;
//     const obtainedMarks = Object.values(marksMap).reduce((sum, v) => sum + (Number(v) || 0), 0);
//     const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(1) : "0.0";
=======
//         const student = students.find((s) => s.RollId === selectedRollId);
//         if (student) {
//             setFilteredSubjects(
//                 allSubjects.filter((sub) => sub.ClassId === student.ClassId),
//             );
//         }
//     }, [selectedRollId, students, allSubjects]);

//     const totalMarks = filteredSubjects.length * 100;
//     const obtainedMarks = Object.values(marksMap).reduce(
//         (sum, v) => sum + (Number(v) || 0),
//         0,
//     );
//     const percentage =
//         totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(1) : "0.0";
>>>>>>> 756f1b8 (Update theme for admin management dashboard)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);
//         try {
//             if (editData?._id) {
//                 await axios.put(`${API}/results/update/${editData._id}`, {
//                     RollId: selectedRollId,
//                     SubjectCode: editData.SubjectCode,
<<<<<<< HEAD
//                     Marks: Number(marksMap[editData.SubjectCode])
//                 });
//             } else {
//                 const entries = Object.entries(marksMap).filter(([_, v]) => v !== "");
//                 if (entries.length === 0) throw new Error("Please enter marks for at least one subject.");
//                 await Promise.all(entries.map(([SubjectCode, Marks]) =>
//                     axios.post(`${API}/results/addResult`, {
//                         RollId: selectedRollId,
//                         SubjectCode,
//                         Marks: Number(Marks)
//                     })
//                 ));
//             }
//             onSuccess();
//         } catch (err) {
//             setError(err.response?.data?.message || err.message || "Operation failed.");
=======
//                     Marks: Number(marksMap[editData.SubjectCode]),
//                 });
//             } else {
//                 const entries = Object.entries(marksMap).filter(([_, v]) => v !== "");
//                 if (entries.length === 0)
//                     throw new Error("Please enter marks for at least one subject.");
//                 await Promise.all(
//                     entries.map(([SubjectCode, Marks]) =>
//                         axios.post(`${API}/results/addResult`, {
//                             RollId: selectedRollId,
//                             SubjectCode,
//                             Marks: Number(Marks),
//                         }),
//                     ),
//                 );
//             }
//             onSuccess();
//         } catch (err) {
//             setError(
//                 err.response?.data?.message || err.message || "Operation failed.",
//             );
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//         } finally {
//             setLoading(false);
//         }
//     };

<<<<<<< HEAD
//     return (
//         <div className="section-card">
//             <h3>{editData?._id ? "Edit Marks" : "Declare Marks"}</h3>
//             {error && <div style={{ color: "red", marginBottom: "15px" }}>⚠ {error}</div>}

//             <form onSubmit={handleSubmit}>
//                 <div className="form-group" style={{ marginBottom: "20px" }}>
//                     <label>Student</label>
//                     <select
//                         value={selectedRollId}
//                         disabled={!!editData?._id}
//                         onChange={(e) => setSelectedRollId(e.target.value)}
//                         required
//                         style={{ width: "100%", padding: "8px" }}
//                     >
//                         <option value="">-- Select Student --</option>
//                         {students.map(s => (
//                             <option key={s._id} value={s.RollId}>{s.StudentName} ({s.RollId})</option>
//                         ))}
//                     </select>
//                 </div>

//                 {filteredSubjects.length > 0 ? (
//                     <>
//                         <div className="marks-input-area">
//                             <label style={{ fontWeight: "bold" }}>Enter Subject Marks:</label>
//                             {filteredSubjects.map(sub => (
//                                 <div key={sub._id} style={{ display: "flex", gap: "15px", alignItems: "center", marginTop: "10px" }}>
//                                     <span style={{ width: "150px" }}>{sub.SubjectName}</span>
//                                     <input
//                                         type="number"
//                                         min="0" max="100"
//                                         value={marksMap[sub.SubjectCode] || ""}
//                                         onChange={(e) => setMarksMap({ ...marksMap, [sub.SubjectCode]: e.target.value })}
//                                         style={{ width: "80px", padding: "5px" }}
//                                     />
//                                     <span style={{ color: "#888", fontSize: "12px" }}>/100</span>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Summary Box */}
//                         <div style={{
//                             marginTop: "20px", padding: "14px 18px",
//                             background: "#f0f4ff", borderRadius: "8px",
//                             border: "1px solid #c7d7fc",
//                             display: "flex", gap: "32px", flexWrap: "wrap"
//                         }}>
//                             <div>
//                                 <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>OBTAINED</div>
//                                 <div style={{ fontWeight: 700, fontSize: "18px", color: "#2563eb" }}>{obtainedMarks}</div>
//                             </div>
//                             <div>
//                                 <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>TOTAL</div>
//                                 <div style={{ fontWeight: 700, fontSize: "18px", color: "#333" }}>{totalMarks}</div>
//                             </div>
//                             <div>
//                                 <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>PERCENTAGE</div>
//                                 <div style={{ fontWeight: 700, fontSize: "18px", color: "#e74c3c" }}>{percentage}%</div>
//                             </div>
//                         </div>
//                     </>
//                 ) : selectedRollId && (
//                     <p style={{ color: "orange" }}>No subjects available for this student's class.</p>
//                 )}

//                 <div className="form-actions" style={{ marginTop: "25px", display: "flex", gap: "10px", alignItems: "center" }}>
//                     <button
//                         type="submit"
//                         className="btn btn-primary"
//                         disabled={loading || !selectedRollId || filteredSubjects.length === 0}
=======
//     if (initLoading) return <AddResultSkeleton />;

//     return (
//         <div className="section-card">
//             <div style={{ padding: "20px 24px 0" }}>
//                 <h3>{editData?._id ? "Edit Marks" : "Declare Marks"}</h3>
//             </div>
//             {error && (
//                 <div className="alert alert-error" style={{ margin: "16px 24px 0" }}>
//                     ⚠ {error}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-section">
//                     <div className="form-group" style={{ marginBottom: "20px" }}>
//                         <label>Student</label>
//                         <select
//                             value={selectedRollId}
//                             disabled={!!editData?._id}
//                             onChange={(e) => setSelectedRollId(e.target.value)}
//                             required
//                         >
//                             <option value="">-- Select Student --</option>
//                             {students.map((s) => (
//                                 <option key={s._id} value={s.RollId}>
//                                     {s.StudentName} ({s.RollId})
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {filteredSubjects.length > 0 ? (
//                         <>
//                             <div className="marks-input-area">
//                                 <label
//                                     style={{
//                                         fontWeight: "bold",
//                                         display: "block",
//                                         marginBottom: 8,
//                                     }}
//                                 >
//                                     Enter Subject Marks:
//                                 </label>
//                                 {filteredSubjects.map((sub) => (
//                                     <div
//                                         key={sub._id}
//                                         style={{
//                                             display: "flex",
//                                             gap: "15px",
//                                             alignItems: "center",
//                                             marginBottom: "10px",
//                                         }}
//                                     >
//                                         <span
//                                             style={{ width: "150px", color: "var(--text-secondary)" }}
//                                         >
//                                             {sub.SubjectName}
//                                         </span>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="100"
//                                             value={marksMap[sub.SubjectCode] || ""}
//                                             onChange={(e) =>
//                                                 setMarksMap({
//                                                     ...marksMap,
//                                                     [sub.SubjectCode]: e.target.value,
//                                                 })
//                                             }
//                                             style={{
//                                                 width: "80px",
//                                                 padding: "5px",
//                                                 background: "rgba(255,255,255,0.05)",
//                                                 border: "1px solid var(--border)",
//                                                 borderRadius: "var(--radius-sm)",
//                                                 color: "var(--text-primary)",
//                                             }}
//                                         />
//                                         <span
//                                             style={{ color: "var(--text-muted)", fontSize: "12px" }}
//                                         >
//                                             /100
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div
//                                 style={{
//                                     marginTop: "20px",
//                                     padding: "14px 18px",
//                                     background: "rgba(255,255,255,0.04)",
//                                     borderRadius: "8px",
//                                     border: "1px solid var(--border)",
//                                     display: "flex",
//                                     gap: "32px",
//                                     flexWrap: "wrap",
//                                 }}
//                             >
//                                 <div>
//                                     <div
//                                         style={{
//                                             fontSize: "11px",
//                                             color: "var(--text-muted)",
//                                             marginBottom: "2px",
//                                         }}
//                                     >
//                                         OBTAINED
//                                     </div>
//                                     <div
//                                         style={{
//                                             fontWeight: 700,
//                                             fontSize: "18px",
//                                             color: "#60a5fa",
//                                         }}
//                                     >
//                                         {obtainedMarks}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div
//                                         style={{
//                                             fontSize: "11px",
//                                             color: "var(--text-muted)",
//                                             marginBottom: "2px",
//                                         }}
//                                     >
//                                         TOTAL
//                                     </div>
//                                     <div
//                                         style={{
//                                             fontWeight: 700,
//                                             fontSize: "18px",
//                                             color: "var(--text-primary)",
//                                         }}
//                                     >
//                                         {totalMarks}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div
//                                         style={{
//                                             fontSize: "11px",
//                                             color: "var(--text-muted)",
//                                             marginBottom: "2px",
//                                         }}
//                                     >
//                                         PERCENTAGE
//                                     </div>
//                                     <div
//                                         style={{
//                                             fontWeight: 700,
//                                             fontSize: "18px",
//                                             color: "#e74c3c",
//                                         }}
//                                     >
//                                         {percentage}%
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         selectedRollId && (
//                             <p style={{ color: "var(--warning-text)" }}>
//                                 No subjects available for this student's class.
//                             </p>
//                         )
//                     )}
//                 </div>

//                 <div className="form-actions">
//                     <button
//                         type="submit"
//                         className="btn btn-primary"
//                         disabled={
//                             loading || !selectedRollId || filteredSubjects.length === 0
//                         }
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                     >
//                         {loading ? "Saving..." : "Save Results"}
//                     </button>
//                     {selectedRollId && filteredSubjects.length > 0 && (
//                         <button
//                             type="button"
//                             className="btn btn-sm"
<<<<<<< HEAD
//                             title="Download this student's marksheet as PDF"
//                             style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 14px", fontWeight: 600, cursor: "pointer" }}
//                             onClick={() => {
//                                 const student = students.find(s => s.RollId === selectedRollId);
//                                 if (!student) return;
//                                 const previewMap = { [selectedRollId]: {} };
//                                 filteredSubjects.forEach(sub => {
//                                     if (marksMap[sub.SubjectCode] !== undefined && marksMap[sub.SubjectCode] !== "") {
//                                         previewMap[selectedRollId][sub.SubjectCode] = { Marks: marksMap[sub.SubjectCode] };
=======
//                             style={{
//                                 background: "#e74c3c",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: "6px",
//                                 padding: "8px 14px",
//                                 fontWeight: 600,
//                                 cursor: "pointer",
//                             }}
//                             onClick={() => {
//                                 const student = students.find(
//                                     (s) => s.RollId === selectedRollId,
//                                 );
//                                 if (!student) return;
//                                 const previewMap = { [selectedRollId]: {} };
//                                 filteredSubjects.forEach((sub) => {
//                                     if (
//                                         marksMap[sub.SubjectCode] !== undefined &&
//                                         marksMap[sub.SubjectCode] !== ""
//                                     ) {
//                                         previewMap[selectedRollId][sub.SubjectCode] = {
//                                             Marks: marksMap[sub.SubjectCode],
//                                         };
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
//                                     }
//                                 });
//                                 generateStudentPDF(student, filteredSubjects, previewMap);
//                             }}
//                         >
//                             📄 Download Marksheet
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ResultsPage;

<<<<<<< HEAD













import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import '../style/ResultsPage.css';

const API = "http://localhost:5003/api";

const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]); // Now used in logic
    const [allResults, setAllResults] = useState([]);
    const [loading, setLoading] = useState(true); // Now used for UI state

    // Search & Filter Logic
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");
=======
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../style/ResultsPage.css";

const API = "http://localhost:5003/api";

// ─── EXPORT UTILITIES ──────────────────────────────────────────────────────
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
        
        // LOGIC: Must be GREATER than 35 to pass
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

// const exportToPDF = (className, classStudents, classSubjects, allResults) => {
//     const rows = classStudents.map(student => {
//         const subjectResults = classSubjects.map(sub => {
//             const res = allResults.find(r => r.RollId === student.RollId && r.SubjectCode === sub.SubjectCode);
//             return res ? Number(res.Marks) : null;
//         });
//         const obtained = subjectResults.reduce((sum, m) => sum + (m || 0), 0);
//         const total = classSubjects.length * 100;
//         const percentage = total > 0 ? ((obtained / total) * 100).toFixed(1) : "0.0";
        
//         // LOGIC: All subjects must be > 35
//         const passed = subjectResults.every(m => m !== null && m > 35) && obtained > 0;
        
//         return { student, subjectResults, obtained, total, percentage, passed };
//     });

//     const html = `
//         <html>
//             <body class="print-body">
//                 <div class="print-report-header">
//                     <h1>SRMS — RESULTS</h1>
//                     <h2>Class: ${className}</h2>
//                 </div>
//                 <table class="print-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Roll ID</th>
//                             ${classSubjects.map(s => `<th>${s.SubjectName}</th>`).join("")}
//                             <th>Obt.</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${rows.map(row => `
//                             <tr>
//                                 <td>${row.student.StudentName || "N/A"}</td>
//                                 <td>${row.student.RollId}</td>
//                                 ${row.subjectResults.map(m => `<td>${m ?? "—"}</td>`).join("")}
//                                 <td>${row.obtained}</td>
//                                 <td class="${row.passed ? 'pass' : 'fail'}">${row.passed ? 'Pass' : 'Fail'}</td>
//                             </tr>
//                         `).join("")}
//                     </tbody>
//                 </table>
//             </body>
//         </html>`;
//     const win = window.open("", "_blank");
//     win.document.write(html);
//     document.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => win.document.head.appendChild(s.cloneNode(true)));
//     win.document.close();
//     win.onload = () => setTimeout(() => win.print(), 500);
// };

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
        </html>
    `;

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
        
        // Logic: Fail if marks are 35 or below
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

                    <div class="signature-section">
                        <div class="sig-box">Class Teacher</div>
                        <div class="sig-box">Parent/Guardian</div>
                        <div class="sig-box">Principal</div>
                    </div>
                </div>
            </body>
        </html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    // This line ensures your external CSS is applied to the new print window
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => win.document.head.appendChild(s.cloneNode(true)));
    win.document.close();
    win.onload = () => setTimeout(() => win.print(), 500);
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
const ResultsPage = () => {
    const [activeTab, setActiveTab] = useState("view");
    const [editData, setEditData] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [classes, setClasses] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
>>>>>>> 756f1b8 (Update theme for admin management dashboard)

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

    useEffect(() => { fetchData(); }, [fetchData, refreshTrigger]);

<<<<<<< HEAD
    // Deletion Logic
    const handleDeleteClassResults = async (className) => {
        if (window.confirm(`Delete all results for ${className}?`)) {
            try {
                const classStuds = students.filter(s => s.ClassId === className);
                await Promise.all(classStuds.map(s => axios.delete(`${API}/results/deleteByRoll/${s.RollId}`)));
                fetchData();
            } catch (err) { alert("Failed to delete class results."); }
        }
    };

    const handleDeleteSingle = async (rollId, name) => {
        if (window.confirm(`Delete results for ${name}?`)) {
            try {
                await axios.delete(`${API}/results/deleteByRoll/${rollId}`);
                fetchData();
            } catch (err) { alert("Failed to delete student result."); }
        }
    };

    // Filter Logic: Matches image_e46afe.png requirement
    const filteredStudents = students.filter(s => {
        const matchesClass = selectedClass === "All Classes" || s.ClassId === selectedClass;
        const matchesSearch = 
            s.StudentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.RollId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.StudentEmail?.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Only show students who have subjects to assign
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
                    {/* Class Cards with Delete Option */}
                    <div className="class-grid">
                        {classes.map(cls => (
                            <div className="class-card" key={cls._id}>
                                <button className="delete-card-btn" onClick={() => handleDeleteClassResults(cls.ClassName)} title="Delete Class Results">🗑️</button>
                                <div className="card-icon">{allResults.some(r => students.find(s => s.RollId === r.RollId)?.ClassId === cls.ClassName) ? "✅" : "📁"}</div>
                                <div className="class-name">{cls.ClassName}</div>
                                <div className="results-count">Results Declared</div>
                            </div>
                        ))}
                    </div>

                    {/* Searchable Student List */}
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
                                                    <button className="btn btn-sm">Edit</button>
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
=======
    const handleEditInitiate = (data) => {
        setEditData(data);
        setActiveTab("add");
    };

    if (loading) return <div className="loading-container"><h3>Loading...</h3></div>;

    return (
        <div className="results-container">
            <div className="content-header">
                <h1>Results Management</h1>
                <p>Manage and declare student exam scores by class.</p>
            </div>
            <div className="tab-bar">
                <button className={`tab-btn ${activeTab === "view" ? "active" : ""}`} onClick={() => { setActiveTab("view"); setEditData(null); }}>View Results</button>
                <button className={`tab-btn ${activeTab === "add" ? "active" : ""}`} onClick={() => setActiveTab("add")}>{editData?.RollId ? "Update Result" : "Declare Result"}</button>
            </div>
            
            {activeTab === "view" && <ViewResultsTab onEdit={handleEditInitiate} classes={classes} students={students} subjects={subjects} allResults={allResults} />}
            
            {activeTab === "add" && (
                <AddResultTab
                    editData={editData}
                    classes={classes}
                    students={students}
                    subjects={subjects}
                    allResults={allResults}
                    onSuccess={() => {
                        setRefreshTrigger(prev => prev + 1);
                        setActiveTab("view");
                        setEditData(null);
                    }}
                />
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
            )}
        </div>
    );
};

<<<<<<< HEAD
export default ResultsPage;
=======
// ─── VIEW TAB ──────────────────────────────────────────────────────────────
const ViewResultsTab = ({ onEdit, classes, students, subjects, allResults }) => {
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [searchRollId, setSearchRollId] = useState("");

    if (selectedClassId) {
        const classStudents = students.filter(s => s.ClassId === selectedClassId && s.RollId.toLowerCase().includes(searchRollId.toLowerCase()));
        const classSubjects = subjects.filter(sub => sub.ClassId === selectedClassId);
        return (
            <div className="section-card">
                <div className="drilldown-header">
                    <button className="tab-btn" onClick={() => setSelectedClassId(null)}>← Back</button>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input className="search-input" placeholder="Search Roll..." onChange={(e) => setSearchRollId(e.target.value)} />
                        <button className="btn-pdf" onClick={() => exportToPDF(selectedClassId, classStudents, classSubjects, allResults)}>PDF</button>
                        <button className="btn-csv" onClick={() => exportToCSV(selectedClassId, classStudents, classSubjects, allResults)}>CSV</button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Roll ID</th>
                                {classSubjects.map(sub => <th key={sub.SubjectCode}>{sub.SubjectName}</th>)}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classStudents.map(student => (
                                <tr key={student.RollId}>
                                    <td>{student.RollId}</td>
                                    {classSubjects.map(sub => {
                                        const res = allResults.find(r => r.RollId === student.RollId && r.SubjectCode === sub.SubjectCode);
                                        const marks = res?.Marks || 0;
                                        // Highlight failing marks in the UI table too
                                        return <td key={sub.SubjectCode} style={{ color: (marks > 0 && marks <= 35) ? 'red' : 'inherit' }}>{res?.Marks || "—"}</td>;
                                    })}
                                    <td>
                                        <div className="btn-group">
                                            <button className="tab-btn" style={{ fontSize: '12px' }} onClick={() => onEdit({ RollId: student.RollId })}>Edit</button>
                                            <button className="btn-pdf" style={{ padding: '2px 8px' }} onClick={() => exportSinglePDF(student, classSubjects, allResults)}>📄</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="class-grid">
            {classes.map(cls => (
                <div key={cls._id} className="section-card" onClick={() => setSelectedClassId(cls.ClassName)} style={{ cursor: 'pointer', textAlign: 'center', padding: '20px' }}>
                    <strong>{cls.ClassName}</strong>
                </div>
            ))}
        </div>
    );
};

// ─── ADD TAB ─────────────────────────────────────────
const AddResultTab = ({ editData, onSuccess, allResults, classes, students, subjects }) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [formData, setFormData] = useState({ RollId: "", ClassId: "", marks: {} });

    useEffect(() => {
        if (editData?.RollId) {
            const std = students.find(s => s.RollId === editData.RollId);
            const existingMarks = {};
            allResults
                .filter(r => r.RollId === editData.RollId)
                .forEach(r => { existingMarks[r.SubjectCode] = r.Marks; });

            setSelectedClass(std?.ClassId || "");
            setFormData({
                RollId: editData.RollId,
                ClassId: std?.ClassId || "",
                marks: existingMarks
            });
        }
    }, [editData, students, allResults]);

    const availableStudents = students.filter(s => {
        const isCorrectClass = s.ClassId === selectedClass;
        const alreadyHasResult = allResults.some(r => r.RollId === s.RollId);
        if (editData?.RollId === s.RollId) return true;
        return isCorrectClass && !alreadyHasResult;
    });

    const availableSubjects = subjects.filter(sub => sub.ClassId === selectedClass);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!editData?.RollId;
        try {
            const promises = Object.keys(formData.marks).map(code => {
                const payload = {
                    RollId: formData.RollId,
                    SubjectCode: code,
                    Marks: Number(formData.marks[code]),
                    ClassId: formData.ClassId
                };
                return isEditing
                    ? axios.put(`${API}/results/updateResult`, payload)
                    : axios.post(`${API}/results/addResult`, payload);
            });
            await Promise.all(promises);
            alert(isEditing ? "Updated Successfully!" : "Declared Successfully!");
            onSuccess();
        } catch (err) {
            alert(isEditing ? "Update Error: Check if PUT route exists in backend." : "Save Error.");
        }
    };

    return (
        <div className="section-card" style={{ padding: '30px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <select className="search-input" style={{ flex: 1 }} value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setFormData({ ...formData, RollId: "", ClassId: e.target.value, marks: {} });
                        }}>
                        <option value="">-- Select Class --</option>
                        {classes.map(c => <option key={c._id} value={c.ClassName}>{c.ClassName}</option>)}
                    </select>

                    <select className="search-input" style={{ flex: 1 }} value={formData.RollId} required disabled={!selectedClass}
                        onChange={(e) => setFormData({ ...formData, RollId: e.target.value })}>
                        <option value="">-- Select Student --</option>
                        {availableStudents.map(s => <option key={s.RollId} value={s.RollId}>{s.RollId} - {s.StudentName}</option>)}
                    </select>
                </div>

                {formData.RollId && availableSubjects.length > 0 && (
                    <table className="data-table">
                        <thead><tr><th>Subject</th><th>Marks</th></tr></thead>
                        <tbody>
                            {availableSubjects.map(sub => (
                                <tr key={sub.SubjectCode}>
                                    <td>{sub.SubjectName}</td>
                                    <td>
                                        <input
                                            type="number" className="search-input" required max="100" min="0"
                                            value={formData.marks[sub.SubjectCode] || ""}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                marks: { ...formData.marks, [sub.SubjectCode]: e.target.value }
                                            })}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button type="submit" className="btn-csv" style={{ marginTop: '20px', width: '100%' }}>
                    {editData?.RollId ? "Update Result" : "Submit Result"}
                </button>
            </form>
        </div>
    );
};

export default ResultsPage;
>>>>>>> 756f1b8 (Update theme for admin management dashboard)
