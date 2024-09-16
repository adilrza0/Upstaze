
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import AddBlogForm from "./AddBlog"
import { useState } from "react"


// Placeholder data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and start building awesome React applications.",
    date: "2023-05-15",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    excerpt: "Dive deep into Tailwind CSS and create beautiful, responsive designs.",
    date: "2023-05-20",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "The Power of TypeScript",
    excerpt: "Discover how TypeScript can improve your JavaScript development experience.",
    date: "2023-05-25",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    excerpt: "Learn techniques to boost the performance of your React applications.",
    date: "2023-05-30",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function ContentManagement() {
  const featuredPost = blogPosts[0]
  const [visible,setVisible] = useState(false)

  return visible?<AddBlogForm setVisible={setVisible} />: (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>

      {/* Featured Blog Post */}
      <section className="mb-12">
        <div className=" flex justify-between items-center "><h2 className="text-2xl font-semibold mb-4">Featured Post</h2> 
        <Button className=''  onClick={()=>setVisible((prev)=>(!prev))}>Add Blog</Button>
        </div>
        
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{featuredPost.title}</CardTitle>
                <p className="mb-4">{featuredPost.excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <Button variant="secondary" asChild>
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* All Blog Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}