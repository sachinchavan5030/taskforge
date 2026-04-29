import { CREATE_COMMUNICATION_REQUEST, CREATE_COMMUNICATION_RESPONSE, GET_COMMUNICATION_REQUEST, GET_COMMUNICATION_RESPONSE, GET_TASK_REQUEST, GET_TASK_RESPONSE } from "@repo/types"
import db from "../config/db"
import { communication, task } from "../models"
import { Request, Response } from "express"
import { eq } from "drizzle-orm"
// interface AuthRequest extends Request{
//     user:number
// }
//                                 👇mreq
export const getEmployee = async (req: Request<{}, {}, GET_TASK_REQUEST>, res: Response<GET_TASK_RESPONSE>) => {
    try {

        // const req = mreq as Authrequest
        const USER = (req as any).user
        //                                                                👇req
        const result = await db.select().from(task).where(eq(task.userId, USER))
        res.status(200).json({ message: " employee with task fetch success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch employee with task" })
    }
}



export const createCommunication = async (req: Request<{}, {}, CREATE_COMMUNICATION_REQUEST>, res: Response<CREATE_COMMUNICATION_RESPONSE>) => {
    try {
        const { msg, taskId, } = req.body
        console.log("req.body", req.body)
        await db.insert(communication).values({ taskId, msg, userId: (req as any).user })
        res.status(201).json({ message: "communication create success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to create communication" })
    }
}

export const fetchCommunication = async (req: Request<{}, {}, GET_COMMUNICATION_REQUEST>, res: Response<GET_COMMUNICATION_RESPONSE>) => {
    try {
        const result = await db.select().from(communication)
        res.status(200).json({ message: "communication fetch success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch communication" })
    }
}