var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var exam = sequelize.define(
    'exam', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, unique: true },
        time_limit: Sequelize.INTEGER,
        score: Sequelize.INTEGER,
        comments: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = exam