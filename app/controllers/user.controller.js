const userservices= require("../service/user.service")
const StatusCode = require("../constraints/response-codes")
const mongoose = require('mongoose');


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
        if (!await CheckValidId(req, res)) {
            return res.status(StatusCode.ResourceNotFound).json({ users: "Not found", ok: true })
        }
        const userid = req.params.userid;

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

        if (!await CheckValidId(req, res)) {
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
        if (!await CheckValidId(req, res)) {
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

async function CheckValidId(req, res) {
    const userid = req.params.userid;
    const isValidId = mongoose.Types.ObjectId.isValid(userid)
    if (!isValidId) {
        return false
    }
    return true
}

module.exports = { GetUsers, GetUser, CreateUser, DeleteUser, UpdateUser }