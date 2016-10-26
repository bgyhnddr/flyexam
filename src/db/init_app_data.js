var subject = require('./models/subject')
var question = require('./models/question')
var answer = require('./models/answer')

module.exports = function() {
    return Promise.all([
        subject.create({ name: '一战' }),
        subject.create({ name: '二战' }),
        question.create({ content: '谁是一战发起者', subject_id: 1 }),
        question.create({ content: '谁是二战发起者', subject_id: 2 }),
        answer.create({ right: true, type: "string", value: "不是我", question_detail_id: 1 }),
        answer.create({ right: false, type: "img", value: "1", question_detail_id: 1 }),
        answer.create({ right: false, type: "img", value: "2", question_detail_id: 1 })
    ])
}