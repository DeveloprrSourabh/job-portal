import jwt from "jsonwebtoken";

const protect=(req,res,next)=>{
    try {
        let token;

        // token from header
        const authHeader=req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
        // token not found
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        // token verifying
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // save user in req.
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Token failed",
        });
    }
}

export default protect;