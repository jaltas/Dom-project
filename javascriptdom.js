// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentRecords = document.getElementById('studentRecords');
    // Load existing records from local storage
    loadRecords();});

    // Handle form submission
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentID = document.getElementById('studentID').value;
        const emailID = document.getElementById('emailID').value;
        const contactNo = document.getElementById('contactNo').value;

        if (studentName && studentID && emailID && contactNo) {
            addRecord({ studentName, studentID, emailID, contactNo });
            studentForm.reset();
        } else {
            alert('Fill your data');
            }

    // Add new student record
    function addRecord(record) {
        const records = getRecords();
        records.push(record);
        saveRecords(records);
        displayRecord(record);
    }

    // Display a single record
    function displayRecord(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentName}</td>
            <td>${record.studentID}</td>
            <td>${record.emailID}</td>
            <td>${record.contactNo}</td>
            <td>
                <button onclick="editRecord(${record.studentID})">Edit</button>
                <button onclick="deleteRecord(${record.studentID})">Delete</button>
            </td>
        `;
        studentRecords.appendChild(row);
    }

    // function  It will  Load records from local storage
    function loadRecords() {
        const records = getRecords();
        records.forEach(record => displayRecord(record));
    }
    // function will  Get records from local storage
    function getRecords() {
        return JSON.parse(localStorage.getItem('studentRecords')) || [];
    }

    // Save records to local storage
    function saveRecords(records) {
        localStorage.setItem('studentRecords', JSON.stringify(records));
    }

    // Edit record
    window.editRecord = (studentID) => {
        const records = getRecords();
        const record = records.find(record => record.studentID == studentID);
        if (record) {
            document.getElementById('studentName').value = record.studentName;
            document.getElementById('studentID').value = record.studentID;
            document.getElementById('emailID').value = record.emailID;
            document.getElementById('contactNo').value = record.contactNo;
            deleteRecord(studentID);
        }
    };

    // Delete record
    window.deleteRecord = (studentID) => {
        const records = getRecords();
        const newRecords = records.filter(record => record.studentID != studentID);
        saveRecords(newRecords);
        refreshRecords();
    };

    // Refresh displayed records
    function refreshRecords() {
        studentRecords.innerHTML = '';
        loadRecords();
    }
});
