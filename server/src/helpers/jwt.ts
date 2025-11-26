import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export interface jwtPayload {
    id: string,
    email: string
}

export const signToken = (payload : jwtPayload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}


