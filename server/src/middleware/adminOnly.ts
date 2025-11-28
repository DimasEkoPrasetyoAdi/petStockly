import {Request, Response, NextFunction} from 'express'

export const adminOnly =(req: Request, res: Response, next: NextFunction) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(403).json({message: `You are not authorized to perform this action`})
        }else{
            return next()
        }
    } catch (error) {
        next(error)
    }
}