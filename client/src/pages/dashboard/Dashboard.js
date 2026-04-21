import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStudent, registerStudent } from '../../services/authService';
import '../../style/Dashboard.css';

const Dashboard = ({ onLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (isSignup) {
                // --- REGISTRATION LOGIC ---
                const studentData = {
                    StudentName: formData.fullName,
                    StudentEmail: formData.email,
                    Password: formData.password,
                    Gender: 'Other',
                    DOB: '2000-01-01',
                    ClassId: 'General',
                    // Random Roll ID generation
                    RollId: "S" + Math.floor(1000 + Math.random() * 9000)
                };

                const result = await registerStudent(studentData);
                if (result.success) {
                    setSuccess('Registration successful! Please sign in.');
                    setIsSignup(false);
                    setFormData({ fullName: '', email: '', password: '' });
                }
            } else {
    // --- LOGIN LOGIC ---

    // 1. Check Admin first (static .env check)
    if (formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
        formData.password === process.env.REACT_APP_ADMIN_PASSWORD) {
        onLogin(formData.email, 'admin');
        navigate('/admin-dashboard');
        return;
    }

    // 2. Student login via backend
    const loginResult = await loginStudent(formData.email, formData.password);
    if (loginResult.success) {
        const userRole = loginResult.role || 'student';
        onLogin(formData.email, userRole);
        navigate(userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard');
    }
}
        } catch (err) {
            // Extracts error message from backend or uses fallback
            const msg = err.message || 'Connection failed. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        setError('');
        setSuccess('');
        setFormData({ fullName: '', email: '', password: '' });
    };

    return (
        <div className="login-page-wrapper">
            {/* Added Back Button for UX */}
            <button className="back-home-btn" onClick={() => navigate('/')}>
                ← Back to Home
            </button>

            <div className="login-brand">
                <div className="brand-mark">S</div>
                <div>
                    <h1 className="brand-title">SRMS</h1>
                    <p className="brand-sub">Student Result Management System</p>
                </div>
            </div>

            <div className="auth-card">
                <div className="auth-card-header">
                    <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="sub-header">
                        {isSignup ? 'Register to access your results portal' : 'Sign in to your dashboard'}
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">⚠</span> {error}
                    </div>
                )}
                {success && (
                    <div className="alert alert-success">
                        <span className="alert-icon">✓</span> {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {isSignup && (
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                placeholder="e.g. Tejas Asawale"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn-submit ${loading ? 'btn-loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : (isSignup ? 'Create Account' : 'Sign In')}
                    </button>
                </form>

                <div className="toggle-section">
                    <p>
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}
                        <button className="link-btn" type="button" onClick={switchMode}>
                            {isSignup ? ' Sign in' : ' Register'}
                        </button>
                    </p>
                </div>
            </div>

            <p className="login-footer">© 2026 SRMS. All rights reserved.</p>
        </div>
    );
};

export default Dashboard;