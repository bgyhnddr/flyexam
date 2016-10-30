var shuffle = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
        var sequelize = require('sequelize')
        var exam = require("../../db/models/exam")
        var exam_subject = require("../../db/models/exam_subject")
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")
        subject.hasMany(exam_subject)
        exam_subject.belongsTo(exam)

        question.hasMany(answer)

        subject.hasMany(exam_subject)
        return subject.findAll({
            include: {
                model: exam_subject,
                include: {
                    model: exam,
                    where: {
                        id: req.query.id
                    }
                }
            }
        }).then((resultList) => {
            if (resultList.length > 0) {
                var findList = []
                resultList.forEach((result) => {
                    result.exam_subjects.forEach((o) => {
                        findList.push(question.findAll({
                            include: answer,
                            where: {
                                subject_id: o.subject_id
                            },
                            limit: o.question_count
                        }))
                    })
                })
                return Promise.all(findList)
            } else {
                return Promise.reject("not found")
            }
        }).then((result) => {
            var returnList = []
            result.forEach((o) => {
                o.forEach((q) => {
                    var ans = []
                    q.answers.forEach((a) => {
                        ans.push({
                            right: a.right,
                            type: a.type,
                            value: a.value
                        })
                    })
                    ans = shuffle(ans)

                    var item = {
                        content: q.content,
                        answers: ans
                    }
                    returnList.push(item)
                })
            })

            return shuffle(returnList)
        })
    },
    getSubject(req, res, next) {
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")

        subject.hasMany(question)
        question.hasMany(answer)

        return subject.findOne({
            include: {
                model: question,
                include: answer
            },
            where: {
                id: req.query.id
            }
        }).then((result) => {
            if (result != null) {
                return {
                    name: result.name,
                    questions: shuffle(result.questions.map((q) => {
                        var ans = []
                        ans = q.answers.map((a) => {
                            return {
                                right: a.right,
                                value: a.value,
                                type: a.type
                            }
                        })

                        return {
                            content: q.content,
                            answers: shuffle(ans)
                        }
                    }))
                }
            } else {
                return Promise.reject("not found")
            }
        })
    },
    getSubjects(req, res, next) {
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        subject.hasMany(question)
        return subject.findAll({
            include: question
        }).then((result) => {
            if (result != null) {
                return result.map((s) => {
                    return {
                        id: s.id,
                        name: s.name,
                        comments: s.comments,
                        question_count: s.questions.length
                    }
                })
            } else {
                return Promise.reject("not found")
            }
        })
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