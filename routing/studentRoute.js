const express = require('express');
const studentRoute = express.Router();
const studentControler = require('../controllers/studentController.js');

function route() {


    studentRoute.route('/').get(studentControler.getAllStudent);

    studentRoute.route('/student/grade/:grade').get(studentControler.getSudentsByGrade);

    studentRoute.route('/student').post(studentControler.postStudent);

    studentRoute.route('/student').patch(studentControler.patchStudent);

    studentRoute.route('/student/:id').delete(studentControler.deleteStudent);

    return studentRoute;
}

module.exports = route;