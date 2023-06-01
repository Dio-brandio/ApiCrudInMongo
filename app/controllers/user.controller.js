const { GetAllUsers, GetUserById, InsertUser, DeleteUserById, UpdateUserById } = require("../service/user.service")
const StatusCode = require("../constraints/response-codes")
const mongoose = require('mongoose');


async function GetUsers(req, res) {
    try {
        const ListOfAllUsers = await GetAllUsers();
        return res.status(StatusCode.OK).json({ users: ListOfAllUsers, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })
    }
}

async function GetUser(req, res) {
    try {
        await CheckSingleValidUserById(req,res);
        const userid = req.params.userid;
       
        const SelectedUser = await GetUserById(userid);
       
        return res.status(StatusCode.OK).json({ users: SelectedUser===null?[]:SelectedUser, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}


async function CreateUser(req, res) {
    try {
        if (!req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "BadRequest", ok: false })
        }

        const isCreated = await InsertUser(req.body);

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
       
        await CheckSingleValidUserById(req,res);
        const userid = req.params.userid;

        const IsDeleted = await DeleteUserById(userid);
       
        return res.status(StatusCode.OK).json({ IsDeleted, ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function UpdateUser(req,res) {
    try {
        await CheckSingleValidUserById(req,res);
        if (!req.body) {
            return res.status(StatusCode.BadRequest).json({ message: "BadRequest", ok: false })
        }
        const userid = req.params.userid;
        const IsUpdated = await UpdateUserById(userid,req.body);
        return res.status(StatusCode.OK).json({ message:"Successfully updated", ok: true })
    } catch (err) {
        return res.status(StatusCode.InternalServer).json({ message: err.message, ok: false })

    }
}

async function CheckSingleValidUserById(req,res) {
    const userid = req.params.userid;
    const isValidId = mongoose.Types.ObjectId.isValid(userid)
    if (!isValidId) {
        return res.status(StatusCode.ResourceNotFound).json({ users: "Not found", ok: true })
    }
}

module.exports = { GetUsers, GetUser, CreateUser,DeleteUser ,UpdateUser}