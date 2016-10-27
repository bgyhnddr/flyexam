var request = require('../extend/http-request')
var path = '/service/private/manager/'

export default {
    getSubjects() {
        return request.get(path + 'getSubjects')
    },
    submitSubject(params) {
        return request.post(path + 'submitSubject', params)
    },
    deleteSubject(params) {
        return request.post(path + 'deleteSubject', params)
    },
    getQuestions(subject, page, count, filterKey) {
        return request.get(path + 'getQuestions', {
            subject,
            page,
            count,
            filterKey
        })
    },
    submitQuestion(params) {
        return request.post(path + 'submitQuestion', params)
    },
    deleteQuestion(params) {
        return request.post(path + 'deleteQuestion', params)
    },
    getQuestionAnswers(params) {
        return request.get(path + 'getQuestionAnswers', params)
    },
    submitAnswer(params) {
        return request.post(path + 'submitAnswer', params)
    },
    getExams(params) {
        return request.get(path + 'getExams', params)
    }
}