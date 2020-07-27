const express = require('express');
const bodyParser = require('body-parser');
const studentRoute = express.Router();
const studentService = require('../services/studentService.js');

//this return middleware which parses json exisists in request body
var jsonParser = bodyParser.json();

function route() {


    studentRoute.route('/').get((req, res) => {
        let studentlist = studentService.getAllStudentWithScoreMapping();
        //res.send(studentlist);
        res.render('index.ejs', { list: studentlist });
    });

    studentRoute.route('/students-by-grade/:grade').get((req, res) => {

        let studentlist = studentService.getAllStudentWithScoreMapping();
        let studentsGradedata = studentlist.filter(s => s.grade == req.params.grade);

        res.render('index.ejs', { list: studentsGradedata });
    });

    studentRoute.route('/student').post(jsonParser, (req, res) => {

        let studentDataList = studentService.getAllStudents();
        studentDataList.push(req.body);

        writeToFile('data/students.json', JSON.stringify(studentDataList), res);
    });

    studentRoute.route('/student').patch(jsonParser, (req, res) => {
        let studentDataList = studentService.getAllStudents();
        var index = studentDataList.findIndex(s => s.id == req.body.id);
        studentDataList[index] = req.body;

        writeToFile('data/students.json', JSON.stringify(studentDataList), res);
    });

    studentRoute.route('/student/:id').delete((req, res) => {
        let studentDataList = studentService.getAllStudents();
        var index = studentDataList.findIndex(s => s.id == req.params.id);
        studentDataList.splice(index, 1);

        writeToFile('data/students.json', JSON.stringify(studentDataList), res);
    });

    return studentRoute;
}

module.exports = route;