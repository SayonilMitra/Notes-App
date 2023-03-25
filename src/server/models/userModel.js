const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    notes: [String]
})

let usersModel = mongoose.model('users', userSchema)

module.exports = usersModel