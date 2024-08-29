

import {apiSlice} from "../slices/apiSlice"
const API_URL= "/profile"

// const {getToken}=useAuth()
// const token = await getToken();
const founderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        addFounder:builder.mutation({
            query:({data,token})=>({
                url:`${API_URL}`,
                method:"POST",
                body:data,
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                // credentials:"include"
            })
            
        }),
        getData:builder.query({
            query:({token,id})=>({
                url:`${API_URL}/${id}`,
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                
            })
        }),
        findCoFounder:builder.mutation({
            query:({token,filters})=>({
                url:`${API_URL}/find-coFounders`,
                method:"POST",
                body:filters,
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                // credentials:"include"
            })
        })
    })
})

export const {useAddFounderMutation, useGetDataQuery, useFindCoFounderMutation  } = founderApiSlice 