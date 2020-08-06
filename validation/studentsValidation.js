const validator = require('express-validator');
const { body, validationResult } = require('express-validator');

const studentReqestValidation = [
    body('name').isLength({ min: 5 }),
    body('grade').isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
];

function getValidationResult(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return errors.array;
    return null;
}

module.exports = { studentReqestValidation, getValidationResult }

