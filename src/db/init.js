module.exports = function() {
    return Promise.all([
        require('./models/user'),
        require('./models/role'),
        require('./models/permission'),
        require('./models/user_role'),
        require('./models/role_permission'),
        require('./models/attachment'),
        require('./models/file'),
        require('./models/exam'),
        require('./models/subject'),
        require('./models/exam_subject'),
        require('./models/question'),
        require('./models/answer')
    ].map((o) => o.sync({ force: true }))).then(function() {
        return require('./init_data')()
    }).then(() => {
        return require('./init_app_data')()
    })
}