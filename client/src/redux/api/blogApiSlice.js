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
        }),
        getBlogs:builder.query({
            query:()=>({
                url:`${BLOG_URL}`,
                method:"GET"
            })
        })
    })
    
})

export const {useAddBlogMutation, useGetBlogsQuery} = blogAPiSlice