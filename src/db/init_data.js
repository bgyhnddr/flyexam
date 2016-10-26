var user = require('./models/user')
var role = require('./models/role')
var permission = require('./models/permission')
var user_role = require('./models/user_role')
var role_permission = require('./models/role_permission')

module.exports = function() {
    return Promise.all([
        user.create({ account: 'admin', password: "admin" }),
        user.create({ account: 'manager', password: "manager" }),
        role.create({ code: "admin", name: "admin" }),
        role.create({ code: "manager", name: "manager" }),
        user_role.create({ user_account: "admin", role_code: "admin" }),
        user_role.create({ user_account: "manager", role_code: "manager" }),
        permission.create({ code: "admin", name: "admin" }),
        permission.create({ code: "manager", name: "manager" }),
        role_permission.create({ role_code: "admin", permission_code: "admin" }),
        role_permission.create({ role_code: "manager", permission_code: "manager" })
    ])
}