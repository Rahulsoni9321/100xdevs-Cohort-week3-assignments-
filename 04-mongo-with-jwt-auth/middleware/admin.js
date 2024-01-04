const { Admin } = require("../db");
const {JWT_KEY}= require("../key");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token=req.headers.authorization;
    const jwttoken=token.split(" ")[1];
    try{
        const decoded=jwt.verify(jwttoken,JWT_KEY);
         console.log(jwttoken)

    if (decoded.username){
      next();
    }   
else 
res.json({
    msg:"Admin does not exist"
})
    }
    catch(e){
        res.status(403).json({
            msg:"Incorrect inputs."
        })
    }

}

module.exports = adminMiddleware;