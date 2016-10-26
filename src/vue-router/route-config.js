export function configRouter(router) {
    router.map({
        '/': {
            component: function(resolve) {
                require(['../components/Master.vue'], resolve)
            },
            subRoutes: {}
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
                        }
                    }
                }
            }
        }
    })
}