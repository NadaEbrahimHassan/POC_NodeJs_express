const studentService = require('../services/studentService.js');
const studentCacheService = require('../cache/studentCache.js');

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
        req.body.id = uuid.v1();
        studentCacheService.addStudent(req.body);
        res.status(201).send(req.body);
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
        let result = studentCacheService.updateStudent(req.body);
        if (result)
            res.status(200).send(req.body);
        else {
            next({
                status: 401,
                message: 'Student Not Found'
            });
        }
    }
}];

const deleteStudent = async (req, res, next) => {

    let studentDataList = studentService.getAllStudents();
    var index = studentDataList.findIndex(s => s.id == req.params.id);
    if (index < 0) {
        next({
            status: 401,
            message: 'Student Not Found'
        });
    }
    else {
        let result = studentCacheService.deleteStudent(req.params.id);
        if (result)
            res.status(200).send('ok');
        else
            next();
    }
}

module.exports = { getAllStudent, getSudentsByGrade, postStudent, patchStudent, deleteStudent }