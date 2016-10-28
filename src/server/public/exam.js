var exec = {
    getExams(req, res, next) {
        var exam = require("../../db/models/exam")
        var exam_subject = require("../../db/models/exam_subject")
        var subject = require("../../db/models/subject")

        exam.hasMany(exam_subject)
        exam_subject.belongsTo(subject)

        return exam.findAll({
            include: {
                model: exam_subject,
                include: subject
            },
            order: 'exam.id DESC'
        })
    },
    getExam(req, res, next) {
        var exam = require("../../db/models/exam")
        var exam_subject = require("../../db/models/exam_subject")
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")

        exam.hasMany(exam_subject)
        exam_subject.belongsTo(subject)
        subject.hasMany(question)
        question.hasMany(answer)


    }
}


module.exports = (req, res, next) => {
    var action = req.params.action
    Promise.resolve(action).then(function(result) {
        return exec[result](req, res, next)
    }).then(function(result) {
        res.send(result)
    }).catch(function(error) {
        console.log(error)
        res.status(500).send(error.toString())
    })
}