import axios from 'axios';

const API = axios.create({
    // baseURL: 'http://localhost:5003/api', // port on 5003 
    baseURL: 'https://srms-a648.onrender.com/api' 
});

export default API;