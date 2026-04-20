import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../../style/AdminDashboard.css';

const AdminLayout = ({ logout, userEmail }) => {
    const location = useLocation();

    // Utility to highlight the active link
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            {/* STATIC SIDEBAR */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo-mark">S</div>
                    <span className="sidebar-brand-name">SRMS ADMIN</span>
                </div>

                <nav className="menu-nav">
                    <span className="section-label">Main</span>
                    <Link to="/admin/dashboard" className={`menu-link ${isActive('/admin/dashboard')}`}>
                        <span>Dashboard</span>
                    </Link>

                    <span className="section-label">Management</span>
                    <Link to="/admin/students" className={`menu-link ${isActive('/admin/students')}`}>
                        <span>Manage Students</span>
                    </Link>
                    <Link to="/admin/results" className={`menu-link ${isActive('/admin/results')}`}>
                        <span>Manage Results</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <div className="logout-link" onClick={logout} style={{ cursor: 'pointer' }}>
                        <span>Logout</span>
                    </div>
                </div>
            </aside>

            {/* DYNAMIC CONTENT AREA */}
            <main className="main-content">
                <header className="top-navbar">
                    <div className="navbar-left">
                        <div className="page-title">
                            {location.pathname.includes('students') ? 'Student Management' :
                                location.pathname.includes('results') ? 'Result Management' : 'Dashboard Overview'}
                        </div>
                    </div>
                    <div className="navbar-right">
                        <span className="navbar-badge">Admin</span>
                        <span className="navbar-email">{userEmail}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    {/* THIS IS WHERE THE PAGES RENDER */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;