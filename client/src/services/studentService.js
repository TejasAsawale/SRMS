import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api' 
});

export const getAllStudents = async () => {
    const response = await API.get('/students');
    return response.data; 
};

export const createStudent = async (studentData) => {
    const response = await API.post('/students/addStudent', studentData);
    return response.data;
};