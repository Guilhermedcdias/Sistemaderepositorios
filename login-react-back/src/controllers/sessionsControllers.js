import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { UserModel } from "../models/user";
import { checkPassword } from "../services/auth";
class SessionControllers{
    async create(req, res){
        const { email, senha } = req.body

        const user =  await UserModel.findOne({where: {
            email: email
        }})
        if(!user) {
            return res.status(401).json({error: "User/Password invalid."})
        }
        if(!checkPassword(user, senha)){
            return res.status(401).json({error: "User/Password invalid."})
        }

        const { id } = user;

        return res.json({
            user: {
                id, 
                email
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            })
        });
    }
}

export default new SessionControllers();