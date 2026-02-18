import jwt from "jsonwebtoken";
import User  from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

       token = req.headers.authorization.split(" ")[1];
       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded?.id).select("-password");

        next();
       } catch (err) {
            return res.status(401).json({ message: `Not authorized, token failed: ${err}` })
       }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

}