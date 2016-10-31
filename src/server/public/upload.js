var formidable = require('formidable')
var util = require('util')
var fs = require('fs')

var exec = {
    getAttachment(req, res, next) {
        var id = req.query.id
        if (id) {
            var fs = require('fs')
            var file = require('../../db/models/file')
            var attachment = require('../../db/models/attachment')
            attachment.belongsTo(file)
            attachment.findOne({
                include: file,
                where: {
                    id: id
                }
            }).then((result) => {
                if (result != null) {
                    var localFile = fs.readFileSync("upload/files/" + result.file_hash, 'binary')
                    res.setHeader('Content-disposition', 'inline; filename=' + encodeURIComponent(result.name))
                    res.setHeader('Content-Type', result.file.type)
                    res.setHeader('Content-Length', result.file.size)
                    res.write(localFile, 'binary')
                    res.end()
                } else {
                    return Promise.reject("no file record")
                }
            })
        } else {
            return Promise.reject("no file id")
        }
    }
}


module.exports = (req, res, next) => {
    var action = req.params.action
    Promise.resolve(action).then(function(result) {
        return exec[result](req, res, next)
    }).then(function(result) {
        if (req.params.action != "getAttachment") {
            res.send(result)
        }
    }).catch(function(error) {
        console.log(error)
        res.status(500).send(error.toString())
    })
}