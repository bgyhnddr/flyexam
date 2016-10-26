var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var subject = sequelize.define(
    'subject', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, unique: true },
        comments: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = subject