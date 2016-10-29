var exec = {
    getSubjects(req, res, next) {
        var subject = require("../../db/models/subject")
        return subject.findAll()
    },
    submitSubject(req, res, next) {
        var subject = require("../../db/models/subject")
        return subject.findOne({
            where: {
                id: req.body.id
            }
        }).then((result) => {
            if (result != null) {
                return result.update(req.body)
            } else {
                return subject.create(req.body)
            }
        })
    },
    deleteSubject(req, res, next) {
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")
        var exam_subject = require("../../db/models/exam_subject")

        subject.hasMany(exam_subject)
        subject.hasMany(question)
        question.hasMany(answer)

        return subject.findOne({
            include: [
                exam_subject,
                {
                    model: question,
                    include: answer
                }
            ],
            where: {
                id: req.body.id
            }
        }).then((result) => {
            if (result != null) {
                var doingList = []
                result.exam_subjects.forEach((o) => doingList.push(o.destroy()))
                result.questions.forEach((q) => {
                    q.answers.forEach((a) => {
                        doingList.push(a.destroy())
                    })
                    doingList.push(q.destroy())
                })
                doingList.push(result.destroy())
                return Promise.all(doingList)

            } else {
                return "do nothing"
            }
        })
    },
    getQuestions(req, res, next) {
        var filterKey = req.query.filterKey == undefined ? "" : req.query.filterKey
        var count = req.query.count == undefined ? 10 : parseInt(req.query.count)
        var page = req.query.page == undefined ? 0 : parseInt(req.query.page)
        var subject_name = req.query.subject

        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        question.belongsTo(subject)



        return Promise.all([
            question.findAll({
                include: [{
                    model: subject,
                    where: {
                        name: subject_name
                    }
                }],
                where: {
                    content: {
                        $like: "%" + filterKey + "%"
                    }
                },
                offset: page * count,
                limit: count
            }),
            question.count({
                include: [{
                    model: subject,
                    where: {
                        name: subject_name
                    }
                }],
                where: {
                    content: {
                        $like: "%" + filterKey + "%"
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    submitQuestion(req, res, next) {
        var id = req.body.id
        var subject = require("../../db/models/subject")
        var question = require("../../db/models/question")
        subject.hasOne(question)
        return subject.findOne({
            where: {
                name: req.body.subject
            }
        }).then((result) => {
            if (result != null) {
                return result
            } else {
                return Promise.reject("no subject")
            }
        }).then((result) => {
            return question.findOne({
                where: {
                    id: req.body.id
                }
            }).then((q) => {
                if (q != null) {
                    return q.update({ content: req.body.content })
                } else {
                    return question.create({
                        content: req.body.content,
                        subject_id: result.id
                    })
                }
            })
        })
    },
    deleteQuestion(req, res, next) {
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")
        question.hasMany(answer)
        return question.findOne({
            include: answer,
            where: {
                id: req.body.id
            }
        }).then((result) => {
            if (result != null) {
                var doingList = []

                result.answers.forEach((a) => {
                    doingList.push(a.destroy())
                })
                doingList.push(result.destroy())

                return Promise.all(doingList)
            } else {
                return "do nothing"
            }
        })
    },
    getQuestionAnswers(req, res, next) {
        var question = require("../../db/models/question")
        var answer = require("../../db/models/answer")

        question.hasMany(answer)

        return question.findOne({
            include: answer,
            where: {
                id: req.query.id
            },
            order: 'right DESC'
        }).then((result) => {
            return result
        })
    },
    submitAnswer(req, res, next) {
        var answer = require("../../db/models/answer")
        return answer.upsert(req.body)
    },
    deleteAnswer(req, res, next) {
        var answer = require("../../db/models/answer")
        var answer = require("../../db/models/answer")
        return answer.destroy({
            where: {
                id: req.body.id
            }
        }).then(() => {
            return "success"
        })
    },
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
    submitExam(req, res, next) {
        var exam = require("../../db/models/exam")
        var exam_subject = require("../../db/models/exam_subject")
        var subject = require("../../db/models/subject")

        exam.hasMany(exam_subject)

        return exam.findOne({
            include: {
                model: exam_subject
            },
            where: {
                id: req.body.id
            }
        }).then((result) => {
            if (result != null) {
                return result
            } else {
                return exam.create({
                    name: req.body.name,
                    time_limit: req.body.time_limit
                }).then((created) => {
                    req.body.id = created.id
                    return exam.findOne({
                        include: {
                            model: exam_subject
                        },
                        where: {
                            id: req.body.id
                        }
                    })
                })
            }
        }).then((result) => {
            var deleteList = []
            result.exam_subjects.forEach(o => deleteList.push(o.destroy()))
            return Promise.all(deleteList).then(function() {
                return result
            })
        }).then((result) => {
            result.name = req.body.name
            result.time_limit = req.body.time_limit
            result.comments = req.body.comments
            var newList = []
            req.body.exam_subjects.forEach((o) => {
                newList.push({
                    exam_id: result.id,
                    subject_id: o.subject_id,
                    question_count: o.question_count
                })
            })
            return Promise.all([
                exam_subject.bulkCreate(newList),
                result.save()
            ])
        }).then((result) => {
            return exam.findOne({
                include: {
                    model: exam_subject,
                    include: subject
                },
                where: {
                    id: req.body.id
                }
            })
        })
    },
    deleteExam(req, res, next) {
        var exam = require("../../db/models/exam")
        var exam_subject = require("../../db/models/exam_subject")

        exam.hasMany(exam_subject)
        return exam.findOne({
            include: {
                model: exam_subject
            },
            where: {
                id: req.body.id
            }
        }).then((result) => {
            if (result != null) {
                return Promise.all([
                    result.exam_subjects.map(o => o.destroy()),
                    result.destroy()
                ])
            } else {
                return "do nothing"
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
        res.status(500).send(error.toString())
    })
}