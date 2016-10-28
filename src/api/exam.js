var request = require('../extend/http-request')
var path = '/service/public/exam/'

export default {
    getExams(params) {
        return request.get(path + 'getExams', params)
    },
    getExam(params) {
        return request.get(path + 'getExam', params)
    }
}