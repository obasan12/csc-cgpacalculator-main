let semesterCount = 0;
let totalTCP = 0;
let totalTLU = 0;
let courseCount = 0;

const form = document.getElementById('cgpa-form');
const courseList = document.getElementById('course-list');
const addCourseBtn = document.getElementById('add-course-btn');
const gpaOutput = document.getElementById('gpa-output');
const cgpaOutput = document.getElementById('cgpa-output');
const cgpaTable = document.getElementById('cgpa-table').querySelector('tbody');
const noDataMessage = document.getElementById('no-data');
const errorMessage = document.getElementById('error-message');


const gradePoints = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2,
    'E': 1,
    'F': 0
};


document.addEventListener('DOMContentLoaded', () => {
    addNewCourse();  
});


function addNewCourse() {
    courseCount++;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>Course ${courseCount}</td>
        <td><input type="number" class="course-unit" min="1" max="5" required></td>
        <td>
            <select class="course-grade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><button type="button" class="remove-course-btn">Remove</button></td>
    `;
    courseList.appendChild(row);

    
    row.querySelector('.remove-course-btn').addEventListener('click', function () {
        courseList.removeChild(row);
        courseCount--;
    });

    
    if (courseCount === 1) {
        addCourseBtn.style.display = 'block';
    }
}


addCourseBtn.addEventListener('click', function () {
    addNewCourse();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorMessage.textContent = '';

    const courseUnits = document.querySelectorAll('.course-unit');
    const courseGrades = document.querySelectorAll('.course-grade');
    let currentTCP = 0;
    let currentTLU = 0;

 
    for (let i = 0; i < courseUnits.length; i++) {
        const unit = parseFloat(courseUnits[i].value);
        const grade = courseGrades[i].value;

        if (unit < 1) {
            errorMessage.textContent = 'Each course must have at least 1 unit.';
            return;
        }

        const gradePoint = gradePoints[grade];
        currentTCP += unit * gradePoint;
        currentTLU += unit;
    }

    if (currentTLU < 12) {
        errorMessage.textContent = 'Total Load Units (TLU) must be at least 12.';
        return;
    }

    if (currentTLU > 28) {
        errorMessage.textContent = 'Total Load Units (TLU) cannot exceed 28.';
        return;
    }

    // Calculate GPA for the current semester
    const gpa = (currentTCP / currentTLU).toFixed(2);

    // Update cumulative TCP and TLU
    totalTCP += currentTCP;
    totalTLU += currentTLU;

    // Calculate CGPA
    const cgpa = (totalTCP / totalTLU).toFixed(2);

 
    semesterCount++;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${semesterCount}</td>
        <td>${currentTCP}</td>
        <td>${currentTLU}</td>
        <td>${gpa}</td>
        <td>${cgpa}</td>
    `;
    cgpaTable.appendChild(newRow);


    noDataMessage.style.display = 'none';

   
    gpaOutput.textContent = gpa;
    cgpaOutput.textContent = cgpa;


    courseList.innerHTML = '';
    courseCount = 0;
    addCourseBtn.style.display = 'none'; 
    addNewCourse(); 
});
