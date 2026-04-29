import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_KEY, PRODUCTION } from "../config/env";
import { user } from "../models";
import db from "../config/db";
// interface AuthRequest extends Request {
//     user?:string
// }
//                                       👇 authrequest 
export const adminProtect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.USER
    if (!token) {
        return res.status(401).json({ message: "un authorized access" })
    }
    jwt.verify(token, JWT_KEY, (err: any, decode: any) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }

        // const [result]=awit db.select().from(user).where(eq(user.id, decode.id))
        // if(result && result.role === "admin"){
        // req.user= decode.id
        //     next()
        // }else{
        //     return res.status(401).json({message: "admin only route"})
        // }



        (req as any).user = decode.id
        console.log("decode id", decode.id)
        next()
    })

}

export const protect = (role: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieName = role === "admin" ? "USER" : "EMPLOYEE"
        const TOKEN = req.cookies[cookieName]
        if (!TOKEN) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "unable to authenticate"
                    : "No Cookie "
            })
        }
        jwt.verify(TOKEN, JWT_KEY, async (err: any, decode: any) => {
            if (err) {
                return res.status(401).json({ message: "invalid token" })
            }

            // const result = await db.query.user.findFirst({
            //   where: (u, { eq }) => eq(u.id, decode.id)
            // })

            // if (!result) {
            //   return res.status(401).json({ message: "Invalid Id" })
            // }

            // if (result.role !== role) {
            //   return res.status(403).json({ message: "Not Authorized to access this route" })
            // }

            (req as any).user = decode.id

            next()
        })
    } catch (error) {
        console.log(error)

        res.status(401).json({ message: "unable to authenticate" })
    }
}