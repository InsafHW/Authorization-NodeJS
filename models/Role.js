const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    value: {type: String, unique: true, required: true}
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role
