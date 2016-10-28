var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var question = sequelize.define(
    'question', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        content: { type: Sequelize.STRING },
        subject_id: Sequelize.INTEGER
    }, {
        underscored: true
    })


module.exports = question