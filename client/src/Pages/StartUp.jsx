
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import { Link, useNavigate } from "react-router-dom"
import { useGetAllStartUpQuery, useGetmystartUpQuery, useLazyGetAllStartUpQuery } from "@/redux/api/starupApiSlice"
import { useSelector } from "react-redux"

export default function StartUp({userId}) {
  const [startups, setStartups] = useState([
    {
      id: 1,
      logo: "/placeholder-logo.svg",
      name: "Acme Inc",
      description: "Revolutionizing the way we do business.",
      website: "https://acme.com",
    },
    {
      id: 2,
      logo: "/placeholder-logo.svg",
      name: "Globex Corporation",
      description: "Innovating for a better tomorrow.",
      website: "https://globex.com",
    },
    {
      id: 3,
      logo: "/placeholder-logo.svg",
      name: "Stark Industries",
      description: "Powering the future with technology.",
      website: "https://stark.com",
    },
    {
      id: 4,
      logo: "/placeholder-logo.svg",
      name: "Wayne Enterprises",
      description: "Redefining the boundaries of possibility.",
      website: "https://wayne.com",
    },
    {
      id: 5,
      logo: "/placeholder-logo.svg",
      name: "Stark Industries",
      description: "Powering the future with technology.",
      website: "https://stark.com",
    },
    {
      id: 6,
      logo: "/placeholder-logo.svg",
      name: "Wayne Enterprises",
      description: "Redefining the boundaries of possibility.",
      website: "https://wayne.com",
    },
    {
      id: 7,
      logo: "/placeholder-logo.svg",
      name: "Acme Inc",
      description: "Revolutionizing the way we do business.",
      website: "https://acme.com",
    },
    {
      id: 8,
      logo: "/placeholder-logo.svg",
      name: "Globex Corporation",
      description: "Innovating for a better tomorrow.",
      website: "https://globex.com",
    },
  ])
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  if(userId){
    var {data}= useGetmystartUpQuery({token})
  }
  else{
    var {data} = useGetAllStartUpQuery({token})
  }
  
  // if(token.length>0){
    console.log(data);
    // trigger(1)
  // }
  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((startup) => (
            <Card onClick={()=>navigate(`/startup/${startup?._id}`)} key={startup.id} className="bg-card text-card-foreground w-full max-w-[300px] mx-auto">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  width={100}
                  height={100}
                  className="mb-4"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <h3 className="text-xl font-bold mb-2">{startup.name}</h3>
                <p className="text-muted-foreground text-center mb-4">{startup.whatOffer}</p>
                <div className="flex justify-center">
                  <Link
                    href={startup.website}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Visit Website
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </main>
    </div>
  )
}