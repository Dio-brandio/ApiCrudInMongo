const User = require('../models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            const hashedpassword = await bcrypt.hash(userinfo.password, saltRounds)
            userinfo.password = hashedpassword;
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
        const UserWithEmail = await User.findOne({ email: email });
        return UserWithEmail
    } catch (error) {
        throw error;

    }
}

const DeleteUserById = async (userid) => {
    try {
        const isUser = await GetUserById(userid);

        if (isUser !== null) {
            const response = await User.findByIdAndRemove(userid)
            return true;
        }
        return false;
    }
    catch (err) {
        throw err;
    }


}
const UpdateUserById = async (userid, userinfo) => {
    try {
        const isUser = await GetUserById(userid);

        if (isUser !== null) {
            const response = await User.findByIdAndUpdate(userid, userinfo)
            return true;
        }
        return false;

    }
    catch (err) {
        throw err;
    }
}
module.exports = { GetAllUsers, GetUserById, InsertUser, DeleteUserById, UpdateUserById, FindUserByEmail }