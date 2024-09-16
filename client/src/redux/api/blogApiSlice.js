import { apiSlice } from "../slices/apiSlice";

const BLOG_URL ="/admin/blog";

const blogAPiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addBlog:builder.mutation({
            query:(data)=>({
                url:`${BLOG_URL}`,
                body:data,
                method:"POST"
            })
        })
    })
})

export const {useAddBlogMutation} = blogAPiSlice