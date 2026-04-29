import { Router } from "express"
import { createCommunication, fetchCommunication, getEmployee } from "../controllers/employee.controller"
const router = Router()

router
    .get("/getEmployeeTask", getEmployee)
    .post("/createCommunication", createCommunication)
    .get("/fetchCommunication", fetchCommunication)


export default router