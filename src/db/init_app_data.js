var subject = require('./models/subject')
var question = require('./models/question')
var answer = require('./models/answer')
var user = require('./models/user')
var role = require('./models/role')
var permission = require('./models/permission')
var user_role = require('./models/user_role')
var role_permission = require('./models/role_permission')
var exam = require('./models/exam')
var exam_subject = require('./models/exam_subject')

module.exports = function() {
    var exams = [],
        exam_subjects = [],
        subjects = [],
        questions = [],
        answers = []

    for (var i = 0; i < 5; i++) {
        exams.push({
            name: "考试" + (i + 1),
            time_limit: 60,
            comments: "满分100,60分合格"
        })

        exam_subjects.push({
            exam_id: i + 1,
            subject_id: 1,
            question_count: 60
        })

        exam_subjects.push({
            exam_id: i + 1,
            subject_id: 2,
            question_count: 60
        })
    }

    for (var i = 0; i < 3; i++) {
        subjects.push({
            name: '科目' + (i + 1)
        })

        for (var j = 0; j < 500; j++) {
            questions.push({
                content: '问题' + (j + 1),
                subject_id: i + 1
            })
            answers.push({
                right: true,
                type: "string",
                value: "正确答案",
                question_id: (j + 1) + i * 500
            })

            for (var k = 0; k < 3; k++) {
                answers.push({
                    right: false,
                    type: "string",
                    value: "错误答案" + (k + 1),
                    question_id: (j + 1) + i * 500
                })
            }
        }
    }



    return Promise.all([
        exam.bulkCreate(exams),
        subject.bulkCreate(subjects),
        exam_subject.bulkCreate(exam_subjects),
        question.bulkCreate(questions),
        answer.bulkCreate(answers),
        user.create({ account: 'manager', password: "manager" }),
        role.create({ code: "manager", name: "manager" }),
        user_role.create({ user_account: "manager", role_code: "manager" }),
        permission.create({ code: "manager", name: "manager" }),
        permission.create({ code: "upload", name: "upload" }),
        role_permission.create({ role_code: "manager", permission_code: "manager" }),
        role_permission.create({ role_code: "manager", permission_code: "upload" })
    ])
}