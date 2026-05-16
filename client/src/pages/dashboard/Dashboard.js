import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { loginStudent, registerStudent } from '../../services/authService';
import '../../style/Dashboard.css';

const Dashboard = ({ onLogin }) => {
    const { theme } = useTheme(); // Access global theme 
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        className: ''
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
                const studentData = {
                    StudentName: formData.fullName,
                    StudentEmail: formData.email,
                    Password: formData.password,
                    Gender: formData.gender,
                    DOB: formData.dob,
                    ClassId: formData.className,
                    RollId: "S" + Math.floor(1000 + Math.random() * 9000)
                };

                const result = await registerStudent(studentData);
                if (result.success) {
                    setSuccess('Registration successful! Please sign in.');
                    setIsSignup(false);
                    setFormData({ fullName: '', email: '', password: '', gender: '', dob: '', className: '' });
                }
            } else {
                if (formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
                    formData.password === process.env.REACT_APP_ADMIN_PASSWORD) {
                    onLogin(formData.email, 'admin');
                    navigate('/admin-dashboard');
                    return;
                }

                const loginResult = await loginStudent(formData.email, formData.password);
                if (loginResult.success) {
                    const userRole = loginResult.role || 'student';
                    onLogin(formData.email, userRole);
                    navigate(userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard');
                }
            }
        } catch (err) {
            const msg = err.message || 'Connection failed. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (toSignup) => {
        setIsSignup(toSignup);
        setError('');
        setSuccess('');
        setFormData({ fullName: '', email: '', password: '', gender: '', dob: '', className: '' });
    };

    return (
        <div className={`auth-page-root ${theme}-theme`}> 
            <div className="auth-wrapper">
                <button className="back-home-btn" onClick={() => navigate('/')}>
                    ← Back to Home
                </button>

                <div className={`auth-container ${isSignup ? 'right-panel-active' : ''}`}>

                    {/* --- SIGN UP FORM --- */}
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-brand">
                                <div className="brand-mark">S</div>
                                <span>SRMS</span>
                            </div>
                            <h1>Create Account</h1>

                            {error && isSignup && (
                                <div className="alert alert-error">
                                    <span>⚠</span> {error}
                                </div>
                            )}

                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="fullName" placeholder="e.g. Tejas Asawale" value={formData.fullName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Class / Department</label>
                                <input type="text" name="className" placeholder="e.g. Computer Science" value={formData.className} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                            </div>

                            <button type="submit" className={`btn-submit ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                                {loading ? 'Processing...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>

                    {/* --- SIGN IN FORM --- */}
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-brand">
                                <div className="brand-mark">S</div>
                                <span>SRMS</span>
                            </div>
                            <h1>Welcome Back</h1>
                            <p className="form-sub">Sign in to your dashboard</p>

                            {error && !isSignup && (
                                <div className="alert alert-error">
                                    <span>⚠</span> {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success">
                                    <span>✓</span> {success}
                                </div>
                            )}

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                            </div>

                            <button type="submit" className={`btn-submit ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                                {loading ? 'Processing...' : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    {/* --- OVERLAY PANELS --- */}
                    <div className="overlay-container">
                        <div className="overlay-panel overlay-left">
                            <div className="overlay-brand">
                                <div className="brand-mark-lg">S</div>
                                <h2>SRMS</h2>
                                <p>Student Result Management System</p>
                            </div>
                            <p className="overlay-text">Already have an account? Sign in here.</p>
                            <button className="btn-ghost" onClick={() => switchMode(false)}>Sign In</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <div className="overlay-brand">
                                <div className="brand-mark-lg">S</div>
                                <h2>SRMS</h2>
                                <p>Student Result Management System</p>
                            </div>
                            <p className="overlay-text">New here? Create your student account.</p>
                            <button className="btn-ghost" onClick={() => switchMode(true)}>Register</button>
                        </div>
                    </div>
                </div>
                <p className="login-footer">© 2026 SRMS. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Dashboard;