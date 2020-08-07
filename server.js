const express = require('express');
const server = express();
const filePath = 'data/students.json';

const studentService = require('./services/studentService.js');


const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const studentRoute = require('./routing/studentRoute.js')();

function errorHandler(error, req, res, next) {
    res.status(error.status || 500).send(error.message || 'Internal Server Error');
}

server.use(jsonParser);
server.use('/', studentRoute);
server.use(errorHandler);

function getAllStudentList() {
    global.studentList = studentService.getAllStudents();
}

function saveChanges() {
    studentService.writeToFile(filePath, JSON.stringify(global.studentList))
    console.log(global.studentList);
}

server.listen(3000, () => {
    getAllStudentList();
    console.log('server is running ......');
});

setInterval(saveChanges, 50000);
