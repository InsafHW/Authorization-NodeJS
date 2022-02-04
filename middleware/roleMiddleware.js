module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            let approved = false
            for (let i = 0; i < roles.length; i++) {
                if (req.userData.roles.includes(roles[i])) {
                    approved = true
                    break
                }
            }
            if (approved) {
                return next()
            }
            return res
                .status(403)
                .json({message: 'No rights'})
        } catch (e) {
            console.log(e)
        }
    }
}
