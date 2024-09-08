
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@clerk/clerk-react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

export default function Dashboard() {
  const {user:User} = useUser()

  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  
  
  console.log(user)
  

  return user.userId ? (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-[70vw] p-8 m-4 border-y bg-[#cecece]">
          <h1 className="text-2xl">Hey {User?.firstName}, to get the best out of UpStaze, you should perform these actions.</h1>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8">
            <h1 className="text-3xl p-6">You have an Idea for a project ?</h1>
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <RocketIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Create a Startup</h3>
                <p className="text-muted-foreground text-center">
                  Bring your business idea to life and connect with investors.
                </p>
                <Button onClick={()=>navigate("/add-startup")}>Get Started</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <BriefcaseIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Create a Job</h3>
                <p className="text-muted-foreground text-center">
                  Post your job openings and find the perfect candidates.
                </p>
                <Button >List Jobs</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <UsersIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Use Matchmaking</h3>
                <p className="text-muted-foreground text-center">
                  Let our AI-powered matchmaking connect you with opportunities.
                </p>
                <Button>Get Matched</Button>
              </CardContent>
            </Card>
            
           
          </div>
          <h1 className="text-3xl p-6 mt-12">You are looking for a project to join?</h1>
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6">
          <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <CircleUserIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Improve Your Profile</h3>
                <p className="text-muted-foreground text-center">Showcase your skills and experience to stand out.</p>
                <Button>Upgrade Profile</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <SearchIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Find Open Jobs</h3>
                <p className="text-muted-foreground text-center">
                  Discover the latest job opportunities in your field.
                </p>
                <Button>Search Jobs</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <UsersIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Use Matchmaking</h3>
                <p className="text-muted-foreground text-center">
                  Let our AI-powered matchmaking connect you with opportunities.
                </p>
                <Button>Get Matched</Button>
              </CardContent>
            </Card>
          </div>
          <h1 className="text-3xl p-6 mt-12">You want to support startups?</h1>
          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6">
          <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <HeartIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Become a Supporter</h3>
                <p className="text-muted-foreground text-center">
                  Support our mission and help others achieve their goals.
                </p>
                <Button>Support</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-5">
                <BriefcaseIcon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-bold">Offer Your Services</h3>
                <p className="text-muted-foreground text-center">
                  Showcase your expertise and connect with potential clients.
                </p>
                <Button>List Services</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  ):<Navigate to="/profile"/>
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CircleUserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}


function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}