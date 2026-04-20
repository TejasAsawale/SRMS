import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api' // Ensure this matches your server port
});

export const getAllStudents = async () => {
    const response = await API.get('/students');
    return response.data; // This returns the students array from your controller
};

export const createStudent = async (studentData) => {
    const response = await API.post('/students/addStudent', studentData);
    return response.data;
};