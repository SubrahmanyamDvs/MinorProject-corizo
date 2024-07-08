document.addEventListener('DOMContentLoaded', loadStudents);

let editingStudentId = null;

function loadStudents() {
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            const studentBody = document.getElementById('studentBody');
            studentBody.innerHTML = '';
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.rollNo}</td>
                    <td>${student.name}</td>
                    <td>${student.degree}</td>
                    <td>${student.city}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
                studentBody.appendChild(row);
            });
        });
}

function saveStudent() {
    const rollNo = document.getElementById('rollNo').value;
    const name = document.getElementById('name').value;
    const degree = document.getElementById('degree').value;
    const city = document.getElementById('city').value;
    
    const studentData = { rollNo, name, degree, city };

    if (editingStudentId) {
        // Update existing student
        fetch(`/api/students/${editingStudentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        }).then(() => {
            editingStudentId = null;
            document.getElementById('studentForm').reset();
            loadStudents();
        });
    } else {
        // Add new student
        fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        }).then(() => {
            document.getElementById('studentForm').reset();
            loadStudents();
        });
    }
}

function editStudent(id) {
    fetch(`/api/students`)
        .then(response => response.json())
        .then(students => {
            const student = students.find(s => s.id === id);
            document.getElementById('studentId').value = student.id;
            document.getElementById('rollNo').value = student.rollNo;
            document.getElementById('name').value = student.name;
            document.getElementById('degree').value = student.degree;
            document.getElementById('city').value = student.city;
            editingStudentId = id;
        });
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`/api/students/${id}`, {
            method: 'DELETE'
        }).then(() => {
            loadStudents();
        });
    }
}
