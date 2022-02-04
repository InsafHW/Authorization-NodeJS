const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User
