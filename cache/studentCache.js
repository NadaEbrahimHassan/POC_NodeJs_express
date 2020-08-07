global.studentList = [];

function getStudentList() {
    return global.studentList;
}

function addStudent(student) {
    global.studentList.push(student);
}

function updateStudent(student) {
    studentIndex = studentList.findIndex(s => s.id == student.id);
    if (studentIndex >= 0) {
        global.studentList[studentIndex] = student;
        return 1
    }
    return null
}

function deleteStudent(id) {
    studentIndex = studentList.findIndex(s => s.id == id);
    if (studentIndex >= 0) {
        global.studentList.splice(studentIndex, 1);
        return 1
    }
    return null
}

module.exports = { studentList, getStudentList, addStudent, updateStudent, deleteStudent }