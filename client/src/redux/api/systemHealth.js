import { apiSlice } from "../slices/apiSlice";

const SYS_HEALTH_URL = "/system-health"

const systemHealthSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getSystemHealth:builder.query({
            query:()=>({
                url:`${SYS_HEALTH_URL}`,
                method:"GET",

            })
        })
    })
})


export const {useGetSystemHealthQuery}= systemHealthSlice


