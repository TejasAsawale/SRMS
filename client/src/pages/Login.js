// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginStudent } from '../services/authService'; // Import the service
// import '../style/Login.css';
// // 
// const Login = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(''); // To show login errors
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         // 1. Static Admin Check (.env)
//         if (email === process.env.REACT_APP_ADMIN_EMAIL &&
//             password === process.env.REACT_APP_ADMIN_PASSWORD) {
//             onLogin(email);
//             return navigate('/admin-dashboard');
//         }

//         // 2. Student Backend Check (Axios)
//         try {
//             const data = await loginStudent(email, password);
//             if (data.success) {
//                 onLogin(email);
//                 navigate('/student-dashboard');
//             }
//         } catch (err) {
//             setError(err.message || "Invalid Credentials");
//         }
//     };

//     return (
//         <div className="login-page-wrapper">
//             <form className="auth-card" onSubmit={handleSubmit}>
//                 <h2>Portal Login</h2>
//                 {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

//                 <div className="form-group">
//                     <label>Email</label>
//                     <input type="email" onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" onChange={(e) => setPassword(e.target.value)} required />
//                 </div>

//                 <button type="submit" className="btn-primary">Sign in ✓</button>
//             </form>
//         </div>
//     );
// };

// export default Login;