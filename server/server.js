const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectdb } = require('./config/db'); 
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const resultRoutes = require('./routes/resultRoutes');
const classRoutes = require('./routes/classRoutes');

dotenv.config();
const app = express();

app.use(cors({
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
connectdb();

app.get('/', (req, res) => {
    res.send("SRMS API is running...");
});

app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/classes', classRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access API at: http://localhost:${PORT}`);
});
