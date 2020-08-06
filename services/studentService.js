const fs = require('fs');

function getAllStudents() {
    let data = fs.readFileSync('data/students.json');
    let studentList = JSON.parse(data);
    studentList.sort(sortByScore);
    return studentList;
}

function getAllMappingScore() {
    let data = fs.readFileSync('data/scoreDefinition.json');
    return JSON.parse(data);
}

function getAllStudentWithScoreMapping() {
    let mappingScore = getAllMappingScore();
    let studentList = getAllStudents();
    let studentMappingScoreList = []
    studentList.forEach(element => {
        var score = mappingScore[element.score];
        element.score = score;
        studentMappingScoreList.push(element);
    });

    return studentMappingScoreList;
}

async function writeToFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, async (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });

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


module.exports.getAllStudents = getAllStudents;
module.exports.getAllStudentWithScoreMapping = getAllStudentWithScoreMapping;
module.exports.writeToFile = writeToFile;
