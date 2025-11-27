import {Request, Response, NextFunction} from "express"
import { jwtPayload, verifyToken } from '../helpers/jwt';
import { findUserById } from "../models/model.user";

export interface AuthRequest extends Request{
    user?: {
        id: number,
        email: string,
        role: string
    }
}

export const authentication = async (
    req: AuthRequest,
     res: Response,
     next: NextFunction
)=>{
    const bearerToken = req.headers.authorization

    if(!bearerToken){
        return res.status(401).json({message: `You're not authorized`})
    }

    const access_token = bearerToken.split(" ")[1]

    if(!access_token){
        return res.status(401).json({message: `You're not authorized`})
    }

    try {
        const data = verifyToken(access_token) as jwtPayload
        const user = await findUserById(data.id)
        if(!user){
            return res.status(401).json({message: `You're not authorized`})
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        next()
    } catch (error) {
        next(error)
    }
}
