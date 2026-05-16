import API from '../api/axiosConfig';

export const loginStudent = async (email, password) => {
    try {
        const response = await API.post('/students/login', { email, password });
    
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
        const response = await API.post('/students/addStudent', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Registration Failed");
    }
};