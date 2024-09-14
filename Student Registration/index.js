// Function for clicking Add button
document.getElementById('registration_btn').addEventListener('click', function(){
    // assigning input values to variables
    const studentName = document.getElementById('studentName');
    const studentId = document.getElementById('studentId');
    const mailId = document.getElementById('mailId');
    const phNumber = document.getElementById('phNumber');
    const classId = document.getElementById('classId');

    

    // create an object of the input data to store
    const studentData = {
        name: studentName.value,
        id: studentId.value,
        email: mailId.value,
        phone: phNumber.value,
        class: classId.value
    };
    // validate all the inputs
    if (!studentData.name|| !studentData.id|| !studentData.email|| !studentData.phone|| !studentData.class){
        alert('Please completely fill the form');
        return;
    }
    // Validate mail
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    if (!validateEmail(studentData.email)){
        alert("wrong email format")
        return;
    }


    // access the local storage data or create a new empty one
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // push the object to the array
    students.push(studentData);

    // saving in local storage
    localStorage.setItem('students', JSON.stringify(students));

    // reset the input
    document.getElementById('studentRegistration').reset();

    // call the display function
    displayStoredDAta();
})

// Function to display student data
function displayStoredDAta(){
    const studentList = document.getElementById('displayList');
    studentList.innerHTML = ''; //clearing previous data

    // taking data from local storage
    const students = JSON.parse(localStorage.getItem('students')) ;

    

    // create table rows
    students.forEach((student,index)=>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.class}</td>
            <td>
                <a href="#" ><button class = "edit_btn"><i class="fa-regular fa-pen-to-square"></i></button></a>
                <button class = "delete_btn"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        `;
        studentList.appendChild(row);

        // adding event listeners for edit and delete buttons
        row.querySelector('.edit_btn').addEventListener('click', ()=> editStudent(index));
        row.querySelector('.delete_btn').addEventListener('click', ()=> deleteStudent(index));
    });
}

// Function to edit student Data
function editStudent(index){
    const students = JSON.parse(localStorage.getItem('students'));

    const student = students[index];

    // fill the form with selevted values data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('mailId').value = student.email;
    document.getElementById('phNumber').value = student.phone;
    document.getElementById('classId').value = student.class;


    // deleting the student data from array and updating local storage
    students.splice(index,1);
    localStorage.setItem('students',JSON.stringify(students));

    //  display new table
    displayStoredDAta();

    
}

// Function to delete row
function deleteStudent(index){
    const students = JSON.parse(localStorage.getItem('students'));
    // delete student
    students.splice(index,1);
    
    // update changes to local storage
    localStorage.setItem('students', JSON.stringify(students));

    // update display
    displayStoredDAta();
}

// to displau data on page load
window.onload = function(){
    displayStoredDAta();
}