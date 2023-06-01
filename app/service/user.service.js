const User = require('../models/User')

const GetAllUsers = async () => {
    try {
        return await User.find()
    } catch (err) {
        throw err;
    }
}
const GetUserById = async (userid) => {
    try {
        return await User.findById(userid)
    } catch (err) {
        throw err;
    }
}

const InsertUser = async (userinfo) => {
    try {
        const isUser = await FindUserByEmail(userinfo.email);
        if (isUser !== null) {
            return false;
        } else {
            const newUser = new User(userinfo);
            await newUser.save();
            return true;
        }

    } catch (err) {
        throw err;
    }
}

const FindUserByEmail = async (email) => {
    try {
        const isUser = await User.find({ email: email });
        if (isUser.length > 0) {
            return isUser
        } else {
            return null
        }
    } catch (error) {
        throw error;
    }
}

const DeleteUserById = async (userid) => {
    try {
        const response = await User.findByIdAndRemove(userid)
    }
    catch (err) {
        throw err;
    }


}
const UpdateUserById = async (userid, userinfo) => {
    try {
        const response = await User.findByIdAndUpdate(userid, userinfo)
    }
    catch (err) {
        throw err;
    }
}
module.exports = { GetAllUsers, GetUserById, InsertUser, DeleteUserById, UpdateUserById }