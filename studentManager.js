const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let students = [
    { rollNo: '17BCA144', name: 'Raina', degree: 'BCA', city: 'Noida' },
    { rollNo: '20MCR065', name: 'Dhoni', degree: 'MCA', city: 'Ranchi' },
    { rollNo: '19COS85', name: 'Virat', degree: 'BSC CS', city: 'Delhi' }
];

// Function to display all students
function displayStudents() {
    console.log('\n--- Student List ---');
    students.forEach((student, index) => {
        console.log(`${index + 1}. Roll No: ${student.rollNo}, Name: ${student.name}, Degree: ${student.degree}, City: ${student.city}`);
    });
    console.log('--------------------\n');
}

// Function to add a new student
function addStudent() {
    rl.question('Enter Roll No: ', (rollNo) => {
        rl.question('Enter Name: ', (name) => {
            rl.question('Enter Degree: ', (degree) => {
                rl.question('Enter City: ', (city) => {
                    students.push({ rollNo, name, degree, city });
                    console.log('Student added successfully!');
                    displayStudents();
                    showMenu();
                });
            });
        });
    });
}

// Function to edit an existing student
function editStudent() {
    displayStudents();
    rl.question('Enter the number of the student to edit: ', (number) => {
        const index = parseInt(number) - 1;
        if (index >= 0 && index < students.length) {
            rl.question('Enter new Roll No: ', (rollNo) => {
                rl.question('Enter new Name: ', (name) => {
                    rl.question('Enter new Degree: ', (degree) => {
                        rl.question('Enter new City: ', (city) => {
                            students[index] = { rollNo, name, degree, city };
                            console.log('Student updated successfully!');
                            displayStudents();
                            showMenu();
                        });
                    });
                });
            });
        } else {
            console.log('Invalid student number!');
            showMenu();
        }
    });
}

// Function to delete a student
function deleteStudent() {
    displayStudents();
    rl.question('Enter the number of the student to delete: ', (number) => {
        const index = parseInt(number) - 1;
        if (index >= 0 && index < students.length) {
            rl.question('Are you sure you want to delete this student? (yes/no): ', (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    students.splice(index, 1);
                    console.log('Student deleted successfully!');
                } else {
                    console.log('Delete action cancelled.');
                }
                displayStudents();
                showMenu();
            });
        } else {
            console.log('Invalid student number!');
            showMenu();
        }
    });
}

// Function to show the menu
function showMenu() {
    console.log('\n--- Menu ---');
    console.log('1. View All Students');
    console.log('2. Add a New Student');
    console.log('3. Edit a Student');
    console.log('4. Delete a Student');
    console.log('5. Exit');
    rl.question('Choose an option: ', (choice) => {
        switch (choice) {
            case '1':
                displayStudents();
                showMenu();
                break;
            case '2':
                addStudent();
                break;
            case '3':
                editStudent();
                break;
            case '4':
                deleteStudent();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid choice, please select a valid option.');
                showMenu();
                break;
        }
    });
}

// Start the application by showing the menu
showMenu();
