const StatusCode = require("../constraints/response-codes")
const userservice = require("../service/user.service")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function Authenticate(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password || !req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
        }
        const IsUser = await userservice.FindUserByEmail(email)
        if (IsUser === null) {
            return res.status(StatusCode.BadRequest).json({ message: "Invalid Credentials", ok: false })
        }

        const IsCorrectPassword = await bcrypt.compare(password.toString(), IsUser.password.toString());

        if (!IsCorrectPassword) {
            return res.status(StatusCode.BadRequest).json({ message: "Invalid Credentials", ok: false });
        }

        const userCredentials = {
            email: IsUser.email,
            userid: IsUser._id,
            name: IsUser.name
        }

        const token = jwt.sign(userCredentials, process.env.JWT_SECRET);
        res.cookie("authtoken", token)
        return res.status(StatusCode.OK).json({ token, ok: true });

    } catch (error) {
        return res.status(StatusCode.InternalServer).json({ message: error.message, ok: false });
    }


}


async function RegisterUser(req, res) {
    try {
        const { email } = req.body
        if (!email || !req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
        }

        const IsInserted = await userservice.InsertUser(req.body)
        const message = IsInserted ? "Inserted Sucessfully" : "Email cant be used";
        return res.status(StatusCode.OK).json({ message, ok: true });

    } catch (error) {
        return res.status(StatusCode.InternalServer).json({ message: error.message, ok: false });

    }
}

module.exports = { Authenticate, RegisterUser }