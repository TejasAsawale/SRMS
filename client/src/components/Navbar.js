// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userEmail, logout, role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="brand-mark">S</div>
                <span>SRMS</span>
            </div>
            <div className="navbar-right">
                <span className="user-info">
                    {role === 'admin' ? '🛡 Admin' : '🎓 Student'} · {userEmail}
                </span>
                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;