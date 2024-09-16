import WriteBlog from "@/components/Custom/WriteBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddBlogMutation } from "@/redux/api/blogApiSlice";

import { useState } from "react";
import { toast } from "sonner";





export default function AddBlogForm({setVisible}) {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date,setDate] = useState('');
  const [readTime,setReadTime] = useState("");
  const [excerpt,setExcerpt] = useState("")


  const [addblog,{isLoading}] = useAddBlogMutation()
  const handleAddBlog =  (e) => {
    e.preventDefault()
    console.log(title,content,date,readTime,excerpt)
    try {
       //await addblog({title,readTime,date,excerpt,content:content?.getContent(), image:content?.dom.select('img'[0].currentSrc)})
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    
    if (title && content) {
      // setBlogs([...blogs, { title, content }])
      setTitle('')
      setContent('')
    }

  }
  

  return (
    <Card className='  w-[80vw] h-[80vh] '>
    <CardHeader className="flex flex-row justify-between items-center mr-4 ">
      <div ><CardTitle>Add New Blog</CardTitle>
      <CardDescription>Create a new blog post here.</CardDescription></div>
      <Button onClick={()=>setVisible((prev)=>(!prev))} variant='destructive'>Close</Button>
      
    </CardHeader>
    <CardContent>
      <form onSubmit={handleAddBlog}>
        <div className="grid w-[80vw] items-center gap-4">
          <div className="">
            <Input
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="">
            <Textarea
              id="excerpt"
              placeholder="Enter Subject"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          <div className="">
            <Input
              id="readTime"
              placeholder="Enter blog Read Time"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
          <div className="">
            <Input
              type='date'
              id="content"
             
              value={date}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <WriteBlog setContent={setContent}/>
          
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button onClick={handleAddBlog}>Add Blog</Button>
    </CardFooter>
  </Card>
  )
}