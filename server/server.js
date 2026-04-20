const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectdb } = require('./config/db'); 
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const resultRoutes = require('./routes/resultRoutes');

dotenv.config();
const app = express();

// use cors to access (rt 3000)
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Crucial for receiving JSON data from Axios
app.use(express.json());

// 3. Database Connection
connectdb();

// 4. Health Check Route - for just checking route is working or not
app.get('/', (req, res) => {
    res.send("SRMS API is running...");
});

// 5. Main Routes
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);

// 6. Server Port
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at: http://localhost:${PORT}`);
});
