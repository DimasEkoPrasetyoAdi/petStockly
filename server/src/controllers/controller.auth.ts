import { createUser, findUserByEmail } from "../models/model.user";
import { hashPassword,comparePassword } from "../helpers/bcrypt";
import { signToken, verifyToken } from "../helpers/jwt";
import { NextFunction, Request, Response } from "express";

class AuthController {

    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const {username, email, password, role, phone_number, address} = req.body
            if(!username){
                return res.status(400).json({message : `Username is required`})
            }else if(!password){
                return res.status(400).json({message : `Password is required`})
            }else if(!email){
                return res.status(400).json({message : `Email is required`})
            }

            const existingUser = await findUserByEmail(email)
            if(existingUser){
                return res.status(400).json({message: `Email already registered`})
            }
            const hashedPassword = await hashPassword(password)
            const newUser = await createUser({
                username,
                email,
                password: hashedPassword,
                role,
                phone_number,
                address
            })
            res.status(201).json({
                username : newUser.username,
                email : newUser.email,
                role : newUser.role
            })

        } catch (error) {
            next(error)
        }

    }
}

export default AuthController