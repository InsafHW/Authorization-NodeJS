const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const generateToken = (id, roles) => {
    return jwt.sign({
        id,
        roles
    }, 'secret', {
        expiresIn: '1h'
    })
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({errors: errors.array()})
            }
            const {name, password} = req.body
            const candidate = await User.findOne({
                name
            })
            if (candidate) {
                return res
                    .status(400)
                    .json({message: `User already exist`})
            }
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({
                name,
                password,
                roles: [userRole.value]
            })
            user.password = await bcrypt.hash(password, 5)
            await user.save()
            return res.json({
                message: `User was created`,
                user: {
                    id: user._id,
                    name
                }
            })
        } catch (e) {
            res
                .status(500)
                .json({message: `Registration error ${e}`})
        }
    }

    async login(req, res) {
        try {
            const {name, password} = req.body
            const candidate = await User.findOne({name})
            if (candidate) {
                const isPasswordCorrect = await bcrypt.compare(password, candidate.password)
                if (isPasswordCorrect) {
                    const token = generateToken(candidate._id, candidate.roles)
                    return res
                        .json({message: `Success login`, token})
                }
            }
            return res
                .json({message: `Email or password incorrect`})
        } catch (e) {
            res
                .status(500)
                .json({message: `Login error ${e}`})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (e) {
            res
                .status(500)
                .json({message: `GetUsers error ${e}`})
        }
    }
}

module.exports = new AuthController()
