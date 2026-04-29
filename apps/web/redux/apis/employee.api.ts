import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_COMMUNICATION_REQUEST, CREATE_COMMUNICATION_RESPONSE, GET_COMMUNICATION_REQUEST, GET_COMMUNICATION_RESPONSE, GET_TASK_REQUEST, GET_TASK_RESPONSE } from "@repo/types"

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/employee`, credentials: "include" }),
    tagTypes: ["communication"],
    endpoints: (builder) => {
        return {
            getEmployeeTask: builder.query<GET_TASK_RESPONSE, GET_TASK_REQUEST>({
                query: () => {
                    return {
                        url: "/getEmployeeTask",
                        method: "GET"
                    }
                },
                // providesTags: [""]
            }),
            addCommunication: builder.mutation<CREATE_COMMUNICATION_RESPONSE, CREATE_COMMUNICATION_REQUEST>({
                query: userData => {
                    return {
                        url: "/createCommunication",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["communication"]
            }),
            getCommunication: builder.query<GET_COMMUNICATION_RESPONSE, GET_COMMUNICATION_REQUEST>({
                query: () => {
                    return {
                        url: "/fetchCommunication",
                        method: "GET"
                    }
                },
                providesTags: ["communication"]
            }),

        }
    }
})

export const { useGetEmployeeTaskQuery, useAddCommunicationMutation, useGetCommunicationQuery } = employeeApi
