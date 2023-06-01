const jwt = require('jsonwebtoken');
const StatusCode = require("../constraints/response-codes")


async function CheckCookie(req, res, next) {

    const token = req.cookies.authtoken
    if (!token || token === undefined || token === null) {
        return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
        if (err) {
            return res.status(StatusCode.Unauthorized).json({ message: "Unuthorized", ok: false })
        } else {
            next()
        }
    })
}



module.exports = { CheckCookie }