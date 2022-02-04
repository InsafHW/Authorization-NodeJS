const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const app = express()
app.use(express.json())
app.use('/auth', authRouter)

const PORT = 5000

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://insafHw:Insaf55605@cluster0.zuznz.mongodb.net/roles_auth_pro_node_js?retryWrites=true&w=majority')
        app.listen(5000, () => {
            console.log(`Server has been started on port=${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
