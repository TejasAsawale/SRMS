// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginStudent, registerStudent } from '../../services/authService';
// import '../../style/Dashboard.css';

// const Dashboard = ({ onLogin }) => {
//     const [isSignup, setIsSignup] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setError('');
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             if (isSignup) {
//                 // --- REGISTRATION LOGIC ---
//                 const studentData = {
//                     StudentName: formData.fullName,
//                     StudentEmail: formData.email,
//                     Password: formData.password,
//                     Gender: 'Other',
//                     DOB: '2000-01-01',
//                     ClassId: 'General',
//                     // Random Roll ID generation
//                     RollId: "S" + Math.floor(1000 + Math.random() * 9000)
//                 };

//                 const result = await registerStudent(studentData);
//                 if (result.success) {
//                     setSuccess('Registration successful! Please sign in.');
//                     setIsSignup(false);
//                     setFormData({ fullName: '', email: '', password: '' });
//                 }
//             } else {
//     // --- LOGIN LOGIC ---

//     // 1. Check Admin first (static .env check)
//     if (formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
//         formData.password === process.env.REACT_APP_ADMIN_PASSWORD) {
//         onLogin(formData.email, 'admin');
//         navigate('/admin-dashboard');
//         return;
//     }

//     // 2. Student login via backend
//     const loginResult = await loginStudent(formData.email, formData.password);
//     if (loginResult.success) {
//         const userRole = loginResult.role || 'student';
//         onLogin(formData.email, userRole);
//         navigate(userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard');
//     }
// }
//         } catch (err) {
//             // Extracts error message from backend or uses fallback
//             const msg = err.message || 'Connection failed. Try again.';
//             setError(msg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const switchMode = () => {
//         setIsSignup(!isSignup);
//         setError('');
//         setSuccess('');
//         setFormData({ fullName: '', email: '', password: '' });
//     };

//     return (
//         <div className="login-page-wrapper">
//             {/* Added Back Button for UX */}
//             <button className="back-home-btn" onClick={() => navigate('/')}>
//                 ← Back to Home
//             </button>

//             <div className="login-brand">
//                 <div className="brand-mark">S</div>
//                 <div>
//                     <h1 className="brand-title">SRMS</h1>
//                     <p className="brand-sub">Student Result Management System</p>
//                 </div>
//             </div>

//             <div className="auth-card">
//                 <div className="auth-card-header">
//                     <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
//                     <p className="sub-header">
//                         {isSignup ? 'Register to access your results portal' : 'Sign in to your dashboard'}
//                     </p>
//                 </div>

//                 {error && (
//                     <div className="alert alert-error">
//                         <span className="alert-icon">⚠</span> {error}
//                     </div>
//                 )}
//                 {success && (
//                     <div className="alert alert-success">
//                         <span className="alert-icon">✓</span> {success}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="auth-form">
//                     {isSignup && (
//                         <div className="form-group">
//                             <label htmlFor="fullName">Full Name</label>
//                             <input
//                                 id="fullName"
//                                 type="text"
//                                 name="fullName"
//                                 placeholder="e.g. Tejas Asawale"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     )}

//                     <div className="form-group">
//                         <label htmlFor="email">Email Address</label>
//                         <input
//                             id="email"
//                             type="email"
//                             name="email"
//                             placeholder="you@example.com"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             id="password"
//                             type="password"
//                             name="password"
//                             placeholder="Enter your password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className={`btn-submit ${loading ? 'btn-loading' : ''}`}
//                         disabled={loading}
//                     >
//                         {loading ? "Processing..." : (isSignup ? 'Create Account' : 'Sign In')}
//                     </button>
//                 </form>

//                 <div className="toggle-section">
//                     <p>
//                         {isSignup ? 'Already have an account?' : "Don't have an account?"}
//                         <button className="link-btn" type="button" onClick={switchMode}>
//                             {isSignup ? ' Sign in' : ' Register'}
//                         </button>
//                     </p>
//                 </div>
//             </div>

//             <p className="login-footer">© 2026 SRMS. All rights reserved.</p>
//         </div>
//     );
// };

// export default Dashboard;

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
                const studentData = {
                    StudentName: formData.fullName,
                    StudentEmail: formData.email,
                    Password: formData.password,
                    Gender: 'Other',
                    DOB: '2000-01-01',
                    ClassId: 'General',
                    RollId: "S" + Math.floor(1000 + Math.random() * 9000)
                };

                const result = await registerStudent(studentData);
                if (result.success) {
                    setSuccess('Registration successful! Please sign in.');
                    setIsSignup(false);
                    setFormData({ fullName: '', email: '', password: '' });
                }
            } else {
                // Admin check (static .env)
                if (formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
                    formData.password === process.env.REACT_APP_ADMIN_PASSWORD) {
                    onLogin(formData.email, 'admin');
                    navigate('/admin-dashboard');
                    return;
                }

                // Student login via backend
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
        setFormData({ fullName: '', email: '', password: '' });
    };

    return (
        <div className="auth-wrapper">
            <button className="back-home-btn" onClick={() => navigate('/')}>
                ← Back to Home
            </button>

            <div className={`auth-container ${isSignup ? 'right-panel-active' : ''}`}>

                {/* --- SIGN UP FORM (right side) --- */}
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
                            <label htmlFor="signupName">Full Name</label>
                            <input
                                id="signupName"
                                type="text"
                                name="fullName"
                                placeholder="e.g. Tejas Asawale"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupEmail">Email</label>
                            <input
                                id="signupEmail"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupPassword">Password</label>
                            <input
                                id="signupPassword"
                                type="password"
                                name="password"
                                placeholder="Create a password"
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
                            {loading ? 'Processing...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* --- SIGN IN FORM (left side) --- */}
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
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                id="loginEmail"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input
                                id="loginPassword"
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
                            {loading ? 'Processing...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* --- OVERLAY PANELS --- */}
                <div className="overlay-container">
                    {/* Left overlay — shown when signup is active */}
                    <div className="overlay-panel overlay-left">
                        <div className="overlay-brand">
                            <div className="brand-mark-lg">S</div>
                            <h2>SRMS</h2>
                            <p>Student Result Management System</p>
                        </div>
                        <p className="overlay-text">Already have an account? Sign in here.</p>
                        <button
                            className="btn-ghost"
                            onClick={() => switchMode(false)}
                            type="button"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Right overlay — shown when login is active */}
                    <div className="overlay-panel overlay-right">
                        <div className="overlay-brand">
                            <div className="brand-mark-lg">S</div>
                            <h2>SRMS</h2>
                            <p>Student Result Management System</p>
                        </div>
                        <p className="overlay-text">New here? Create your student account.</p>
                        <button
                            className="btn-ghost"
                            onClick={() => switchMode(true)}
                            type="button"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

            <p className="login-footer">© 2026 SRMS. All rights reserved.</p>
        </div>
    );
};

export default Dashboard;