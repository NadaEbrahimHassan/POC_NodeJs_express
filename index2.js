const express = require('express');
const server = express();
const studentService = require('./services/studentService.js');

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const studentRoute = require('./routing/studentRoute.js')();
var studentList = [];

function errorHandler(error, req, res, next) {
    res.status(error.status || 500).send(error.message || 'Internal Server Error');
}

server.use(jsonParser);

server.use('/', studentRoute);
server.use(errorHandler);



server.listen(3000, () => {
    studentList = studentService.getAllStudents();
    console.log('server is running ......');
});