const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res
                .status(403)
                .json({message: 'User is not authenticated'})
        }
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded
        return next()
    } catch (e) {
        console.log(e)
        return res
            .status(403)
            .json({message: 'User is not authenticated'})
    }
}
