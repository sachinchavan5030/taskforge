import type { Task } from './admin'
export type GET_TASK_REQUEST = void
export type GET_TASK_RESPONSE = {
    message: string,
    result?: Task[]
}

export type Communication = {
    id?: number
    msg: string | null
    userId: number
    taskId: number
}

export type CREATE_COMMUNICATION_REQUEST = {
    id?: number
    msg?: string
    userId?: number
    taskId?: number
}
export type CREATE_COMMUNICATION_RESPONSE = {
    message: string
}

export type GET_COMMUNICATION_REQUEST = void
export type GET_COMMUNICATION_RESPONSE = {
    message: string,
    result?: Communication[]
}