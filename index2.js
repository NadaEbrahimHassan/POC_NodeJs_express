const express = require('express');
const server = express();
const studentService = require('./services/studentService.js');

const studentRoute = require('./routing/studentRoute.js')();
var studentList = [];

server.use('/', studentRoute)

server.listen(3000, () => {
    studentList = studentService.getAllStudents();
    console.log('server is running ......');
});