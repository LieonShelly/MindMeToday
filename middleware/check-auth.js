const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded
        next()
        console.log("Token Valid Success")
    } catch (error) {
        return res.status(401).json({
            messsgae: 'Auth failed'
        })
    }
}