const Router = require('express')
const router = new Router()
const authController = require('./authController')
const {body} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration',
    body('name').not().isEmpty(),
    body('password').isLength({
        min: 8,
        max: 16
    }),
    authController.registration
)
router.post('/login', authController.login)
router.get('/users',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    authController.getUsers
)

module.exports = router
