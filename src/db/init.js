var Sequelize = require('sequelize')
module.exports = function(req, res, next) {
    Promise.all([
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
        return Promise.all([
            require('./init_data')(),
            require('./init_app_data')()
        ])
    }).then(function() {
        res.send("success")
    }).catch(function(err) {
        res.send(err)
    })
}