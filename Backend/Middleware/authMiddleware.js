const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];

        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);

        next()
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Invalid token! Please try logging in again."
        })
    }
}

module.exports=authMiddleware;