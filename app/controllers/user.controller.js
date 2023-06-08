const userservices = require("../service/user.service")
const StatusCode = require("../constraints/response-codes")
const { CheckValidId } = require("../utils/ObjectIdHelper");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function GetUsers(req, res) {
    try {
        const ListOfAllUsers = await userservices.GetAllUsers();

        return res.status(StatusCode.OK).json({ users: ListOfAllUsers, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function GetUser(req, res) {
    try {
        const userid = req.params.userid;
        if (!CheckValidId(userid)) {
            return res.status(StatusCode.ResourceNotFound).json({ users: "Not found", ok: true })
        }

        const SelectedUser = await userservices.GetUserById(userid);

        return res.status(StatusCode.OK).json({ users: SelectedUser === null ? [] : SelectedUser, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}


async function CreateUser(req, res) {
    try {
        if (!req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "BadRequest", ok: false })
        }

        const isCreated = await userservices.InsertUser(req.body);

        if (isCreated) {
            return res.status(StatusCode.EntryCreated).json({ message: "EntryCreated successfully", ok: true })
        } else {
            return res.status(StatusCode.BadRequest).json({ message: "Email Already Exists", ok: false })
        }
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}
async function DeleteUser(req, res) {
    try {

        if (!CheckValidId(req, res)) {
            return res.status(StatusCode.ResourceNotFound).json({ users: "Not found", ok: true })
        }
        const userid = req.params.userid;

        const IsDeleted = await userservices.DeleteUserById(userid);
        const message = IsDeleted ? "Deleted Sucessfully" : "User dosent exists";
        return res.status(StatusCode.OK).json({ message, ok: IsDeleted })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function UpdateUser(req, res) {
    try {
        if (!CheckValidId(req, res)) {
            return res.status(StatusCode.ResourceNotFound).json({ users: "Not found", ok: true })
        }
        if (!req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "BadRequest", ok: false })
        }
        const userid = req.params.userid;
        const IsUpdated = await userservices.UpdateUserById(userid, req.body);
        const message = IsUpdated ? "Updated Sucessfully" : "User dosent exists";
        return res.status(StatusCode.OK).json({ message, ok: IsUpdated })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}


//password reset logic

async function SendPasswordResetLink(req, res) {
    try {

        const IsUser = await userservices.FindUserByEmail(req.userData.email);
        if (IsUser === null) {

            return res.status(StatusCode.BadRequest).json({ message:"BadRequest", ok: false })
        }
        // eslint-disable-next-line no-undef
        const emailtoken = jwt.sign({ email: IsUser.email }, process.env.JWT_SECRET)
        const link = await userservices.SendMail(IsUser.email, `http://localhost:4000/user/passwordreset/${emailtoken}`);
        return res.status(StatusCode.OK).json({ link })
    } catch (err) {

        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function CheckPasswordResetUser(req, res) {
    try {
        return res.status(StatusCode.OK).json({ ok: true, message: "Resetpage" })
    } catch (err) {

        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function ResetPassword(req, res) {
    try {
        const emailtoken = req.params.token;

        if (!emailtoken || emailtoken === null) return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })

        // eslint-disable-next-line no-undef
        const { email } = jwt.verify(emailtoken, process.env.JWT_SECRET).catch((e) => res.status(StatusCode.TokenInvalid).json({ message:"Not Available",ok:false}) )


        const IsUser = await userservices.FindUserByEmail(email);
        if (IsUser === null) {
            return res.status(StatusCode.BadRequest).json({ message: "Badrequest", ok: false })
        }

        const hashedpassword = await bcrypt.hash(req.body.password, 10)
        const updateUserPassword = await userservices.UpdateUserById(IsUser._id, { password: hashedpassword })
        return res.status(StatusCode.OK).json({ message: "Updated", ok: updateUserPassword })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function GetProfile(req, res) {
    try {
        return res.status(StatusCode.OK).json({ profile: req.userData })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}



module.exports = { GetUsers, GetUser, CreateUser, DeleteUser, UpdateUser, SendPasswordResetLink, ResetPassword, CheckPasswordResetUser, GetProfile }