export function configRouter(router) {
    router.map({
        '/': {
            component: require('../components/ExamMaster.vue'),
            subRoutes: {
                '': {
                    component: require('../components/ExamSelect.vue')
                },
                'Exam': {
                    component: require('../components/ExamSelect.vue')
                },
                'Exam/:id': {
                    component: require('../components/Exam.vue')
                },
                'Practice': {
                    component: require('../components/PracticeSelect.vue')
                },
                'Practice/:id': {
                    component: require('../components/Practice.vue')
                }
            }
        },
        '/admin': {
            component: function(resolve) {
                require(['../components/Master.vue'], resolve)
            },
            subRoutes: {
                'RBACManagement': {
                    component: function(resolve) {
                        require(['../components/RBACManagement.vue'], resolve)
                    },
                    subRoutes: {
                        'User': {
                            component: function(resolve) {
                                require(['../components/UserSetting.vue'], resolve)
                            }
                        },
                        'Role': {
                            component: function(resolve) {
                                require(['../components/RoleSetting.vue'], resolve)
                            }
                        },
                        'Permission': {
                            component: function(resolve) {
                                require(['../components/PermissionSetting.vue'], resolve)
                            }
                        }
                    }
                },
                'ExamManagement': {
                    component: function(resolve) {
                        require(['../components/ExamManagement.vue'], resolve)
                    },
                    subRoutes: {
                        'Subject': {
                            component: function(resolve) {
                                require(['../components/SubjectSetting.vue'], resolve)
                            }
                        },
                        'Subject/:subject': {
                            component: function(resolve) {
                                require(['../components/QuestionSetting.vue'], resolve)
                            }
                        },
                        'Subject/:subject/:question': {
                            component: function(resolve) {
                                require(['../components/AnswerSetting.vue'], resolve)
                            }
                        },
                        'Topic': {
                            component: function(resolve) {
                                require(['../components/TopicSetting.vue'], resolve)
                            }
                        },
                        'ImportQuestion': {
                            component: function(resolve) {
                                require(['../components/ImportQuestion.vue'], resolve)
                            }
                        }
                    }
                }
            }
        }
    })
}