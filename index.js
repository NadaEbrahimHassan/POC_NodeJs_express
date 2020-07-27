const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const fs = require('fs');
var studentList = [];


//this return middleware which parses json exisists in request body
var jsonParser = bodyParser.json();

function getAllStudents() {
    let data = fs.readFileSync('data/students.json');
    return JSON.parse(data);
}

function getAllMappingScore() {
    let data = fs.readFileSync('data/scoreDefinition.json');
    return JSON.parse(data);
}

function getAllStudentWithScoreMapping() {
    let mappingScore = getAllMappingScore();
    let studentList = getAllStudents();
    studentList.sort(sortByScore);
    let studentMappingScoreList = []
    studentList.forEach(element => {
        var score = mappingScore[element.score];
        element.score = score;
        studentMappingScoreList.push(element);
    });

    return studentMappingScoreList;
}

function writeToFile(path, data, res) {
    return fs.writeFile(path, data, (err) => {
        if (!err)
            res.send(true);
        throw (err);
    });
}

function sortByScore(student1, student2) {
    if (student1.score > student2.score) {
        return -1;
    }
    if (student2.score > student1.score) {
        return 1;
    }
    return 0;
}

server.get('/', (req, res) => {
    let studentlist = getAllStudentWithScoreMapping();
    res.send(studentlist);
    //res.render('index.ejs', { list: studentlist });
});

server.get('/students-by-grade/:grade', (req, res) => {

    let studentlist = getAllStudents();
    let studentsGradedata = studentlist.filter(s => s.grade == req.params.grade);
    studentsGradedata.sort(sortByScore);
    res.render('index.ejs', { list: studentsGradedata });
});

server.post('/student', jsonParser, (req, res) => {

    let studentDataList = getAllStudents();
    studentDataList.push(req.body);

    writeToFile('data/students.json', JSON.stringify(studentDataList), res);
});

server.patch('/student', jsonParser, (req, res) => {
    let studentDataList = getAllStudents();
    var index = studentDataList.findIndex(s => s.id == req.body.id);
    studentDataList[index] = req.body;

    writeToFile('data/students.json', JSON.stringify(studentDataList), res);
});

server.delete("/student/:id", (req, res) => {
    let studentDataList = getAllStudents();
    var index = studentDataList.findIndex(s => s.id == req.params.id);
    studentDataList.splice(index, 1);

    writeToFile('data/students.json', JSON.stringify(studentDataList), res);
})

server.listen(4242, () => {
    studentList = getAllStudents();
    console.log(studentList);
    console.log('server is running......');
});