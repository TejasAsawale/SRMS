// import API from '../api/axiosConfig';

// // Make sure 'export' is at the start of BOTH functions!
// export const loginStudent = async (email, password) => {
//     try {
//         const response = await API.post('/students/login', { email, password });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : new Error("Login Failed");
//     }
// };

// export const registerStudent = async (userData) => {
//     try {
//         const response = await API.post('/students/addStudent', userData);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : new Error("Registration Failed");
//     }
// };

import API from '../api/axiosConfig';

export const loginStudent = async (email, password) => {
    try {
        const response = await API.post('/students/login', { email, password });
        
        // If the backend returned a token, save it!
        if (response.data.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userEmail', response.data.student.email);
            localStorage.setItem('userName', response.data.student.name);
        }
        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Login Failed");
    }
};

export const registerStudent = async (userData) => {
    try {
        // This hits your router.post('/addStudent', addStudent)
        const response = await API.post('/students/addStudent', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Registration Failed");
    }
};