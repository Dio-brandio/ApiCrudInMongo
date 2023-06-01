const StatusCode = require("../constraints/response-codes")
const userservice = require("../service/user.service")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config()

async function CheckLoginCrendentials(req,res) {
    try {
        const {email,password} = req.body
        if (!email || !password || !req.body) {
            return res.status(StatusCode.BadRequest).json({message:"Badrequest",ok:false})
        }
        const IsUser = await userservice.FindUserByEmail(email)
        if (IsUser===null) {
            return res.status(StatusCode.BadRequest).json({message:"Badrequest",ok:false})
        }

        const IsCorrectPassword =await bcrypt.compare(password.toString(),IsUser.password.toString());

        if (!IsCorrectPassword) {
            return res.status(StatusCode.BadRequest).json({message:"Badrequest",ok:false});
        }

        const userCredentials ={
            email:IsUser.email,
            userid:IsUser._id,
            name:IsUser.name
        }

        const token = jwt.sign(userCredentials, process.env.JWT_SECRET);
        return res.status(StatusCode.OK).json({token,ok:true});

    } catch (error) {
        return res.status(StatusCode.InternalServer).json({message:error.message,ok:false});
    }
   
    
}


async function RegisterUser(req,res) {
    
}

module.exports = { CheckLoginCrendentials,RegisterUser}