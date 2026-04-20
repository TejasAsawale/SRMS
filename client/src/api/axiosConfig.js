import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5003/api', // Must be 5003 to match your server
});

export default API;