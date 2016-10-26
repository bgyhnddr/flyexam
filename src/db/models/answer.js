var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var answer = sequelize.define(
    'answer', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        right: Sequelize.BOOLEAN,
        type: Sequelize.STRING,
        value: Sequelize.STRING,
        question_id: Sequelize.INTEGER
    }, {
        underscored: true
    })


module.exports = answer