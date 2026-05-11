// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { ThemeProvider } from './context/ThemeContext'; // Import the provider
// import Dashboard from './pages/dashboard/Dashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import StudentDashboard from './pages/dashboard/StudentDashboard';
// import LandingPage from './pages/LandingPage';

// // Protected route wrapper: Ensures only authorized users access specific pages
// const ProtectedRoute = ({ allowed, redirectTo = "/login" }) => {
//     return allowed ? <Outlet /> : <Navigate to={redirectTo} replace />;
// };

// function App() {
//     const [userEmail, setUserEmail] = useState(null);
//     const [userRole, setUserRole] = useState(null);
//     const [hydrated, setHydrated] = useState(false);

//     // Sync state with LocalStorage on initial load (Hydration)
//     useEffect(() => {
//         const savedEmail = localStorage.getItem('userEmail');
//         const savedRole = localStorage.getItem('userRole');
//         if (savedEmail && savedRole) {
//             setUserEmail(savedEmail);
//             setUserRole(savedRole);
//         }
//         setHydrated(true);
//     }, []);

//     const handleLogin = (email, role) => {
//         setUserEmail(email);
//         setUserRole(role);
//         localStorage.setItem('userEmail', email);
//         localStorage.setItem('userRole', role);
//     };

//     const handleLogout = () => {
//         setUserEmail(null);
//         setUserRole(null);
//         localStorage.clear(); 
//     };

//     // Prevent flicker: Don't render routes until we check LocalStorage
//     if (!hydrated) return null;

//     const isAdmin = userRole === 'admin';
//     const isStudent = userRole === 'student';

//     return (
//         /* Wrap everything in ThemeProvider to fix the destructure error */
//         <ThemeProvider>
//             <BrowserRouter>
//                 <Routes>
//                     {/* 1. Root Route: Smart Redirect based on role */}
//                     <Route path="/" element={
//                         isAdmin ? <Navigate to="/admin-dashboard" replace /> :
//                         isStudent ? <Navigate to="/student-dashboard" replace /> :
//                         <LandingPage />
//                     } />

//                     {/* 2. Login/Portal Access */}
//                     <Route path="/login" element={
//                         isAdmin ? <Navigate to="/admin-dashboard" replace /> :
//                         isStudent ? <Navigate to="/student-dashboard" replace /> :
//                         <Dashboard onLogin={handleLogin} />
//                     } />

//                     {/* 3. Admin Protected Routes (SRMS Management) */}
//                     <Route element={<ProtectedRoute allowed={isAdmin} />}>
//                         <Route
//                             path="/admin-dashboard/*" 
//                             element={<AdminDashboard logout={handleLogout} userEmail={userEmail} />}
//                         />
//                     </Route>

//                     {/* 4. Student Protected Routes (Result Viewing) */}
//                     <Route element={<ProtectedRoute allowed={isStudent} />}>
//                         <Route
//                             path="/student-dashboard/*"
//                             element={<StudentDashboard logout={handleLogout} userEmail={userEmail} />}
//                         />
//                     </Route>

//                     {/* 5. Fallback: Redirect unknown URLs to Home */}
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//             </BrowserRouter>
//         </ThemeProvider>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import LandingPage from './pages/LandingPage';

// Protected route wrapper
const ProtectedRoute = ({ allowed, redirectTo = "/login" }) => {
    return allowed ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

function App() {
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        const savedRole = localStorage.getItem('userRole');
        if (savedEmail && savedRole) {
            setUserEmail(savedEmail);
            setUserRole(savedRole);
        }
        setHydrated(true);
    }, []);

    const handleLogin = (email, role) => {
        setUserEmail(email);
        setUserRole(role);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
    };

    const handleLogout = () => {
        setUserEmail(null);
        setUserRole(null);
        // Better than .clear() - keeps theme and other settings intact
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    };

    if (!hydrated) return null; 

    const isAdmin = userRole === 'admin';
    const isStudent = userRole === 'student';

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* 1. Landing / Root */}
                    <Route path="/" element={
                        isAdmin ? <Navigate to="/admin-dashboard" replace /> :
                        isStudent ? <Navigate to="/student-dashboard" replace /> :
                        <LandingPage />
                    } />

                    {/* 2. Auth Portal */}
                    <Route path="/login" element={
                        isAdmin ? <Navigate to="/admin-dashboard" replace /> :
                        isStudent ? <Navigate to="/student-dashboard" replace /> :
                        <Dashboard onLogin={handleLogin} />
                    } />

                    {/* 3. Admin Area */}
                    <Route element={<ProtectedRoute allowed={isAdmin} />}>
                        <Route
                            path="/admin-dashboard/*" 
                            element={<AdminDashboard logout={handleLogout} userEmail={userEmail} />}
                        />
                    </Route>

                    {/* 4. Student Area */}
                    <Route element={<ProtectedRoute allowed={isStudent} />}>
                        <Route
                            path="/student-dashboard/*"
                            element={<StudentDashboard logout={handleLogout} userEmail={userEmail} />}
                        />
                    </Route>

                    {/* 5. 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;