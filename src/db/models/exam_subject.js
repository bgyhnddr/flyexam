var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var exam_subject = sequelize.define(
    'exam_subject', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        exam_id: { type: Sequelize.INTEGER, unique: "test_subject_unique" },
        subject_id: { type: Sequelize.INTEGER, unique: "test_subject_unique" },
        question_count: Sequelize.INTEGER

    }, {
        underscored: true
    })


module.exports = exam_subject