const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 5000;

let students = [
    { id: 1, rollNo: '17BCA144', name: 'Raina', degree: 'BCA', city: 'Noida' },
    { id: 2, rollNo: '20MCR065', name: 'Dhoni', degree: 'MCA', city: 'Ranchi' },
    { id: 3, rollNo: '19COS85', name: 'Virat', degree: 'BSC CS', city: 'Delhi' }
];

let nextId = 4;

app.use(bodyParser.json());
app.use(express.static('public'));

// API Endpoints

app.get('/api/students', (req, res) => {
    res.json(students);
});

app.post('/api/students', (req, res) => {
    const student = { id: nextId++, ...req.body };
    students.push(student);
    res.json(student);
});

app.put('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
        students[index] = { id: studentId, ...req.body };
        res.json(students[index]);
    } else {
        res.status(404).send('Student not found');
    }
});

app.delete('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    students = students.filter(student => student.id !== studentId);
    res.json({ message: 'Student deleted' });
});

// Serve index.html for the root URL

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
