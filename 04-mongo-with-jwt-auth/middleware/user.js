const { User } = require("../db");
const {JWT_KEY}= require("../key");
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization;
    const jwttoken=token.split(" ")[1];
    try{
        const decoded=jwt.verify(jwttoken,JWT_KEY);
    if (decoded.username){
        req.username=decoded.username;
      next();
    }   
else 
res.json({
    msg:"Username does not exist"
})
    }
    catch(e){
        res.status(403).json({
            msg:"Authentication failed."
        })
    }
}

module.exports = userMiddleware;