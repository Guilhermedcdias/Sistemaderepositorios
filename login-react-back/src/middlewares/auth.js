import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth";


export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: "token was not provided."});
    }
    const token = String(authHeader).split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token[1], authConfig.secret);
        req.user_id = decoded.id;
        return next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({error: "invalid token."});
    }
}