var subject = require('./models/subject')
var question = require('./models/question')
var answer = require('./models/answer')
var user = require('./models/user')
var role = require('./models/role')
var permission = require('./models/permission')
var user_role = require('./models/user_role')
var role_permission = require('./models/role_permission')

module.exports = function() {
    return Promise.all([
        subject.create({ name: '一战' }),
        subject.create({ name: '二战' }),
        question.create({ content: '谁是一战发起者', subject_id: 1 }),
        question.create({ content: '谁是二战发起者', subject_id: 2 }),
        answer.create({ right: true, type: "string", value: "不是我", question_id: 1 }),
        answer.create({ right: false, type: "img", value: "1", question_id: 1 }),
        answer.create({ right: false, type: "img", value: "2", question_id: 1 }),
        user.create({ account: 'manager', password: "manager" }),
        role.create({ code: "manager", name: "manager" }),
        user_role.create({ user_account: "manager", role_code: "manager" }),
        permission.create({ code: "manager", name: "manager" }),
        permission.create({ code: "upload", name: "upload" }),
        role_permission.create({ role_code: "manager", permission_code: "manager" }),
        role_permission.create({ role_code: "manager", permission_code: "upload" })
    ])
}