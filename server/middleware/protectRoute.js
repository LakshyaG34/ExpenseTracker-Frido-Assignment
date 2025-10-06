import jwt from "jsonwebtoken"
import Auth from "../models/auth.model.js";

const protectRoute = async(req, res, next) =>{
    try{
        const token = await req.cookies.jwt;
        if(!token)
        {
            res.status(401).json({err : "Unauthorized - No token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded)
        {
            res.status(401).json({err : "Unauthorized - Invalid token"})
        }
        const user = await Auth.findById(decoded.userId);
        if(!user)
        {
            res.status(404).json({ message: "User Not found" });
        }
        req.user = {
            id : user.id,
            name : user.name,
            email : user.email
        }
        next();
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export default protectRoute;