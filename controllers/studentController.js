const studentService = require('../services/studentService.js');
var uuid = require('uuid');

const studentValidation = require('../validation/studentsValidation.js');
const studentRequestValidation = studentValidation.studentReqestValidation;

const getAllStudent = (req, res, next) => {
    let studentlist = studentService.getAllStudentWithScoreMapping();
    res.send(studentlist);
}

const getSudentsByGrade = (req, res, next) => {
    let studentlist = studentService.getAllStudentWithScoreMapping();
    let studentsGradedata = studentlist.filter(s => s.grade == req.params.grade);
    res.send(studentsGradedata);
}

const postStudent = [studentRequestValidation, (req, res, next) => {

    result = studentValidation.getValidationResult(req);
    if (result) {
        next({
            status: 400,
            message: 'Bad Resquest'
        });
    }
    else {
        let studentDataList = studentService.getAllStudents();
        req.body.id = uuid.v1();
        studentDataList.push(req.body);

        studentService.writeToFile('data/students.json', JSON.stringify(studentDataList)).then(() => {
            res.status(201).send(req.body);
        }).catch((err) => {
            next(err);
        });
    }
}];

const patchStudent = [studentRequestValidation, (req, res, next) => {

    result = studentValidation.getValidationResult(req);
    if (result) {
        next({
            status: 400,
            message: 'Bad Resquest'
        });
    }
    else {
        let studentDataList = studentService.getAllStudents();
        var index = studentDataList.findIndex(s => s.id == req.body.id);
        studentDataList[index] = req.body;

        studentService.writeToFile('data/students.json', JSON.stringify(studentDataList)).then(() => {
            res.status(200).send('Ok');
        }).catch((err) => {
            next(err);
        });
    }
}];

const deleteStudent = async (req, res, next) => {

    let studentDataList = studentService.getAllStudents();
    var index = studentDataList.findIndex(s => s.id == req.params.id);
    console.log(index)
    if (index < 0) {
        next({
            status: 401,
            message: 'Student Not Found'
        });
    }
    else {
        studentDataList.splice(index, 1);
        console.log(studentDataList)

        studentService.writeToFile('data/students.json', JSON.stringify(studentDataList)).then(() => {
            res.status(200).send('Ok');
        }).catch((err) => {
            next(err);
        });
    }
}


module.exports = { getAllStudent, getSudentsByGrade, postStudent, patchStudent, deleteStudent }